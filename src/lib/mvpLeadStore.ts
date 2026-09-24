import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { normalizeLead, type MvpLeadInput, type MvpLeadType } from "./leadSchema";

export type { MvpLeadInput, MvpLeadType } from "./leadSchema";

export type LeadTransportStatus = "sent" | "queued" | "skipped" | "failed";

export interface MvpLeadRecord extends MvpLeadInput {
  id: string;
  createdAt: string;
  syncStatus: "retry_queued" | "supabase_synced";
}

export interface LeadSubmissionResult {
  lead: MvpLeadRecord;
  remote: "synced" | "queued";
  notification: LeadTransportStatus;
  metadata: {
    netlifyForm: LeadTransportStatus;
    retryReason?: "supabase_not_configured" | "supabase_insert_failed";
  };
}

interface SupabaseInsertClient {
  from(table: string): {
    insert(values: Record<string, unknown>): PromiseLike<{ error: unknown | null }>;
  };
}

export interface LeadSubmissionDependencies {
  supabase?: SupabaseInsertClient | null;
  fetcher?: typeof fetch;
  storage?: Pick<Storage, "getItem" | "setItem"> | null;
  netlifyFormFallback?: boolean;
  createId?: (type: MvpLeadType) => string;
  now?: () => Date;
}

const retryStorageKey = "campin.mvp.lead-retry-queue.v1";
let supabaseClient: SupabaseClient | null | undefined;

export async function submitMvpLead(
  rawInput: MvpLeadInput,
  dependencies: LeadSubmissionDependencies = {},
): Promise<LeadSubmissionResult> {
  const input = normalizeLead(rawInput);
  const now = dependencies.now ?? (() => new Date());
  const createId = dependencies.createId ?? createLeadId;
  const storage = dependencies.storage === undefined ? browserStorage() : dependencies.storage;
  const client = dependencies.supabase === undefined ? getSupabaseClient() : dependencies.supabase;
  const fetcher = dependencies.fetcher ?? (typeof fetch === "function" ? fetch.bind(globalThis) : undefined);

  let lead: MvpLeadRecord = {
    ...input,
    id: createId(input.type),
    createdAt: now().toISOString(),
    syncStatus: "retry_queued",
  };
  let remote: LeadSubmissionResult["remote"] = "queued";
  let retryReason: LeadSubmissionResult["metadata"]["retryReason"] = "supabase_not_configured";

  if (client) {
    try {
      const { error } = await client.from("mvp_leads").insert(toSupabaseRow(lead));
      if (!error) {
        lead = { ...lead, syncStatus: "supabase_synced" };
        remote = "synced";
        retryReason = undefined;
      } else {
        retryReason = "supabase_insert_failed";
      }
    } catch {
      retryReason = "supabase_insert_failed";
    }
  }

  const support = await submitSupportNotification(lead, fetcher);
  const notification = support.status;
  if (support.persisted) {
    lead = { ...lead, syncStatus: "supabase_synced" };
    remote = "synced";
    retryReason = undefined;
    removeLeadFromRetryQueue(lead.id, storage);
  } else if (remote === "queued") {
    queueLeadForRetry(lead, storage);
  }
  const netlifyForm =
    notification === "sent" || notification === "queued" || !isNetlifyFallbackEnabled(dependencies.netlifyFormFallback)
      ? "skipped"
      : await submitNetlifyForm(lead, fetcher);

  return {
    lead,
    remote,
    notification,
    metadata: { netlifyForm, ...(retryReason ? { retryReason } : {}) },
  };
}

export function readMvpLeads(storage: Pick<Storage, "getItem"> | null = browserStorage()): MvpLeadRecord[] {
  if (!storage) return [];
  try {
    const raw = storage.getItem(retryStorageKey);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as MvpLeadRecord[]) : [];
  } catch {
    return [];
  }
}

