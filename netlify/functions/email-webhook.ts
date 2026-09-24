import { getSupabaseConfig, json, supabaseRequest } from '../lib/marketplace';
export default async function emailWebhook(request:Request){
 if(request.method!=='POST')return json({error:'method_not_allowed'},405);
 const secret=process.env.RESEND_WEBHOOK_SECRET,db=getSupabaseConfig();if(!secret||!db)return json({error:'webhook_not_configured'},503);
 const raw=await request.text(),id=request.headers.get('svix-id'),timestamp=request.headers.get('svix-timestamp'),signature=request.headers.get('svix-signature');
 if(!id||!timestamp||!signature||!await verifySignature(secret,`${id}.${timestamp}.${raw}`,signature))return json({error:'invalid_signature'},400);
 let event:{type?:string;data?:{email_id?:string;id?:string}};try{event=JSON.parse(raw);}catch{return json({error:'invalid_json'},400);}
 const type=event.type||'',emailId=event.data?.email_id||event.data?.id;if(!/^email\.(sent|delivered|delivery_delayed|bounced|complained|failed|suppressed)$/.test(type)||!emailId)return json({received:true,ignored:true});
 const inserted=await supabaseRequest(db,'/rest/v1/email_webhook_events',{method:'POST',headers:{Prefer:'resolution=ignore-duplicates,return=minimal'},body:JSON.stringify({id,event_type:type,email_id:emailId,payload:event})});
 if(!inserted.ok)return json({error:'event_not_saved'},502);
 const status=type==='email.delivered'?'delivered':type==='email.bounced'?'bounced':type==='email.complained'?'complained':type==='email.failed'||type==='email.suppressed'?'failed':type==='email.delivery_delayed'?'delayed':'sent';
 const updated=await supabaseRequest(db,`/rest/v1/email_outbox?provider_message_id=eq.${encodeURIComponent(emailId)}&status=not.in.(delivered,bounced,complained)`,{method:'PATCH',body:JSON.stringify({status,last_error:type==='email.bounced'||type==='email.failed'||type==='email.complained'||type==='email.suppressed'?JSON.stringify(event.data).slice(0,1000):null})});
 return updated.ok?json({received:true}):json({error:'event_status_not_saved'},502);
}
async function verifySignature(secret:string,signed:string,header:string){
 const id=header.split(',')[0]?.trim();const timestamp=Number(signed.split('.')[1]);if(!Number.isFinite(timestamp)||Math.abs(Date.now()/1000-timestamp)>300)return false;
 let key=secret;try{if(secret.startsWith('whsec_'))key=atob(secret.slice(6));}catch{return false;}
 const cryptoKey=await crypto.subtle.importKey('raw',new TextEncoder().encode(key),{name:'HMAC',hash:'SHA-256'},false,['sign']);const signature=new Uint8Array(await crypto.subtle.sign('HMAC',cryptoKey,new TextEncoder().encode(signed)));
 const expected=typeof btoa==='function'?btoa(String.fromCharCode(...signature)):'';
 return header.split(' ').some(part=>part===`v1,${expected}`)||header.split(' ').some(part=>part===`${id},v1,${expected}`);
}
