/**
 * app.js — Shared navigation logic, contact lock state, scroll animations
 */

/* ── Contact unlock state ─────────────────────────────────── */
const UNLOCK_KEY = 'contactUnlocked';

function isContactUnlocked() {
  return localStorage.getItem(UNLOCK_KEY) === 'true';
}

/* ── Nav: active link + lock badge ───────────────────────── */
function initNav() {
  // Mobile hamburger
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // Mark active page
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Apply lock state to Contact nav link
  updateNavLockState();
}

function updateNavLockState() {
  const contactNavLink = document.getElementById('contactNavLink');
  const lockBadge = document.querySelector('.lock-badge');
  if (!contactNavLink) return;

  if (isContactUnlocked()) {
    contactNavLink.classList.remove('disabled');
    if (lockBadge) {
      lockBadge.textContent = 'unlocked';
      lockBadge.classList.remove('locked');
      lockBadge.classList.add('unlocked');
    }
  } else {
    contactNavLink.classList.add('disabled');
    if (lockBadge) {
      lockBadge.textContent = 'locked';
      lockBadge.classList.add('locked');
      lockBadge.classList.remove('unlocked');
    }
  }
}

/* ── Scroll fade-in animation ─────────────────────────────── */
function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;

  // Set stagger indices on stagger containers
  document.querySelectorAll('.stagger').forEach(container => {
    container.querySelectorAll('.fade-in').forEach((el, i) => {
      el.style.setProperty('--i', i);
    });
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach(el => observer.observe(el));
}

/* ── Listen for unlock event (dispatched by game.js) ─────── */
function listenForUnlock() {
  window.addEventListener('contactUnlocked', () => {
    updateNavLockState();
  });
}

/* ── Init ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-enter');
  initNav();
  initScrollAnimations();
  listenForUnlock();
});
