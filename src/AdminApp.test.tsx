import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import AdminApp from "./AdminApp";

vi.mock("./lib/adminAuth", () => ({
  adminEmail: "support@campin.co.in",
  supabase: null,
}));

vi.mock("./pages/ValidationMachine", () => ({
  default: () => <h1>A founder control room for trust, demand, and supply validation.</h1>,
}));

vi.mock("./pages/StrategyLab", () => ({
  default: () => <h1>Airbnb marketplace lessons, rebuilt for camping in India.</h1>,
}));

describe("AdminApp routes", () => {
  afterEach(() => {
    window.history.replaceState({}, "", "/");
  });

  it("renders the explicit owner sign-in at the admin entry path", () => {
    window.history.replaceState({}, "", "/admin.html");

    render(<AdminApp />);

    expect(screen.getByRole("heading", { name: /campin launch console/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send secure sign-in link/i })).toBeInTheDocument();
  });

  it.each([
    ["validation", /a founder control room for trust, demand, and supply validation/i],
    ["strategy", /airbnb marketplace lessons, rebuilt for camping in india/i],
  ])("loads the %s hash route directly", (route, heading) => {
    window.history.replaceState({}, "", `/admin.html#/${route}`);

    render(<AdminApp />);

    expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
  });
});
