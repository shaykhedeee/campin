# CampIn Research OS

Stack lock update, 2026-05-26: Research OS will move from Airtable-style planning into Supabase Postgres tables backed by Drizzle schema. The canonical tables are `research_sources`, `research_leads`, `trust_claims`, `evidence_artifacts`, `guide_pages`, `listings`, and `compliance_events`. Airtable can still be used as a temporary founder-facing view, but Postgres is the source of truth.

## Goal

Build the operating memory of CampIn before building the website. The Research OS should answer four questions every week:

1. What are campers in India already trying to do?
2. What makes them hesitate?
3. Which places, routes, and host types are repeatedly requested?
4. Which insights should become SEO pages, newsletter sections, host outreach, or validation experiments?

## Core Insight From Current Research

Indian camping demand is not blocked by lack of interest. It is blocked by trust, permission, safety, hygiene, discovery, and uncertainty.

The repeated pattern from Reddit and forum research:

- People want quiet DIY camping and own-tent camping.
- They are willing to pay for permission, safety, and washroom access.
- They distrust spammy campsite ads and generic trip organizers.
- They worry about local interference, unclear land ownership, police/forest rules, and women/family safety.
- They want location-specific answers, not generic "best camping spots" lists.
- Road travelers want overnight parking with water, toilet, power, food, and a local human who knows they are there.

This makes CampIn's wedge stronger:

CampIn should become the permissioned, verified, India-first camping layer.

## Research Bases

Create these Airtable tables.

### 1. Source Insights

Purpose: Store every useful public insight from Reddit, forums, search, competitor pages, comments, and manual interviews.

Primary fields:

| Field | Type | Notes |
|---|---|---|
| Insight ID | Autonumber/text | Example: INS-0001 |
| Date Added | Date | When CampIn logged it |
| Source Type | Single select | Reddit, Forum, Google/Search API, Competitor, Blog, Interview, Social, Official |
| Source Name | Text | r/bangalore, Team-BHP, Google, CampMonk, etc. |
| URL | URL | Original source |
| Query | Text | Search query or interview prompt |
| Location | Multiple select | Bangalore, Coorg, Wayanad, Mumbai, etc. |
| Persona | Single select | First-time Camper, Own-Gear Camper, Road Traveler, Host, Family, Solo Woman, Trekker |
| Pain Point | Multiple select | Safety, Permission, Washroom, Price, Crowd, Discovery, Legality, Gear, Road Stop |
| Demand Signal | Single select | Weak, Medium, Strong |
| Evidence Summary | Long text | Short paraphrase, not copied private data |
| Safety/Legal Concern | Long text | Permission, protected area, night safety, etc. |
| Competitor Mention | Text | CampMonk, HireACamp, Exoticamp, Thrillophilia, etc. |
| Lead Type | Single select | Camper Demand, Host Lead, Road Stop Lead, Content Idea, Policy Note, Competitor Note |
| Confidence | Single select | Low, Medium, High |
| Next Action | Single select | Add to Brief, Contact Host, Add to FAQ, Validate in Survey, Ignore, Watch |
| Owner | Person/text | Founder by default |
| Status | Single select | New, Reviewed, Converted, Archived |

### 2. Camper Demand

Purpose: Convert raw insights into user segments and waitlist hypotheses.

Fields:

| Field | Type |
|---|---|
| Demand ID | Text |
| Persona | Single select |
| City | Single select |
| Desired Camping Type | Multiple select |
| Own Gear | Checkbox |
| Willing To Pay For | Multiple select |
| Top Concern | Single select |
| Source Insight Links | Linked records |
| Survey Question To Ask | Long text |
| Landing Page Angle | Long text |
| Priority | Single select |

### 3. Host Leads

Purpose: Build the first 100 supply prospects.

Fields:

| Field | Type |
|---|---|
| Host ID | Text |
| Host/Property Name | Text |
| Region | Single select |
| Property Type | Single select |
| Public URL | URL |
| Contact Channel | Single select |
| Phone/Email/Public Contact | Text |
| Exact Pin Available | Checkbox |
| Washroom | Single select |
| Water | Single select |
| Electricity | Single select |
| Parking | Single select |
| Photos Found | Checkbox |
| Permission Confidence | Single select |
| Fit Score | Number 1-5 |
| Outreach Stage | Single select |
| Last Contacted | Date |
| Next Action | Text |

### 4. Road Stop Leads

