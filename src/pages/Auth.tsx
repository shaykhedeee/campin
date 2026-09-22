import { useEffect, useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { supabase } from "../lib/adminAuth";
import { useAuth } from "../lib/auth";

import { safeReturnPath } from "../lib/authReturn";

export default function Auth() {
  const { user } = useAuth(); const location = useLocation(); const navigate = useNavigate();
  const next = safeReturnPath(new URLSearchParams(location.search).get("next"));
  const [email, setEmail] = useState(""); const [code, setCode] = useState(""); const [sent, setSent] = useState(false); const [message, setMessage] = useState(""); const [busy, setBusy] = useState(false);
  useEffect(() => { if(user) navigate(next, {replace:true}); }, [user,next,navigate]);
  const requestCode = async (event: FormEvent) => {
    event.preventDefault(); if (!supabase) return setMessage("Sign-in is being connected. Please try again shortly.");
    setBusy(true); setMessage("");
    try { const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
    setBusy(false); setSent(!error); setMessage(error ? error.message : "We sent a six-digit code to your email."); } catch { setMessage("Could not reach sign-in. Please retry."); } finally {setBusy(false);}
  };
  const verifyCode = async (event: FormEvent) => {
    event.preventDefault(); if (!supabase) return;
    setBusy(true); try { const { error } = await supabase.auth.verifyOtp({ email, token: code, type: "email" });
    setBusy(false); setMessage(error ? error.message : "Signed in. Redirecting…");
    if (!error) navigate(next, { replace: true }); } catch {setMessage("Could not verify your code. Please retry.");} finally {setBusy(false);}
  };
  return <main className="min-h-screen bg-offwhite px-4 pt-28 pb-16"><section className="mx-auto max-w-md rounded-3xl bg-white p-7 shadow-xl sm:p-9"><h1 className="text-3xl font-extrabold text-forest">{sent ? "Enter your email code" : "Sign in to Campin"}</h1><p className="mt-2 text-sm leading-6 text-textgrey">{sent ? `Enter the six-digit code sent to ${email}.` : "Use your email for a simple, password-free sign in."}</p>{!sent ? <form onSubmit={requestCode} className="mt-7 space-y-4"><label className="block text-sm font-bold text-forest">Email<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-forest/15 bg-offwhite px-3 font-medium outline-none focus:border-orange"/></label><button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-forest px-4 py-3 font-bold text-white hover:bg-forest-light disabled:opacity-60">{busy ? "Sending…" : "Email me a code"}<ArrowRight size={18}/></button></form> : <form onSubmit={verifyCode} className="mt-7 space-y-4"><label className="block text-sm font-bold text-forest">Six-digit code<input required inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} value={code} onChange={e=>setCode(e.target.value.replace(/\D/g, ""))} className="mt-2 h-12 w-full rounded-xl border border-forest/15 bg-offwhite px-3 text-center text-lg font-bold tracking-[0.35em] outline-none focus:border-orange"/></label><button disabled={busy || code.length !== 6} className="flex w-full items-center justify-center gap-2 rounded-xl bg-forest px-4 py-3 font-bold text-white hover:bg-forest-light disabled:opacity-60">{busy ? "Checking…" : "Continue"}<ArrowRight size={18}/></button><button type="button" onClick={()=>setSent(false)} className="w-full text-sm font-bold text-orange">Use a different email</button></form>}{message && <p role="status" className="mt-4 text-sm font-semibold text-forest">{message}</p>}<Link to="/waitlist" className="mt-6 block text-center text-sm text-textgrey underline">Not ready to sign in? Join the waitlist.</Link></section></main>;
}
