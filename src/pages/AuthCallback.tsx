import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/adminAuth";
export default function AuthCallback() { const location = useLocation(); const navigate = useNavigate(); useEffect(()=>{ const params=new URLSearchParams(location.search); const code=params.get("code"); const next=params.get("next") || "/account"; if (code && supabase) void supabase.auth.exchangeCodeForSession(code).finally(()=>navigate(next,{replace:true})); else navigate(next,{replace:true}); },[location.search,navigate]); return <main className="min-h-screen bg-offwhite pt-36 text-center text-forest"><p className="font-bold">Completing your sign-in…</p></main>; }
