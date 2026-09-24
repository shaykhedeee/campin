import { beforeEach, expect, it, vi } from "vitest";
import owner from "../functions/owner";

beforeEach(() => {
  vi.stubEnv("SUPABASE_URL", "https://test.supabase.co");
  vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "server-secret");
});

it("requires an authenticated session before loading owner data", async () => {
  const response = await owner(new Request("https://campin.co.in/api/owner"));
  expect(response.status).toBe(401);
});

it("does not grant owner tools to another confirmed account", async () => {
  vi.stubGlobal("fetch", vi.fn(async () => Response.json({ email: "camper@example.com", email_confirmed_at: "2026-09-24" })));
  const response = await owner(new Request("https://campin.co.in/api/owner", { headers: { Authorization: "Bearer valid-session" } }));
  expect(response.status).toBe(403);
  expect(await response.json()).toEqual({ error: "owner_access_required" });
  expect(fetch).toHaveBeenCalledTimes(1);
});

it("rejects host numbers that cannot safely open WhatsApp", async () => {
  vi.stubGlobal("fetch", vi.fn(async () => Response.json({ email: "support@campin.co.in", email_confirmed_at: "2026-09-24" })));
  const response = await owner(new Request("https://campin.co.in/api/owner", {
    method: "POST", headers: { Authorization: "Bearer owner-session", "Content-Type": "application/json" },
    body: JSON.stringify({ action: "contact", listingId: "2a000000-0000-4000-8000-000000000001", phone: "not-a-phone" }),
  }));
  expect(response.status).toBe(400);
  expect(fetch).toHaveBeenCalledTimes(1);
});
