import { cleanup, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, expect, it, vi } from "vitest";
import App from "../App";
import Home from "./Home";

afterEach(cleanup);

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
  expect(document.querySelectorAll('img[srcset*="900w"][srcset*="1600w"][sizes="(min-width: 640px) 18vw, 84vw"]').length).toBeGreaterThanOrEqual(3);
});

it("shows one concise trust explanation and both marketplace actions", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );

  expect(screen.getAllByRole("heading", { name: /how campin builds trust/i })).toHaveLength(1);
  expect(screen.getAllByRole("link", { name: "Explore camps" })[0]).toHaveAttribute("href", "/explore");
  expect(screen.getAllByRole("link", { name: "List your land" })[0]).toHaveAttribute("href", "/host-your-land");
});

it("removes the repeated homepage trust and founder narratives", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );

  expect(screen.queryByRole("heading", { name: /why campin exists/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /the four campin pillars/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /what gets checked before a place goes live/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /how we verify campsites/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /our story:/i })).not.toBeInTheDocument();
});

it("keeps the public footer and marketplace actions available from the homepage shell", () => {
  window.history.replaceState({}, "", "/");
  window.scrollTo = vi.fn();

  render(<App />);

  const navigation = screen.getByRole("navigation");
  expect(within(navigation).getAllByRole("link", { name: "Explore camps" })).not.toHaveLength(0);
  expect(within(navigation).getAllByRole("link", { name: "List your land" })).not.toHaveLength(0);
  expect(screen.getByRole("contentinfo")).toBeInTheDocument();
});
