-- Marketplace launch additions. Host WhatsApp numbers remain private and are never readable from the public API.
alter table public.profiles add column if not exists updated_at timestamptz not null default now();
alter table public.listings add column if not exists is_published boolean not null default false;
alter table public.listings add column if not exists published_at timestamptz;
alter table public.listings add column if not exists price_unit text not null default 'night';
alter table public.inquiries add column if not exists whatsapp_opened_at timestamptz;
alter table public.inquiries add column if not exists message_text text;

create table if not exists public.listing_contacts (
  listing_id uuid primary key references public.listings(id) on delete cascade,
  whatsapp_e164 text not null,
  approved_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
alter table public.listing_contacts enable row level security;

create table if not exists public.favourites (
  profile_id uuid not null references public.profiles(id) on delete cascade,
  listing_id uuid not null references public.listings(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (profile_id, listing_id)
);
alter table public.favourites enable row level security;

create table if not exists public.campsite_suggestions (
  id uuid primary key default gen_random_uuid(),
  submitted_by uuid references public.profiles(id),
  name text not null,
  email text not null,
  place_name text not null,
  location_text text not null,
  map_url text,
  relationship_text text not null,
  notes text,
  status text not null default 'pending_review',
  created_at timestamptz not null default now()
);
alter table public.campsite_suggestions enable row level security;

create table if not exists public.email_outbox (
  id uuid primary key default gen_random_uuid(),
  event_key text not null unique,
  template_key text not null,
  recipient text not null,
  payload jsonb not null default '{}'::jsonb,
  provider_message_id text,
  status text not null default 'pending',
  attempts integer not null default 0,
  created_at timestamptz not null default now(),
  sent_at timestamptz
);
alter table public.email_outbox enable row level security;

drop policy if exists "Public reads published listings" on public.listings;
create policy "Public reads published listings" on public.listings for select to anon, authenticated using (is_published = true);
drop policy if exists "Profiles select self" on public.profiles;
create policy "Profiles select self" on public.profiles for select to authenticated using ((select auth.uid()) = id);
drop policy if exists "Profiles update self" on public.profiles;
create policy "Profiles update self" on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
drop policy if exists "Profiles insert self" on public.profiles;
create policy "Profiles insert self" on public.profiles for insert to authenticated with check ((select auth.uid()) = id);
drop policy if exists "Users manage their favourites" on public.favourites;
create policy "Users manage their favourites" on public.favourites for all to authenticated using ((select auth.uid()) = profile_id) with check ((select auth.uid()) = profile_id);
drop policy if exists "Campers view their inquiries" on public.inquiries;
create policy "Campers view their inquiries" on public.inquiries for select to authenticated using ((select auth.uid()) = camper_profile_id);
drop policy if exists "Campers create their inquiries" on public.inquiries;
create policy "Campers create their inquiries" on public.inquiries for insert to authenticated with check ((select auth.uid()) = camper_profile_id);

-- Add owner policies only through the existing public.is_campin_owner() helper; user-editable metadata is never used for access control.
drop policy if exists "Owner manages marketplace contacts" on public.listing_contacts;
create policy "Owner manages marketplace contacts" on public.listing_contacts for all to authenticated using (public.is_campin_owner()) with check (public.is_campin_owner());
drop policy if exists "Owner reads suggestions" on public.campsite_suggestions;
create policy "Owner reads suggestions" on public.campsite_suggestions for select to authenticated using (public.is_campin_owner());
drop policy if exists "Owner manages email outbox" on public.email_outbox;
create policy "Owner manages email outbox" on public.email_outbox for all to authenticated using (public.is_campin_owner()) with check (public.is_campin_owner());
