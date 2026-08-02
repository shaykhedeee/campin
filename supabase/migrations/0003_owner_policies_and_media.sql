create or replace function public.is_campin_owner()
returns boolean language sql stable
as $$ select coalesce(auth.jwt() ->> 'email', '') = 'support@campin.co.in'; $$;

drop policy if exists "Owner reads all leads" on public.mvp_leads;
create policy "Owner reads all leads" on public.mvp_leads for select to authenticated using (public.is_campin_owner());

drop policy if exists "Public reads approved listings" on public.listings;
create policy "Public reads approved listings" on public.listings for select to anon, authenticated
using (verification_stage in ('reviewed', 'date_confirmed', 'calendar_synced') and unknowns = '[]'::jsonb);

drop policy if exists "Owner manages listings" on public.listings;
create policy "Owner manages listings" on public.listings for all to authenticated using (public.is_campin_owner()) with check (public.is_campin_owner());
drop policy if exists "Owner manages properties" on public.properties;
create policy "Owner manages properties" on public.properties for all to authenticated using (public.is_campin_owner()) with check (public.is_campin_owner());
drop policy if exists "Owner manages hosts" on public.hosts;
create policy "Owner manages hosts" on public.hosts for all to authenticated using (public.is_campin_owner()) with check (public.is_campin_owner());
drop policy if exists "Owner manages evidence" on public.evidence_artifacts;
create policy "Owner manages evidence" on public.evidence_artifacts for all to authenticated using (public.is_campin_owner()) with check (public.is_campin_owner());
drop policy if exists "Owner manages claims" on public.trust_claims;
create policy "Owner manages claims" on public.trust_claims for all to authenticated using (public.is_campin_owner()) with check (public.is_campin_owner());

insert into storage.buckets (id, name, public) values ('campin-property-media', 'campin-property-media', false) on conflict (id) do nothing;

drop policy if exists "Owner uploads property media" on storage.objects;
create policy "Owner uploads property media" on storage.objects for insert to authenticated with check (bucket_id = 'campin-property-media' and public.is_campin_owner());
drop policy if exists "Owner reads property media" on storage.objects;
create policy "Owner reads property media" on storage.objects for select to authenticated using (bucket_id = 'campin-property-media' and public.is_campin_owner());
drop policy if exists "Owner updates property media" on storage.objects;
create policy "Owner updates property media" on storage.objects for update to authenticated using (bucket_id = 'campin-property-media' and public.is_campin_owner()) with check (bucket_id = 'campin-property-media' and public.is_campin_owner());
drop policy if exists "Owner deletes property media" on storage.objects;
create policy "Owner deletes property media" on storage.objects for delete to authenticated using (bucket_id = 'campin-property-media' and public.is_campin_owner());
