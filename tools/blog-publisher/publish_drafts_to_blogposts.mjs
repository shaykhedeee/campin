import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const draftsDir = path.join(root, "data", "blog", "drafts");
const outFile = path.join(root, "src", "data", "blogPosts.ts");

const imageBySlug = [
  [/bangalore|ramanagara|kanakapura|byot|own-tent|pitch-a-tent/i, "/images/blog_bangalore_hill.jpg"],
  [/coorg|coffee/i, "/images/blog_coorg_estate.jpg"],
  [/monsoon|rain|wayanad|western-ghats|chikmagalur|lightning|alert/i, "/images/blog_monsoon_ghats.jpg"],
  [/caravan|campervan|road-stop|parking|overnight|maharashtra/i, "/images/blog_campervan_stop.jpg"],
  [/legal|permission|pledge|responsible/i, "/images/blog_legal_verify.jpg"],
  [/family|kids/i, "/images/blog_family_safe.jpg"],
  [/solo|women/i, "/images/blog_solo_woman.jpg"],
  [/host|land|farm/i, "/images/blog_host_land.jpg"],
  [/glamping|style/i, "/images/blog_glamping_pitch.jpg"],
  [/desert|jaisalmer|northeast|overlanding/i, "/images/blog_ramanagara_stars.jpg"],
];

function readDrafts() {
  return fs
    .readdirSync(draftsDir)
    .filter((file) => file.endsWith(".md"))
    .sort()
    .map((file) => {
      const markdown = fs.readFileSync(path.join(draftsDir, file), "utf8");
      return parseDraft(file, markdown);
    });
}

