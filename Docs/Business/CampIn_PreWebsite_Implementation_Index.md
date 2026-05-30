# CampIn Pre-Website Implementation Index

Last updated: 2026-05-20

## Purpose

This folder turns the CampIn strategy into a working pre-website business system. It is designed for the phase before building a booking engine or expanding the website: validate demand, map the market, capture leads, build trust assets, and prepare SEO/AEO/GEO pages with real evidence.

CampIn positioning:

India's outdoors, verified.

Master tagline:

Stay. Explore. CampIn.

First validation wedge:

Bangalore and South India: Bangalore, Coorg, Wayanad, Chikmagalur, Ramanagara, Kanakapura, and Bangalore-Coorg-Wayanad road trips.

## Files Created For This Phase

Business operating docs:

| File | Use |
|---|---|
| `Docs/Business/CampIn_Research_OS.md` | Research database, collector workflow, compliance rules, source taxonomy |
| `Docs/Business/CampIn_Validation_Machine.md` | Waitlist, host, road-stop forms, 90-day targets, CRM stages |
| `Docs/Business/CampIn_SEO_AEO_GEO_Briefs.md` | Page clusters and content briefs before website build |
| `Docs/Business/CampIn_User_Flows_Testing.md` | Camper, host, road-stop flows and 5+5 usability testing scripts |
| `Docs/Business/CampIn_Newsletter_System.md` | "The Campfire by CampIn" weekly newsletter system |
| `Docs/Business/CampIn_Asset_Copy_Bank.md` | Founder story, CTAs, form copy, outreach, partner one-pagers |
| `Docs/Business/CampIn_Compliance_And_Data_Ethics.md` | Data boundaries for Reddit, Google/search, forums, and outreach |
| `Docs/Business/CampIn_90_Day_Execution_Sprint.md` | Week-by-week execution rhythm and keep/pivot/stop rules |
| `Docs/Business/CampIn_Airbnb_Strategy_Teardown.md` | Marketplace strategy lessons adapted into CampIn-original operating rules |
| `Docs/Business/CampIn_Agentic_Workflows.md` | Recurring automation cadence for intelligence, validation, SEO, newsletter, and QA |
| `Docs/Business/CampIn_Free_Tool_Stack_And_Dashboards.md` | Free-tool stack, dashboard decisions, and setup sequence |
| `Docs/Business/CampIn_Community_Platform_And_Growth_OS.md` | Platform decision, WhatsApp community architecture, community metrics, and free growth loops |
| `Docs/Business/CampIn_Website_Information_Architecture.md` | Website sitemap, page flow, components, data model, legal pages, and launch checklist for campin.co.in |
| `Docs/Business/CampIn_Research_Grounding_2026_05_21.md` | Current source-backed market, community, competitor, Airbnb, and compliance grounding |
| `Docs/Business/CampIn_Stack_And_Business_Model_Decision.md` | Database/auth/stack recommendation, business model, potential, and stack phasing |
| `Docs/Business/CampIn_Outreach_Operating_System.md` | Daily outreach workflow, allowed sources, lead scoring, scripts, and compliance boundaries |

Legal and trust documents:

| File | Use |
|---|---|
| `Docs/Legal/CampIn_Legal_Document_System.md` | Legal page map, compliance principles, risk register, and review gates |
| `Docs/Legal/Terms_Of_Service.md` | Draft terms for website, community, hosts, and manual pilots |
| `Docs/Legal/Privacy_Notice.md` | Draft privacy notice for waitlist, host, road-stop, newsletter, WhatsApp, and research data |
| `Docs/Legal/Cancellation_And_Refund_Policy.md` | Draft cancellation/refund policy for manual paid pilots |
| `Docs/Legal/Community_Guidelines.md` | Draft rules for WhatsApp/community moderation |
| `Docs/Legal/Responsible_Camping_Pledge.md` | Camper behavior pledge for community and pilots |
| `Docs/Legal/Host_Agreement_Draft.md` | Founding host responsibilities and verification obligations |
| `Docs/Legal/Verification_Standard.md` | Meaning of CampIn Reviewed, Road Stop Standard, host-declared, and pilot-ready labels |
| `Docs/Legal/Grievance_Redressal_And_Support.md` | Support categories, response targets, severity levels, and complaint process |

Design and dashboard docs:

| File | Use |
|---|---|
| `Docs/Design/CampIn_Airbnb_Learning_UX_System.md` | User flows, trust hierarchy, and component system inspired by marketplace best practices |
| `Docs/Design/CampIn_Iconography_System.md` | Original CampIn icon system and usage rules |
| `Docs/Design/CampIn_Dashboard_UX_System.md` | Dashboard family, statuses, mobile rules, and founder cockpit structure |

