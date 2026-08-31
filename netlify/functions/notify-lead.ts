const allowedLeadTypes = new Set([
  "camper_waitlist",
  "guide_unlock",
  "host_interest",
  "listing_inquiry",
  "newsletter",
  "road_stop",
]);

interface LeadAlertInput {
  id: string;
  type: string;
  sourcePage: string;
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  createdAt: string;
}

interface AlertRouting {
  from: string;
  to: string;
}

export function buildSupportAlert(lead: LeadAlertInput, routing: AlertRouting) {
  const label = lead.type.replaceAll("_", " ");
  const contact = [lead.name, lead.email, lead.phone].filter(Boolean).map(singleLine).join(" · ") || "Contact not supplied";
  const location = lead.city ? `\nCity: ${singleLine(lead.city)}` : "";
  return {
    from: routing.from,
    to: [routing.to],
    subject: `CampIn ${label} lead`,
    text: [
      `New CampIn ${label} lead`,
      `Lead ID: ${singleLine(lead.id)}`,
      `Source: ${singleLine(lead.sourcePage)}`,
      `Contact: ${contact}${location}`,
      `Received: ${lead.createdAt}`,
      "Review the authoritative lead record in the owner dashboard.",
    ].join("\n"),
  };
}

function singleLine(value: string | undefined) {
  return (value || "").replace(/[\r\n\t]+/g, " ").trim();
}

export default async function notifyLead(request: Request): Promise<Response> {
  if (request.method !== "POST") return json({ status: "failed", reason: "method_not_allowed" }, 405);

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.LEAD_ALERT_TO;
  if (!apiKey || !from || !to) return json({ status: "skipped", reason: "provider_not_configured" }, 503);

  let lead: LeadAlertInput;
  try {
    lead = (await request.json()) as LeadAlertInput;
  } catch {
    return json({ status: "failed", reason: "invalid_json" }, 400);
  }

  if (!isValidLeadAlert(lead)) return json({ status: "failed", reason: "invalid_lead" }, 400);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(buildSupportAlert(lead, { from, to })),
    });
    if (!response.ok) return json({ status: "failed", reason: "provider_rejected" }, 502);
    return json({ status: "sent" }, 200);
  } catch {
    return json({ status: "failed", reason: "provider_unavailable" }, 502);
  }
}

function isValidLeadAlert(value: LeadAlertInput) {
  return Boolean(
    value &&
      typeof value.id === "string" && value.id.length <= 100 &&
      allowedLeadTypes.has(value.type) &&
      typeof value.sourcePage === "string" && value.sourcePage.startsWith("/") && value.sourcePage.length <= 240 &&
      typeof value.createdAt === "string" && value.createdAt.length <= 40 &&
      (!value.name || value.name.length <= 120) &&
      (!value.email || value.email.length <= 254) &&
      (!value.phone || value.phone.length <= 32) &&
      (!value.city || value.city.length <= 120),
  );
}

function json(body: Record<string, string>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
