import { describe, expect, it } from "vitest";
import { categoryHref, parseExploreCategory } from "./exploreFilters";

describe("Explore category URL contract", () => {
  it("serializes and parses supported category links", () => {
    expect(categoryHref("farms-estates")).toBe("/explore?category=farms-estates");
    expect(parseExploreCategory("?category=farms-estates")).toBe("farms-estates");
  });

  it("rejects an unknown category", () => {
    expect(parseExploreCategory("?category=secret-spot")).toBeNull();
  });
});
