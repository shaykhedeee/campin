import { afterEach, expect, it, vi } from 'vitest';
import account from '../functions/account';
afterEach(()=>{vi.unstubAllGlobals();vi.unstubAllEnvs();});
function setup(){vi.stubEnv('SUPABASE_URL','https://test.supabase.co');vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY','test-server-key');}
it('requires authentication for account data',async()=>{setup();expect((await account(new Request('https://campin.co.in/api/account'))).status).toBe(401);});
it('only updates the authenticated profile and whitelisted fields',async()=>{
 setup();const calls:Array<{url:string;init?:RequestInit}>=[];
 vi.stubGlobal('fetch',vi.fn(async(url:string,init?:RequestInit)=>{calls.push({url,init});return Response.json(url.includes('/auth/')?{id:'authenticated-user'}:[{id:'authenticated-user'}]);}));
 const result=await account(new Request('https://campin.co.in/api/account',{method:'POST',headers:{Authorization:'Bearer test'},body:JSON.stringify({action:'profile',id:'other-user',role:'owner',full_name:'Camper Name',phone:'+919876543210',city:'Bengaluru'})}));
 expect(result.status).toBe(200);expect(calls[1].url).toContain('id=eq.authenticated-user');expect(JSON.parse(String(calls[1].init?.body))).toEqual({full_name:'Camper Name',phone:'+919876543210',city:'Bengaluru'});
});
it('reports storage failures without claiming a save',async()=>{setup();vi.stubGlobal('fetch',vi.fn(async(url:string)=>url.includes('/auth/')?Response.json({id:'user'}):new Response('',{status:503})));const result=await account(new Request('https://campin.co.in/api/account',{method:'POST',headers:{Authorization:'Bearer test'},body:JSON.stringify({action:'profile',full_name:'Camper',phone:'',city:''})}));expect(result.status).toBe(502);});
