import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AdminApp from "./AdminApp";

const auth = vi.hoisted(() => ({
  getSession: vi.fn(),
  onAuthStateChange: vi.fn(),
  signInWithOtp: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock("./lib/adminAuth", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./lib/adminAuth")>();
  return { ...actual, supabase: { auth } };
});

vi.mock("./pages/ValidationMachine", () => ({
  default: () => <h1>A founder control room for trust, demand, and supply validation.</h1>,
}));

vi.mock("./pages/StrategyLab", () => ({
  default: () => <h1>Airbnb marketplace lessons, rebuilt for camping in India.</h1>,
}));

describe("AdminApp routes", () => {
  beforeEach(() => {
    auth.getSession.mockResolvedValue({ data: { session: null }, error: null });
    auth.onAuthStateChange.mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } });
    auth.signInWithOtp.mockResolvedValue({ data: {}, error: null });
    auth.signOut.mockResolvedValue({ error: null });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    window.history.replaceState({}, "", "/");
  });

  it("renders the explicit owner sign-in at the admin entry path", async () => {
    window.history.replaceState({}, "", "/admin.html");

    render(<AdminApp />);

    expect(await screen.findByRole("heading", { name: /campin launch console/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send secure sign-in link/i })).toBeInTheDocument();
  });

  it.each([
    ["validation", /a founder control room for trust, demand, and supply validation/i],
    ["strategy", /airbnb marketplace lessons, rebuilt for camping in india/i],
  ])("blocks the signed-out %s hash route", async (route, heading) => {
    window.history.replaceState({}, "", `/admin.html#/${route}`);

    render(<AdminApp />);

    expect(await screen.findByRole("heading", { name: /campin launch console/i })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: heading })).not.toBeInTheDocument();
  });

  it("does not request an OTP for a non-owner email", async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, "", "/admin.html");
    render(<AdminApp />);
    const email = await screen.findByRole("textbox", { name: /owner email/i });

    await user.clear(email);
    await user.type(email, "visitor@example.com");
    await user.click(screen.getByRole("button", { name: /send secure sign-in link/i }));

    expect(screen.getByText(/not authorized for owner access/i)).toBeInTheDocument();
    expect(auth.signInWithOtp).not.toHaveBeenCalled();
  });

  it("preserves the owner magic-link redirect", async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, "", "/admin.html#/strategy");
    render(<AdminApp />);

    await user.click(await screen.findByRole("button", { name: /send secure sign-in link/i }));

    expect(auth.signInWithOtp).toHaveBeenCalledWith({
      email: "support@campin.co.in",
      options: { emailRedirectTo: window.location.origin + "/admin.html" },
    });
    expect(await screen.findByText(/check your owner email/i)).toBeInTheDocument();
  });

  it("rejects a persisted non-owner session before rendering admin tools", async () => {
    auth.getSession.mockResolvedValue({
      data: { session: { user: { email: "visitor@example.com" } } },
      error: null,
    });
    window.history.replaceState({}, "", "/admin.html#/validation");

    render(<AdminApp />);

    expect(await screen.findByText(/account is not authorized for owner access/i)).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /a founder control room/i })).not.toBeInTheDocument();
    expect(auth.signOut).toHaveBeenCalledOnce();
  });

  it.each([
    ["validation", /a founder control room for trust, demand, and supply validation/i],
    ["strategy", /airbnb marketplace lessons, rebuilt for camping in india/i],
  ])("loads the %s hash route for the owner session", async (route, heading) => {
    auth.getSession.mockResolvedValue({
      data: { session: { user: { email: "support@campin.co.in" } } },
      error: null,
    });
    window.history.replaceState({}, "", `/admin.html#/${route}`);

    render(<AdminApp />);

    expect(await screen.findByRole("heading", { name: heading })).toBeInTheDocument();
  });
});
