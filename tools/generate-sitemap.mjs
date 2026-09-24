import { readFile, writeFile } from 'node:fs/promises';
const root=new URL('../',import.meta.url);
const [app,blogs,guides]=await Promise.all([
 readFile(new URL('src/App.tsx',root),'utf8'),readFile(new URL('src/data/blogPosts.ts',root),'utf8'),readFile(new URL('src/data/campingGuides.ts',root),'utf8'),
]);
const urls=new Set(['/','/explore','/about','/host-your-land','/waitlist','/suggest-campsite','/camping-guides','/blog','/privacy','/terms','/responsible-camping-pledge']);
for(const [,path] of app.matchAll(/<Route path="(\/[^"*:]+)"/g))if(!['/auth','/account','/confirmation','/admin.html','/signup','/coming-soon','/community'].includes(path))urls.add(path);
const blogArray=blogs.match(/const publishedBlogPosts: BlogPost\[\] = \[([\s\S]*?)\n\];/);
for(const [,slug] of blogArray?.[1].matchAll(/^\s{4}"slug": "([^"]+)"/gm)||[])urls.add(`/blog/${slug}`);
const guideArray=guides.slice(guides.indexOf('export const campingGuides: CampingGuide[] = ['));
for(const [,slug] of guideArray.matchAll(/^\s{4}slug: "([^"]+)"/gm))urls.add(`/camping-guides/${slug}`);
let previousListingPaths=[];
try{const previous=await readFile(new URL('public/sitemap.xml',root),'utf8');previousListingPaths=Array.from(previous.matchAll(/<loc>https:\/\/campin\.co\.in(\/listing\/[a-z0-9-]+)<\/loc>/g),match=>match[1]);}catch{}
if(process.env.SUPABASE_URL&&process.env.SUPABASE_SERVICE_ROLE_KEY){
 try{const response=await fetch(`${process.env.SUPABASE_URL.replace(/\/$/,'')}/rest/v1/listings?is_published=eq.true&select=slug&limit=2000`,{headers:{apikey:process.env.SUPABASE_SERVICE_ROLE_KEY,Authorization:`Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`}});if(response.ok){for(const row of await response.json())if(row.slug)urls.add(`/listing/${row.slug}`);}else console.warn('Published listing sitemap query failed; page sitemap will include editorial routes only.');}catch{console.warn('Published listing sitemap query unavailable; page sitemap will include editorial routes only.');}
}else for(const path of previousListingPaths)urls.add(path);
const xml=[`<?xml version="1.0" encoding="UTF-8"?>`,`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,...Array.from(urls).sort().map(path=>`  <url><loc>https://campin.co.in${path}</loc></url>`),`</urlset>`].join('\n')+'\n';
await writeFile(new URL('public/sitemap.xml',root),xml);
console.log(`Generated sitemap with ${urls.size} canonical public URLs.`);
