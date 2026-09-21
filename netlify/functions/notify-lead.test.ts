import { describe, expect, it } from "vitest";
import { buildSupportAlert } from "./notify-lead";

describe("buildSupportAlert", () => {
  it("constructs a concise notification with server-owned routing", () => {
    const request = buildSupportAlert(
      {
        id: "HOST-123",
        type: "host_interest",
        sourcePage: "/host-your-land",
        name: "Mira",
        email: "mira@example.com",
        city: "Pune",
        createdAt: "2026-08-30T10:00:00.000Z",
      },
      {
        from: "CampIn Leads <leads@campin.co.in>",
        to: "support@campin.co.in",
      },
    );

    expect(request.to).toEqual(["support@campin.co.in"]);
    expect(request.subject).toContain("host interest");
    expect(request.text).toContain("HOST-123");
    expect(request.text).not.toContain("undefined");
    expect(request.html).toContain("HOST-123");
    expect(JSON.stringify(request)).not.toMatch(/api[_-]?key/i);
  });

  it("includes every submitted payload field and escapes HTML", () => {
    const request = buildSupportAlert(
      {
        id: "WAIT-123",
        type: "camper_waitlist",
        sourcePage: "/waitlist",
        name: "Mira <test>",
        createdAt: "2026-08-30T10:00:00.000Z",
        payload: { destinationInterests: ["Coorg", "Goa"], notes: "<script>alert(1)</script>" },
      },
      { from: "CampIn Leads <leads@campin.co.in>", to: "support@campin.co.in" },
    );

    expect(request.text).toContain("Destination Interests: Coorg, Goa");
    expect(request.html).toContain("&lt;script&gt;");
    expect(request.html).not.toContain("<script>");
  });
});
