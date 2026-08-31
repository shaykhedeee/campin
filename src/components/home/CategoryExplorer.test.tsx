import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, it } from "vitest";
import CategoryExplorer from "./CategoryExplorer";

it("links all six camping categories to their shareable Explore views", () => {
  render(
    <MemoryRouter>
      <CategoryExplorer />
    </MemoryRouter>,
  );

  expect(screen.getByRole("link", { name: /bring your own tent/i })).toHaveAttribute(
    "href",
    "/explore?category=bring-your-own-tent",
  );
  expect(screen.getAllByRole("link")).toHaveLength(6);
});
