import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type MvpLeadType = "camper_waitlist" | "guide_unlock" | "host_interest" | "listing_inquiry" | "newsletter" | "road_stop";

export interface MvpLeadInput {
  type: MvpLeadType;
  sourcePage: string;
  email?: string;
  phone?: string;
  name?: string;
  city?: string;
  status?: string;
  score?: number;
  consent?: boolean;
  payload: Record<string, unknown>;
}

export interface MvpLeadRecord extends MvpLeadInput {
  id: string;
  createdAt: string;
  syncStatus: "local_only" | "supabase_synced" | "supabase_failed";
}

const localStorageKey = "campin.mvp.leads.v1";
let supabaseClient: SupabaseClient | null | undefined;

export async function submitMvpLead(input: MvpLeadInput) {
  const lead: MvpLeadRecord = {
    ...input,
    id: createLeadId(input.type),
    createdAt: new Date().toISOString(),
    syncStatus: "local_only",
  };

  saveLocalLead(lead);

  const client = getSupabaseClient();
  if (!client) return lead;

  const { error } = await client.from("mvp_leads").insert({
    id: lead.id,
    lead_type: lead.type,
    source_page: lead.sourcePage,
    name: lead.name || null,
    email: lead.email || null,
    phone: lead.phone || null,
    city: lead.city || null,
    status: lead.status || "new",
    score: lead.score ?? 0,
    consent: Boolean(lead.consent),
    payload: lead.payload,
    created_at: lead.createdAt,
  });

  lead.syncStatus = error ? "supabase_failed" : "supabase_synced";
  updateLocalLead(lead);
  return lead;
}

export function readMvpLeads() {
  if (typeof window === "undefined") return [] as MvpLeadRecord[];

  try {
    const raw = window.localStorage.getItem(localStorageKey);
    return raw ? (JSON.parse(raw) as MvpLeadRecord[]) : [];
  } catch {
    return [];
  }
}

export function exportMvpLeadsToCsv(leads = readMvpLeads()) {
  const headers = ["id", "type", "sourcePage", "createdAt", "syncStatus", "name", "email", "phone", "city", "status", "score", "consent", "payload"];
  const rows = leads.map((lead) => [
    lead.id,
    lead.type,
    lead.sourcePage,
    lead.createdAt,
    lead.syncStatus,
    lead.name || "",
    lead.email || "",
    lead.phone || "",
    lead.city || "",
    lead.status || "",
    String(lead.score ?? 0),
    String(Boolean(lead.consent)),
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

function saveLocalLead(lead: MvpLeadRecord) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(localStorageKey, JSON.stringify([lead, ...readMvpLeads()]));
  window.dispatchEvent(new Event("campin-mvp-leads-updated"));
}

function updateLocalLead(lead: MvpLeadRecord) {
  if (typeof window === "undefined") return;
  const leads = readMvpLeads().map((current) => (current.id === lead.id ? lead : current));
  window.localStorage.setItem(localStorageKey, JSON.stringify(leads));
  window.dispatchEvent(new Event("campin-mvp-leads-updated"));
}

function createLeadId(type: MvpLeadType) {
  const prefix = type.split("_").map((part) => part[0]).join("").toUpperCase();
  return `${prefix}-${Date.now().toString(36).toUpperCase()}`;
}

function csvEscape(value: string) {
  if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}
