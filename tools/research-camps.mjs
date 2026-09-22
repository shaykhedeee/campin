import { writeFile, mkdir } from 'node:fs/promises';
const urls = process.argv.slice(2);
await mkdir('data/research/camps', {recursive:true});
for (const [i,url] of urls.entries()) {
 try {
  const response = await fetch(url, {signal:AbortSignal.timeout(25000)});
  const html = await response.text();
  const links = [...new Set([...html.matchAll(/href=["']([^"']+)["']/g)].map(m=>m[1]))];
  const images = [...new Set([...html.matchAll(/(?:src|content)=["']([^"']+\.(?:jpg|jpeg|png|webp)[^"']*)["']/gi)].map(m=>m[1]))];
  const text = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
  const result = {url,status:response.status,images,links,text};
  await writeFile(`data/research/camps/${new URL(url).hostname}-${i}.json`,JSON.stringify(result,null,2));
  console.log(JSON.stringify({url,status:response.status,images:images.slice(0,5),links:links.filter(x=>/resort|camp|wa.me/.test(x)).slice(0,40),text:text.slice(-800)}));
 } catch(e) {console.log(JSON.stringify({url,error:e.message}));}
}
