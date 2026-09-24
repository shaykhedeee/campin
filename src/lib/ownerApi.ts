import { supabase } from './adminAuth';
export async function ownerRequest<T=any>(body?:Record<string,unknown>):Promise<T>{
 const {data}=await supabase?.auth.getSession()||{};const session=data?.session;if(!session)throw new Error('Owner sign-in expired. Sign in again.');
 const response=await fetch('/api/owner',{method:body?'POST':'GET',headers:{Authorization:`Bearer ${session.access_token}`,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});
 const result=await response.json();if(!response.ok)throw new Error(result.error?.replace(/_/g,' ')||'Owner request failed.');return result;
}
