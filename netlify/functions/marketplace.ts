export type SupabaseConfig = { url: string; serviceRoleKey: string };

export function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && serviceRoleKey ? { url: url.replace(/\/$/, ""), serviceRoleKey } : null;
}

export async function authenticatedUserId(config: SupabaseConfig, request: Request) {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return null;
  const response = await fetch(`${config.url}/auth/v1/user`, {
    headers: { Authorization: `Bearer ${token}`, apikey: config.serviceRoleKey },
  });
  if (!response.ok) return null;
  const user = (await response.json()) as { id?: string };
  return typeof user.id === "string" ? user.id : null;
}

export function supabaseRequest(config: SupabaseConfig, path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("apikey", config.serviceRoleKey);
  headers.set("Authorization", `Bearer ${config.serviceRoleKey}`);
  if (init.body) headers.set("Content-Type", "application/json");
  return fetch(`${config.url}${path}`, { ...init, headers });
}

export function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

export function oneLine(value: string | null | undefined) {
  return value?.replace(/[\r\n\t]+/g, " ").trim() || "";
}
