import { describe, expect, it } from "vitest";
import { mediaRegistry } from "./mediaRegistry";

describe("media registry", () => {
  it("records source and usage for every regional image", () => {
    for (const asset of Object.values(mediaRegistry)) {
      expect(asset.src).toMatch(/^\/images\/india\//);
      expect(asset.sourceUrl).toMatch(/^https:\/\//);
      expect(asset.author.length).toBeGreaterThan(1);
      expect(["editorial-region", "listing-photo"]).toContain(asset.usage);
    }
  });
});
