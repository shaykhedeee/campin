import { getSupabaseConfig, json, supabaseRequest } from '../lib/marketplace';
import { renderOutboxEmail } from '../lib/emailTemplates';
export const config={schedule:'*/5 * * * *'};
type Queued={id:string;event_key:string;template_key:string;recipient:string;payload:Record<string,unknown>;attempts:number};
export default async function processEmailOutbox(_request:Request){
 const db=getSupabaseConfig(),apiKey=process.env.RESEND_API_KEY,from=process.env.RESEND_FROM;
 if(!db||!apiKey||!from)return json({error:'email_provider_not_configured'},503);
 const claimed=await supabaseRequest(db,'/rest/v1/rpc/campin_claim_email_batch',{method:'POST',body:JSON.stringify({p_limit:10})});
 if(!claimed.ok)return json({error:'outbox_unavailable'},502);
 const items=await claimed.json() as Queued[];let sent=0,failed=0;
 for(const item of items){
  try{
   const mail=renderOutboxEmail(item,from);const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json','Idempotency-Key':`campin-${item.event_key}`},body:JSON.stringify(mail),signal:AbortSignal.timeout(12000)});
   const result=await response.json().catch(()=>({})) as {id?:string;message?:string};
   if(!response.ok){const permanent=response.status>=400&&response.status<500&&response.status!==429;await markFailure(db,item,`${response.status}: ${result.message||'Resend rejected the message'}`,permanent);failed++;continue;}
   const saved=await supabaseRequest(db,`/rest/v1/email_outbox?id=eq.${item.id}`,{method:'PATCH',body:JSON.stringify({status:'sent',provider_message_id:result.id||null,sent_at:new Date().toISOString(),last_error:null})});if(saved.ok)sent++;else failed++;
  }catch(error){await markFailure(db,item,error instanceof Error?error.message:'Email provider unavailable',false);failed++;}
 }
 return json({processed:items.length,sent,failed});
}
async function markFailure(db:NonNullable<ReturnType<typeof getSupabaseConfig>>,item:Queued,error:string,permanent:boolean){
 const retry=item.attempts<5&&!permanent;const delay=Math.min(3600,30*2**Math.max(0,item.attempts-1));
 await supabaseRequest(db,`/rest/v1/email_outbox?id=eq.${item.id}`,{method:'PATCH',body:JSON.stringify({status:retry?'retry':'failed',last_error:error.slice(0,1000),next_attempt_at:new Date(Date.now()+delay*1000).toISOString()})});
}