function parseDraft(file, markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const title = stripMarkdown(lines.find((line) => line.startsWith("# "))?.replace(/^#\s+/, "") || titleFromFile(file));
  const slug = meta(markdown, "Slug") || file.replace(/^\d{4}-\d{2}-\d{2}-(morning|evening)-/, "").replace(/\.md$/, "");
  const primaryKeyword = meta(markdown, "Primary keyword") || title.toLowerCase();
  const secondaryKeywords = splitCsv(meta(markdown, "Secondary keywords"));
  const audience = meta(markdown, "Audience") || "Indian campers, road-trippers, outdoor hosts, and CampIn community readers.";
  const searchIntent = meta(markdown, "Search intent") || `Get a practical, permission-first answer about ${primaryKeyword}.`;
  const metaTitle = meta(markdown, "Meta title") || title.slice(0, 62);
  const metaDescription = meta(markdown, "Meta description") || summarize(firstParagraphAfter(markdown, "## Direct Answer") || firstBodyParagraph(markdown), 155);
  const directAnswer = summarize(firstParagraphAfter(markdown, "## Direct Answer") || firstBodyParagraph(markdown), 520);
  const sections = extractSections(markdown);
  const faqs = extractFaqs(markdown);
  const sources = extractSources(markdown);
  const cta = inferCta(markdown, slug);
  const summary = summarize(directAnswer || sections[0]?.body[0] || metaDescription, 260);
  const takeaways = buildTakeaways(sections, directAnswer);
  const wordCount = stripMarkdown(markdown).split(/\s+/).filter(Boolean).length;
  const publishedAt = dateFromFile(file);

  return {
    slug,
    title,
    metaTitle,
    metaDescription,
    publishedAt,
    updatedAt: publishedAt,
    category: inferCategory(slug, primaryKeyword),
    readTime: `${Math.max(5, Math.ceil(wordCount / 210))} min read`,
    primaryKeyword,
    secondaryKeywords,
    audience,
    searchIntent,
    summary,
    directAnswer,
    heroImage: inferImage(slug),
    takeaways,
    sections,
    campinAngle: inferCampInAngle(markdown, slug),
    cta,
    faqs,
    sources,
    schema: ["BlogPosting", ...(faqs.length ? ["FAQPage"] : []), "BreadcrumbList"],
    publishRecommendation: extractPublishRecommendation(markdown),
  };
}

function meta(markdown, key) {
  const match = markdown.match(new RegExp(`^${escapeRegExp(key)}:\\s*(.+)$`, "im"));
  return match ? stripMarkdown(match[1].trim()) : "";
}

function splitCsv(value) {
  if (!value) return [];
  return value
    .split(/,|;/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function extractSections(markdown) {
  const stop = /^(##\s+(CTA|FAQs|Sources|Schema|Publish|Publish-or-Hold|Social Angle|Suggested Title|Suggested Titles|CampIn Take)\b|#\s+)/i;
  const all = [];
  const headingRegex = /^(##|###)\s+(.+)$/gm;
  const matches = [...markdown.matchAll(headingRegex)];

  for (let index = 0; index < matches.length; index += 1) {
    const [, level, rawHeading] = matches[index];
    const start = matches[index].index + matches[index][0].length;
    const end = matches[index + 1]?.index ?? markdown.length;
    const heading = stripMarkdown(rawHeading.trim());
    const fullHeading = `${level} ${heading}`;

    if (/^(Direct Answer|FAQs|Sources|Schema|CTA|Publish|Publish-or-Hold|Social Angle|Suggested Title|Suggested Titles)$/i.test(heading)) {
      continue;
    }
    if (stop.test(fullHeading) && /^(CTA|FAQs|Sources|Schema|Publish|Publish-or-Hold|Social Angle|Suggested Title|Suggested Titles)$/i.test(heading)) {
      continue;
    }

    const body = markdown
      .slice(start, end)
      .split(/\n{2,}/)
      .map((block) => stripMarkdown(block.trim()))
      .filter((block) => block && !/^(Slug|Primary keyword|Secondary keywords|Search intent|Audience|Meta title|Meta description):/i.test(block))
      .filter((block) => !/^Q:/i.test(block) && !/^A:/i.test(block))
      .filter((block) => !/^[-*]\s+\[?https?:/i.test(block));

    if (body.length && !/^(Main Sections|CampIn Take)$/i.test(heading)) {
      all.push({ heading, body: body.slice(0, 5) });
    }
  }

  if (all.length) return all.slice(0, 8);

  return [
    {
      heading: "What to know",
      body: [summarize(firstBodyParagraph(markdown), 420)],
    },
  ];
}

function extractFaqs(markdown) {
  const faqStart = markdown.search(/^##\s+FAQs/im);
  if (faqStart === -1) return fallbackFaqs(markdown);
  const nextSection = markdown.slice(faqStart + 1).search(/\n##\s+/);
  const faqBlock = nextSection === -1 ? markdown.slice(faqStart) : markdown.slice(faqStart, faqStart + 1 + nextSection);

  const boldPairs = [...faqBlock.matchAll(/\*\*Q:\s*(.+?)\*\*\s*\n+\s*A:\s*([\s\S]*?)(?=\n+\*\*Q:|\n+##\s+|$)/gi)].map((match) => ({
    question: stripMarkdown(match[1]),
    answer: summarize(stripMarkdown(match[2]), 360),
  }));
  if (boldPairs.length) return boldPairs.slice(0, 5);

  const qPairs = [...faqBlock.matchAll(/(?:^|\n)Q:\s*(.+?)\n+\s*A:\s*([\s\S]*?)(?=\n+Q:|\n+##\s+|$)/gi)].map((match) => ({
    question: stripMarkdown(match[1]),
    answer: summarize(stripMarkdown(match[2]), 360),
  }));
  return qPairs.length ? qPairs.slice(0, 5) : fallbackFaqs(markdown);
}

function fallbackFaqs(markdown) {
  const topic = meta(markdown, "Primary keyword") || "this camping topic";
  return [
    {
      question: `What is CampIn's safest advice for ${topic}?`,
      answer: "Use permissioned, host-controlled places, verify washrooms and water before travel, and avoid treating scenic public or fragile land as an overnight campsite.",
    },
    {
      question: "Does this article prove a specific site is safe or legal?",
      answer: "No. It is a planning guide. Site-specific travel still needs current host confirmation, local rules, and live weather or access checks.",
    },
  ];
}

function extractSources(markdown) {
  const urls = new Map();
  for (const match of markdown.matchAll(/https?:\/\/[^\s)]+/g)) {
    const url = match[0].replace(/[.,;]+$/, "");
    const line = markdown.slice(0, match.index).split("\n").pop() || "";
    const label = stripMarkdown(line.replace(/^[-*]\s*/, "").replace(url, "").replace(/\s+-\s*$/, "").trim()) || new URL(url).hostname.replace(/^www\./, "");
    urls.set(url, { label: summarize(label, 120), url });
  }
  return [...urls.values()].slice(0, 8);
}

function extractPublishRecommendation(markdown) {
  const match = markdown.match(/##\s+(?:Publish|Publish-or-Hold|Publish or Hold)[^\n]*\n+([\s\S]*?)(?=\n##\s+|\n#\s+|$)/i);
  if (!match) return "Publish (recommended)";
  const body = normalizeText(match[1]).replace(/\s+/g, " ").trim();
  if (!body || /\bhold\b/i.test(body)) return "Publish (recommended)";
  if (/publish\s*\(recommended\)/i.test(body)) return "Publish (recommended)";
  return body.slice(0, 180);
}

function inferCta(markdown, slug) {
  const ctaBlock = firstParagraphAfter(markdown, "## CTA") || "";
  if (/host|land|farm/i.test(slug)) {
    return { label: "Apply as a host", href: "/host-your-land", text: summarize(ctaBlock || "Show CampIn your land, facilities, access notes, and guest rules so the team can review whether it fits the request-first camping network.", 220) };
  }
  if (/community|pledge|responsible|solo|safety|alert|monsoon/i.test(slug)) {
    return { label: "Join the community", href: "/community", text: summarize(ctaBlock || "Join CampIn's community to share routes, ask safety questions, and get guide drops before public booking features expand.", 220) };
  }
  return { label: "Get guide updates", href: "/camping-guides", text: summarize(ctaBlock || "Unlock CampIn's practical camping checklists and tell the team which route or region you want reviewed next.", 220) };
}

function inferCampInAngle(markdown, slug) {
  const block = firstParagraphAfter(markdown, "## CampIn Take") || firstParagraphAfter(markdown, "## CampIn Insight") || "";
  if (block) return summarize(block, 420);
  if (/host|land|farm/i.test(slug)) return "CampIn helps hosts turn land, facilities, access notes, and guest rules into a request-first outdoor stay that can be reviewed before guests are sent.";
  return "CampIn keeps camping discovery permission-first: clear host control, visible facilities, current access notes, and no unsupported promises about public land or unverified overnight use.";
}

function inferCategory(slug, keyword) {
  const text = `${slug} ${keyword}`;
  if (/host|land|farm|estate/i.test(text)) return "Host Education";
  if (/legal|permission|responsible|pledge/i.test(text)) return "Safe and Legal Camping";
  if (/road|caravan|campervan|overlanding|parking/i.test(text)) return "Road Stops";
  if (/bangalore|ramanagara|kanakapura/i.test(text)) return "Bangalore Camping";
  if (/monsoon|rain|lightning|heatwave|alert/i.test(text)) return "Seasonal Safety";
  if (/solo|family|women/i.test(text)) return "Safety Guides";
  if (/glamping|vs|comparison/i.test(text)) return "Comparisons";
  return "Camping Guides";
}

function inferImage(slug) {
  return imageBySlug.find(([pattern]) => pattern.test(slug))?.[1] || "/images/blog_ramanagara_stars.jpg";
}

function buildTakeaways(sections, directAnswer) {
  const items = sections
    .slice(0, 3)
    .map((section) => summarize(section.body[0] || section.heading, 150))
    .filter(Boolean);
  if (items.length >= 3) return items;
  return [
    summarize(directAnswer, 150),
    "Use permissioned, host-controlled land rather than informal public pins.",
    "Verify washrooms, water, road access, and current weather before travel.",
  ].filter(Boolean).slice(0, 3);
}

function firstParagraphAfter(markdown, heading) {
  const start = markdown.search(new RegExp(`^${escapeRegExp(heading)}\\s*$`, "im"));
  if (start === -1) return "";
  const after = markdown.slice(start + heading.length);
  const next = after.search(/\n##\s+/);
  const block = next === -1 ? after : after.slice(0, next);
  return stripMarkdown(block.split(/\n{2,}/).find((part) => stripMarkdown(part).length > 20) || "");
}

function firstBodyParagraph(markdown) {
  return stripMarkdown(
    markdown
      .split(/\n{2,}/)
      .find((part) => {
        const text = stripMarkdown(part);
        return text.length > 40 && !/^#|^Slug:|^Primary keyword:|^Meta title:/i.test(text);
      }) || ""
  );
}

function stripMarkdown(text) {
  return normalizeText(text)
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/[*_`>#]/g, "")
    .replace(/^\s*[-*]\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeText(text) {
  return String(text || "")
    .replace(/\u00e2\u20ac[\u0098\u0099]/g, "'")
    .replace(/\u00e2\u20ac[\u009c\u009d]/g, '"')
    .replace(/\u00e2\u20ac[\u0090-\u0095]/g, "-")
    .replace(/\u00e2\u20ac\u00a6/g, "...")
    .replace(/\u00e2\u0082\u00b9/g, "Rs ")
    .replace(/\u00c3\u00a9/g, "e")
    .replace(/â€™/g, "'")
    .replace(/â€˜/g, "'")
    .replace(/â€œ/g, '"')
    .replace(/â€/g, '"')
    .replace(/â€"/g, "-")
    .replace(/â€”/g, "-")
    .replace(/â€“/g, "-")
    .replace(/â€‘/g, "-")
    .replace(/â€¦/g, "...")
    .replace(/Â°/g, " degrees")
    .replace(/Â±/g, "+/-")
    .replace(/Â·/g, "-")
    .replace(/â‚¹/g, "Rs ")
    .replace(/ðŸ[^\s]*/g, "")
    .replace(/âœ“/g, "check")
    .replace(/â€¢/g, "-")
    .replace(/\/validation/g, "/community")
    .replace(/\/strategy/g, "/camping-guides")
    .replace(/founder-led/gi, "CampIn-led")
    .replace(/founder call/gi, "CampIn review call")
    .replace(/founder calls/gi, "CampIn review calls")
    .replace(/founder/gi, "CampIn team")
    .replace(/validation/gi, "review")
    .replace(/marketplace/gi, "request-first network")
    .replace(/premium/gi, "detailed");
}

function summarize(text, max) {
  const clean = stripMarkdown(text);
  if (clean.length <= max) return clean;
  const slice = clean.slice(0, max - 1);
  const end = Math.max(slice.lastIndexOf("."), slice.lastIndexOf(" "), max - 40);
  return `${slice.slice(0, end).trim()}...`;
}

function dateFromFile(file) {
  return file.match(/^(\d{4}-\d{2}-\d{2})/)?.[1] || new Date().toISOString().slice(0, 10);
}

function titleFromFile(file) {
  return file
    .replace(/^\d{4}-\d{2}-\d{2}-(morning|evening)-/, "")
    .replace(/\.md$/, "")
    .split("-")
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(" ");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const posts = readDrafts();
const body = `export interface BlogSource {
  label: string;
  url: string;
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogSection {
  heading: string;
  body: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  publishedAt: string;
  updatedAt: string;
  category: string;
  readTime: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  audience: string;
  searchIntent: string;
  summary: string;
  directAnswer: string;
  heroImage: string;
  takeaways: string[];
  sections: BlogSection[];
  campinAngle: string;
  cta: {
    label: string;
    href: string;
    text: string;
  };
  faqs: BlogFaq[];
  sources: BlogSource[];
  schema: string[];
  publishRecommendation?: string;
}

const publishedBlogPosts: BlogPost[] = ${JSON.stringify(posts, null, 2)};

function cleanJargon(text: string): string {
  if (!text) return text;
  return text
    .replace(/founder-call reviewed/gi, "team-reviewed")
    .replace(/founder call/gi, "CampIn review call")
    .replace(/founder calls/gi, "CampIn review calls")
    .replace(/founder support/gi, "CampIn support")
    .replace(/founding host/gi, "partner host")
    .replace(/founding hosts/gi, "partner hosts")
    .replace(/founders/gi, "CampIn team")
    .replace(/founder/gi, "CampIn team")
    .replace(/backend/gi, "review")
    .replace(/waitlist segment/gi, "community group")
    .replace(/original data competitors cannot copy/gi, "verified local outdoor database")
    .replace(/defensible product/gi, "trust-first outdoor guide")
    .replace(/booking competitor/gi, "booking platform")
    .replace(/booking marketplace/gi, "curated directory")
    .replace(/funnel/gi, "guide path")
    .replace(/validation/gi, "review")
    .replace(/lead magnet/gi, "free guide")
    .replace(/lead gen/gi, "community signup")
    .replace(/lead magnets/gi, "free guides")
    .replace(/exact coordinates/gi, "clear access notes")
    .replace(/internal lead-review data/gi, "CampIn's reviewed information")
    .replace(/internal research summary/gi, "CampIn's reviewed notes")
    .replace(/research leads/gi, "review candidates")
    .replace(/research lead/gi, "review candidate")
    .replace(/inside the workspace/gi, "in CampIn's reviewed notes")
    .replace(/data\\/forms flow \(internal\)/gi, "community suggestion form")
    .replace(/CampIn supply researchers/gi, "CampIn readers")
    .replace(/supply researchers/gi, "camping readers")
    .replace(/90-day proof gate/gi, "responsible opening")
    .replace(/90-day supply target/gi, "host community goal");
}

function cleanPost(post: BlogPost): BlogPost {
  return {
    ...post,
    title: cleanJargon(post.title),
    metaTitle: cleanJargon(post.metaTitle),
    metaDescription: cleanJargon(post.metaDescription),
    summary: cleanJargon(post.summary),
    directAnswer: cleanJargon(post.directAnswer),
    campinAngle: cleanJargon(post.campinAngle),
    cta: {
      ...post.cta,
      text: cleanJargon(post.cta.text),
    },
    takeaways: post.takeaways.map(cleanJargon),
    sections: post.sections.map((section) => ({
      ...section,
      heading: cleanJargon(section.heading),
      body: section.body.map(cleanJargon),
    })),
    faqs: post.faqs.map((faq) => ({
      question: cleanJargon(faq.question),
      answer: cleanJargon(faq.answer),
    })),
  };
}

export const blogPosts = publishedBlogPosts.map(cleanPost);

export const featuredBlogPosts = blogPosts.slice(0, 4);

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedBlogPosts(slug: string, limit = 3) {
  const current = getBlogPost(slug);
  if (!current) return blogPosts.slice(0, limit);

  const related = blogPosts
    .filter((post) => post.slug !== slug)
    .map((post) => ({
      post,
      score:
        (post.category === current.category ? 3 : 0) +
        post.secondaryKeywords.filter((keyword) => current.secondaryKeywords.includes(keyword)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .map((item) => item.post);

  return related.slice(0, limit);
}

export function getBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function saveBlogPosts(updatedBlogs: BlogPost[]) {
  console.info("Blog editor preview received", updatedBlogs.length, "posts. Public Journal content is statically published from data/blog/drafts.");
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("campin-blogs-updated"));
  }
}
`;

fs.writeFileSync(outFile, body, "utf8");
console.log(`Published ${posts.length} draft posts to ${path.relative(root, outFile)}`);
