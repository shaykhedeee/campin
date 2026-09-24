alter table public.inquiries add column if not exists contact_name text;
alter table public.inquiries add column if not exists contact_phone text;
alter table public.inquiries add column if not exists contact_consent boolean not null default false;
alter table public.inquiries add column if not exists camping_style text;

create or replace function public.campin_create_enquiry(
 p_camper uuid,p_listing uuid,p_start date,p_end date,p_guests integer,p_style text,
 p_vehicle text,p_message text,p_name text,p_phone text,p_consent boolean,p_key text,p_alert_to text
) returns jsonb language plpgsql security definer set search_path=public,auth,pg_temp as $$
declare v_listing public.listings%rowtype;v_email text;v_existing public.inquiries%rowtype;v_ref text;v_inquiry public.inquiries%rowtype;v_contact boolean;
begin
 if p_consent is distinct from true or p_name is null or length(trim(p_name))<2 or length(p_name)>120 or p_phone is null or p_phone !~ '^\+[1-9][0-9]{7,14}$' then raise exception 'invalid_contact_or_consent';end if;
 if p_start is null or p_end is null or p_start<(now() at time zone 'Asia/Kolkata')::date or p_end<=p_start then raise exception 'invalid_dates';end if;
 if p_guests is null or p_guests not between 1 and 50 or p_key is null or length(p_key)>120 or p_key !~ '^[a-zA-Z0-9-]+$' then raise exception 'invalid_trip';end if;
 if (p_vehicle is not null and length(p_vehicle)>500) or (p_message is not null and length(p_message)>2000) then raise exception 'invalid_message';end if;
 select * into v_listing from public.listings where id=p_listing and is_published=true;
 if not found then raise exception 'listing_unavailable';end if;
 if v_listing.max_guests is not null and p_guests>v_listing.max_guests then raise exception 'capacity_exceeded';end if;
 if p_alert_to is null or p_alert_to !~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' then raise exception 'invalid_alert_address';end if;
 if p_style is null or not (coalesce(v_listing.catalogue_details->'styles','[]'::jsonb) ? p_style) then raise exception 'stay_type_unavailable';end if;
 select email into v_email from auth.users where id=p_camper;
 if v_email is null then raise exception 'account_email_unavailable';end if;
 select * into v_existing from public.inquiries where camper_profile_id=p_camper and idempotency_key=p_key;
 if found then
  if v_existing.listing_id<>p_listing or v_existing.start_date::date<>p_start or v_existing.end_date::date<>p_end or v_existing.guests<>p_guests or v_existing.contact_phone<>p_phone or v_existing.camping_style<>p_style then raise exception 'idempotency_conflict';end if;
  return jsonb_build_object('id',v_existing.id,'reference',v_existing.tracking_id,'handoffReady',exists(select 1 from public.listing_contacts where listing_id=p_listing));
 end if;
 v_ref:='CMP-'||upper(substr(replace(gen_random_uuid()::text,'-',''),1,10));
 insert into public.inquiries(listing_id,camper_profile_id,start_date,end_date,guests,own_tent,vehicle_type,message,tracking_id,idempotency_key,contact_name,contact_phone,contact_consent,camping_style)
 values(p_listing,p_camper,p_start::timestamptz,p_end::timestamptz,p_guests,p_style in ('own-tent','own_tent'),nullif(trim(p_vehicle),''),nullif(trim(p_message),''),v_ref,p_key,trim(p_name),p_phone,true,p_style) returning * into v_inquiry;
 update public.profiles set full_name=trim(p_name),phone=p_phone,updated_at=now() where id=p_camper;
 v_contact:=exists(select 1 from public.listing_contacts where listing_id=p_listing);
 insert into public.email_outbox(event_key,template_key,recipient,payload)
 values('enquiry-alert:'||v_ref,'enquiry_alert',p_alert_to,jsonb_build_object('id',v_inquiry.id,'lead_type','Campsite enquiry','reference',v_ref,'name',trim(p_name),'email',v_email,'phone',p_phone,'listing',v_listing.title,'slug',v_listing.slug,'start_date',p_start,'end_date',p_end,'guests',p_guests,'camping_style',p_style,'vehicle',p_vehicle,'questions',p_message,'source_page','/listing/'||v_listing.slug,'submitted_at',now()));
 insert into public.email_outbox(event_key,template_key,recipient,payload)
 values('enquiry-ack:'||v_ref,'enquiry_ack',v_email,jsonb_build_object('name',trim(p_name),'reference',v_ref,'listing',v_listing.title,'start_date',p_start,'end_date',p_end,'guests',p_guests,'submitted_at',now()));
 return jsonb_build_object('id',v_inquiry.id,'reference',v_ref,'handoffReady',v_contact);
end; $$;
revoke all on function public.campin_create_enquiry(uuid,uuid,date,date,integer,text,text,text,text,text,boolean,text,text) from public,anon,authenticated;
grant execute on function public.campin_create_enquiry(uuid,uuid,date,date,integer,text,text,text,text,text,boolean,text,text) to service_role;

create or replace function public.campin_claim_email_batch(p_limit integer default 10) returns setof public.email_outbox language plpgsql security definer set search_path=public,pg_temp as $$
begin
 return query with batch as (select id from public.email_outbox where ((status in ('pending','retry') and next_attempt_at<=now()) or (status='processing' and created_at<now()-interval '15 minutes')) and attempts<5 order by created_at for update skip locked limit greatest(1,least(coalesce(p_limit,10),25))) update public.email_outbox e set status='processing',attempts=e.attempts+1 from batch where e.id=batch.id returning e.*;
end; $$;
