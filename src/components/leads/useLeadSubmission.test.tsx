import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useLeadSubmission } from "./useLeadSubmission";

const lead = {
  id: "NEWS-1",
  type: "newsletter" as const,
  sourcePage: "/journal",
  email: "reader@example.com",
  consent: true,
  payload: {},
  createdAt: "2026-08-30T10:00:00.000Z",
  syncStatus: "supabase_synced" as const,
};

describe("useLeadSubmission", () => {
  it("distinguishes authoritative success from a local retry queue", async () => {
    const { result } = renderHook(() => useLeadSubmission());

    await act(async () => {
      await result.current.run(async () => ({
        lead: { ...lead, syncStatus: "retry_queued" as const },
        remote: "queued",
        notification: "failed",
        metadata: { netlifyForm: "skipped", retryReason: "supabase_insert_failed" },
      }));
    });

    expect(result.current.state).toBe("queued");
    expect(result.current.message).toMatch(/queued on this device/i);
  });

  it("surfaces validation errors without clearing the caller's form", async () => {
    const { result } = renderHook(() => useLeadSubmission());
    await act(async () => {
      await result.current.run(async () => {
        throw new Error("Consent is required");
      });
    });
    expect(result.current.state).toBe("error");
    expect(result.current.message).toMatch(/consent is required/i);
  });
});
