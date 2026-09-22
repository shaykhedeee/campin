import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/adminAuth';
import { safeReturnPath } from '../lib/authReturn';
export default function AuthCallback() {
 const location=useLocation();const navigate=useNavigate();const [error,setError]=useState('');
 useEffect(()=>{let active=true;const params=new URLSearchParams(location.search);
 const finish=async()=>{if(!supabase)throw new Error('Sign-in is unavailable. Please try again later.');
 if(params.get('error'))throw new Error('Sign-in was cancelled or expired. Request a new code.');
 const code=params.get('code');if(code){const result=await supabase.auth.exchangeCodeForSession(code);if(result.error)throw result.error;}
 const {data,error}=await supabase.auth.getSession();if(error||!data.session)throw new Error('Please sign in again.');
 if(active)navigate(safeReturnPath(params.get('next')),{replace:true});};
 void finish().catch(e=>{if(active)setError(e instanceof Error?e.message:'Sign-in failed.');});return()=>{active=false;};},[location.search,navigate]);
 return <main className="min-h-screen bg-offwhite pt-36 text-center text-forest"><p role="status">{error||'Completing your sign-in…'}</p>{error&&<Link to="/auth" className="mt-4 inline-block underline">Return to sign in</Link>}</main>;
}
