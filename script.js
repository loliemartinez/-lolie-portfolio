const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.links');toggle?.addEventListener('click',()=>{const opened=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(opened));});nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false')}));document.querySelectorAll('#year').forEach(el=>el.textContent=new Date().getFullYear());

// Progressive enhancement: never hide content when scripts or observers are unavailable.
(()=>{if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
const selectors=['.hero-bottom','.section-head','.project-card','.photo-head','.about-layout','.contact-bottom','.subhero','.case-intro','.case-gallery figure','.personality-grid article'];
const nodes=[...document.querySelectorAll(selectors.join(','))];if(!nodes.length)return;
const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('motion-visible');io.unobserve(e.target)}})},{threshold:.08,rootMargin:'0px 0px -30px 0px'});
nodes.forEach(el=>{el.classList.add('motion-reveal');io.observe(el)});document.documentElement.classList.add('js-motion');
})();

/* V7.4 - Motif personnel : étoile à quatre branches, 17 emplacements éditoriaux. */
(()=>{
 const shape='<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M50 5 C53 31 60 40 95 50 C60 53 53 64 50 95 C47 64 39 53 5 50 C39 47 47 36 50 5 Z" fill="none" stroke="currentColor" stroke-width="3.3" stroke-linejoin="round" stroke-linecap="round"/></svg>';
 const pathname=location.pathname.split('/').pop()||'index.html';
 const config={
 'index.html':[['.hero-tattoo-star','hero'],['#projets','top-right'],['.photo','bottom-left'],['.about','top-right'],['.contact','bottom-right']],
 'projets.html':[['.subhero','top-right'],['.listing','top-right'],['.listing','bottom-left']],
 'photographie.html':[['.photo-subhero','top-right'],['.gallery-intro','inline'],['.photo-masonry','bottom-right']],
 'apropos.html':[['.subhero','top-right'],['.about-page','top-right'],['.skills-strip','inline'],['.about-page','bottom-left']],
 'projet.html':[['.detail-hero','top-right'],['.case-work','top-right']]
 };
 // 17 emplacements uniques sur les 5 gabarits : 5 + 3 + 3 + 4 + 2.
 (config[pathname]||[]).forEach(([selector,place],i)=>{
  const parent=document.querySelector(selector);if(!parent)return;
  let node=(selector==='.hero-tattoo-star')?parent:document.createElement('span');
  if(node!==parent){node.className='tattoo-star tattoo-star--detail tattoo-star--'+place;node.setAttribute('aria-hidden','true');parent.appendChild(node)}
  node.innerHTML=shape;
  if(i>0)node.classList.add('tattoo-star--subtle');
 });
 const hero=document.querySelector('.hero-tattoo-star');
 const title=document.querySelector('.hero-title h1');
 if(!hero||!title||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 let pending=false;
 const animate=()=>{pending=false;const progress=Math.max(0,Math.min(window.scrollY/(window.innerHeight||800),1));hero.style.setProperty('--star-turn',`${progress*110}deg`);hero.style.setProperty('--star-rise',`${progress*-34}px`);title.style.setProperty('--title-rise',`${progress*-20}px`)};
 window.addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(animate)}},{passive:true});animate();
})();
