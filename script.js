const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.links');toggle?.addEventListener('click',()=>{const opened=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(opened));});nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false')}));document.querySelectorAll('#year').forEach(el=>el.textContent=new Date().getFullYear());

// Progressive enhancement: never hide content when scripts or observers are unavailable.
(()=>{if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
const selectors=['.hero-bottom','.section-head','.project-card','.photo-head','.about-layout','.contact-bottom','.subhero','.case-intro','.case-gallery figure','.personality-grid article'];
const nodes=[...document.querySelectorAll(selectors.join(','))];if(!nodes.length)return;
const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('motion-visible');io.unobserve(e.target)}})},{threshold:.08,rootMargin:'0px 0px -30px 0px'});
nodes.forEach(el=>{el.classList.add('motion-reveal');io.observe(el)});document.documentElement.classList.add('js-motion');
})();

/* V7.6 - Une seule étoile, sur la homepage. */
(()=>{
 const hero=document.querySelector('.hero-tattoo-star');
 const title=document.querySelector('.hero-title h1');
 if(!hero)return;
 hero.innerHTML='<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M50 3 C53 47 60 62 97 70 C60 78 53 93 50 137 C47 93 40 78 3 70 C40 62 47 47 50 3 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round"/></svg>';
 if(!title||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 let scheduled=false;
 const animate=()=>{scheduled=false;const progress=Math.max(0,Math.min(window.scrollY/(window.innerHeight||800),1));hero.style.setProperty('--star-turn',`${progress*65}deg`);hero.style.setProperty('--star-rise',`${progress*-26}px`);title.style.setProperty('--title-rise',`${progress*-16}px`)};
 window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(animate)}},{passive:true});animate();
})();
