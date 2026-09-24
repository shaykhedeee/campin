type OutboxEmail = { event_key:string; template_key:string; recipient:string; payload:Record<string,unknown>; attempts:number };
const escapeHtml=(value:string)=>value.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]||c));
function flatten(value:unknown,prefix=''):Array<[string,string]>{
 if(value===null||value===undefined||value==='')return [];
 if(Array.isArray(value))return value.flatMap((v,i)=>flatten(v,`${prefix} ${i+1}`));
 if(typeof value==='object')return Object.entries(value as Record<string,unknown>).flatMap(([k,v])=>flatten(v,prefix?`${prefix} / ${label(k)}`:label(k)));
 return [[prefix,String(value)]];
}
function label(value:string){return value.replace(/([a-z])([A-Z])/g,'$1 $2').replace(/[_-]/g,' ').replace(/^./,x=>x.toUpperCase());}
function date(value:unknown){const parsed=new Date(String(value||''));return Number.isNaN(parsed.getTime())?'Not supplied':new Intl.DateTimeFormat('en-IN',{dateStyle:'medium',timeStyle:'short',timeZone:'Asia/Kolkata'}).format(parsed)+' IST';}
export function renderOutboxEmail(email:OutboxEmail,from:string){
 const data=email.payload;
 if(email.template_key==='enquiry_ack'){
  const name=String(data.name||'there'),reference=String(data.reference||'Campin'),listing=String(data.listing||'your campsite');
  const text=`Hi ${name},\n\nYour enquiry for ${listing} is saved.\nRequested dates: ${String(data.start_date||'Not supplied')} to ${String(data.end_date||'Not supplied')}\nGuests: ${String(data.guests||'Not supplied')}\nCampin reference: ${reference}\n\nAvailability is awaiting host confirmation. This is not a booking confirmation. Campin will contact you if follow-up is needed.`;
  return {from,to:[email.recipient],subject:`Enquiry received · ${reference}`,text,html:`<div style="font:16px/1.6 Arial,sans-serif;color:#183d2b;max-width:600px;margin:auto"><h1 style="color:#183d2b">Your campsite enquiry is saved</h1><p>Hi ${escapeHtml(name)},</p><p>We received your enquiry for <strong>${escapeHtml(listing)}</strong>.</p><p>Requested dates: ${escapeHtml(String(data.start_date||'Not supplied'))} to ${escapeHtml(String(data.end_date||'Not supplied'))}<br>Guests: ${escapeHtml(String(data.guests||'Not supplied'))}</p><p>Campin reference: <strong>${escapeHtml(reference)}</strong></p><p>Availability is awaiting host confirmation. This is not a booking confirmation.</p></div>`};
 }
 if(email.template_key==='lead_ack'){
  const name=typeof data.name==='string'?data.name:'there';const reference=String(data.reference||'Campin');
  const pending=data.type==='listing_inquiry';
  const text=`Hi ${name},\n\nWe received your ${label(String(data.type||'Campin'))} submission. Your reference is ${reference}.\n${pending?'Availability is awaiting host confirmation. This is not a booking confirmation.\n':''}\nOur team will review the details and follow up if needed.\n\nCampin — find a place, then connect with the host.`;
  return {from,to:[email.recipient],replyTo:from,subject:`We received your Campin submission · ${reference}`,text,html:`<div style="font:16px/1.6 Arial,sans-serif;color:#183d2b;max-width:600px;margin:auto"><h1 style="color:#183d2b">We received your submission</h1><p>Hi ${escapeHtml(name)},</p><p>We received your ${escapeHtml(label(String(data.type||'Campin')))} submission.</p><p>Reference: <strong>${escapeHtml(reference)}</strong></p>${pending?'<p>Availability is awaiting host confirmation. This is not a booking confirmation.</p>':''}<p>Our team will review the details and follow up if needed.</p><p>Campin — find a place, then connect with the host.</p></div>`};
 }
 const values=flatten(data).slice(0,100);const received=date(data.created_at||data.submitted_at);const dashboard='https://campin.co.in/admin.html#/workspace';
 const reference=email.event_key.replace(/^(lead-alert:|enquiry-alert:)/,'');
 const text=[`New Campin ${label(String(data.lead_type||email.template_key.replace('lead_','')))} submission`,`Reference: ${reference}`,`Received: ${received}`,...values.map(([key,value])=>`${key}: ${value}`),'',`Open the authenticated Campin owner dashboard: ${dashboard}`].join('\n');
 const rows=values.map(([key,value])=>`<tr><th align="left" style="padding:8px;border-bottom:1px solid #e5e7eb;vertical-align:top">${escapeHtml(key)}</th><td style="padding:8px;border-bottom:1px solid #e5e7eb">${escapeHtml(value)}</td></tr>`).join('');
 return {from,to:[email.recipient],replyTo:typeof data.email==='string'?data.email:undefined,subject:`Campin ${label(String(data.lead_type||'form'))}: ${String(data.name||data.email||email.event_key).slice(0,120)}`,text,html:`<div style="font:15px/1.5 Arial,sans-serif;color:#183d2b;max-width:680px;margin:auto"><h1>Campin form submission</h1><p>Reference <strong>${escapeHtml(reference)}</strong> · ${escapeHtml(received)}</p><table style="border-collapse:collapse;width:100%">${rows}</table><p><a href="${dashboard}">Open the authenticated Campin owner dashboard</a></p></div>`};
}
