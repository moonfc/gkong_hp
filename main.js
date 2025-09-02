'use strict';

// ===== GSAP plugin =====
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

// ===== ハンバーガー =====
(function toggleNav(){
  const body = document.body;
  const hamburger = document.getElementById('js-hamburger');
  const blackBg = document.getElementById('js-black-bg');
  if (hamburger) hamburger.addEventListener('click', () => body.classList.toggle('menu-open'));
  if (blackBg) blackBg.addEventListener('click', () => body.classList.remove('menu-open'));
})();

// ===== スムーズスクロール（固定ヘッダー分オフセット） =====
window.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const headerH = header ? header.offsetHeight : 0;

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      document.body.classList.remove('menu-open');

      const rectTop = target.getBoundingClientRect().top;
      const offset = window.pageYOffset + rectTop - headerH;

      window.scrollTo({ top: Math.max(0, offset), behavior: 'smooth' });
    });
  });
});

// ===== Gallery アコーディオン（SPのみ）=====
(function galleryAccordion(){
  const isMobile = () => window.matchMedia('(max-width: 600px)').matches;
  const items = document.querySelectorAll('.list-item');

  function setInitialHeights(){
    items.forEach(item => {
      const content = item.querySelector('.list-content');
      if (!content) return;
      if (isMobile()) {
        content.style.height = '0px';
        content.classList.remove('active');
      } else {
        content.style.height = 'auto';       // ← PCは必ず全開
        content.classList.add('active');
      }
    });
  }

  setInitialHeights();
  window.addEventListener('resize', setInitialHeights);

  items.forEach(item => {
    item.addEventListener('click', () => {
      if (!isMobile()) return; // PCはアコーディオン無効
      const content = item.querySelector('.list-content');
      if (!content) return;

      const willOpen = !content.classList.contains('active');
      if (willOpen) {
        content.classList.add('active');
        content.style.height = content.scrollHeight + 'px';
      } else {
        content.classList.remove('active');
        content.style.height = '0px';
      }
    });
  });
})();

// ===== particles.js（About背面）=====
window.addEventListener('load', () => {
  const targetId = 'hoge';
  if (typeof particlesJS !== 'function' || !document.getElementById(targetId)) return;

  particlesJS(targetId, {
    particles:{
      number:{ value:500, density:{ enable:true, value_area:1500 } },
      shape:{ type:'circle', stroke:{ width:0, color:'#ffcc00' } },
      color:{ value:'#ffffff' },
      opacity:{ value:0.2, random:false, anim:{ enable:false, speed:3, opacity_min:0.1, sync:false } },
      size:{ value:1, random:true, anim:{ enable:false, speed:3, size_min:0.1, sync:false } },
      line_linked:{ enable:true, distance:150, color:'#ffffff', opacity:0.2, width:1 },
      move:{ speed:3, straight:false, direction:'none', out_mode:'out' }
    },
    interactivity:{
      detect_on:'canvas',
      events:{ onhover:{ enable:true, mode:'grab' }, onclick:{ enable:false } },
      modes:{ grab:{ distance:150, line_linked:{ opacity:0.2 } } }
    },
    retina_detect:true, resize:true
  });
});

// ===== スクロール出現アニメ =====
window.addEventListener('DOMContentLoaded', () => {
  if (!window.gsap || !window.ScrollTrigger) return;

  document.querySelectorAll('.animation').forEach((el) => {
    gsap.fromTo(
      el,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.3, scrollTrigger: { trigger: el, start: 'top 90%', ease: 'expo' } }
    );
  });
});
