alter table public.campsite_suggestions add column if not exists lead_id text;
create unique index if not exists campsite_suggestions_lead_id_uidx on public.campsite_suggestions(lead_id) where lead_id is not null;

insert into public.campsite_suggestions(lead_id,name,email,place_name,location_text,map_url,relationship_text,notes,status,created_at)
select l.id,l.name,l.email,coalesce(l.payload->>'place','Suggested campsite'),coalesce(l.city,'India'),nullif(l.payload->>'mapLink',''),coalesce(l.payload->>'relationship','Submitted online'),nullif(l.payload->>'notes',''),'pending_review',l.created_at
from public.mvp_leads l
where l.source_page='/suggest-campsite' and l.lead_type='road_stop'
on conflict(lead_id) where lead_id is not null do nothing;

create or replace function public.campin_queue_lead_emails(p_lead jsonb, p_alert_to text) returns jsonb language plpgsql security definer set search_path = public, pg_temp as $$
declare v_id text := p_lead->>'id'; v_email text := nullif(lower(trim(p_lead->>'email')), ''); v_existing public.mvp_leads%rowtype; v_payload jsonb := coalesce(p_lead->'payload','{}'::jsonb);
begin
 if v_id is null or length(v_id)>100 or p_alert_to !~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' then raise exception 'invalid_submission'; end if;
 if p_lead->>'sourcePage'='/suggest-campsite' and (p_lead->>'type'<>'road_stop' or v_payload->>'submissionKind'<>'campsite_suggestion' or nullif(trim(v_payload->>'place'),'') is null or nullif(trim(v_payload->>'relationship'),'') is null or nullif(trim(p_lead->>'city'),'') is null) then raise exception 'invalid_campsite_suggestion'; end if;
 insert into public.mvp_leads(id,lead_type,source_page,name,email,phone,city,status,score,consent,payload)
 values(v_id,p_lead->>'type',p_lead->>'sourcePage',nullif(p_lead->>'name',''),v_email,nullif(p_lead->>'phone',''),nullif(p_lead->>'city',''),'new',0,true,v_payload) on conflict(id) do nothing;
 select * into v_existing from public.mvp_leads where id=v_id;
 if not found or v_existing.lead_type<>p_lead->>'type' or coalesce(v_existing.payload,'{}')<>v_payload then raise exception 'submission_conflict'; end if;
 if p_lead->>'sourcePage'='/suggest-campsite' then
  insert into public.campsite_suggestions(lead_id,name,email,place_name,location_text,map_url,relationship_text,notes,status,created_at)
  values(v_id,coalesce(v_existing.name,'Camper'),coalesce(v_existing.email,''),v_payload->>'place',coalesce(v_existing.city,'India'),nullif(v_payload->>'mapLink',''),v_payload->>'relationship',nullif(v_payload->>'notes',''),'pending_review',v_existing.created_at)
  on conflict(lead_id) where lead_id is not null do nothing;
 end if;
 insert into public.email_outbox(event_key,template_key,recipient,payload) values('lead-alert:'||v_id,'lead_alert',p_alert_to,to_jsonb(v_existing)) on conflict(event_key) do nothing;
 if v_email is not null then insert into public.email_outbox(event_key,template_key,recipient,payload) values('lead-ack:'||v_id,'lead_ack',v_email,jsonb_build_object('name',v_existing.name,'type',v_existing.lead_type,'reference',v_existing.id,'destination',v_existing.city,'source_page',v_existing.source_page,'submitted_at',v_existing.created_at)) on conflict(event_key) do nothing; end if;
 return jsonb_build_object('id',v_id,'queued',true);
end; $$;
revoke all on function public.campin_queue_lead_emails(jsonb,text) from public,anon,authenticated;
grant execute on function public.campin_queue_lead_emails(jsonb,text) to service_role;
