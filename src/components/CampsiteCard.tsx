import { Link } from 'react-router-dom';
import { MapPin, ArrowUpRight, Tent } from 'lucide-react';
import { useState } from 'react';
import type { Campsite } from '../lib/catalogue';
export function PropertyImage({site,className=''}:{site:Campsite;className?:string}) {
 const [failed,setFailed]=useState(false);
 return site.image&&!failed?<img loading="lazy" decoding="async" src={site.image} alt={`${site.title} — photo on the operator's property page`} onError={()=>setFailed(true)} className={className}/>:<div className={`${className} flex items-center justify-center bg-sand text-forest`}><Tent size={44}/><span className="ml-3 text-sm">Property photos on operator website</span></div>;
}
export default function CampsiteCard({site}:{site:Campsite}) {return <article className="overflow-hidden rounded-2xl border border-forest/10 bg-white">
 <Link to={`/listing/${site.slug}`} className="group block"><div className="relative aspect-[4/3]"><PropertyImage site={site} className="h-full w-full object-cover"/><span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-forest">{site.verification==='host-confirmed'?'Host confirmed':'Official source reviewed'}</span></div><div className="p-5"><p className="flex items-center gap-1 text-xs text-textgrey"><MapPin size={13}/>{site.destination}, {site.state}</p><h3 className="mt-2 text-xl font-bold text-forest">{site.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-textgrey">{site.description}</p><div className="mt-5 flex items-center justify-between border-t border-forest/10 pt-4"><span className="text-sm font-bold">{site.price?`From ₹${site.price.toLocaleString('en-IN')} / ${site.priceUnit}`:'Ask operator for pricing'}</span><ArrowUpRight size={20}/></div></div></Link>
 </article>;}
