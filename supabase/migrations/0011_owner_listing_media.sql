insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('campin-listing-media','campin-listing-media',true,8388608,array['image/jpeg','image/png','image/webp'])
on conflict(id) do update set public=true,file_size_limit=excluded.file_size_limit,allowed_mime_types=excluded.allowed_mime_types;
drop policy if exists "Campin listing photos are public" on storage.objects;
create policy "Campin listing photos are public" on storage.objects for select to anon,authenticated using(bucket_id='campin-listing-media');
drop policy if exists "Owner uploads approved listing photos" on storage.objects;
create policy "Owner uploads approved listing photos" on storage.objects for insert to authenticated with check(bucket_id='campin-listing-media' and public.is_campin_owner());
drop policy if exists "Owner updates listing photos" on storage.objects;
create policy "Owner updates listing photos" on storage.objects for update to authenticated using(bucket_id='campin-listing-media' and public.is_campin_owner()) with check(bucket_id='campin-listing-media' and public.is_campin_owner());
drop policy if exists "Owner deletes listing photos" on storage.objects;
create policy "Owner deletes listing photos" on storage.objects for delete to authenticated using(bucket_id='campin-listing-media' and public.is_campin_owner());
