# CampIn Gated Guide Lead Magnet System

Last updated: 2026-05-26

## Goal

Use high-trust camping guides to capture qualified camper, host, and road-trip leads before CampIn starts paid acquisition or broad outreach.

The guide system is not a content dump. It is a validation engine:

- Public preview builds SEO and social trust.
- Email + phone unlock captures high-intent leads.
- Download action proves stronger intent.
- Guide topic tells CampIn what supply to research next.

## Current Implementation

Local routes:

- `/camping-guides`
- `/camping-guides/:slug`

Files:

- `src/data/campingGuides.ts`
- `src/lib/guideAccess.ts`
- `src/pages/Guides.tsx`
- `src/pages/CampingGuideDetail.tsx`

Storage:

- Current implementation stores guide access leads in `localStorage` under `campin_guide_access_leads`.
- This is intentional for local testing.
- When Supabase is connected, this should write into the `guide_access_leads` table already included in `supabase/migrations/0001_campin_core.sql`.

## Current Guides

1. Safe BYOT Camping Near Bangalore
2. Campervan Road Stops India Standard
3. Monsoon Camping In The Western Ghats
4. Host Land For Camping Starter Kit
5. First-Time Family Camping In India
6. Trekking With Camping: Permission Guide

## Capture Fields

Required:

- Full name
- Email
- Phone / WhatsApp
- City
- Main interest
- Consent checkbox

Consent copy must stay explicit:

> I agree that CampIn can store this guide request and contact me about responsible camping updates. I understand this does not confirm any booking or verified availability.

## Funnel

1. Social post or SEO page points to a guide preview.
2. Visitor reads public preview and safety notes.
3. Visitor unlocks guide with email and phone.
4. CampIn tags lead by guide and interest.
5. Founder reviews weekly guide demand.
6. Research OS prioritizes matching host/road-stop research.
7. Only after enough demand exists should founder-led outreach start.

## Lead Scoring

Suggested scoring when moved to Supabase:

| Signal | Points |
|---|---:|
| Downloads guide | 2 |
| Provides phone | 2 |
| Chooses BYOT/campervan/host interest | 2 |
| City matches wedge | 2 |
| Opens/request follows up later | 2 |

Score:

- 8-10: founder follow-up candidate
- 5-7: newsletter/community nurture
- 0-4: low-intent content lead

## Founder Workflow

Weekly:

- Export local guide leads while testing.
- Count unlocks by guide.
- Turn top guide into Instagram carousel/reel.
- Turn top guide into SEO page.
- Research 10 supply leads matching the winning region.
- Do not begin cold outreach until guide demand shows a reason.

## Supabase Table

Already added to the first migration:

```sql
create table guide_access_leads (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id),
  guide_slug text not null,
  guide_title text not null,
  name text not null,
  email text not null,
  phone text not null,
  city text not null,
  interest text not null,
  consent boolean not null default false,
  source text not null default 'guide_unlock',
  created_at timestamptz not null default now()
);
```

## Rules

- Do not gate safety-critical warnings. Safety notes stay visible before unlock.
- Do not imply that downloading a guide confirms a campsite.
- Do not auto-add phone numbers to WhatsApp broadcasts without clear opt-in and compliant tooling.
- Do not use fake scarcity.
- Do not publish exact fragile pins in downloadable guides.