Purpose: Build route-level infrastructure data.

Fields:

| Field | Type |
|---|---|
| Stop ID | Text |
| Route | Single select |
| Stop Name | Text |
| Stop Type | Single select |
| Location | Text |
| Distance From Main Route | Number |
| Overnight Parking | Single select |
| Washroom | Single select |
| Water | Single select |
| Power | Single select |
| Food | Single select |
| Lighting | Single select |
| Safety Confidence | Single select |
| Vehicle Suitability | Multiple select |
| Public Contact | Text |
| Road Stop Tier | Single select |
| Verification Stage | Single select |
| Notes | Long text |

### 5. Content Briefs

Purpose: Convert demand into SEO/AEO/GEO assets.

Fields:

| Field | Type |
|---|---|
| Brief ID | Text |
| Page Cluster | Single select |
| Target Query | Text |
| Search Intent | Single select |
| Primary Persona | Single select |
| Direct Answer | Long text |
| FAQs | Long text |
| Original CampIn Data Needed | Long text |
| Local Safety Notes | Long text |
| Schema Plan | Multiple select |
| Status | Single select |
| Priority | Single select |

## Source Rules

Allowed:

- Official APIs and documented endpoints.
- Search APIs or approved SERP providers with a paid/allowed account.
- Public pages that allow crawling and do not require login.
- Manual logging from public posts, using short summaries and URLs.
- Competitor pages and official government/tourism policy pages.
- Public business contacts for host/partnership outreach.

Not allowed:

- Scraping Reddit user profiles for personal outreach.
- Mass DMing Reddit users.
- Bypassing login walls, paywalls, anti-bot systems, or rate limits.
- Copying large blocks of forum/reddit content into CampIn docs.
- Collecting personal phone/email from individuals unless publicly shared by the business itself or submitted through CampIn forms.
- Selling, publishing, or exposing raw Reddit/forum data.

## Research Taxonomy

Personas:

- First-time urban camper
- Own-gear hobby camper
- Family camper
- Solo woman traveler
- Road traveler
- Biker/overlander
- Trekker add-on camper
- Private-land host
- Road-stop host

Pain points:

- Safety
- Permission
- Washroom
- Water
- Local interference
- Crowd/noise
- Spammy organizers
- Gear uncertainty
- Weather
- Wildlife/protected land
- Price transparency
- Road access
- Mobile signal

Demand signals:

- Weak: One-off curiosity, low intent, no willingness to travel/pay.
- Medium: Asks for specific places, route, budget, or safety details.
- Strong: Owns gear, wants permissioned site, willing to pay, asks for contact or washroom/safety access.

## Weekly Research Queries

Use `tools/research-collector/queries.json` as the first query list.

Core query themes:

- "camping near Bangalore safe own tent"
- "camping Coorg own tent washroom"
- "where can I pitch a tent in India"
- "camping in India legal forest beach river bank"
- "Bangalore Coorg road trip overnight parking"
- "campervan stops India washroom water electricity"
- "farm camping Karnataka private land"
- "safe camping for women India"

## Research Output Rules

Each insight must create one of these outputs:

- Add a new FAQ answer.
- Add a content brief point.
- Add a host lead.
- Add a road-stop lead.
- Add a survey question.
- Add a trust/safety rule.
- Archive as noise.

If an insight does not create a next action, do not store it forever.

## Scoring Model

Camper demand score:

| Signal | Points |
|---|---:|
| Wants specific city/route | 2 |
| Owns gear or asks for BYOT | 2 |
| Mentions safety/permission | 2 |
| Willing to pay | 2 |
| Needs washroom/water/parking | 1 |
| Recent post/comment under 12 months | 1 |

Host fit score:

| Signal | Points |
|---|---:|
| Private land or hosted property | 2 |
| Washroom and water | 2 |
| Parking/road access | 1 |
| Strong photos/public proof | 1 |
| Public contact available | 1 |
| Close to priority route/city | 2 |
| Permission likely clean | 1 |

Road-stop score:

| Signal | Points |
|---|---:|
| Overnight parking allowed | 3 |
| Washroom | 2 |
| Water | 1 |
| Electricity/charging | 1 |
| Lighting/security | 2 |
| Food nearby | 1 |
| Route relevance | 2 |

Priority:

- 8+ points: Act this week.
- 5-7 points: Keep and review.
- Under 5 points: Archive unless strategically important.
