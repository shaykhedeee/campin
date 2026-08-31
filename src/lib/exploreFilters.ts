export const exploreCategories = [
  "bring-your-own-tent",
  "pre-pitched-glamping",
  "farms-estates",
  "mountains-forests",
  "waterside",
  "road-trip-stops",
] as const;

export type ExploreCategory = (typeof exploreCategories)[number];

export function parseExploreCategory(search: string): ExploreCategory | null {
  const category = new URLSearchParams(search).get("category");
  return exploreCategories.includes(category as ExploreCategory) ? (category as ExploreCategory) : null;
}

export function categoryHref(category: ExploreCategory) {
  return `/explore?category=${category}`;
}
