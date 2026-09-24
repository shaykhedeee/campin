import { getSupabaseConfig, json, supabaseRequest } from '../lib/marketplace';
const ownerEmail='support@campin.co.in';
export default async function owner(request:Request){
 const config=getSupabaseConfig();if(!config)return json({error:'owner_tools_unavailable'},503);
 const token=request.headers.get('authorization')?.replace(/^Bearer\s+/i,'');if(!token)return json({error:'authentication_required'},401);
 const identity=await fetch(`${config.url}/auth/v1/user`,{headers:{Authorization:`Bearer ${token}`,apikey:config.serviceRoleKey}}).catch(()=>null);
 if(!identity?.ok)return json({error:'invalid_session'},401);
 const user=await identity.json() as {email?:string;email_confirmed_at?:string};if(user.email?.toLowerCase()!==ownerEmail||!user.email_confirmed_at)return json({error:'owner_access_required'},403);
 if(request.method==='GET'){
  const paths=[
   '/rest/v1/listings?select=id,slug,title,public_summary,is_published,price_from_inr,price_unit,max_guests,last_checked_at,catalogue_details,properties(name,region,state)&order=created_at.desc&limit=500',
   '/rest/v1/listing_contacts?select=listing_id,whatsapp_e164,approved_at',
   '/rest/v1/mvp_leads?select=id,lead_type,source_page,name,email,phone,city,status,consent,payload,created_at&order=created_at.desc&limit=250',
   '/rest/v1/inquiries?select=id,tracking_id,listing_id,camper_profile_id,start_date,end_date,guests,vehicle_type,own_tent,message,whatsapp_opened_at,created_at,listings(title,slug),profiles(full_name,email,phone)&order=created_at.desc&limit=250',
   '/rest/v1/campsite_suggestions?select=id,name,email,place_name,location_text,map_url,relationship_text,notes,status,created_at&order=created_at.desc&limit=250',
   '/rest/v1/email_outbox?select=id,event_key,template_key,recipient,status,attempts,provider_message_id,last_error,created_at,sent_at,next_attempt_at&order=created_at.desc&limit=100',
  ];
  const responses=await Promise.all(paths.map(path=>supabaseRequest(config,path)));
  if(responses.some(r=>!r.ok))return json({error:'owner_data_unavailable'},502);
  const [listings,contacts,leads,enquiries,suggestions,outbox]=await Promise.all(responses.map(r=>r.json()));
  return json({listings,contacts,leads,enquiries,suggestions,outbox});
 }
 if(request.method!=='POST')return json({error:'method_not_allowed'},405);
 let body:Record<string,unknown>;try{body=await request.json();}catch{return json({error:'invalid_json'},400);}
 if(body.action==='listing'){
  if(typeof body.id!=='string'||!/^[0-9a-f-]{36}$/i.test(body.id))return json({error:'invalid_listing'},400);
  const response=await supabaseRequest(config,`/rest/v1/listings?id=eq.${body.id}&select=id,title,public_summary,slug,price_from_inr,price_unit,max_guests,is_published,last_checked_at,catalogue_details`,{method:'GET'});
  if(!response.ok)return json({error:'listing_unavailable'},502);const [row]=await response.json() as Array<Record<string,unknown>>;if(!row)return json({error:'listing_not_found'},404);
  const details=row.catalogue_details&&typeof row.catalogue_details==='object'?row.catalogue_details as Record<string,unknown>:{};
  const next={...details};
  if(body.image!==undefined||body.imageSource!==undefined){
   if(typeof body.image!=='string'||body.image.length>1200||typeof body.imageSource!=='string'||body.imageSource.length>500)return json({error:'image_source_required'},400);
   if(body.image){let imageUrl:URL;try{imageUrl=new URL(body.image);}catch{return json({error:'invalid_image_url'},400);}if(imageUrl.protocol!=='https:'||body.imageRightsConfirmed!==true||!body.imageSource.trim())return json({error:'photo_rights_confirmation_required'},400);}
   Object.assign(next,{image:body.image,imageSource:body.imageSource});
  }
  const patch:Record<string,unknown>={catalogue_details:next};
  for(const [key,max] of [['title',180],['public_summary',3000]] as const)if(body[key]!==undefined){if(typeof body[key]!=='string'||!body[key].trim()||body[key].length>max)return json({error:`invalid_${key}`},400);patch[key]=body[key].trim();}
  if(body.price_from_inr!==undefined){if(body.price_from_inr!==null&&(!Number.isInteger(body.price_from_inr)||Number(body.price_from_inr)<0||Number(body.price_from_inr)>5000000))return json({error:'invalid_price'},400);patch.price_from_inr=body.price_from_inr;}
  if(body.max_guests!==undefined){if(body.max_guests!==null&&(!Number.isInteger(body.max_guests)||Number(body.max_guests)<1||Number(body.max_guests)>100))return json({error:'invalid_capacity'},400);patch.max_guests=body.max_guests;}
  if(body.price_unit!==undefined){if(!['night','person/night','unit/night','vehicle/night','stay'].includes(String(body.price_unit)))return json({error:'invalid_price_unit'},400);patch.price_unit=body.price_unit;}
  if(body.is_published===true){
   const title=String(patch.title??row.title).trim(),summary=String(patch.public_summary??row.public_summary).trim();
   if(!title||!summary||!row.slug||!row.last_checked_at)return json({error:'publication_evidence_incomplete'},400);
  }
  if(body.is_published!==undefined){if(typeof body.is_published!=='boolean')return json({error:'invalid_publication_status'},400);patch.is_published=body.is_published;if(body.is_published)patch.published_at=new Date().toISOString();}
  const saved=await supabaseRequest(config,`/rest/v1/listings?id=eq.${body.id}`,{method:'PATCH',headers:{Prefer:'return=representation'},body:JSON.stringify(patch)});
  if(!saved.ok)return json({error:'listing_not_saved'},502);return json({saved:true});
 }
 if(body.action==='contact'){
  if(typeof body.listingId!=='string'||!/^[0-9a-f-]{36}$/i.test(body.listingId)||typeof body.phone!=='string'||!/^\+[1-9]\d{7,14}$/.test(body.phone))return json({error:'invalid_approved_contact'},400);
  const saved=await supabaseRequest(config,'/rest/v1/listing_contacts?on_conflict=listing_id',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify({listing_id:body.listingId,whatsapp_e164:body.phone,approved_at:new Date().toISOString()})});
  return saved.ok?json({saved:true}):json({error:'contact_not_saved'},502);
 }
 if(body.action==='remove_contact'){
  if(typeof body.listingId!=='string'||!/^[0-9a-f-]{36}$/i.test(body.listingId))return json({error:'invalid_listing'},400);
  const removed=await supabaseRequest(config,`/rest/v1/listing_contacts?listing_id=eq.${body.listingId}`,{method:'DELETE'});
  return removed.ok?json({saved:true}):json({error:'contact_not_removed'},502);
 }
 if(body.action==='suggestion'&&typeof body.id==='string'&&/^[0-9a-f-]{36}$/i.test(body.id)&&['pending_review','reviewed','declined'].includes(String(body.status))){
  const result=await supabaseRequest(config,`/rest/v1/campsite_suggestions?id=eq.${body.id}`,{method:'PATCH',body:JSON.stringify({status:body.status})});return result.ok?json({saved:true}):json({error:'suggestion_not_updated'},502);
 }
 if(body.action==='retry_email'&&typeof body.id==='string'&&/^[0-9a-f-]{36}$/i.test(body.id)){
  const result=await supabaseRequest(config,`/rest/v1/email_outbox?id=eq.${body.id}&status=in.(failed,retry)`,{method:'PATCH',body:JSON.stringify({status:'pending',attempts:0,last_error:null,next_attempt_at:new Date().toISOString()})});return result.ok?json({saved:true}):json({error:'email_not_requeued'},502);
 }
 return json({error:'invalid_action'},400);
}
