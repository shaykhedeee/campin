type EnquiryInput = {
  listingId?: string;
  startDate?: string;
  endDate?: string;
  guests?: number;
  campingStyle?: string;
  vehicleDetails?: string;
  questions?: string;
};

type SupabaseConfig = { url: string; serviceRoleKey: string };

/**
 * Server-owned enquiry creation. The browser supplies only trip details; this
 * function resolves publication and host-contact readiness from Supabase.
 */
export default async function createEnquiry(request: Request): Promise<Response> {
  if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405);
  const config = getConfig();
  if (!config) return json({ error: "service_not_configured" }, 503);

  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return json({ error: "authentication_required" }, 401);

  const camperId = await getAuthenticatedUserId(config, token);
  if (!camperId) return json({ error: "invalid_session" }, 401);
  const idempotencyKey = request.headers.get("idempotency-key");
  if (!idempotencyKey || idempotencyKey.length > 120) return json({ error: "idempotency_key_required" }, 400);

  let input: EnquiryInput;
  try {
    input = (await request.json()) as EnquiryInput;
  } catch {
    return json({ error: "invalid_json" }, 400);
  }
  const validationError = validate(input);
  if (validationError) return json({ error: validationError }, 400);

  const listing = await getPublishedListing(config, input.listingId!);
  if (!listing) return json({ error: "listing_unavailable" }, 404);

  const trackingId = `CMP-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const inserted = await supabaseRequest(config, "/rest/v1/inquiries", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({
      listing_id: listing.id,
      camper_profile_id: camperId,
      start_date: input.startDate,
      end_date: input.endDate,
      guests: input.guests,
      own_tent: input.campingStyle === "own_tent",
      vehicle_type: singleLine(input.vehicleDetails),
      message: singleLine(input.questions),
      tracking_id: trackingId,
      idempotency_key: idempotencyKey,
    }),
  });
  if (inserted.status === 409) {
    const existing = await supabaseRequest(config, `/rest/v1/inquiries?camper_profile_id=eq.${camperId}&idempotency_key=eq.${encodeURIComponent(idempotencyKey)}&select=id,tracking_id&limit=1`);
    const [enquiry] = existing.ok ? (await existing.json()) as Array<{ id: string; tracking_id: string }> : [];
    if (enquiry) return json({ id: enquiry.id, reference: enquiry.tracking_id, handoffReady: listing.hasContact }, 200);
  }
  if (!inserted.ok) return json({ error: "enquiry_not_saved" }, 502);
  const [enquiry] = (await inserted.json()) as Array<{ id: string; tracking_id: string }>;
  if (!enquiry?.id) return json({ error: "enquiry_not_saved" }, 502);

  return json({ id: enquiry.id, reference: enquiry.tracking_id, handoffReady: listing.hasContact }, 201);
}

function getConfig(): SupabaseConfig | null {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && serviceRoleKey ? { url: url.replace(/\/$/, ""), serviceRoleKey } : null;
}

async function getAuthenticatedUserId(config: SupabaseConfig, token: string) {
  const response = await fetch(`${config.url}/auth/v1/user`, { headers: { Authorization: `Bearer ${token}`, apikey: config.serviceRoleKey } });
  if (!response.ok) return null;
  const user = (await response.json()) as { id?: string };
  return typeof user.id === "string" ? user.id : null;
}

async function getPublishedListing(config: SupabaseConfig, listingId: string) {
  const response = await supabaseRequest(config, `/rest/v1/listings?id=eq.${encodeURIComponent(listingId)}&is_published=eq.true&select=id,listing_contacts(whatsapp_e164)`);
  if (!response.ok) return null;
  const [listing] = (await response.json()) as Array<{ id: string; listing_contacts?: Array<{ whatsapp_e164?: string }> }>;
  if (!listing) return null;
  return { id: listing.id, hasContact: Boolean(listing.listing_contacts?.[0]?.whatsapp_e164) };
}

function supabaseRequest(config: SupabaseConfig, path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("apikey", config.serviceRoleKey);
  headers.set("Authorization", `Bearer ${config.serviceRoleKey}`);
  headers.set("Content-Type", "application/json");
  return fetch(`${config.url}${path}`, { ...init, headers });
}

function validate(input: EnquiryInput) {
  if (!input || !isUuid(input.listingId)) return "invalid_listing";
  if (!isIsoDate(input.startDate) || !isIsoDate(input.endDate) || input.startDate! >= input.endDate!) return "invalid_dates";
  if (!Number.isInteger(input.guests) || input.guests! < 1 || input.guests! > 50) return "invalid_guests";
  if (input.campingStyle && input.campingStyle.length > 80) return "invalid_camping_style";
  if (input.vehicleDetails && input.vehicleDetails.length > 500) return "invalid_vehicle_details";
  if (input.questions && input.questions.length > 2000) return "invalid_questions";
  return null;
}

function isUuid(value: unknown): value is string {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function isIsoDate(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

function singleLine(value: string | undefined) {
  return value?.replace(/[\r\n\t]+/g, " ").trim() || null;
}

function json(body: Record<string, string | boolean>, status: number) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
}
