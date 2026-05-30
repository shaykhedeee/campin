# CampIn Locked Stack And System Blueprint

Last updated: 2026-05-26

## Operating Principle

CampIn should become a self-improving research and request marketplace before it becomes instant booking. The system can discover, enrich, score, dedupe, and draft actions. It must not publish verified claims, expose host contact, send outreach, or confirm availability without evidence and founder-approved policy.

## Core Modules

### Research OS

Purpose: discover public leads, extract source claims, score fit, cluster duplicates, and flag missing proof.

Tables:

- `research_sources`
- `research_leads`
- `trust_claims`
- `evidence_artifacts`
- `compliance_events`

First workflows:

- Import `data/research/outputs/normalized_candidate_leads.json`.
- Extract claims for BYOT, overnight parking, washroom, water, electricity, contact, campervan suitability.
- Score every lead and assign missing-proof blockers.
- Send publishable records to guide/listing draft queues, not directly to production.

### Trust Ledger

Purpose: store every listing claim as source-backed evidence.

Minimum claim shape:

- `claim_type`
- `claim_value`
- `source_url`
- `confidence`
- `verification_stage`
- `last_checked_at`
- `evidence_artifact`

Rule: no verified badge without reviewed evidence and timestamp.

### Host CRM

Purpose: manage host/property onboarding, contact policy, documents, rules, and response SLA.

Tables:

- `hosts`
- `properties`
- `evidence_artifacts`
- `compliance_events`

First host states:

- `lead`
- `reviewed`
- `date_confirmed`
- `calendar_synced`

### Listing Engine

Purpose: turn research and host data into public discovery pages.

State machine:

`community_suggested -> lead -> reviewed -> date_confirmed -> calendar_synced`

Rules:

- `community_suggested`: guide/demand capture only.
- `lead`: request interest allowed, no booking claim.
- `reviewed`: CampIn has checked public/host evidence.
- `date_confirmed`: host confirmed a specific request/date.
- `calendar_synced`: inventory is synced and can support stronger availability UX.

### Inquiry/Relay

Purpose: camper submits dates, guest count, vehicle type, own-tent flag, essentials, and notes.

Flow:

1. Camper submits inquiry.
2. Ops reviews trust state.
3. CampIn relays to host only if contact policy allows.
4. Host accepts/declines.
5. Camper confirms.

### Booking

Purpose: convert host-accepted inquiries into payment and confirmation.

Phase 1:

- Razorpay Payment Links.
- Manual confirmation.
- No instant refund automation until policies and host accounting are stable.

Phase 2:

- Razorpay checkout.
- Automated webhooks.
- Cancellation/refund workflow.

### Availability

Purpose: avoid fake availability.

Phase 1:

- Manual blocks and request-to-book.

Phase 2:

- iCal import/export.

Phase 3:

- Inventory-level calendar sync.

### Guides/SEO

Purpose: capture demand where listings are not ready.

Rules:

- Guides can rank for regions and routes.
- Guides must show research/permission status.
- Guides must not use booking CTAs unless at least one linked listing is date-confirmed or better.

### Ops Dashboard

Purpose: show stale records, verification queue, host SLA, failed payments, pending inquiries, and missing-proof blockers.

First dashboard metrics:

- New research leads.
- Duplicate clusters.
- Publishable drafts.
- Missing-proof blockers.
- Stale records by age.
- Host response target misses.
- Pending inquiries.
- Payment-link failures.

### Safety/Compliance

Rules:

- No private scraping.
- No personal data harvesting.
- No automatic outreach without approval.
- No verified badge without evidence.
- No public contact exposure unless contact policy permits it.
- No "available now" language for unconfirmed leads.

## Recommended Underrated Tools

| Tool | Use | Timing |
|---|---|---|
| Trigger.dev | Durable AI/research/payment workflows with retries | Add when workflows outgrow Vercel Cron. |
| Inngest | Event-driven durable functions | Alternative to Trigger.dev; choose one, not both. |
| Firecrawl | Public page extraction into markdown/structured data | Use only on allowed public pages and with robots/terms checks. |
| Browserless | Managed Playwright browser infrastructure | Useful later for QA screenshots and allowed browser automation. |
| Supabase MCP | Agent-assisted database/project inspection | Add after Supabase project exists; prefer read-only for agents. |
| Official MCP reference servers | Filesystem/Git/Postgres building blocks | Use cautiously; avoid untrusted MCP servers with secrets. |
| PostHog | Product analytics, funnels, session replay, feature flags | Add before live validation traffic. |
| Sentry | Error monitoring | Add before production deployment. |

Security note: MCP servers are privileged software. Install only official or well-reviewed servers, keep secrets in env files, and prefer read-only access for AI agents.

## Founder Next Step

For the next 30 days, the founder should not optimize for "more features". Optimize for proof:

- 100 camper conversations or survey responses.
- 50 host candidates researched.
- 15 founder-reviewed host messages manually sent.
- 10 host calls.
- 3 manually coordinated pilot stays or serious booking attempts.
- 30 short posts/reels around safe camping questions.
- 10 SEO pages that answer permission, washroom, BYOT, road-stop, and monsoon concerns better than competitors.
