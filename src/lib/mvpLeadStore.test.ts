import { beforeEach, describe, expect, it, vi } from "vitest";
import { readMvpLeads, submitMvpLead } from "./mvpLeadStore";

const input = {
  type: "newsletter" as const,
  sourcePage: "/journal",
  email: "reader@example.com",
  consent: true,
  payload: { topic: "routes" },
};

describe("submitMvpLead", () => {
  beforeEach(() => window.localStorage.clear());

  it("keeps Supabase as the source of truth after a successful insert", async () => {
    const insert = vi.fn().mockResolvedValue({ error: null });
    const fetcher = vi.fn().mockResolvedValue(new Response(JSON.stringify({ status: "sent" }), { status: 200 }));

    const result = await submitMvpLead(input, {
      supabase: { from: () => ({ insert }) },
      fetcher,
      netlifyFormFallback: false,
      createId: () => "NEWS-TEST",
      now: () => new Date("2026-08-30T10:00:00.000Z"),
    });

    expect(result.remote).toBe("synced");
    expect(result.notification).toBe("sent");
    expect(result.metadata.netlifyForm).toBe("skipped");
    expect(readMvpLeads()).toEqual([]);
  });

  it("retains a clearly labelled retry record only after a remote failure", async () => {
    const insert = vi.fn().mockResolvedValue({ error: new Error("offline") });
    const result = await submitMvpLead(input, {
      supabase: { from: () => ({ insert }) },
      fetcher: vi.fn().mockRejectedValue(new Error("offline")),
      netlifyFormFallback: false,
      createId: () => "NEWS-RETRY",
      now: () => new Date("2026-08-30T10:00:00.000Z"),
    });

    expect(result.remote).toBe("queued");
    expect(result.lead.syncStatus).toBe("retry_queued");
    expect(result.notification).toBe("failed");
    expect(readMvpLeads()).toEqual([expect.objectContaining({ id: "NEWS-RETRY", syncStatus: "retry_queued" })]);
  });

  it("treats a server-persisted lead with queued email as saved, not a local retry", async () => {
    const insert = vi.fn().mockResolvedValue({ error: new Error("duplicate or offline") });
    const fetcher = vi.fn().mockResolvedValue(new Response(JSON.stringify({ persisted: true, notification: "queued" }), { status: 202 }));
    const result = await submitMvpLead(input, {
      supabase: { from: () => ({ insert }) }, fetcher, netlifyFormFallback: false,
      createId: () => "NEWS-QUEUED", now: () => new Date("2026-08-30T10:00:00.000Z"),
    });
    expect(result.remote).toBe("synced");
    expect(result.notification).toBe("queued");
    expect(result.lead.syncStatus).toBe("supabase_synced");
    expect(readMvpLeads()).toEqual([]);
  });

  it("reports the optional Netlify form fallback independently", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ status: "failed" }), { status: 502 }))
      .mockResolvedValueOnce(new Response(null, { status: 200 }));

    const result = await submitMvpLead(input, {
      supabase: { from: () => ({ insert: vi.fn().mockResolvedValue({ error: null }) }) },
      fetcher,
      netlifyFormFallback: true,
      createId: () => "NEWS-FALLBACK",
      now: () => new Date("2026-08-30T10:00:00.000Z"),
    });

    expect(result.notification).toBe("failed");
    expect(result.metadata.netlifyForm).toBe("sent");
  });
});
