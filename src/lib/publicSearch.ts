import { blogPosts } from "../data/blogPosts";
import { campingGuides } from "../data/campingGuides";
import { normalizePlace } from "./catalogue";

export type PublicSearchResult = { title: string; description: string; href: string; kind: "Guide" | "Article" | "Help" };

const helpPages: PublicSearchResult[] = [
  { title: "About Campin", description: "How Campin helps campers find a stay and contact its operator.", href: "/about", kind: "Help" },
  { title: "List your campsite", description: "How campsite operators can receive camper enquiries.", href: "/host-your-land", kind: "Help" },
  { title: "Contact and help", description: "Get support with campsite enquiries and Campin accounts.", href: "/support", kind: "Help" },
  { title: "Suggest a campsite", description: "Recommend a place for Campin to review.", href: "/suggest-campsite", kind: "Help" },
];

export function searchPublicResources(query: string): PublicSearchResult[] {
  const terms = normalizePlace(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  const candidates: Array<{ result: PublicSearchResult; searchable: string }> = [
    ...campingGuides.map(guide => ({
      result: { title: guide.title, description: guide.subtitle || guide.preview, href: `/camping-guides/${guide.slug}`, kind: "Guide" as const },
      searchable: [guide.title, guide.subtitle, guide.region, guide.primaryKeyword, guide.preview, ...guide.safetyNotes].join(" "),
    })),
    ...blogPosts.map(post => ({
      result: { title: post.title, description: post.metaDescription || post.summary, href: `/blog/${post.slug}`, kind: "Article" as const },
      searchable: [post.title, post.category, post.primaryKeyword, ...post.secondaryKeywords, post.summary, post.directAnswer].join(" "),
    })),
    ...helpPages.map(result => ({ result, searchable: `${result.title} ${result.description}` })),
  ];
  return candidates.filter(({ searchable }) => {
    const text = normalizePlace(searchable);
    return terms.every(term => text.includes(term));
  }).slice(0, 10).map(({ result }) => result);
}
