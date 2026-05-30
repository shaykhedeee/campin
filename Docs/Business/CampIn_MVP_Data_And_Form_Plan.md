# CampIn MVP Data And Form Plan

Last updated: 2026-05-28

## Current Decision

Use Supabase Postgres for the MVP database, with Drizzle as the typed schema/migration layer. For local development and pre-key testing, every public form also saves to browser localStorage so the UI is functional before Vercel/Supabase environment variables are added.

## Lead Capture Table

Primary MVP table: `mvp_leads`

Migration: `supabase/migrations/0002_mvp_leads.sql`

Purpose:
- Capture founding community waitlist leads.
- Capture guide unlock leads.
- Capture listing inquiry requests without exposing host contacts.
- Capture validation/newsletter/host/road-stop leads through the shared lead layer.

Public safety rule:
- No unverified campsite contact information is exposed publicly.
- Listing inquiries are marked `awaiting_campin_review`.
- Submitting a form does not confirm booking, availability, or verification.

## Current Storage Behavior

If `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are not configured:
- Forms save locally to `localStorage`.
- The site remains usable locally.
- Local lead export can be created from `src/lib/mvpLeadStore.ts`.

If Supabase env vars are configured:
- Forms save locally first.
- Forms then insert into `mvp_leads`.
- Anonymous users can insert only; they cannot read leads.

## Forms Wired In This Pass

- Homepage founding community waitlist: functional email/phone capture.
- Camping guide unlocks: continue local unlock and also submit to the MVP lead store.
- Validation machine forms: continue local validation state and also submit to the MVP lead store.
- Listing inquiry request form: now collects name, email, phone and submits to the MVP lead store.

## Vercel Environment Variables Needed

Add these to Vercel Project Settings -> Environment Variables:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Keep these server-only and do not expose them to browser code:

```env
DATABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

## Spreadsheet Fallback

Spreadsheet-compatible template:

`data/mvp/campin_mvp_leads_template.csv`

Use this if Supabase setup is delayed. The columns match the `mvp_leads` table.

## Next Implementation Steps

1. Create or open the Supabase project.
2. Run `supabase/migrations/0001_campin_core.sql`.
3. Run `supabase/migrations/0002_mvp_leads.sql`.
4. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to Vercel.
5. Deploy and submit one test lead from each public form.
6. Check Supabase Table Editor -> `mvp_leads`.
7. Only after verified lead capture is working, add email/WhatsApp automations.
