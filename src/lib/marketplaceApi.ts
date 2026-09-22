import { supabase } from "./adminAuth";

type EnquiryInput = { listingId: string; startDate: string; endDate: string; guests: number; campingStyle: string; vehicleDetails?: string; questions?: string };
type EnquiryResponse = { id: string; reference: string; handoffReady: boolean };
type WhatsappResponse = { reference: string; message: string; whatsappUrl: string };

export async function createMarketplaceEnquiry(input: EnquiryInput, idempotencyKey = crypto.randomUUID()): Promise<EnquiryResponse> {
  return api<EnquiryResponse>("/api/enquiries", input, idempotencyKey);
}

export async function recordWhatsappOpen(enquiryId: string) { return api(`/api/enquiries/${enquiryId}/whatsapp`, {action:"opened"}); }

export async function getMarketplaceWhatsapp(enquiryId: string): Promise<WhatsappResponse> {
  return api<WhatsappResponse>(`/api/enquiries/${enquiryId}/whatsapp`, {});
}

async function api<T>(path: string, body: Record<string, unknown>, idempotencyKey = crypto.randomUUID()): Promise<T> {
  const { data } = await supabase?.auth.getSession() || {};
  const token = data?.session?.access_token;
  if (!token) throw new Error("Please sign in before requesting availability.");
  const response = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, "Idempotency-Key": idempotencyKey },
    body: JSON.stringify(body),
  });
  const result = await response.json().catch(() => ({})) as T & { error?: string };
  if (!response.ok) throw new Error(result.error?.split("_").join(" ") || "We could not save this request.");
  return result;
}

export function isDatabaseListingId(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
