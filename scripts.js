/* Paradise Alley — scripts.js */

/* ── Page loading line ───────────────────────────────────────────── */
const line = document.getElementById('page-line');
if (line) {
  line.style.width = '70%';
  window.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => {
      line.classList.add('done');
      document.body.classList.add('ready');
    });
  });
} else {
  window.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('ready');
  });
}

/* ── Nav scroll ──────────────────────────────────────────────────── */
const nav = document.querySelector('.nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── Active nav link ─────────────────────────────────────────────── */
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('#mainNav a, .mobile-nav-overlay a').forEach(a => {
  const href = a.getAttribute('href');
  if (href && (href === page || (page === '' && href === 'index.html'))) {
    a.classList.add('current');
  }
});

/* ── Mobile nav ──────────────────────────────────────────────────── */
const menuBtn  = document.querySelector('.menu-btn');
const mobileNav = document.querySelector('.mobile-nav-overlay');
if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = menuBtn.classList.toggle('open');
    mobileNav.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menuBtn.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ── Today's hours highlight ─────────────────────────────────────── */
const today = new Date().getDay();
document.querySelectorAll('.hours-row[data-day]').forEach(row => {
  if (parseInt(row.dataset.day, 10) === today) row.classList.add('today');
});

/* ── Open/Closed pill ────────────────────────────────────────────── */
function updateOpenPill() {
  const pill = document.getElementById('openPill');
  if (!pill) return;

  const now  = new Date();
  const day  = now.getDay();
  const t    = now.getHours() * 60 + now.getMinutes();

  const schedule = {
    0: { open: 12 * 60, close: 20 * 60  },   // Sun noon–8pm
    1: null,                                   // Mon closed
    2: { open: 11 * 60, close: 22 * 60  },   // Tue 11am–10pm
    3: { open: 11 * 60, close: 22 * 60  },   // Wed
    4: { open: 11 * 60, close: 22 * 60  },   // Thu
    5: { open: 11 * 60, close: 24 * 60  },   // Fri 11am–midnight
    6: { open: 11 * 60, close: 24 * 60  },   // Sat
  };

  const h      = schedule[day];
  const isOpen = h && t >= h.open && t < h.close;

  pill.className = 'open-pill' + (isOpen ? '' : ' closed');
  pill.innerHTML = '';
  const dot = document.createElement('span');
  dot.className = 'dot';
  pill.appendChild(dot);
  pill.appendChild(document.createTextNode(
    isOpen ? ' Open Now' : (day === 1 ? ' Closed Today' : ' Closed Now')
  ));
}
updateOpenPill();

/* ── Scroll reveal ───────────────────────────────────────────────── */
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el));
}

/* ── Page exit transitions ───────────────────────────────────────── */
document.querySelectorAll('a[href]').forEach(a => {
  const href = a.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('mailto:') ||
      href.startsWith('tel:')      || href.startsWith('http')) return;
  a.addEventListener('click', e => {
    e.preventDefault();
    document.body.style.opacity     = '0';
    document.body.style.transition  = 'opacity .25s ease';
    setTimeout(() => { location.href = href; }, 260);
  });
});

/* ── Footer year ─────────────────────────────────────────────────── */
const yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();

/* ── Menu tabs ───────────────────────────────────────────────────── */
document.querySelectorAll('.menu-tab[data-tab]').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById(tab.dataset.tab);
    if (panel) panel.classList.add('active');
  });
});
