/**
 * i18n.js — Bilingual FR / EN support
 * - Reads data-i18n, data-i18n-html, data-i18n-placeholder attributes
 * - Exposes window.t(key) for use in game.js
 * - Persists language choice in localStorage
 */

const LANG_KEY = 'lang';

const translations = {
  en: {
    /* ── Nav ──────────────────────────────────── */
    'nav.home': 'Home',
    'nav.game': 'Game',
    'nav.contact': 'Contact',
    'nav.locked': 'locked',
    'nav.unlocked': 'unlocked',

    /* ── Hero ─────────────────────────────────── */
    'hero.eyebrow': 'Software Engineer · Tech Lead',
    'hero.title': "Hello, I'm",
    'hero.subtitle': 'Tech Lead on a distributed, event-driven supply chain platform that orchestrates order management at global scale.',
    'hero.cta.game': 'Play to unlock contact',
    'hero.cta.gh': 'GitHub',

    /* ── Working on ───────────────────────────── */
    'working.label': 'Current Focus',
    'working.title': "What I'm working on",
    'working.desc': 'Building resilient, event-driven systems at scale — with an obsession for correctness and developer experience.',
    'card1.stack': 'Spring Boot 4 · Reactor · Kafka Streams · MongoDB · GraphQL',
    'card1.desc': 'Core OMS platform — reactive, event-driven, globally distributed.',
    'card2.stack': 'Spring AI + Gemini — embedding intelligence into OMS workflows',
    'card2.desc': 'LLM-augmented order lifecycle — smarter routing, anomaly detection, AI-assisted ops.',
    'card3.stack': 'An MCP server for AI-assisted support, investigation & automation',
    'card3.desc': 'Model Context Protocol server — bridging AI agents with internal tooling and runbooks.',

    /* ── Values ───────────────────────────────── */
    'values.label': 'Values',
    'values.title': 'What I care about',
    'values.desc': 'Principles that guide every technical decision and team interaction.',
    'care.1': 'Secure-by-design & defense-in-depth',
    'care.2': 'Reducing MTTR & improving observability',
    'care.3': 'Engineering excellence & DX',
    'care.4': 'Inner-source culture & knowledge sharing',
    'care.5': 'Domotique',

    /* ── Architecture ─────────────────────────── */
    'arch.label': 'Architecture & Security',
    'arch.title': 'How I build systems',
    'arch.desc': 'Security and resilience as first-class concerns, not afterthoughts.',
    'arch.1': 'Zero-trust boundaries between microservices — mutual TLS, scoped service accounts, and explicit authorization at every hop.',
    'arch.2': 'Event-driven architecture with idempotent consumers and outbox pattern to ensure exactly-once semantics across distributed transactions.',
    'arch.3': 'Observability stack built around structured logs, distributed traces, and RED metrics — MTTR optimized from alert to root-cause.',
    'arch.4': 'Threat modeling and SAST in CI, secrets scanning with pre-commit hooks, and dependency vulnerability gates on every build.',

    /* ── Game ─────────────────────────────────── */
    'game.label': 'Mini-game',
    'game.title': 'snake<span style="color:var(--cyan)">.exe</span>',
    'game.desc': 'Navigate the network. Consume the viruses. Score <strong style="color:var(--gold);">10 points</strong> to unlock the contact form below.',
    'game.score': 'SCORE',
    'game.status': 'Keyboard: <kbd style="font-family:var(--font-mono);color:var(--cyan);">↑ ↓ ← →</kbd> or <kbd style="font-family:var(--font-mono);color:var(--cyan);">W A S D</kbd> &nbsp;·&nbsp; <kbd style="font-family:var(--font-mono);color:var(--cyan);">SPACE</kbd> to restart',
    'game.overlay.start.title': '[ SNAKE.EXE ]',
    'game.overlay.start.subtitle': 'Press [SPACE], [↑] or tap to start',
    'game.overlay.start.btn': '▶ Start',
    'game.overlay.win.title': '🔓 ACCESS GRANTED',
    'game.overlay.win.subtitle': 'Score 10 reached — Contact unlocked!',
    'game.overlay.lose.subtitle': 'Press [SPACE] or tap to retry',

    /* ── Contact locked ───────────────────────── */
    'contact.locked.title': 'Contact — locked',
    'contact.locked.text': 'Complete the game above with a score of <strong style="color:var(--gold);">10 points</strong> to unlock the contact form.',
    'contact.locked.progress': 'Progress:',
    'contact.locked.cta': 'Play the game',

    /* ── Contact unlocked ─────────────────────── */
    'contact.unlocked.title': 'Contact Unlocked!',
    'contact.unlocked.subtitle': 'Well played. Leave a message below.',

    /* ── Form ─────────────────────────────────── */
    'form.name.label': 'Name',
    'form.name.placeholder': 'Your name',
    'form.name.error': 'Please enter your name.',
    'form.email.label': 'Email',
    'form.email.placeholder': 'you@example.com',
    'form.email.error': 'Please enter a valid email address.',
    'form.message.label': 'Message',
    'form.message.placeholder': 'Your message…',
    'form.message.error': 'Please enter a message.',
    'form.submit': 'Send →',
    'form.success': "✓ Message sent! I'll get back to you soon.",

    /* ── Footer ───────────────────────────────── */
    'footer.copy': '© 2025 Thomas Choteau — Built with curiosity & caffeine.',
  },

  fr: {
    /* ── Nav ──────────────────────────────────── */
    'nav.home': 'Accueil',
    'nav.game': 'Jeu',
    'nav.contact': 'Contact',
    'nav.locked': 'verrouillé',
    'nav.unlocked': 'débloqué',

    /* ── Hero ─────────────────────────────────── */
    'hero.eyebrow': 'Ingénieur Logiciel · Tech Lead',
    'hero.title': 'Bonjour, je suis',
    'hero.subtitle': 'Tech Lead chez ADEO sur la plateforme supply chain et on orchestre la gestion des commandes à l\'échelle mondiale.',
    'hero.cta.game': 'Jouer pour débloquer le contact',
    'hero.cta.gh': 'GitHub',

    /* ── Working on ───────────────────────────── */
    'working.label': 'Focus actuel',
    'working.title': 'Sur quoi je travaille',
    'working.desc': 'Construire des systèmes résilients et event-driven à grande échelle — avec une obsession pour la justesse et l\'expérience développeur.',
    'card1.stack': 'Spring Boot 4 · Reactor · Kafka Streams · MongoDB · GraphQL',
    'card1.desc': 'Plateforme OMS — réactive, event-driven, distribuée à l\'échelle mondiale.',
    'card2.stack': 'Spring AI + Gemini — intégration de l\'intelligence dans les flux OMS',
    'card2.desc': 'Cycle de vie des commandes augmenté par LLM — routage intelligent, détection d\'anomalies, ops assistées par IA.',
    'card3.stack': 'Un serveur MCP pour le support, l\'investigation et l\'automatisation assistés par IA',
    'card3.desc': 'Serveur Model Context Protocol — pont entre les agents IA et les outils internes.',

    /* ── Values ───────────────────────────────── */
    'values.label': 'Valeurs',
    'values.title': 'Ce qui me tient à cœur',
    'values.desc': 'Les principes qui guident chaque décision technique et chaque interaction en équipe.',
    'care.1': 'Sécurité par conception & défense en profondeur',
    'care.2': 'Réduire le MTTR & améliorer l\'observabilité',
    'care.3': 'Excellence d\'ingénierie & DX',
    'care.4': 'Culture inner-source & partage de connaissances',
    'care.5': 'Domotique, développement de solutions',

    /* ── Architecture ─────────────────────────── */
    'arch.label': 'Architecture & Sécurité',
    'arch.title': 'Comment je construis les systèmes',
    'arch.desc': 'Sécurité et résilience comme première préoccupation, jamais en afterthought.',
    'arch.1': 'Frontières zero-trust entre microservices.',
    'arch.2': 'Architecture event-driven avec consommateurs idempotents et outbox pattern pour garantir la sémantique exactly-once.',
    'arch.3': 'Stack d\'observabilité : logs structurés, traces distribuées et métriques RED — MTTR optimisé de l\'alerte à la cause racine.',
    'arch.4': 'Threat modeling et SAST en CI, scan de secrets avec pre-commit hooks, et gates de vulnérabilité sur chaque build.',

    /* ── Game ─────────────────────────────────── */
    'game.label': 'Mini-jeu',
    'game.title': 'snake<span style="color:var(--cyan)">.exe</span>',
    'game.desc': 'Naviguez dans le réseau. Consommez les virus. Atteignez <strong style="color:var(--gold);">10 points</strong> pour débloquer le formulaire de contact.',
    'game.score': 'SCORE',
    'game.status': 'Clavier : <kbd style="font-family:var(--font-mono);color:var(--cyan);">↑ ↓ ← →</kbd> ou <kbd style="font-family:var(--font-mono);color:var(--cyan);">W A S D</kbd> &nbsp;·&nbsp; <kbd style="font-family:var(--font-mono);color:var(--cyan);">ESPACE</kbd> pour redémarrer',
    'game.overlay.start.title': '[ SNAKE.EXE ]',
    'game.overlay.start.subtitle': 'Appuie sur [ESPACE], [↑] ou tape pour démarrer',
    'game.overlay.start.btn': '▶ Démarrer',
    'game.overlay.win.title': '🔓 ACCÈS ACCORDÉ',
    'game.overlay.win.subtitle': 'Score 10 atteint — Contact débloqué !',
    'game.overlay.lose.subtitle': 'Appuie sur [ESPACE] ou tape pour réessayer',

    /* ── Contact locked ───────────────────────── */
    'contact.locked.title': 'Contact — verrouillé',
    'contact.locked.text': 'Terminez le jeu ci-dessus avec un score de <strong style="color:var(--gold);">10 points</strong> pour débloquer le formulaire de contact.',
    'contact.locked.progress': 'Progression :',
    'contact.locked.cta': 'Jouer au jeu',

    /* ── Contact unlocked ─────────────────────── */
    'contact.unlocked.title': 'Contact débloqué !',
    'contact.unlocked.subtitle': 'Bien joué. Laissez un message, je vous répondrai rapidement.',

    /* ── Form ─────────────────────────────────── */
    'form.name.label': 'Nom',
    'form.name.placeholder': 'Votre nom',
    'form.name.error': 'Veuillez entrer votre nom.',
    'form.email.label': 'Email',
    'form.email.placeholder': 'vous@exemple.com',
    'form.email.error': 'Veuillez entrer une adresse email valide.',
    'form.message.label': 'Message',
    'form.message.placeholder': 'Votre message…',
    'form.message.error': 'Veuillez entrer un message.',
    'form.submit': 'Envoyer →',
    'form.success': '✓ Message envoyé ! Je vous répondrai bientôt.',

    /* ── Footer ───────────────────────────────── */
    'footer.copy': '© 2026 Thomas Choteau — Construit avec curiosité & caféine.',
  },
};

