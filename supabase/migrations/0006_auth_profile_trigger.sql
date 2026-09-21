-- Keep a Supabase Auth identity and Campin profile aligned without allowing
-- a browser client to choose its own role.
create or replace function public.handle_new_campin_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.email,
    'camper'
  )
  on conflict (id) do update
    set full_name = coalesce(public.profiles.full_name, excluded.full_name),
        email = coalesce(excluded.email, public.profiles.email),
        updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_campin_profile on auth.users;
create trigger on_auth_user_created_campin_profile
after insert on auth.users
for each row execute procedure public.handle_new_campin_user();

-- Campers may maintain personal contact details, but never roles or another
-- camper's profile.
drop policy if exists "Campers update own profile" on public.profiles;
create policy "Campers update own profile"
on public.profiles
for update to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id and role = 'camper');
