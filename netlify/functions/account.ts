import { authenticatedUserId, getSupabaseConfig, json, supabaseRequest } from '../lib/marketplace';

export default async function account(request: Request) {
  if (!['GET', 'POST'].includes(request.method)) return json({error:'method_not_allowed'},405);
  const config=getSupabaseConfig(); if(!config)return json({error:'service_unavailable'},503);
  try {
    const user=await authenticatedUserId(config,request); if(!user)return json({error:'authentication_required'},401);
    if(request.method==='GET') {
      const responses=await Promise.all([
        supabaseRequest(config,`/rest/v1/profiles?id=eq.${user}&select=full_name,phone,city,email`),
        supabaseRequest(config,`/rest/v1/inquiries?camper_profile_id=eq.${user}&select=id,tracking_id,start_date,end_date,guests,status,created_at,listings(title,slug)&order=created_at.desc&limit=100`),
        supabaseRequest(config,`/rest/v1/favourites?profile_id=eq.${user}&select=listing_id,listings!inner(title,slug,is_published)&listings.is_published=eq.true&limit=100`),
      ]);
      if(responses.some(r=>!r.ok))return json({error:'account_unavailable'},502);
      const [profiles,enquiries,favourites]=await Promise.all(responses.map(r=>r.json()));
      return json({profile:profiles[0]||{},enquiries,favourites});
    }
    const input=await request.json();
    if(input?.action==='profile') {
      if(typeof input.full_name!=='string'||input.full_name.trim().length<2||input.full_name.length>120||typeof input.phone!=='string'||(input.phone&&!/^\+[1-9]\d{7,14}$/.test(input.phone))||typeof input.city!=='string'||input.city.length>120)return json({error:'invalid_contact_details'},400);
      const result=await supabaseRequest(config,`/rest/v1/profiles?id=eq.${user}`,{method:'PATCH',headers:{Prefer:'return=representation'},body:JSON.stringify({full_name:input.full_name.trim(),phone:input.phone,city:input.city.trim()})});
      if(!result.ok)return json({error:'profile_not_saved'},502);
      const rows=await result.json();return rows.length?json({saved:true}):json({error:'profile_missing'},409);
    }
    if(input?.action==='favourite'&&typeof input.listingId==='string'&&/^[0-9a-f-]{36}$/i.test(input.listingId)&&typeof input.saved==='boolean') {
      if(input.saved){const check=await supabaseRequest(config,`/rest/v1/listings?id=eq.${input.listingId}&is_published=eq.true&select=id`);if(!check.ok)return json({error:'listing_unavailable'},502);if(!(await check.json()).length)return json({error:'listing_unavailable'},404);}
      const result=await supabaseRequest(config,input.saved?'/rest/v1/favourites':`/rest/v1/favourites?profile_id=eq.${user}&listing_id=eq.${input.listingId}`,{method:input.saved?'POST':'DELETE',headers:{Prefer:'resolution=ignore-duplicates'},...(input.saved?{body:JSON.stringify({profile_id:user,listing_id:input.listingId})}:{})});
      return result.ok?json({saved:input.saved}):json({error:'favourite_not_saved'},502);
    }
    return json({error:'invalid_action'},400);
  }catch{return json({error:'account_request_failed'},502);}
}
