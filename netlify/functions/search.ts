import { getSupabaseConfig, json, supabaseRequest } from '../lib/marketplace';
type Campsite={id:string;slug:string;title:string;state:string;destination:string;description:string;image:string;imageSource:string;operator:string;sourceUrl:string;checkedAt:string;styles:string[];amenities:string[];price:number|null;priceUnit:string;maxGuests:number|null;verification:'source-reviewed'|'host-confirmed'};
export default async function search(request:Request):Promise<Response>{
 if(request.method!=='GET')return json({error:'method_not_allowed'},405);
 const config=getSupabaseConfig();if(!config)return json({error:'service_not_configured'},503);
 try {
 const response=await supabaseRequest(config,'/rest/v1/listings?is_published=eq.true&select=id,slug,title,public_summary,price_from_inr,price_unit,max_guests,last_checked_at,catalogue_details,properties(region,state)&order=created_at.asc&limit=1000');
 if(!response.ok)return json({error:'search_unavailable'},502);
 const rows=await response.json();
 const sites:Campsite[]=rows.map((r:{id:string;slug:string;title:string;public_summary:string;price_from_inr:number|null;price_unit:string;max_guests:number|null;last_checked_at:string;catalogue_details:Partial<Campsite>;properties:{region:string;state:string}})=>({
 id:r.id,slug:r.slug,title:r.title,description:r.public_summary,price:r.price_from_inr,priceUnit:r.price_unit,maxGuests:r.max_guests,checkedAt:r.last_checked_at,
 state:r.properties?.state||'',destination:r.properties?.region||'', image:r.catalogue_details?.image||'',imageSource:r.catalogue_details?.imageSource||'',operator:r.catalogue_details?.operator||'',sourceUrl:r.catalogue_details?.sourceUrl||'',styles:r.catalogue_details?.styles||[],amenities:r.catalogue_details?.amenities||[],verification:r.catalogue_details?.verification==='host-confirmed'?'host-confirmed':'source-reviewed',
 }));
 const params=new URL(request.url).searchParams;const slug=params.get('slug');
 const q=normalize(params.get('query')||params.get('q')||''); const style=params.get('style');const state=params.get('state');const amenity=params.get('amenity');const max=Number(params.get('maxPrice'));
 const campsites=slug?sites.filter(s=>s.slug===slug||s.id===slug):sites.filter(s=>(!q||normalize(`${s.title} ${s.destination} ${s.state} ${s.description}`).includes(q))&&(!style||s.styles.includes(style))&&(!state||s.state===state)&&(!amenity||s.amenities.includes(amenity))&&(!max||(s.price!==null&&s.price<=max)));
 return json({campsites,destinations:[...new Set(sites.map(s=>s.destination))]});
 }catch{return json({error:'search_unavailable'},503);}
}
function normalize(value:string){return value.toLowerCase().replace(/bangalore/g,'bengaluru').replace(/coorg/g,'kodagu').replace(/wagamon/g,'vagamon').trim();}
