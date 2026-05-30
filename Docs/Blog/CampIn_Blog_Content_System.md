# CampIn Blog Content System

Last updated: 2026-05-22

## Goal

CampIn's blog should become the most trusted answer layer for camping in India before CampIn becomes a full booking marketplace.

The blog is not a generic travel blog. It exists to:

- Capture search demand.
- Answer safety, permission, washroom, own-tent, road-stop, and host questions.
- Convert readers into waitlist, community, host, or road-stop leads.
- Build topical authority for campin.co.in.
- Produce original CampIn data from surveys, host calls, and verification work.

## Editorial Position

CampIn writes like a careful outdoor operator, not a deal aggregator.

Voice:

- Practical.
- Honest about unknowns.
- Region-specific.
- Safety-first.
- Permission-first.
- Human and useful.

Every article should tell readers what CampIn knows, what is still unverified, and what they should check before traveling.

## Blog Architecture

Primary URL:

`/blog`

Post URL:

`/blog/:slug`

Core clusters:

| Cluster | Purpose | Example Queries |
|---|---|---|
| Bangalore/South India | First validation wedge | camping near Bangalore, own tent camping near Bangalore |
| Safe/Legal Camping | Trust and AEO authority | is camping legal in India, safe camping in India |
| Own-Tent/BYOT | Differentiation | where can I pitch my tent in India, BYOT camping |
| Road Stops/Campervans | Moat | campervan road stops India, overnight parking India |
| Comparison | Commercial intent | CampMonk vs HireACamp vs Exoticamp, best camping app India |
| Host Education | Supply acquisition | host land for camping India, earn from farm camping |
| Seasonal | Timely traffic | monsoon camping Coorg, summer camping India |
| Beginner Safety | Conversion | family camping India, solo camping safety |

## Post Template

Each post must include:

- Title.
- Slug.
- Meta title under 60 characters where possible.
- Meta description under 160 characters where possible.
- Primary keyword.
- Secondary keywords.
- Search intent.
- Audience.
- Direct answer block.
- Why this matters now.
- Main sections.
- CampIn angle.
- CTA.
- FAQs.
- Sources.
- Schema recommendation.

## Schema Plan

Use:

- `BlogPosting` for every article.
- `BreadcrumbList` for blog pages.
- `FAQPage` only when FAQs are visible on the page.
- `Organization`/`WebSite` later at site level.

## Quality Bar

Do not publish an article if it:

- Makes legal claims without caution.
- Lists unsafe public camping spots as if they are permissioned.
- Copies competitor content.
- Uses fake reviews or fake verification.
- Recommends solo/family camping without safety filters.
- Has no CampIn-specific insight or CTA.

## Internal Links

Default internal links:

- `/coming-soon`
- `/community`
- `/validation`
- `/host-your-land`
- `/explore`

When legal pages are public, add:

- `/responsible-camping-pledge`
- `/verification-standard`
- `/cancellation-refund-policy`

## Publishing Cadence

Twice daily is aggressive. Use it only for publish-ready drafts, not low-quality posts.

Recommended cadence:

- 9:00 AM IST: one search-led practical guide.
- 5:00 PM IST: one comparison, seasonal, community, or host-side article.

Every automation run should create:

- One complete draft.
- Source notes.
- Suggested title alternatives.
- CTA.
- Internal links.
- Schema notes.
- A "publish or hold" recommendation.

Automation behavior:

- Morning workflow creates a search-led guide.
- Evening workflow creates a comparison, trend, seasonal, host, or community article.
- Drafts should be written to `data/blog/drafts`.
- Public auto-posting should wait until CampIn has deployment or CMS credentials connected.
- If a draft makes a safety, permission, price, competitor, or legal claim that is not sourced, it must be marked hold.

## First 10 Articles

The first 10 articles are implemented in `src/data/blogPosts.ts` and surfaced at `/blog`.

They target:

1. Own-tent camping near Bangalore.
2. Legal and permission-first camping in India.
3. Bangalore region comparison.
4. Monsoon camping in Coorg, Wayanad, Chikmagalur.
5. Campervan and road-stop infrastructure.
6. CampMonk vs HireACamp vs Exoticamp vs CampIn.
7. Family camping safety.
8. Own tent vs hosted tent vs glamping.
9. Solo and women traveler safety.
10. Landowner host guide.
