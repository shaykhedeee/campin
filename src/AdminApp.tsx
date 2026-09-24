import { lazy, Suspense, useEffect, useState, type FormEvent, type ReactNode } from "react";
import { HashRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ClipboardCheck, Lightbulb, ArrowLeft, Lock, LogOut } from "lucide-react";
const OpsCenter = lazy(() => import("./pages/OpsCenter"));
const ValidationMachine = lazy(() => import("./pages/ValidationMachine"));
const StrategyLab = lazy(() => import("./pages/StrategyLab"));
const OwnerWorkspace = lazy(() => import("./pages/OwnerWorkspace"));
import { adminEmail, isCampInOwnerEmail, supabase } from "./lib/adminAuth";

type AuthStatus = "checking" | "signed-out" | "owner";

function OwnerSignIn({ error, message, onSubmit }: {
  error: string;
  message: string;
  onSubmit: (email: string) => Promise<void>;
}) {
  const [email, setEmail] = useState(adminEmail);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    await onSubmit(email);
    setIsSubmitting(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-offwhite px-4">
      <div className="w-full max-w-md rounded-3xl border border-forest/10 bg-white p-8 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange/10 text-orange">
            <Lock size={32} />
          </div>
          <h1 className="mt-5 text-2xl font-black text-forest">CampIn Launch Console</h1>
          <p className="mt-2 text-sm text-textgrey">
            Sign in with the owner email to review leads, evidence, listings, forms and content.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="owner-email" className="block text-xs font-black uppercase text-forest/75 tracking-wider">
              Owner email
            </label>
            <input
              id="owner-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-lg border border-forest/15 px-4 py-3 text-sm focus:border-orange focus:outline-none"
            />
          </div>

          {error && <p role="alert" className="text-xs font-bold text-red-500">{error}</p>}
          {message && <p role="status" className="text-xs font-bold text-forest">{message}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-forest px-4 py-3 text-sm font-black text-white transition hover:bg-forest-light disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending secure link…" : "Send secure sign-in link"}
          </button>
        </form>
      </div>
    </div>
  );
}

function OwnerAuthGate({ children }: { children: (signOut: () => Promise<void>) => ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>(supabase ? "checking" : "signed-out");
  const [authError, setAuthError] = useState("");
  const [authMessage, setAuthMessage] = useState("");

  useEffect(() => {
    const authClient = supabase;
    if (!authClient) return;
    let active = true;

    const applySession = (session: { user: { email?: string } } | null) => {
      if (!active) return;
      if (!session) {
        setStatus("signed-out");
        return;
      }
      if (!isCampInOwnerEmail(session.user.email)) {
        setAuthError("This account is not authorized for owner access.");
        setStatus("signed-out");
        void authClient.auth.signOut();
        return;
      }
      setAuthError("");
      setAuthMessage("");
      setStatus("owner");
    };

    void authClient.auth.getSession().then(({ data, error }) => {
      if (!active) return;
      if (error) {
        setAuthError("Owner session could not be verified. Please sign in again.");
        setStatus("signed-out");
        return;
      }
      applySession(data.session);
    });

    const { data: listener } = authClient.auth.onAuthStateChange((_event, session) => applySession(session));
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const requestSignIn = async (email: string) => {
    setAuthError("");
    setAuthMessage("");
    const normalizedEmail = email.trim().toLowerCase();
    if (!isCampInOwnerEmail(normalizedEmail)) {
      setAuthError("This email is not authorized for owner access.");
      return;
    }
    if (!supabase) {
      setAuthError("Owner access is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Netlify first.");
      return;
    }
    const { error } = await supabase.auth.signInWithOtp({
      email: normalizedEmail,
      options: { emailRedirectTo: window.location.origin + "/admin.html" },
    });
    if (error) setAuthError(error.message);
    else setAuthMessage("Check your owner email for the secure sign-in link.");
  };

  const signOut = async () => {
    await supabase?.auth.signOut();
    setStatus("signed-out");
  };

  if (status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-offwhite px-4 text-sm font-bold text-forest">
        Checking owner session…
      </div>
    );
  }

  if (status !== "owner") {
    return <OwnerSignIn error={authError} message={authMessage} onSubmit={requestSignIn} />;
  }

  return children(signOut);
}

function AdminNavbar({ onSignOut }: { onSignOut: () => Promise<void> }) {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Ops Center", icon: LayoutDashboard },
    { path: "/validation", label: "Validation Machine", icon: ClipboardCheck },
    { path: "/strategy", label: "Strategy Lab", icon: Lightbulb },
    { path: "/workspace", label: "Database Workspace", icon: LayoutDashboard },
  ];

  return (
    <header className="bg-stone-900 border-b border-stone-800 text-stone-100 sticky top-0 z-50 px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex min-w-0 flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
        {/* Brand / Title */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-orange-500 to-amber-600 text-white font-extrabold px-3 py-1 rounded text-sm tracking-wider uppercase">
              CampIn Ops
            </span>
          </Link>
          <span className="text-stone-500">|</span>
          <span className="text-xs text-stone-400 font-mono">Owner Operations Workspace</span>
        </div>

        {/* Navigation tabs */}
        <nav
          aria-label="Owner tools"
          className="flex w-full items-center gap-1 overflow-x-auto rounded-lg border border-stone-800 bg-stone-950 p-1 sm:w-auto"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex shrink-0 items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-amber-600/20 text-orange-400 border border-orange-500/30"
                    : "text-stone-400 hover:text-stone-200 hover:bg-stone-900 border border-transparent"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => void onSignOut()}
            className="flex items-center gap-1.5 text-xs text-stone-400 transition-colors hover:text-stone-200"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign out
          </button>
          <a
            href="/"
            className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Public site
          </a>
        </div>
      </div>
    </header>
  );
}

export default function AdminApp() {
  return (
    <Router>
      <OwnerAuthGate>
        {(signOut) => (
          <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans">
            <AdminNavbar onSignOut={signOut} />
            <main className="min-w-0 flex-1 overflow-x-hidden">
              <Suspense fallback={<div className="p-8 text-stone-300" role="status">Loading owner tools…</div>}><Routes>
                <Route path="/" element={<OpsCenter />} />
                <Route path="/validation" element={<ValidationMachine />} />
                <Route path="/strategy" element={<StrategyLab />} />
                <Route path="/workspace" element={<OwnerWorkspace />} />
              </Routes></Suspense>
            </main>
          </div>
        )}
      </OwnerAuthGate>
    </Router>
  );
}
