import { createClient } from "@supabase/supabase-js";

// Netlify injects these public browser settings at build time. Do not add
// fallback credentials here: Netlify correctly blocks source files that
// embed environment values, even when they are publishable client values.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase = url && anonKey ? createClient(url, anonKey) : null;
export const adminEmail = "support@campin.co.in";

export function isCampInOwnerEmail(email: string | null | undefined) {
  return email?.trim().toLowerCase() === adminEmail;
}
