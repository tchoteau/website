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

/* ── Contact form: real delivery through Web3Forms ───────────
   Every <form data-contact-form> on the site goes through here.
   The Web3Forms access key is public by design (it only lets
   someone send a message to the mailbox it was created for).    */
const WEB3FORMS_ACCESS_KEY = '';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

const CONTACT_FALLBACK_TEXT = {
  'form.sending': 'Sending…',
  'form.success': "✓ Message sent. I'll get back to you soon.",
  'form.failure': '✗ The message could not be sent. Please try again, or write to me on LinkedIn.',
  'form.subject': 'New message from tchoteau.fr',
};

function contactText(key) {
  if (typeof window.t === 'function') {
    const value = window.t(key);
    if (value !== key) return value;
  }
  return CONTACT_FALLBACK_TEXT[key] || key;
}

function contactStatus(form, cls) {
  let el = form.querySelector('.' + cls);
  if (!el) {
    el = document.createElement('div');
    el.className = cls;
    el.setAttribute('role', 'alert');
    form.appendChild(el);
  }
  return el;
}

function validateContactForm(form) {
  const fields = {
    name: form.querySelector('[name="name"]'),
    email: form.querySelector('[name="email"]'),
    message: form.querySelector('[name="message"]'),
  };
  Object.values(fields).forEach(f => f.classList.remove('error'));
  form.querySelectorAll('.form-error').forEach(el => el.classList.remove('visible'));

  const invalid = [];
  if (!fields.name.value.trim()) invalid.push('name');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.value.trim())) invalid.push('email');
  if (!fields.message.value.trim()) invalid.push('message');

  invalid.forEach(key => {
    fields[key].classList.add('error');
    form.querySelector('#' + key + 'Error')?.classList.add('visible');
  });
  if (invalid.length) fields[invalid[0]].focus();
  return invalid.length === 0 ? fields : null;
}

async function sendContactForm(fields, botcheck) {
  if (!WEB3FORMS_ACCESS_KEY) throw new Error('Web3Forms access key missing');
  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: contactText('form.subject'),
      from_name: 'tchoteau.fr',
      name: fields.name.value.trim(),
      email: fields.email.value.trim(),
      replyto: fields.email.value.trim(),
      message: fields.message.value.trim(),
      botcheck,
    }),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || result.success !== true) {
    throw new Error(result.message || 'HTTP ' + response.status);
  }
}

function initContactForm(form) {
  // Honeypot field: humans never see it, Web3Forms drops submissions that fill it.
  const trap = document.createElement('input');
  trap.type = 'checkbox';
  trap.name = 'botcheck';
  trap.tabIndex = -1;
  trap.setAttribute('aria-hidden', 'true');
  trap.className = 'form-botcheck';
  form.appendChild(trap);

  const button = form.querySelector('[type="submit"]');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const success = contactStatus(form, 'form-success');
    const failure = contactStatus(form, 'form-failure');
    success.classList.remove('visible');
    failure.classList.remove('visible');

    const fields = validateContactForm(form);
    if (!fields) return;

    const label = button.textContent;
    button.disabled = true;
    button.textContent = contactText('form.sending');
    try {
      await sendContactForm(fields, trap.checked);
      form.reset();
      success.textContent = contactText('form.success');
      success.classList.add('visible');
    } catch (err) {
      console.error('[contact] envoi impossible :', err.message);
      failure.textContent = contactText('form.failure');
      failure.classList.add('visible');
    } finally {
      button.disabled = false;
      button.textContent = label;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('form[data-contact-form]').forEach(initContactForm);
});
