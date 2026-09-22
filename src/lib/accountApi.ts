import { supabase } from './adminAuth';
export type AccountData={profile:{full_name?:string;phone?:string;city?:string;email?:string};enquiries:Array<{id:string;tracking_id:string;start_date:string;end_date:string;guests:number;status:string;listings:{title:string;slug:string}|null}>;favourites:Array<{listing_id:string;listings:{title:string;slug:string}}>};
export async function accountRequest<T=AccountData>(body?:Record<string,unknown>):Promise<T>{
 const {data}=await supabase?.auth.getSession()||{};
 if(!data?.session)throw new Error('Please sign in again.');
 const response=await fetch('/api/account',{method:body?'POST':'GET',headers:{Authorization:`Bearer ${data.session.access_token}`,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});
 const result=await response.json();if(!response.ok)throw new Error(result.error?.replace(/_/g,' ')||'Please try again.');return result;
}
