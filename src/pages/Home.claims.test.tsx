import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, it } from "vitest";
import Home from "./Home";

it("does not promise instant booking or unsupported universal verification", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );

  expect(screen.queryByText(/book instantly/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/every campsite is verified/i)).not.toBeInTheDocument();
});

it("keeps active homepage imagery local and labels editorial featured cards", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );

  expect(document.querySelectorAll('img[src^="http"]')).toHaveLength(0);
  expect(screen.getAllByText("Regional editorial image").length).toBeGreaterThanOrEqual(3);
});
