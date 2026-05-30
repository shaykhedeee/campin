# CampIn Free Tool Stack And Dashboard Plan

Created: 2026-05-20

CampIn should run as a free or near-free operating system until the validation gates prove demand. Paid tools are useful later, but the current goal is speed, clarity, and low burn.

## Principle

Use free tools for capture, coordination, dashboards, research, and newsletters. Upgrade only when a bottleneck is proven by volume, compliance need, or team workload.

## Recommended Free Stack

| Layer | Primary free tool | Backup | What it does now | Upgrade trigger |
|---|---|---|---|---|
| Forms | Tally | Google Forms | Camper, host, road-stop, and safety survey forms | Need custom domain, team collaboration, data retention controls, or advanced verification |
| Database | Airtable Free | Google Sheets | Research OS, host leads, road-stop leads, validation pipeline | Record limits, automation limits, multi-user process complexity |
| Docs/OS | Local Markdown + Notion Free | Google Drive | Playbooks, SOPs, strategy, meeting notes | Team permissions, advanced collaboration, knowledge base complexity |
| Newsletter | Brevo Free | Mailchimp/beehiiv free tier after review | The Campfire list, welcome sequence, weekly send | Daily send cap, branding, automation, segmentation, deliverability needs |
| Analytics | Google Search Console + GA4 | Plausible later | Search visibility and page behavior after website launch | Privacy-first paid analytics or advanced event analysis |
| Dashboards | CampIn local Ops Center + Airtable Interfaces | Looker Studio | Founder cockpit before public website | Real-time multi-user dashboards and API sync needs |
| Automation | Codex automations + local scripts | GitHub Actions later | Weekly intelligence, validation review, newsletter draft, QA | Need CI/CD, scheduled deploys, external APIs |
| File storage | Google Drive | Dropbox/OneDrive | Host photos, permission docs, route screenshots | Need app-integrated uploads and signed URLs |
| Community | WhatsApp Community | Discord/Telegram | High-trust pilot group and founder feedback | Need topic-based large community operations |

## Free Tool Setup Order

1. Tally forms: create camper, host, road-stop, and safety survey forms from `data/forms`.
2. Airtable base: create tables from `data/research/schemas` and `data/research/templates`.
3. Brevo list: create "The Campfire by CampIn" list and import only consented emails.
4. Google Drive folder: create folders for host photos, route proof, permission notes, newsletter assets.
5. Codex automations: already created for weekly intelligence, validation, host leads, SEO, newsletter, and UX QA.
6. CampIn Ops Center: use the local `/ops` page to track readiness and next actions.

## Dashboard Decisions

### 1. Founder Cockpit

Purpose: one screen to answer "What should I do today?"

Metrics:

- Email subscribers.
- High-intent camper leads.
- Host applications.
- Verified candidate sites.
- Manual booking attempts.
- Paid pilot stays.
- Open setup tasks.
- Top next actions.

Owner: founder.

Surface: local `/ops` and Airtable Interface later.

### 2. Validation Dashboard

Purpose: prove or disprove the business before booking-engine build.

Metrics:

- 90-day target progress.
- Lead type mix.
- High-intent lead rate.
- Safety concern frequency.
- Region demand.
- Host lead quality.
- Road-stop candidate quality.

Owner: founder/research operator.

Surface: local `/validation` now, Airtable later.

### 3. Supply Dashboard

Purpose: move hosts from rough lead to verified candidate.

Stages:

- New lead.
- Location pin received.
- Permission status reviewed.
- Amenity check.
- Founder call.
- Candidate site.
- Pilot ready.
- Paused/rejected.

Owner: host ops.

Surface: Airtable first, app later.

### 4. Content And SEO Dashboard

Purpose: convert research into answer-first pages and newsletters.

Metrics:

- Briefs planned.
- Briefs ready.
- Source-backed FAQs.
- Original CampIn insight included.
- Internal link coverage.
- Newsletter issue status.

Owner: content operator.

Surface: Airtable/Notion first, app later.

### 5. Trust And Safety Dashboard

Purpose: make trust operational, not decorative.

Metrics:

- Sites with permission status.
- Sites with washroom proof.
- Sites with water proof.
- Sites with exact pin/meeting point.
- Sites with emergency contact.
- Incidents/open concerns.

Owner: founder/trust operator.

Surface: Airtable first, app later.

## UI/UX System Enhancements

CampIn's app should separate three modes:

- Public discovery: beautiful, trust-led, camper-facing.
- Validation operations: dense, functional, founder-facing.
- Host operations: practical, checklist-led, supply-facing.

Rules:

- Use icons to make scanning faster, not to decorate.
- Avoid nested card-on-card layouts.
- Keep dashboard cards compact and grid-based.
- Make statuses explicit: Not started, Ready to connect, Live locally, Needs account, Needs review.
- Any future public listing must show what is CampIn-reviewed versus host-declared.

## What Is Already Implemented Locally

- Validation machine with camper, host, road-stop, and newsletter capture.
- Local lead storage and CSV export.
- 90-day validation target dashboard.
- Strategy Lab for Airbnb-learning marketplace playbook.
- Original CampIn icon renderer and icon inventory.
- Research collector scaffold.
- PDF extraction helper.
- Recurring Codex automations.

## What Cannot Be Fully Implemented Without Accounts

- Creating Tally forms inside the user's Tally account.
- Creating Airtable bases inside the user's Airtable workspace.
- Creating Brevo lists and API keys.
- Connecting Google Drive/Search Console/GA4.
- Sending actual newsletter campaigns.

For those, this repo now provides the schemas, fields, forms, checklists, and dashboards needed to connect the accounts cleanly.

## Source Notes

- Tally says most features are available free within fair-use guidelines and supports unlimited forms/submissions on the free path.
- Brevo says the Free plan is free forever with no credit card required, but features and options are limited.
- Airtable says the Free plan is available at no cost for lightweight teams and all users are free on the Free plan.
- Notion offers a Free plan, with education-specific Plus access for students/educators.

Verify pricing again before committing CampIn's operating stack to an external tool because SaaS free tiers change.

Sources:

- [Tally plans and pricing](https://tally.so/help/plans-and-pricing)
- [Brevo pricing plans](https://help.brevo.com/hc/en-us/articles/208589409-About-Brevo-s-pricing-plans)
- [Airtable pricing](https://airtable.com/pricing)
- [Notion pricing](https://www.notion.com/pricing)
