/* JavaScript Document

Tooplate 2165 Neon Carbon
    
https://www.tooplate.com/view/2165-neon-carbon
	
*/

(function() {
  'use strict';

  const mainStage = document.getElementById('mainStage');
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav a');
  const sidebarIcons = document.querySelectorAll('.sidebar-icon');

  /* ── IntersectionObserver Scroll Reveal ── */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { root: mainStage, threshold: 0.1 });

    revealEls.forEach(function(el) { revealObs.observe(el); });

    /* 3-second safety fallback for iframe previews */
    setTimeout(function() {
      revealEls.forEach(function(el) { el.classList.add('visible'); });
    }, 3000);
  } else {
    revealEls.forEach(function(el) { el.classList.add('visible'); });
  }

  /* ── Active sidebar icon on scroll ── */
  const sectionIds = ['hero', 'cards', 'feed', 'media', 'vault', 'console'];
  const sectionEls = sectionIds.map(function(id) { return document.getElementById(id); }).filter(Boolean);

  if ('IntersectionObserver' in window) {
    const sectionObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const href = '#' + entry.target.id;
          sidebarIcons.forEach(function(icon) {
            icon.classList.toggle('active', icon.getAttribute('href') === href);
          });
        }
      });
    }, { root: mainStage, threshold: 0.3 });

    sectionEls.forEach(function(sec) { sectionObs.observe(sec); });
  }

  /* ── Hamburger ── */
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  mobileLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ── Smooth scroll for sidebar icon links ── */
  sidebarIcons.forEach(function(icon) {
    icon.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href && href.length > 1 && href.startsWith('#')) {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Live uptime counter ── */
  var uptimeEl = document.getElementById('uptimeCounter');
  var startTime = Date.now();
  setInterval(function() {
    var elapsed = Math.floor((Date.now() - startTime) / 1000);
    var h = String(Math.floor(elapsed / 3600)).padStart(2, '0');
    var m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
    var s = String(elapsed % 60).padStart(2, '0');
    uptimeEl.textContent = h + ':' + m + ':' + s + ' session';
  }, 1000);

})();