/* ═══════════════════════════════════════════════════════════════════
   Paradise Alley — Global Script
═══════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Page Enter Animation ────────────────────────────────────── */
  const pageWrap = document.querySelector('.page-wrap');
  const pageLine = document.querySelector('.page-line');
  if (pageWrap) {
    // Animate top line, then fade in page
    if (pageLine) {
      pageLine.style.width = '70%';
      setTimeout(() => {
        pageLine.classList.add('done');
        pageWrap.classList.add('ready');
      }, 280);
    } else {
      setTimeout(() => pageWrap.classList.add('ready'), 50);
    }
  }

  /* ── Page Exit (link transitions) ───────────────────────────── */
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    // Only intercept local .html links (not anchors, mailto, tel, external)
    if (!href || href.startsWith('#') || href.startsWith('mailto') ||
        href.startsWith('tel') || href.startsWith('http') || href.includes('://')) return;

    link.addEventListener('click', e => {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      if (pageWrap) {
        pageWrap.style.transition = 'opacity .28s ease, transform .28s ease';
        pageWrap.style.opacity = '0';
        pageWrap.style.transform = 'translateY(-10px)';
      }
      setTimeout(() => { window.location.href = href; }, 290);
    });
  });

  /* ── Navigation scroll behavior ─────────────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Active nav link ─────────────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── Mobile hamburger ────────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav  = document.getElementById('mobileNav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Scroll Reveal (IntersectionObserver) ────────────────────── */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger')
    .forEach(el => revealObs.observe(el));

  /* ── Animated Counters ───────────────────────────────────────── */
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      if (!target) return;
      const duration = 1400;
      const start = performance.now();
      const run = now => {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(ease * target).toLocaleString();
        if (p < 1) requestAnimationFrame(run);
        else el.textContent = target.toLocaleString();
      };
      requestAnimationFrame(run);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

  /* ── Menu tabs ───────────────────────────────────────────────── */
  document.querySelectorAll('.menu-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });

  /* ── Highlight today in hours tables ────────────────────────── */
  const dayIndex = new Date().getDay(); // 0=Sun, 1=Mon, ...
  document.querySelectorAll('.hours-row[data-day]').forEach(row => {
    if (parseInt(row.dataset.day) === dayIndex) row.classList.add('today');
  });

  /* ── Smooth anchor scrolling ─────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
