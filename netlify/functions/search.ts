import { getSupabaseConfig, json, supabaseRequest } from "../lib/marketplace";

/** Public, server-owned campsite search. Only published inventory is queried. */
export default async function search(request: Request): Promise<Response> {
  if (request.method !== "GET") return json({ error: "method_not_allowed" }, 405);
  const config = getSupabaseConfig();
  if (!config) return json({ error: "service_not_configured" }, 503);

  const url = new URL(request.url);
  const query = (url.searchParams.get("q") || "").trim().slice(0, 100);
  const state = (url.searchParams.get("state") || "").trim().slice(0, 80);
  const type = (url.searchParams.get("type") || "").trim().slice(0, 80);
  const aliases = new Map([["bangalore", "bengaluru"], ["bengaluru", "bangalore"], ["coorg", "kodagu"], ["kodagu", "coorg"]]);
  const terms = [query.toLowerCase(), aliases.get(query.toLowerCase())].filter(Boolean);
  const filters = ["is_published=eq.true", "select=id,slug,title,listing_type,price_from_inr,price_unit,max_guests,essentials,properties(name,region,state)"];
  if (state) filters.push(`properties.state=ilike.*${encodeURIComponent(state)}*`);
  if (type) filters.push(`listing_type=eq.${encodeURIComponent(type)}`);
  if (terms.length) {
    const or = terms.flatMap((term) => [`title.ilike.*${term}*`, `properties.region.ilike.*${term}*`, `properties.state.ilike.*${term}*`]);
    filters.push(`or=(${or.map(encodeURIComponent).join(",")})`);
  }
  const response = await supabaseRequest(config, `/rest/v1/listings?${filters.join("&")}`);
  if (!response.ok) return json({ error: "search_unavailable" }, 502);
  const campsites = await response.json();
  const destinations = Array.from(new Map((campsites as Array<{ properties?: { region?: string; state?: string } }>).flatMap((item) => {
    const location = item.properties;
    return location?.region ? [[`${location.region}|${location.state || ""}`, { name: location.region, state: location.state || "" }]] : [];
  })).values());
  return json({ campsites, destinations, query });
}
