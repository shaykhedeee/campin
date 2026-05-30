# CampIn Locked Technical Stack

Last updated: 2026-05-26

## Decision

CampIn will use a trust-first marketplace stack built around Next.js, Vercel, Supabase Postgres, Drizzle, Razorpay, Mapbox, WhatsApp/Resend messaging, OpenAI research agents, and PostHog/Sentry analytics.

The current local app is still a Vite React prototype. Do not migrate it blindly. Use it as the product/design reference while the backend schema and Next.js migration plan are built in controlled phases.

## Locked Stack

| Layer | Choice | Notes |
|---|---|---|
| Frontend | Next.js, React, TypeScript, Tailwind | Move from Vite when backend routes, SEO, and auth are ready. |
| Components | shadcn/ui only where useful | Do not replace CampIn's visual language with generic component defaults. |
| Hosting | Vercel | Preview deployments, production hosting, cron, analytics. |
| Database | Supabase Postgres | Primary system of record. |
| Auth | Supabase Auth | Add Clerk only if B2B/team auth becomes complex. |
| ORM | Drizzle ORM | Typed SQL, migrations, local schema review. |
| Storage | Supabase Storage | Campsite images, verification proof, host documents. |
| Payments | Razorpay first, Stripe later | Payment Links for request-first pilots, checkout later. |
| Maps | Mapbox UI, Google Places enrichment | Google Places only where terms and API quota allow. |
| Messaging | WhatsApp Cloud API/BSP, Resend | Manual approval before outbound host outreach. |
| AI | OpenAI Responses API | Research, enrichment, guide drafts, verification gaps. |
| Jobs | Vercel Cron, then Trigger.dev or Inngest | Use durable workflows when jobs need retries/state. |
| Analytics | PostHog, Search Console, Sentry, Vercel Analytics | Product analytics, SEO, error monitoring, vitals. |
| CMS | Database-backed blog/admin first | Add Sanity only when non-technical editorial workflow is needed. |

## Why Supabase Over Convex

Supabase is the default because CampIn's core is relational and audit-heavy: hosts, properties, listings, claims, evidence, inquiries, bookings, payments, availability, guide pages, and compliance events. Postgres is stronger for joins, reporting, geospatial search, trust ledgers, and future portability.

Convex can be reconsidered later for realtime founder control-room experiences, but it should not be the source of truth for marketplace, payment, or verification data.

## Current Website State

CampIn currently functions as a local React prototype with:

- Trust-aware listing model and seeded public-source lead records.
- `/explore` discovery filters for trust, vehicle/BYOT, and availability posture.
- `/listing/:id` trust-ledger style listing details.
- `/validation` founder control room and demand/supply capture surface.
- `/ops` operational health dashboard.
- `/strategy` trust and policy system of record.
- `/guides/:slug` guide pages for regions that are not listing-ready.
- Blog drafts and outreach drafts in `data/blog/drafts` and `data/outreach/drafts`.
- Research collector outputs in `data/research/outputs`.

What it does not yet do:

- No real database connection.
- No user accounts.
- No host dashboard.
- No real payment/booking flow.
- No real WhatsApp/email dispatch.
- No deployed CMS/admin.
- No automated public outreach.

## Build Sequence

1. Keep the Vite prototype stable and local.
2. Use `supabase/migrations/0001_campin_core.sql` as the first database contract.
3. Connect Supabase locally with `.env.local` values when keys are available.
4. Add ingestion scripts that upsert research collector output into Supabase.
5. Add admin-only Ops API routes after Next.js migration starts.
6. Move public SEO surfaces to Next.js pages.
7. Add Supabase Auth and role-based dashboards.
8. Add Razorpay Payment Links for manually approved bookings.
9. Add WhatsApp/Resend only after explicit message approval workflow exists.

## Environment Keys Needed Later

Use `.env.example` as the source of truth. Initial keys needed first:

- `DATABASE_URL`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `MAPBOX_ACCESS_TOKEN`
- `RESEND_API_KEY`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`

Do not commit real secrets.
