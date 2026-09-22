import { cleanup, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, expect, it, vi } from "vitest";
import App from "../App";
import Home from "./Home";

afterEach(cleanup);

it("does not promise instant booking or unsupported universal verification", () => {
  render(<MemoryRouter><Home /></MemoryRouter>);

  expect(screen.queryByText(/book instantly/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/every campsite is verified/i)).not.toBeInTheDocument();
});

it("starts the homepage with trip discovery", () => {
  render(<MemoryRouter><Home /></MemoryRouter>);

  expect(screen.getByRole("heading", { name: "Find your next campsite in India." })).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Where do you want to camp?")).toBeInTheDocument();
  expect(screen.getByLabelText(/arrival date/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Own-tent camping" })).toHaveAttribute("href", "/explore?style=own-tent");
});

it("does not show invented cards while the shared catalogue is loading", () => {
  render(<MemoryRouter><Home /></MemoryRouter>);

  expect(screen.getByText(/loading campsites/i)).toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: /suggest a campsite/i })[0]).toHaveAttribute("href", "/suggest-campsite");
});

it("explains the enquiry model and keeps company storytelling off the homepage", () => {
  render(<MemoryRouter><Home /></MemoryRouter>);

  expect(screen.getByRole("heading", { name: "Find a campsite" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Check availability" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Connect with the host" })).toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /why campin exists/i })).not.toBeInTheDocument();
});

it("keeps the public marketplace navigation and footer actions available", () => {
  window.history.replaceState({}, "", "/");
  window.scrollTo = vi.fn();
  render(<App />);

  const navigation = screen.getByRole("navigation");
  expect(within(navigation).getAllByRole("link", { name: "Campsites" })).not.toHaveLength(0);
  expect(within(navigation).getAllByRole("link", { name: "List your campsite" })).not.toHaveLength(0);
  expect(within(navigation).getAllByRole("link", { name: "Sign in" })).not.toHaveLength(0);
  expect(screen.getByRole("contentinfo")).toBeInTheDocument();
});
