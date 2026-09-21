import { authenticatedUserId, getSupabaseConfig, json, oneLine, supabaseRequest } from "../lib/marketplace";

type StoredEnquiry = {
  id: string;
  tracking_id: string;
  start_date: string;
  end_date: string;
  guests: number;
  vehicle_type?: string | null;
  own_tent: boolean;
  message?: string | null;
  listings?: { title?: string; slug?: string } | null;
};

/** Returns a reviewed click-to-chat handoff for the authenticated enquiry owner. */
export default async function enquiryWhatsapp(request: Request): Promise<Response> {
  if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405);
  const config = getSupabaseConfig();
  if (!config) return json({ error: "service_not_configured" }, 503);
  const camperId = await authenticatedUserId(config, request);
  if (!camperId) return json({ error: "authentication_required" }, 401);

  const enquiryId = new URL(request.url).searchParams.get("id");
  if (!isUuid(enquiryId)) return json({ error: "invalid_enquiry" }, 400);
  const response = await supabaseRequest(config, `/rest/v1/inquiries?id=eq.${enquiryId}&camper_profile_id=eq.${camperId}&select=id,listing_id,tracking_id,start_date,end_date,guests,vehicle_type,own_tent,message,listings(title,slug)`);
  if (!response.ok) return json({ error: "enquiry_unavailable" }, 502);
  const [enquiry] = (await response.json()) as Array<StoredEnquiry & { listing_id: string }>;
  if (!enquiry) return json({ error: "enquiry_not_found" }, 404);

  const contacts = await supabaseRequest(config, `/rest/v1/listing_contacts?listing_id=eq.${enquiry.listing_id}&select=whatsapp_e164&limit=1`);
  if (!contacts.ok) return json({ error: "handoff_unavailable" }, 502);
  const [contact] = (await contacts.json()) as Array<{ whatsapp_e164?: string }>;
  const phone = contact?.whatsapp_e164?.replace(/\D/g, "");
  if (!phone) return json({ error: "host_contact_unavailable", reference: enquiry.tracking_id }, 409);

  const message = [
    `Hi, I found ${oneLine(enquiry.listings?.title) || "this campsite"} on Campin.`,
    `I'm enquiring for ${formatDate(enquiry.start_date)}–${formatDate(enquiry.end_date)}, for ${enquiry.guests}.`,
    `Camping style: ${enquiry.own_tent ? "Own tent" : "Hosted stay"}.`,
    enquiry.vehicle_type ? `Vehicle: ${oneLine(enquiry.vehicle_type)}.` : "",
    enquiry.message ? `Questions: ${oneLine(enquiry.message)}.` : "",
    "Please confirm availability, total price, and arrival instructions.",
    `Campin reference: ${enquiry.tracking_id}`,
    enquiry.listings?.slug ? `https://campin.co.in/listing/${enquiry.listings.slug}` : "",
  ].filter(Boolean).join("\n");

  await supabaseRequest(config, `/rest/v1/inquiries?id=eq.${enquiry.id}`, { method: "PATCH", body: JSON.stringify({ whatsapp_opened_at: new Date().toISOString(), message_text: message }) });
  return json({ reference: enquiry.tracking_id, message, whatsappUrl: `https://wa.me/${phone}?text=${encodeURIComponent(message)}` });
}

function isUuid(value: string | null): value is string {
  return Boolean(value && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value));
}

function formatDate(value: string) {
  return value.slice(0, 10);
}
