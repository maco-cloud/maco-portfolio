(function () {
  'use strict';

  const THEME_KEY = 'maco-theme';
  const html = document.documentElement;

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved === 'dark' || (!saved && prefersDark);
    html.classList.toggle('dark', isDark);
    updateThemeIcons(isDark);
  }

  function updateThemeIcons(isDark) {
    document.querySelectorAll('[data-theme-icon="sun"]').forEach((el) => {
      el.classList.toggle('hidden', !isDark);
    });
    document.querySelectorAll('[data-theme-icon="moon"]').forEach((el) => {
      el.classList.toggle('hidden', isDark);
    });
  }

  function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
      const isDark = html.classList.toggle('dark');
      localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
      updateThemeIcons(isDark);
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (!id || id === '#') return;

        const target = document.querySelector(id);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeMobileMenu();
      });
    });
  }

  function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (!elements.length) return;

    elements.forEach((el) => {
      const delay = el.getAttribute('data-delay');
      if (delay) {
        el.style.transitionDelay = `${delay}ms`;
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
  }

  function initParallax() {
    const layers = document.querySelectorAll('.parallax-layer');
    if (!layers.length) return;

    let ticking = false;

    function updateParallax() {
      const scrollY = window.scrollY;
      layers.forEach((layer) => {
        const speed = parseFloat(layer.getAttribute('data-speed')) || 0.3;
        layer.style.transform = `translateY(${scrollY * speed}px)`;
      });
      ticking = false;
    }

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      },
      { passive: true }
    );

    updateParallax();
  }

  function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    if (!menuBtn || !mobileNav) return;

    menuBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('hidden') === false;
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });
  }

  function closeMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    const menuBtn = document.getElementById('mobile-menu-btn');
    if (mobileNav) mobileNav.classList.add('hidden');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
  }

  function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener(
      'scroll',
      () => {
        if (window.scrollY > 20) {
          navbar.classList.add('shadow-lg', 'bg-stone-50/95', 'dark:bg-neutral-950/95');
        } else {
          navbar.classList.remove('shadow-lg');
        }
      },
      { passive: true }
    );
  }

  initTheme();
  initThemeToggle();
  initSmoothScroll();
  initScrollAnimations();
  initParallax();
  initMobileMenu();
  initNavbarScroll();
})();
