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
      document.body.classList.remove('menu-open'); // モバイルメニューを閉じる

      const rectTop = target.getBoundingClientRect().top;
      const offset = window.pageYOffset + rectTop - headerH;

      window.scrollTo({
        top: Math.max(0, offset),
        behavior: 'smooth'
      });
    });
  });
});

// ===== Gallery アコーディオン（スマホのみ）=====
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
        content.style.height = 'auto';
        content.classList.add('active');
      }
    });
  }

  setInitialHeights();
  window.addEventListener('resize', setInitialHeights);

  items.forEach(item => {
    item.addEventListener('click', () => {
      if (!isMobile()) return; // PCは常時展開
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

// ===== タイポグラフィ（タイプライター）=====
(function(){
  function TxtRotate(el, toRotate, period) {
    this.toRotate = toRotate; this.el = el; this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = ''; this.isDeleting = false; this.tick();
  }
  TxtRotate.prototype.tick = function() {
    const i = this.loopNum % this.toRotate.length;
    const fullTxt = this.toRotate[i];
    this.txt = this.isDeleting ? fullTxt.substring(0, this.txt.length - 1)
                               : fullTxt.substring(0, this.txt.length + 1);
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    let delta = 300 - Math.random() * 100;
    if (this.isDeleting) delta /= 2;
    if (!this.isDeleting && this.txt === fullTxt) { delta = this.period; this.isDeleting = true; }
    else if (this.isDeleting && this.txt === '') { this.isDeleting = false; this.loopNum++; delta = 500; }

    setTimeout(() => this.tick(), delta);
  };

  window.addEventListener('load', () => {
    const els = document.getElementsByClassName('txt-rotate');
    for (let i = 0; i < els.length; i++) {
      const toRotate = els[i].getAttribute('data-rotate');
      const period = els[i].getAttribute('data-period');
      if (toRotate) new TxtRotate(els[i], JSON.parse(toRotate), period);
    }
    const css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML = '.txt-rotate > .wrap { border-right: 0.08em solid #666 }';
    document.body.appendChild(css);
  });
})();

// ===== スクロール出現アニメ =====
window.addEventListener('DOMContentLoaded', () => {
  if (!window.gsap || !window.ScrollTrigger) return;

  document.querySelectorAll('.animation').forEach((el) => {
    gsap.fromTo(
      el,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.3,
        scrollTrigger: { trigger: el, start: 'top 90%', ease: 'expo' }
      }
    );
  });
});
