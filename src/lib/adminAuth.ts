import { createClient } from "@supabase/supabase-js";

const url = (import.meta.env.VITE_SUPABASE_URL as string | undefined) || "https://qhtsapsomxexbnpdmcmc.supabase.co";
const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) || "sb_publishable_CGMN2qwandFkWLeM7S_bLA_jqOwmlT9";

export const supabase = url && anonKey ? createClient(url, anonKey) : null;
export const adminEmail = "support@campin.co.in";

export function isCampInOwnerEmail(email: string | null | undefined) {
  return email?.trim().toLowerCase() === adminEmail;
}
