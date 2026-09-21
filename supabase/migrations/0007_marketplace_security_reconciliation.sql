-- Reconcile the marketplace launch schema with the existing policy set.
alter table public.inquiries add column if not exists idempotency_key text;
create unique index if not exists inquiries_profile_idempotency_key_idx
  on public.inquiries (camper_profile_id, idempotency_key)
  where idempotency_key is not null;

-- A listing is public only when an owner has explicitly published it.
drop policy if exists "Public reads approved listings" on public.listings;
drop policy if exists "Public reads published listings" on public.listings;
create policy "Public reads published listings"
on public.listings for select to anon, authenticated
using (is_published = true);

-- Profiles are provisioned by the auth trigger and read by their owner.
-- Contact updates are made through an authenticated server endpoint so a
-- browser cannot alter roles or another protected profile attribute.
drop policy if exists "Profiles insert self" on public.profiles;
drop policy if exists "Profiles update self" on public.profiles;
drop policy if exists "Campers update own profile" on public.profiles;
drop policy if exists "Profiles select self" on public.profiles;
create policy "Profiles select self"
on public.profiles for select to authenticated
using ((select auth.uid()) = id);

-- Private contacts and email delivery state have no public client access.
revoke all on public.listing_contacts from anon, authenticated;
revoke all on public.email_outbox from anon, authenticated;

-- Remove accidental direct public reading of operational leads.
drop policy if exists "Authenticated ops can read leads" on public.mvp_leads;
drop policy if exists "Owner reads all leads" on public.mvp_leads;
create policy "Owner reads all leads"
on public.mvp_leads for select to authenticated
using (public.is_campin_owner());
