import { useEffect, useState } from 'react';

export interface Campsite {
  id: string; slug: string; title: string; state: string; destination: string;
  description: string; image: string; imageSource: string; operator: string;
  sourceUrl: string; checkedAt: string; styles: string[]; amenities: string[];
  price: number | null; priceUnit: string; maxGuests: number | null;
  verification: 'source-reviewed' | 'host-confirmed';
}
export const campingStyles = [
  ['own-tent','Own-tent camping'], ['hosted-tent','Hosted tents'], ['glamping','Glamping'],
  ['campervan','Campervan & RV'], ['farm','Farm stays'], ['road-stop','Road stops'], ['nature-stay','Nature stays'],
] as const;
export function useCatalogue() {
  const [campsites,setCampsites] = useState<Campsite[]>([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState('');
  useEffect(()=>{ const controller=new AbortController();
    fetch('/api/search',{signal:controller.signal}).then(async response=>{
      if(!response.ok) throw new Error('Campsites could not load. Please try again.');
      const data=await response.json(); if(!Array.isArray(data.campsites)) throw new Error('Campsites could not load.');
      setCampsites(data.campsites);
    }).catch(e=>{if(e.name!=='AbortError')setError(e.message);}).finally(()=>{if(!controller.signal.aborted)setLoading(false);});
    return ()=>controller.abort();
  },[]);
  return {campsites,loading,error};
}
export function normalizePlace(value:string) { return value.toLowerCase().replace(/bangalore/g,'bengaluru').replace(/coorg/g,'kodagu').replace(/wagamon/g,'vagamon').trim(); }
export function filterCampsites(items:Campsite[], params:URLSearchParams) {
  const q=normalizePlace(params.get('query')||params.get('q')||'');
  const result=items.filter(c=>{
    const style=params.get('style'); const state=params.get('state'); const amenity=params.get('amenity'); const max=Number(params.get('maxPrice'));
    return (!q||normalizePlace(`${c.title} ${c.destination} ${c.state} ${c.description}`).includes(q)) &&
      (!style||c.styles.includes(style))&&(!state||state===c.state)&&(!amenity||c.amenities.includes(amenity))&&
      (!max||(c.price!==null&&c.price<=max));
  });
  if(params.get('sort')==='price') result.sort((a,b)=>(a.price??Infinity)-(b.price??Infinity));
  if(params.get('sort')==='name') result.sort((a,b)=>a.title.localeCompare(b.title));
  return result;
}
