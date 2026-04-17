/**
 * i18n.js — Support bilingue FR/EN
 * Lit les attributs data-i18n, data-i18n-html et data-i18n-placeholder
 * Expose window.t(key) pour game.js
 * Sauvegarde la langue dans localStorage
 */

const LANG_KEY = 'lang';

const translations = {
  en: {
    /* Nav */
    'nav.home': 'Home',
    'nav.game': 'Game',
    'nav.contact': 'Contact',
    'nav.locked': 'locked',
    'nav.unlocked': 'unlocked',

    /* Hero */
    'hero.eyebrow': 'Software Engineer · Tech Lead',
    'hero.title': "Hello, I'm",
    'hero.subtitle': 'Tech Lead on assignment at ADEO on the supply chain platform, where we orchestrate order management at a global scale.',
    'hero.cta.game': 'Play to unlock contact',
    'hero.cta.gh': 'GitHub',

    /* Working on */
    'working.label': 'Current focus',
    'working.title': "What I'm working on",
    'working.desc': 'Building resilient, event-driven systems at scale, with a strong focus on correctness and developer experience.',
    'card1.stack': 'Spring Boot 4 · Reactor · Kafka Streams · MongoDB · GraphQL',
    'card1.desc': 'Core OMS platform: reactive, event-driven, globally distributed.',
    'card2.stack': 'Spring AI + Gemini: embedding intelligence into OMS workflows',
    'card2.desc': 'LLM-augmented order lifecycle: smarter routing, anomaly detection, and AI-assisted operations.',
    'card3.stack': 'An MCP server for AI-assisted support, investigation, and automation',
    'card3.desc': 'Model Context Protocol server connecting AI agents to internal tools and runbooks.',

    /* Values */
    'values.label': 'Values',
    'values.title': 'What I care about',
    'values.desc': 'Principles that guide my technical decisions and the way I collaborate.',
    'care.1': 'Secure-by-design and defense-in-depth',
    'care.2': 'Reducing MTTR and improving observability',
    'care.3': 'Engineering excellence and developer experience',
    'care.4': 'Inner-source culture and knowledge sharing',
    'care.5': 'Home automation',

    /* Architecture */
    'arch.label': 'Architecture and security',
    'arch.title': 'How I build systems',
    'arch.desc': 'Security and resilience are built in from the start, not added afterwards.',
    'arch.1': 'Zero-trust boundaries between microservices: mutual TLS, scoped service accounts, and explicit authorization at every hop.',
    'arch.2': 'Event-driven architecture with idempotent consumers and the outbox pattern to ensure reliable semantics across distributed transactions.',
    'arch.3': 'Observability built on structured logs, distributed tracing, and RED metrics, with MTTR optimized from alert to root cause.',
    'arch.4': 'Threat modeling and SAST in CI, secrets scanning via pre-commit hooks, and dependency vulnerability gates on every build.',

    /* Harness Engineering */
    'arch.harness.label': 'Harness Engineering',
    'arch.harness.title': 'Building the safety net for developers',
    'arch.harness.desc': 'Harness engineering is about building the internal platforms, golden paths, and tooling scaffolds that let teams move fast without breaking things — shifting the cognitive load from every developer to a shared, battle-tested foundation.',
    'arch.harness.point1.title': 'Platform as a Product',
    'arch.harness.point1.desc': 'Treating the internal developer platform like a product: versioned APIs, changelogs, and SLAs — so teams self-serve without waiting on infrastructure tickets.',
    'arch.harness.point2.title': 'Golden Paths',
    'arch.harness.point2.desc': 'Opinionated templates and scaffolding (Spring Boot starters, Dockerfile archetypes, Terraform modules) that encode best practices and security baselines from day zero.',
    'arch.harness.point3.title': 'Shift-Left Test Harnesses',
    'arch.harness.point3.desc': 'Contract testing, chaos test fixtures, and integration harnesses committed alongside the service — so regressions are caught in the developer loop, not in production.',
    'arch.harness.point4.title': 'Reduced Cognitive Load',
    'arch.harness.point4.desc': 'The goal is not to control — it is to make the right thing the easy thing, letting product teams focus on business logic while the platform handles compliance, observability, and resilience by default.',

    /* Game */
    'game.label': 'Mini-game',
    'game.title': 'snake<span style="color:var(--cyan)">.exe</span>',
    'game.desc': 'Navigate the network. Consume the viruses. Reach <strong style="color:var(--gold);">10 points</strong> to unlock the contact form below.',
    'game.score': 'SCORE',
    'game.status': 'Keyboard: <kbd style="font-family:var(--font-mono);color:var(--cyan);">↑ ↓ ← →</kbd> or <kbd style="font-family:var(--font-mono);color:var(--cyan);">W A S D</kbd> · <kbd style="font-family:var(--font-mono);color:var(--cyan);">SPACE</kbd> to restart',
    'game.overlay.start.title': '[ SNAKE.EXE ]',
    'game.overlay.start.subtitle': 'Press [SPACE], [↑], or tap to start',
    'game.overlay.start.btn': '▶ Start',
    'game.overlay.win.title': '🔓 ACCESS GRANTED',
    'game.overlay.win.subtitle': 'Score 10 reached. Contact unlocked.',
    'game.overlay.lose.subtitle': 'Press [SPACE] or tap to retry',

    /* Contact locked */
    'contact.locked.title': 'Contact locked',
    'contact.locked.text': 'Complete the game above with a score of <strong style="color:var(--gold);">10 points</strong> to unlock the contact form.',
    'contact.locked.progress': 'Progress:',
    'contact.locked.cta': 'Play the game',

    /* Contact unlocked */
    'contact.unlocked.title': 'Contact unlocked',
    'contact.unlocked.subtitle': 'Well played. Leave a message below.',

    /* Form */
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
    'form.success': "✓ Message sent. I'll get back to you soon.",

    /* Footer */
    'footer.copy': '© 2026 Thomas Choteau. Built with curiosity and caffeine.',
  },

  fr: {
    /* Nav */
    'nav.home': 'Accueil',
    'nav.game': 'Jeu',
    'nav.contact': 'Contact',
    'nav.locked': 'verrouillé',
    'nav.unlocked': 'débloqué',

    /* Hero */
    'hero.eyebrow': 'Ingénieur logiciel · Tech Lead',
    'hero.title': 'Bonjour, je suis',
    'hero.subtitle': "Tech Lead en mission chez ADEO sur la plateforme supply chain, on orchestre la gestion des commandes à l’échelle mondiale.",
    'hero.cta.game': 'Jouer pour débloquer le contact',
    'hero.cta.gh': 'GitHub',

    /* Working on */
    'working.label': 'Focus actuel',
    'working.title': 'Sur quoi je travaille',
    'working.desc': "Construire des systèmes résilients et event-driven à grande échelle, avec une exigence forte sur la justesse et l’expérience développeur.",
    'card1.stack': 'Spring Boot 4 · Reactor · Kafka Streams · MongoDB · GraphQL',
    'card1.desc': "Plateforme OMS: réactive, event-driven, distribuée à l’échelle mondiale.",
    'card2.stack': "Spring AI + Gemini: intégrer l’intelligence dans les workflows OMS",
    'card2.desc': "Cycle de vie des commandes augmenté par LLM: routage plus fin, détection d’anomalies, opérations assistées par IA.",
    'card3.stack': "Un serveur MCP pour le support, l’investigation et l’automatisation assistés par IA",
    'card3.desc': "Serveur Model Context Protocol connectant les agents IA aux outils internes et aux runbooks.",

    /* Values */
    'values.label': 'Valeurs',
    'values.title': 'Ce qui me tient à cœur',
    'values.desc': 'Des principes qui guident mes décisions techniques et ma façon de collaborer.',
    'care.1': 'Sécurité par conception et défense en profondeur',
    'care.2': 'Réduire le MTTR et améliorer l’observabilité',
    'care.3': 'Excellence d’ingénierie et expérience développeur',
    'care.4': 'Culture inner-source et partage de connaissances',
    'care.5': 'Domotique',

    /* Architecture */
    'arch.label': 'Architecture et sécurité',
    'arch.title': 'Comment je construis les systèmes',
    'arch.desc': 'La sécurité et la résilience font partie du design, elles ne se rajoutent pas après coup.',
    'arch.1': 'Frontières zero-trust entre microservices: mTLS, comptes de service à privilèges limités, autorisation explicite à chaque appel.',
    'arch.2': "Architecture event-driven avec consommateurs idempotents et outbox pattern, pour des traitements fiables sur des transactions distribuées.",
    'arch.3': "Observabilité basée sur logs structurés, traces distribuées et métriques RED, avec un MTTR optimisé de l'alerte à la cause racine.",
    'arch.4': "Threat modeling et SAST en CI, scan de secrets via hooks pre-commit, et garde-fous sur les dépendances à chaque build.",

    /* Harness Engineering */
    'arch.harness.label': 'Harness Engineering',
    'arch.harness.title': 'Construire le filet de sécurité des développeurs',
    'arch.harness.desc': "Le harness engineering consiste à construire les plateformes internes, les golden paths et les scaffolds d'outillage qui permettent aux équipes d'aller vite sans tout casser — en déplaçant la charge cognitive de chaque développeur vers une fondation partagée et éprouvée.",
    'arch.harness.point1.title': 'Plateforme comme produit',
    'arch.harness.point1.desc': "Traiter la plateforme développeur interne comme un produit : APIs versionnées, changelogs et SLAs — pour que les équipes soient autonomes sans attendre des tickets infrastructure.",
    'arch.harness.point2.title': 'Golden Paths',
    'arch.harness.point2.desc': "Templates et scaffolding opinionated (starters Spring Boot, archetypes Dockerfile, modules Terraform) qui intègrent les bonnes pratiques et les baselines de sécurité dès le jour zéro.",
    'arch.harness.point3.title': 'Test Harnesses Shift-Left',
    'arch.harness.point3.desc': "Tests de contrat, fixtures de chaos testing et harnesses d'intégration versionnés avec le service — pour que les régressions soient détectées dans la boucle développeur, pas en production.",
    'arch.harness.point4.title': 'Réduction de la charge cognitive',
    'arch.harness.point4.desc': "L'objectif n'est pas de contrôler — c'est de rendre la bonne pratique facile, pour que les équipes produit se concentrent sur la logique métier pendant que la plateforme gère la conformité, l'observabilité et la résilience par défaut.",

    /* Game */
    'game.label': 'Mini-jeu',
    'game.title': 'snake<span style="color:var(--cyan)">.exe</span>',
    'game.desc': 'Naviguez dans le réseau. Consommez les virus. Atteignez <strong style="color:var(--gold);">10 points</strong> pour débloquer le formulaire de contact.',
    'game.score': 'SCORE',
    'game.status': 'Clavier: <kbd style="font-family:var(--font-mono);color:var(--cyan);">↑ ↓ ← →</kbd> ou <kbd style="font-family:var(--font-mono);color:var(--cyan);">W A S D</kbd> · <kbd style="font-family:var(--font-mono);color:var(--cyan);">ESPACE</kbd> pour redémarrer',
    'game.overlay.start.title': '[ SNAKE.EXE ]',
    'game.overlay.start.subtitle': 'Appuyez sur [ESPACE], [↑] ou touchez l’écran pour démarrer',
    'game.overlay.start.btn': '▶ Démarrer',
    'game.overlay.win.title': '🔓 ACCÈS ACCORDÉ',
    'game.overlay.win.subtitle': 'Score 10 atteint. Contact débloqué.',
    'game.overlay.lose.subtitle': 'Appuyez sur [ESPACE] ou touchez l’écran pour réessayer',

    /* Contact locked */
    'contact.locked.title': 'Contact verrouillé',
    'contact.locked.text': 'Terminez le jeu ci-dessus avec un score de <strong style="color:var(--gold);">10 points</strong> pour débloquer le formulaire de contact.',
    'contact.locked.progress': 'Progression:',
    'contact.locked.cta': 'Jouer au jeu',

    /* Contact unlocked */
    'contact.unlocked.title': 'Contact débloqué',
    'contact.unlocked.subtitle': 'Bien joué. Laissez un message ci-dessous.',

    /* Form */
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
    'form.success': '✓ Message envoyé. Je vous répondrai bientôt.',

    /* Footer */
    'footer.copy': '© 2026 Thomas Choteau. Construit avec curiosité et caféine.',
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
