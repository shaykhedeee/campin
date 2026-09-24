import { leadInputSchema } from '../../src/lib/leadSchema';
import { getSupabaseConfig, json, supabaseRequest } from '../lib/marketplace';
export default async function notifyLead(request:Request){
 if(request.method!=='POST')return json({error:'method_not_allowed'},405);
 const config=getSupabaseConfig(),recipient=process.env.LEAD_ALERT_TO||'support@campin.co.in';if(!config)return json({error:'lead_storage_unavailable'},503);
 let raw:unknown;try{raw=await request.json();}catch{return json({error:'invalid_json'},400);}
 const parsed=leadInputSchema.safeParse(raw);if(!parsed.success)return json({error:parsed.error.issues[0]?.message||'invalid_submission'},400);
 const source=raw as Record<string,unknown>;const id=typeof source.id==='string'?source.id:'';if(!/^[A-Z0-9-]{6,100}$/i.test(id))return json({error:'invalid_reference'},400);
 const submission={...parsed.data,id,createdAt:typeof source.createdAt==='string'?source.createdAt:new Date().toISOString()};
 if(submission.sourcePage==='/suggest-campsite'){
  const payload=submission.payload,place=payload.place,relationship=payload.relationship,map=payload.mapLink;
  if(submission.type!=='road_stop'||payload.submissionKind!=='campsite_suggestion'||typeof place!=='string'||!place.trim()||place.length>180||typeof relationship!=='string'||!relationship.trim()||relationship.length>500||typeof submission.city!=='string'||!submission.city.trim())return json({error:'invalid_campsite_suggestion'},400);
  if(map!==undefined&&map!==''&&(typeof map!=='string'||map.length>1000||!isHttpsUrl(map)))return json({error:'invalid_suggestion_map_url'},400);
 }
 const result=await supabaseRequest(config,'/rest/v1/rpc/campin_queue_lead_emails',{method:'POST',body:JSON.stringify({p_lead:submission,p_alert_to:recipient})});
 if(!result.ok){const detail=await result.text().catch(()=> '');return json({error:detail.includes('submission_conflict')?'submission_conflict':'lead_not_saved'},detail.includes('submission_conflict')?409:502);}
 return json({persisted:true,notification:'queued',id},202);
}
function isHttpsUrl(value:string){try{return new URL(value).protocol==='https:';}catch{return false;}}
