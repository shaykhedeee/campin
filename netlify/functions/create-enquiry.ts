import { authenticatedUserId, getSupabaseConfig, json, supabaseRequest } from '../lib/marketplace';
import { isCalendarDate, todayIso } from '../../src/lib/tripSearch';
export default async function createEnquiry(request:Request){
 if(request.method!=='POST')return json({error:'method_not_allowed'},405);
 const config=getSupabaseConfig();if(!config)return json({error:'service_not_configured'},503);
 const camper=await authenticatedUserId(config,request);if(!camper)return json({error:'authentication_required'},401);
 const key=request.headers.get('idempotency-key');if(!key||key.length>120||!/^[a-zA-Z0-9-]+$/.test(key))return json({error:'idempotency_key_required'},400);
 let input:Record<string,unknown>;try{input=await request.json();}catch{return json({error:'invalid_json'},400);}
 if(!uuid(input.listingId)||!isCalendarDate(input.startDate)||!isCalendarDate(input.endDate)||input.startDate<todayIso()||input.endDate<=input.startDate)return json({error:'invalid_dates'},400);
 if(!Number.isInteger(input.guests)||Number(input.guests)<1||Number(input.guests)>50)return json({error:'invalid_guests'},400);
 if(typeof input.campingStyle!=='string'||input.campingStyle.length>80)return json({error:'invalid_camping_style'},400);
 if(typeof input.name!=='string'||input.name.trim().length<2||input.name.length>120)return json({error:'name_required'},400);
 if(typeof input.phone!=='string'||!/^\+[1-9]\d{7,14}$/.test(input.phone))return json({error:'whatsapp_number_required'},400);
 if(input.consent!==true)return json({error:'contact_consent_required'},400);
 if(input.vehicleDetails!=null&&(typeof input.vehicleDetails!=='string'||input.vehicleDetails.length>500)||input.questions!=null&&(typeof input.questions!=='string'||input.questions.length>2000))return json({error:'invalid_message'},400);
 const result=await supabaseRequest(config,'/rest/v1/rpc/campin_create_enquiry',{method:'POST',body:JSON.stringify({p_camper:camper,p_listing:input.listingId,p_start:input.startDate,p_end:input.endDate,p_guests:input.guests,p_style:input.campingStyle,p_vehicle:line(input.vehicleDetails),p_message:line(input.questions),p_name:input.name.trim(),p_phone:input.phone,p_consent:input.consent,p_key:key,p_alert_to:process.env.LEAD_ALERT_TO||'support@campin.co.in'})});
 if(!result.ok){const info=await result.json().catch(()=>({})) as {message?:string};const message=info.message||'';const code=message.includes('listing_unavailable')?404:message.includes('capacity_exceeded')||message.includes('stay_type_unavailable')||message.includes('invalid_')?400:message.includes('idempotency_conflict')?409:502;return json({error:message.includes('listing_unavailable')?'listing_unavailable':message.includes('capacity_exceeded')?'capacity_exceeded':message.includes('stay_type_unavailable')?'stay_type_unavailable':message.includes('idempotency_conflict')?'idempotency_conflict':code===400?'invalid_enquiry':'enquiry_not_saved'},code);}
 return json(await result.json(),201);
}
function uuid(value:unknown):value is string{return typeof value==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);}
function line(value:unknown){return typeof value==='string'?value.replace(/[\r\n\t]+/g,' ').trim()||null:null;}
