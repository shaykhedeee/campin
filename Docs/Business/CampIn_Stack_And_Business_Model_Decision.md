# CampIn Stack And Business Model Decision

Last updated: 2026-05-21

## Executive Decision

CampIn should run in two layers:

1. No-code validation layer now: Tally, Airtable, Brevo, WhatsApp Community, Google Drive, Codex automations.
2. Marketplace layer next: Next.js, Supabase, Vercel, Razorpay, Mapbox, PostHog, Brevo/Resend.

Do not overbuild auth before there is marketplace behavior. Waitlist, host applications, road-stop leads, and community joins do not need user accounts yet.

## Best Database And Auth Recommendation

Primary recommendation:

Supabase for database, auth, storage, and future geospatial search.

Why Supabase fits CampIn:

- CampIn data is relational: campers, hosts, listings, road stops, verification checks, pilots, incidents, reviews, payouts, regions, and content briefs.
- CampIn needs row-level permissions when hosts later manage their own listings.
- CampIn needs file storage for host photos, permission notes, and verification evidence.
- CampIn will eventually need PostGIS-style location queries: near Bangalore, along Bangalore-Coorg-Wayanad, within X km, route stops, exact pins, hidden precise coordinates.
- Supabase Auth sits inside the same platform as Postgres and integrates with row-level security.

Auth decision:

- Phase 0/1: no public auth. Use lead forms.
- Phase 2: Supabase Auth with email magic link and Google login.
- Phase 3: add phone OTP only when booking/user trust requires it, because SMS/OTP has cost and abuse risk.
- Use Clerk only if CampIn later needs premium prebuilt auth UI, B2B org management, or faster multi-tenant admin experiences than Supabase Auth provides.

## Recommended Stack By Phase

### Phase 0: Current Validation

| Layer | Tool | Status |
|---|---|---|
| Frontend | Vite + React + TypeScript | Current |
| Styling | Tailwind CSS | Current |
| Forms | Local forms now, Tally externally | Ready |
| CRM | Airtable Free | Account needed |
| Newsletter | Brevo Free | Account needed |
| Community | WhatsApp Community | Account needed |
| Proof files | Google Drive | Account needed |
| Automations | Codex recurring workflows | Active |

### Phase 1: Public Pre-Booking Website

| Layer | Tool | Decision |
|---|---|---|
| Hosting | Vercel Hobby | Good for initial launch |
| Frontend | Current Vite app or Next.js migration | Keep Vite until SEO pages scale |
| Database | Supabase | Introduce for forms and CRM sync |
| Auth | None for public users | Avoid account friction |
| Email | Brevo for newsletter, Resend later for transactional | Brevo first |
| Analytics | Search Console, GA4, Microsoft Clarity | Add after privacy page |
| Payments | Manual UPI/Razorpay link | Only for paid pilot |

### Phase 2: Marketplace

| Layer | Tool | Decision |
|---|---|---|
| Framework | Next.js App Router | Better SEO and dynamic listing pages |
| Database | Supabase Postgres | Core system of record |
| Auth | Supabase Auth | Host/camper accounts |
| Storage | Supabase Storage plus Cloudinary if needed | Host photos and listing media |
| Maps | Mapbox | Route and visual discovery |
| Payments | Razorpay | UPI/cards and India-first checkout |
| Product analytics | PostHog | Funnels, retention, feature behavior |
| Search | Postgres full-text + PostGIS first | Add Algolia/Meilisearch only later |

## Business Model

CampIn is an asset-light trust marketplace for camping in India.

The core model:

- Hosts list land/stays/road stops.
- Campers discover verified options.
- CampIn earns from the transaction and the trust layer.

Revenue streams by phase:

| Phase | Revenue | Notes |
|---|---|---|
| Validation | Zero or optional support | Trust and proof matter more than revenue |
| Manual pilots | Small service fee or direct host payment | Keep simple until policies are ready |
| Marketplace | Host commission plus camper service fee | Target 12-18% blended take rate |
| Supply tools | Featured listings, verification services, host setup | Only after enough host demand |
| Road-stop network | Certified road-stop subscriptions or booking fees | Strong long-term moat |
| Partnerships | Gear, vehicle, outdoor clubs, tourism boards | Must stay trust-aligned |
| Membership | Early access, route drops, community benefits | Later, if community proves retention |

Recommended first monetization:

- Founding hosts: zero commission during validation.
- Paid pilot: payment direct to host or Razorpay payment link, logged by CampIn.
- First marketplace version: 10% host fee plus 5-8% camper service fee.
- Keep take rate flexible for low-priced own-tent stays.

## Potential

CampIn has high potential if it owns the trust layer, not just listings.

Strong upside:

- India has growing adventure/outdoor travel demand.
- Existing camping discovery is fragmented and trust-poor.
- Airbnb-style marketplaces work when supply, trust, and community compound.
- Road stops and own-tent camping are less served than packaged camps.
- Bangalore/South India is a practical wedge with weekend demand and private-land supply.

Main risks:

- Safety or permission failure can damage brand trust quickly.
- Host supply may be inconsistent unless onboarding is disciplined.
- Users may want cheap camps, but CampIn must avoid becoming a discount operator.
- Public/forest/beach camping claims can create legal risk.
- Community growth can become noisy without moderation.

Strategic answer:

Build CampIn as "India's outdoors, verified." Every page, form, host call, and community ritual must increase trust density.

## Outreach Stack

Free/low-cost outreach stack:

| Need | Tool | Rule |
|---|---|---|
| Lead research | Google, public business pages, Maps manual research | Use public business contact only |
| Lead database | Airtable | Track source, consent, stage, next action |
| Email outreach | Gmail initially | Founder sends manually |
| Newsletter | Brevo | Consented subscribers only |
| Social outreach | Instagram manual DMs | Personalized, low volume, no automation spam |
| Community | WhatsApp Community | Opt-in only |
| Follow-up reminders | Codex automation + Airtable due dates | Drafts, not auto-send |

Do not use automated mass-DM tools. CampIn's earliest outreach should feel founder-led and respectful.

## Stack Decision Summary

Use Tally/Airtable/Brevo now. Move to Supabase when the public site needs real persistence. Keep Supabase Auth for later marketplace accounts. Avoid Clerk until auth UX becomes a bigger bottleneck than marketplace trust.

## Source Notes

- Supabase docs confirm Auth supports password, magic link/OTP, social login, SSO, JWTs, and RLS integration.
- Supabase database docs confirm every project includes a full Postgres database and CSV import/table interfaces.
- Supabase Storage supports files, CDN delivery, image optimization, and access control.
- Clerk pricing is attractive for auth-heavy apps but has fixed session limits on the free Hobby plan and adds another vendor.
- Vercel Hobby/Pro pricing supports cheap static/app launch and later Pro scale.
- Brevo Free supports email marketing at small volume and is appropriate for CampIn's first newsletter.