Operational data and templates:

| Path | Use |
|---|---|
| `data/research/schemas/research_os_fields.csv` | Airtable/Notion schema for the CampIn Research OS |
| `data/research/templates/research_insights_seed.csv` | Seed insights from the current research pass |
| `data/research/templates/camper_waitlist_template.csv` | Importable waitlist CRM fields |
| `data/research/templates/host_leads_template.csv` | Importable host pipeline fields |
| `data/research/templates/road_stop_leads_template.csv` | Importable road-stop pipeline fields |
| `data/research/templates/content_brief_tracker.csv` | SEO/AEO/GEO production tracker |
| `data/forms/*.json` | No-code form build specs for Tally/Typeform |
| `data/newsletter/*.md` | Newsletter template and welcome sequence |
| `data/validation/*.csv` | Scoreboard, manual pilot, and user-test logs |
| `data/ops/*.json` and `data/ops/*.csv` | Free-tool stack, dashboard blueprint, and setup checklist |
| `data/community/platform_decision_matrix.json` | Community platform ranking and WhatsApp launch groups |
| `data/website/site_map_and_content_model.json` | Public sitemap, navigation, page intents, and content models |
| `data/ops/campin_business_metrics.json` | Expanded business metrics across community, supply quality, trust, SEO, and liquidity |
| `data/outreach/outreach_stack.json` | Outreach tool stack, daily targets, segments, and lead fields |
| `data/outreach/daily_outreach_template.csv` | Importable Airtable/Sheets template for daily outreach research |

Tools:

| Path | Use |
|---|---|
| `tools/research-collector/collector.mjs` | Compliant research collector and classifier |
| `tools/research-collector/queries.json` | Initial query set for Bangalore/South India validation |
| `tools/research-collector/fixtures/sample_results.json` | Safe fixture data for dry-run testing |
| `tools/pdf-extract/extract_pdf_text.py` | Optional PDF text extraction helper for image/text PDF briefs |

Brand assets:

| Path | Use |
|---|---|
| `brand/campin-icon-monochrome.svg` | Single-color icon for documents and stamps |
| `brand/campin-social-avatar.svg` | Instagram/WhatsApp profile asset |
| `brand/campin-reviewed-badge.svg` | Trust badge for reviewed listings |
| `brand/founding-host-badge.svg` | Badge for first host partners |
| `brand/road-stop-standard-badge.svg` | Badge for verified road-stop candidates |
| `brand/icons/campin-outdoor-icons.svg` | Original CampIn outdoor icon sprite |
| `brand/README.md` | Logo and badge usage rules |

Local app surfaces:

| Route | Use |
|---|---|
| `/validation` | Lead capture forms and 90-day validation target dashboard |
| `/strategy` | Airbnb-learning strategy lab, user flows, trust stack, and icon system |
| `/ops` | Founder cockpit for free-tool setup, dashboards, automations, and next actions |
| `/coming-soon` | Public early-access capture page for campers, hosts, road stops, and newsletter |
| `/community` | WhatsApp-first community page with group structure, rules, rituals, and join flow |

## How To Use This System Weekly

Monday:
- Review the 90-day scoreboard in `CampIn_Validation_Machine.md`.
- Update waitlist, host leads, road-stop leads, and research insight counts.
- Pick 10 new queries from `tools/research-collector/queries.json`.

Tuesday to Thursday:
- Run compliant research collection or manual source logging.
- Add qualified hosts and road-stop leads into the CRM.
- Send founder-led outreach to 15 to 20 prospects.
- Tag every insight by persona, pain point, location, and next action.

Friday:
- Draft one "The Campfire by CampIn" issue.
- Convert the week's best insight into one SEO/AEO/GEO brief or social post.
- Review replies, objections, and trust gaps.

Sunday:
- Decide next week's experiment: more host outreach, more camper demand, road-stop discovery, or content validation.

## 90-Day Gate

Do not build a full booking engine until these are true:

| Signal | Target |
|---|---:|
| Email subscribers | 500 |
| High-intent camper leads | 100 |
| Host applications | 30 |
| Verified candidate sites | 10 |
| Manual booking attempts | 3 |
| Successful paid pilot stay | 1 |

## Default Stack

Forms:

Tally first; Google Forms as backup.

Database:

Airtable Free first; Google Sheets as backup; Notion optional for narrative research notes.

Email:

Brevo Free first; Mailchimp or beehiiv only if the newsletter workflow demands it.

Automation:

Codex automations are live locally. Add Make, Zapier, or native Tally/Airtable/Brevo integrations only after accounts exist and form volume justifies it.

Research:

Use official APIs, approved search APIs, permitted public pages, and manual logging. Do not scrape private data, do not bypass access controls, and do not mass-message Reddit users.
