import { readdir, readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const base = 'https://lolie-portfolio.netlify.app';
const read = async f => await readFile(path.join(root,f),'utf8');
const write = async (f,t) => {await mkdir(path.dirname(path.join(root,f)),{recursive:true});await writeFile(path.join(root,f),t)};
const esc = s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const plain = s=>String(s||'').replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
const meta = (name,content,property=false)=>content?`<meta ${property?'property':'name'}="${esc(name)}" content="${esc(content)}">`:'';
const absolute = u => {if(!u)return '';if(/^https:\/\//.test(u))return u;if(/^\//.test(u))return base+u;return base+'/'+u};
const replaceHead=(html,{title,description,url,image,structured})=>{
 let out=html.replace(/<title[^>]*>.*?<\/title>/is,'').replace(/<meta\s+name=["']description["'][^>]*>/gi,'').replace(/<meta\s+content=["'][^"']*["']\s+name=["']description["'][^>]*>/gi,'');
 out=out.replace(/<link\s+rel=["']canonical["'][^>]*>/gi,'').replace(/<meta\s+property=["']og:[^>]*>/gi,'').replace(/<meta\s+name=["']twitter:card["'][^>]*>/gi,'').replace(/<script\s+type=["']application\/ld\+json["'][^>]*>.*?<\/script>/gis,'');
 const tags=`<title>${esc(title)}</title>${meta('description',description)}<link rel="canonical" href="${esc(url)}">${meta('og:type',structured?'article':'website',true)}${meta('og:title',title,true)}${meta('og:description',description,true)}${meta('og:url',url,true)}${meta('og:image',image,true)}${meta('twitter:card',image?'summary_large_image':'summary')}${structured?`<script type="application/ld+json">${JSON.stringify(structured).replace(/</g,'\\u003c')}</script>`:''}`;
 return out.replace('</head>',tags+'</head>');
};
const seo=JSON.parse(await read('content/seo.json'));
const entries=[
 ['index.html','home','/'],['projets.html','projects','/projets.html'],['photographie.html','photography','/photographie.html'],['apropos.html','about','/apropos.html']
];
for(const [f,key,route] of entries){const h=await read(f);const structured=key==='home'?{'@context':'https://schema.org','@type':'Person',name:'Lolie Martinez',url:base+'/','jobTitle':'Communication, photographie et événementiel'}:null;await write(f,replaceHead(h,{title:seo[key+'_title'],description:seo[key+'_description'],url:base+route,image:absolute(seo.share_image),structured}));}
const filenames=(await readdir(path.join(root,'content/projets'))).filter(f=>f.endsWith('.json'));
const projects=await Promise.all(filenames.map(async f=>JSON.parse(await read('content/projets/'+f))));
const ids=new Set();for(const p of projects){if(!p.id||!/^[a-z0-9-]+$/.test(p.id))throw Error('Identifiant invalide : '+p.id);if(ids.has(p.id))throw Error('Identifiant dupliqué : '+p.id);ids.add(p.id)}
projects.sort((a,b)=>(Number(a.order)||999)-(Number(b.order)||999));
await write('content/projects.json',JSON.stringify({projects},null,2)+'\n');
const template=await read('projet.html');
const dest=path.join(root,'projets');await rm(dest,{recursive:true,force:true});
const live=projects.filter(p=>p.published!==false);
for(const p of live){const url=base+'/projets/'+p.id+'/';const title=plain(p.seo_title)||`${plain(p.name)} — Projet de ${plain(p.type).toLowerCase()} | Lolie Martinez`;const description=(plain(p.seo_description)||plain(p.context)||plain(p.description)).slice(0,180);const image=absolute(p.seo_image||p.cover||seo.share_image);
 const structured={'@context':'https://schema.org','@type':'CreativeWork',name:p.name,description,url,creator:{'@type':'Person',name:'Lolie Martinez'},...(image?{image}:{})};
 let html=template.replace('<head>','<head><base href="/">').replace('<body>','<body data-project-id="'+esc(p.id)+'">');
 html=replaceHead(html,{title,description,url,image,structured});
 await write('projets/'+p.id+'/index.html',html);
}
// The legacy query-string page remains functional, but isn't indexed as a duplicate.
let legacy=await read('projet.html');if(!/name="robots"/.test(legacy))legacy=legacy.replace('</head>','<meta name="robots" content="noindex,follow"></head>');await write('projet.html',legacy);
const urls=['/','/projets.html','/photographie.html','/apropos.html',...live.map(p=>'/projets/'+p.id+'/')];
await write('sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+urls.map(u=>'  <url><loc>'+base+u+'</loc></url>').join('\n')+'\n</urlset>\n');
await write('robots.txt','User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /content/\nSitemap: '+base+'/sitemap.xml\n');
console.log(`SEO: ${live.length} pages projets, sitemap, meta et Open Graph générés.`);
