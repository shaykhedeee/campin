import { beforeEach, expect, it, vi } from "vitest";
import notifyLead from "../functions/notify-lead";

const suggestion = {
  id: "ROADSTOP-ABC123",
  type: "road_stop",
  sourcePage: "/suggest-campsite",
  name: "Asha Camper",
  email: "asha@example.com",
  city: "Coorg",
  consent: true,
  payload: { submissionKind: "campsite_suggestion", place: "River Meadow Camp", mapLink: "https://maps.google.com/?q=camp", relationship: "I stayed there last year", notes: "Call before arriving" },
};

beforeEach(() => {
  vi.stubEnv("SUPABASE_URL", "https://test.supabase.co");
  vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "server-secret");
  vi.stubEnv("LEAD_ALERT_TO", "owner@example.com");
  vi.stubGlobal("fetch", vi.fn(async () => Response.json({ id: "ROADSTOP-ABC123", queued: true })));
});

it("rejects incomplete campsite suggestions before persistence", async () => {
  const body = { ...suggestion, payload: { ...suggestion.payload, place: " " } };
  const response = await notifyLead(new Request("https://campin.co.in/api/leads", { method: "POST", body: JSON.stringify(body) }));
  expect(response.status).toBe(400);
  expect(fetch).not.toHaveBeenCalled();
});

it("queues a valid suggestion for persistence and owner email", async () => {
  const response = await notifyLead(new Request("https://campin.co.in/api/leads", { method: "POST", body: JSON.stringify(suggestion) }));
  expect(response.status).toBe(202);
  expect(await response.json()).toMatchObject({ persisted: true, notification: "queued", id: suggestion.id });
  const call = vi.mocked(fetch).mock.calls[0];
  expect(String(call[0])).toContain("campin_queue_lead_emails");
  expect(JSON.parse(String(call[1]?.body)).p_lead.payload.place).toBe("River Meadow Camp");
});

it("rejects insecure map links", async () => {
  const body = { ...suggestion, payload: { ...suggestion.payload, mapLink: "http://example.com" } };
  const response = await notifyLead(new Request("https://campin.co.in/api/leads", { method: "POST", body: JSON.stringify(body) }));
  expect(response.status).toBe(400);
});
