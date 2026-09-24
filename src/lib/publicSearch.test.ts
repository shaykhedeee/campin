import { describe, expect, it } from "vitest";
import { searchPublicResources } from "./publicSearch";

describe("public resource search", () => {
  it("finds camping guides by their subjects, not only exact titles", () => {
    expect(searchPublicResources("Coorg camping").some(result => result.kind === "Guide" || result.kind === "Article")).toBe(true);
  });

  it("normalizes common Indian destination aliases", () => {
    const bengaluru = searchPublicResources("Bengaluru").map(result => result.href);
    const bangalore = searchPublicResources("Bangalore").map(result => result.href);
    expect(bangalore).toEqual(bengaluru);
  });

  it("returns help actions for matching queries", () => {
    expect(searchPublicResources("suggest campsite").some(result => result.href === "/suggest-campsite")).toBe(true);
  });

  it("does not list broad editorial results for an empty query", () => {
    expect(searchPublicResources(" ")).toEqual([]);
  });
});