export function exportMvpLeadsToCsv(leads = readMvpLeads()) {
  const headers = ["id", "type", "sourcePage", "createdAt", "syncStatus", "name", "email", "phone", "city", "status", "score", "consent", "payload"];
  const rows = leads.map((lead) => [
    lead.id, lead.type, lead.sourcePage, lead.createdAt, lead.syncStatus, lead.name || "", lead.email || "",
    lead.phone || "", lead.city || "", lead.status || "", String(lead.score ?? 0), String(Boolean(lead.consent)),
    JSON.stringify(lead.payload),
  ]);
  return [headers, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n");
}

function getSupabaseClient() {
  if (supabaseClient !== undefined) return supabaseClient;
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
  supabaseClient = url && anonKey ? createClient(url, anonKey) : null;
  return supabaseClient;
}

function toSupabaseRow(lead: MvpLeadRecord) {
  return {
    id: lead.id,
    lead_type: lead.type,
    source_page: lead.sourcePage,
    name: lead.name || null,
    email: lead.email || null,
    phone: lead.phone || null,
    city: lead.city || null,
    status: lead.status || "new",
    score: lead.score ?? 0,
    consent: true,
    payload: lead.payload,
    created_at: lead.createdAt,
  };
}

async function submitSupportNotification(lead: MvpLeadRecord, fetcher?: typeof fetch): Promise<{ status: LeadTransportStatus; persisted: boolean }> {
  if (!fetcher) return { status: "skipped", persisted: false };
  try {
    const response = await fetcher("/.netlify/functions/notify-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: lead.id,
        type: lead.type,
        sourcePage: lead.sourcePage,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        city: lead.city,
        createdAt: lead.createdAt,
        payload: lead.payload,
      }),
    });
    const body = (await response.json().catch(() => null)) as { status?: LeadTransportStatus; notification?: string; persisted?: boolean } | null;
    if (body?.notification === "queued" && body.persisted === true) return { status: "queued", persisted: true };
    if (body?.status === "sent" || body?.status === "skipped" || body?.status === "failed") return { status: body.status, persisted: response.ok };
    return { status: "failed", persisted: false };
  } catch {
    return { status: "failed", persisted: false };
  }
}

async function submitNetlifyForm(lead: MvpLeadRecord, fetcher?: typeof fetch): Promise<LeadTransportStatus> {
  if (!fetcher || typeof window === "undefined") return "skipped";
  const formData = new URLSearchParams({
    "form-name": `campin-${lead.type}`,
    lead_id: lead.id,
    source_page: lead.sourcePage,
    created_at: lead.createdAt,
    name: lead.name || "",
    email: lead.email || "",
    phone: lead.phone || "",
    city: lead.city || "",
    status: lead.status || "new",
  });
  try {
    const response = await fetcher("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });
    return response.ok ? "sent" : "failed";
  } catch {
    return "failed";
  }
}

function removeLeadFromRetryQueue(id: string, storage: Pick<Storage, "getItem" | "setItem"> | null) {
  if (!storage) return;
  storage.setItem(retryStorageKey, JSON.stringify(readMvpLeads(storage).filter((item) => item.id !== id)));
  if (typeof window !== "undefined") window.dispatchEvent(new Event("campin-mvp-leads-updated"));
}

function queueLeadForRetry(lead: MvpLeadRecord, storage: Pick<Storage, "getItem" | "setItem"> | null) {
  if (!storage) throw new Error("The lead could not be saved remotely and local retry storage is unavailable.");
  const current = readMvpLeads(storage);
  storage.setItem(retryStorageKey, JSON.stringify([lead, ...current.filter((item) => item.id !== lead.id)]));
  if (typeof window !== "undefined") window.dispatchEvent(new Event("campin-mvp-leads-updated"));
}

function browserStorage() {
  return typeof window === "undefined" ? null : window.localStorage;
}

function isNetlifyFallbackEnabled(override?: boolean) {
  return override ?? import.meta.env.VITE_ENABLE_NETLIFY_FORM_FALLBACK === "true";
}

function createLeadId(type: MvpLeadType) {
  const prefix = type.split("_").map((part) => part[0]).join("").toUpperCase();
  const random = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID().split("-")[0].toUpperCase()
    : Math.random().toString(36).slice(2, 10).toUpperCase();
  return `${prefix}-${Date.now().toString(36).toUpperCase()}-${random}`;
}

function csvEscape(value: string) {
  if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}
