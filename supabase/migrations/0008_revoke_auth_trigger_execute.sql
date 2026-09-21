-- The auth trigger must never be callable through the public RPC surface.
revoke execute on function public.handle_new_campin_user() from public, anon, authenticated;
