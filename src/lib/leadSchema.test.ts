import { describe, expect, it } from "vitest";
import { normalizeLead, type MvpLeadInput } from "./leadSchema";

function validLead(overrides: Partial<MvpLeadInput> = {}): MvpLeadInput {
  return {
    type: "camper_waitlist",
    sourcePage: "/",
    email: "camper@example.com",
    consent: true,
    payload: { interest: "weekend camping" },
    ...overrides,
  };
}

describe("normalizeLead", () => {
  it("normalizes contact fields and requires consent", () => {
    expect(normalizeLead(validLead({ email: " USER@EXAMPLE.COM ", name: "  Asha  " })).email).toBe("user@example.com");
    expect(normalizeLead(validLead({ name: "  Asha  " })).name).toBe("Asha");
    expect(() => normalizeLead(validLead({ consent: false }))).toThrow(/consent/i);
  });

  it("accepts only the six launch lead types and requires a contact method", () => {
    expect(() => normalizeLead(validLead({ type: "unknown" as MvpLeadInput["type"] }))).toThrow(/lead type/i);
    expect(() => normalizeLead(validLead({ email: undefined, phone: undefined }))).toThrow(/email or phone/i);
  });

  it("rejects oversized payloads", () => {
    expect(() => normalizeLead(validLead({ payload: { note: "x".repeat(13_000) } }))).toThrow(/payload/i);
  });
});
