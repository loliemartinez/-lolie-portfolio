const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.links');toggle?.addEventListener('click',()=>{const opened=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(opened));});nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false')}));document.querySelectorAll('#year').forEach(el=>el.textContent=new Date().getFullYear());

// Progressive enhancement: never hide content when scripts or observers are unavailable.
(()=>{if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
const selectors=['.hero-bottom','.section-head','.project-card','.photo-head','.about-layout','.contact-bottom','.subhero','.case-intro','.case-gallery figure','.personality-grid article'];
const nodes=[...document.querySelectorAll(selectors.join(','))];if(!nodes.length)return;
const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('motion-visible');io.unobserve(e.target)}})},{threshold:.08,rootMargin:'0px 0px -30px 0px'});
nodes.forEach(el=>{el.classList.add('motion-reveal');io.observe(el)});document.documentElement.classList.add('js-motion');
})();
