import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { afterEach } from "vitest";
import { categoryHref, parseExploreCategory } from "./exploreFilters";
import Explore from "../pages/Explore";

function LocationSearch() {
  return createElement("output", { "data-testid": "location-search" }, useLocation().search);
}

function renderExplore(search: string) {
  return render(
    createElement(
      MemoryRouter,
      { initialEntries: [`/explore${search}`] },
      createElement(Routes, null, createElement(Route, { path: "/explore", element: createElement(Explore) })),
      createElement(LocationSearch),
    ),
  );
}

afterEach(cleanup);

describe("Explore category URL contract", () => {
  it("serializes and parses supported category links", () => {
    expect(categoryHref("farms-estates")).toBe("/explore?category=farms-estates");
    expect(parseExploreCategory("?category=farms-estates")).toBe("farms-estates");
  });

  it("rejects an unknown category", () => {
    expect(parseExploreCategory("?category=secret-spot")).toBeNull();
  });

  it("activates the compatible BYOT control from the category URL", () => {
    renderExplore("?category=bring-your-own-tent");

    expect(screen.getByRole("button", { name: /own-tent/i })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: /all verified sites/i })).toHaveAttribute("aria-pressed", "false");
  });

  it("uses the category chip instead of an unrelated All control", () => {
    renderExplore("?category=pre-pitched-glamping");

    expect(screen.getByText("Category: pre pitched glamping")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /all verified sites/i })).toHaveAttribute("aria-pressed", "false");
  });

  it("clears only the category and restores the non-category vehicle state", async () => {
    const user = userEvent.setup();
    renderExplore("?category=bring-your-own-tent&vehicle=campervan&source=home");

    await user.click(screen.getByRole("button", { name: "Clear category" }));

    expect(screen.getByTestId("location-search")).toHaveTextContent("?vehicle=campervan&source=home");
    expect(screen.getByRole("button", { name: /campervan/i })).toHaveAttribute("aria-pressed", "true");
  });
});
