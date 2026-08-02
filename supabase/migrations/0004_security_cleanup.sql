drop policy if exists "Authenticated ops can read leads" on public.mvp_leads;
alter function public.is_campin_owner() set search_path = public, auth;
