alter table public.email_outbox add column if not exists next_attempt_at timestamptz not null default now(), add column if not exists last_error text;
create index if not exists email_outbox_pending_idx on public.email_outbox (next_attempt_at, created_at) where status in ('pending','retry');
create table if not exists public.email_webhook_events (id text primary key, event_type text not null, email_id text, received_at timestamptz not null default now(), payload jsonb not null default '{}'::jsonb);
alter table public.email_webhook_events enable row level security;
revoke all on public.email_webhook_events from anon, authenticated;
create or replace function public.campin_queue_lead_emails(p_lead jsonb, p_alert_to text) returns jsonb language plpgsql security definer set search_path = public, pg_temp as $$
declare v_id text := p_lead->>'id'; v_email text := nullif(lower(trim(p_lead->>'email')), ''); v_existing public.mvp_leads%rowtype;
begin
 if v_id is null or length(v_id)>100 or p_alert_to !~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' then raise exception 'invalid_submission'; end if;
 insert into public.mvp_leads(id,lead_type,source_page,name,email,phone,city,status,score,consent,payload) values(v_id,p_lead->>'type',p_lead->>'sourcePage',nullif(p_lead->>'name',''),v_email,nullif(p_lead->>'phone',''),nullif(p_lead->>'city',''),'new',0,true,coalesce(p_lead->'payload','{}'::jsonb)) on conflict(id) do nothing;
 select * into v_existing from public.mvp_leads where id=v_id;
 if not found or v_existing.lead_type<>p_lead->>'type' or coalesce(v_existing.payload,'{}')<>coalesce(p_lead->'payload','{}') then raise exception 'submission_conflict'; end if;
 insert into public.email_outbox(event_key,template_key,recipient,payload) values('lead-alert:'||v_id,'lead_alert',p_alert_to,to_jsonb(v_existing)) on conflict(event_key) do nothing;
 if v_email is not null then insert into public.email_outbox(event_key,template_key,recipient,payload) values('lead-ack:'||v_id,'lead_ack',v_email,jsonb_build_object('name',v_existing.name,'type',v_existing.lead_type,'reference',v_existing.id,'destination',v_existing.city,'source_page',v_existing.source_page,'submitted_at',v_existing.created_at)) on conflict(event_key) do nothing; end if;
 return jsonb_build_object('id',v_id,'queued',true);
end; $$;
revoke all on function public.campin_queue_lead_emails(jsonb,text) from public,anon,authenticated;
grant execute on function public.campin_queue_lead_emails(jsonb,text) to service_role;
create or replace function public.campin_claim_email_batch(p_limit integer default 10) returns setof public.email_outbox language plpgsql security definer set search_path = public, pg_temp as $$
begin
 return query with batch as (select id from public.email_outbox where status in ('pending','retry') and next_attempt_at<=now() and attempts<5 order by created_at for update skip locked limit greatest(1,least(coalesce(p_limit,10),25))) update public.email_outbox e set status='processing',attempts=e.attempts+1 from batch where e.id=batch.id returning e.*;
end; $$;
revoke all on function public.campin_claim_email_batch(integer) from public,anon,authenticated;
grant execute on function public.campin_claim_email_batch(integer) to service_role;
insert into public.email_outbox(event_key,template_key,recipient,payload) select 'lead-alert:'||id,'lead_alert','support@campin.co.in',to_jsonb(l) from public.mvp_leads l on conflict(event_key) do nothing;
