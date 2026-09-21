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
  payload?: Record<string, unknown>;
}

interface AlertRouting {
  from: string;
  to: string;
}

export function buildSupportAlert(lead: LeadAlertInput, routing: AlertRouting) {
  const label = lead.type.replaceAll("_", " ");
  const contact = [lead.name, lead.email, lead.phone].filter(Boolean).map(singleLine).join(" · ") || "Contact not supplied";
  const location = lead.city ? `\nCity: ${singleLine(lead.city)}` : "";
  const details = formatPayload(lead.payload);
  const text = [
    `New CampIn ${label} lead`,
    `Lead ID: ${singleLine(lead.id)}`,
    `Source: ${singleLine(lead.sourcePage)}`,
    `Contact: ${contact}${location}`,
    `Received: ${lead.createdAt}`,
    details ? `Details:\n${details}` : "",
    "Review the authoritative lead record in the owner dashboard.",
  ].join("\n");
  return {
    from: routing.from,
    to: [routing.to],
    subject: `CampIn ${label} lead`,
    text,
    html: `<pre style="font-family:Arial,sans-serif;white-space:pre-wrap;line-height:1.5">${escapeHtml(text)}</pre>`,
  };
}

function formatPayload(payload: Record<string, unknown> | undefined) {
  if (!payload || typeof payload !== "object") return "";
  return Object.entries(payload).slice(0, 50).map(([key, value]) => {
    const label = key.replace(/([A-Z])/g, " $1").replace(/[_-]/g, " ").replace(/^./, (letter) => letter.toUpperCase());
    const content = Array.isArray(value) ? value.join(", ") : typeof value === "object" ? JSON.stringify(value) : String(value ?? "");
    return `${label}: ${singleLine(content).slice(0, 1000)}`;
  }).join("\n");
}

function singleLine(value: string | undefined) {
  return (value || "").replace(/[\r\n\t]+/g, " ").trim();
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character] || character);
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
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `campin-lead-${lead.id}`,
      },
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
      (!value.city || value.city.length <= 120) &&
      (!value.payload || typeof value.payload === "object"),
  );
}

function json(body: Record<string, string>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