/* ── Current language ──────────────────────────────────────── */
let currentLang = localStorage.getItem(LANG_KEY) || 'fr';

/* ── Translate function (also exposed globally for game.js) ── */
function t(key) {
  return (translations[currentLang] && translations[currentLang][key])
    || (translations['en'] && translations['en'][key])
    || key;
}
window.t = t;

/* ── Apply all translations to the DOM ─────────────────────── */
function applyTranslations() {
  const lang = currentLang;

  // Update html lang attribute
  document.documentElement.lang = lang;

  // Text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });

  // Inner HTML (for content with tags like <strong>, <span>)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    el.innerHTML = t(key);
  });

  // Placeholder attribute
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });

  // Update lang toggle button label
  const btn = document.getElementById('langToggle');
  if (btn) btn.textContent = lang === 'fr' ? 'EN' : 'FR';

  // Dispatch event so game.js can update overlay if visible
  window.dispatchEvent(new CustomEvent('langChange', { detail: { lang } }));
}

/* ── Toggle language ────────────────────────────────────────── */
function toggleLang() {
  currentLang = currentLang === 'fr' ? 'en' : 'fr';
  localStorage.setItem(LANG_KEY, currentLang);
  applyTranslations();
}

/* ── Init ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('langToggle');
  if (btn) btn.addEventListener('click', toggleLang);
  applyTranslations();
});
