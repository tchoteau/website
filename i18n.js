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
    'skip': "Skip to content",

    /* Hero */
    'hero.eyebrow': "Software and AI engineer · 15 years of experience · Lille",
    'hero.title': "Tech Lead & AI Enabler",
    'hero.subtitle': "I support teams from scoping to production: architecture, technical leadership, AI-assisted development. My common thread: reliability and operational excellence.",
    'hero.cta.game': 'Play to unlock contact',
    'hero.cta.gh': 'GitHub',
    'hero.cta.lextia': "Lextia →",

    /* Working on */
    'working.label': 'Current focus',
    'working.title': "What I'm working on",
    'working.desc': "Reliable systems, from scoping to production, with AI as a lever for teams.",
    'card1.stack': "Redesigning a large-scale store inventory system",
    'card1.desc': "Modular architecture, progressive migration and technical leadership of a critical platform for a major retail group.",
    'card2.stack': "Harness engineering & spec-driven development (OpenSpec)",
    'card2.desc': "Framing AI agents with specifications, guardrails and review loops, so they deliver reliable code as part of a team.",
    'card3.stack': 'An MCP server for AI-assisted support, investigation, and automation',
    'card3.desc': 'Model Context Protocol server connecting AI agents to internal tools and runbooks.',
    'lextia.label': "Alongside",
    'lextia.title': "Founder of Lextia.",
    'lextia.text': "The French site-inspection report (procès-verbal de constat), drafted from the judicial officer’s audio recording. Its domain lexicon, enriched with each firm’s names, places and terms, lets the AI write the firm’s own words instead of approximations.",

    /* Values */
    'values.label': 'Values',
    'values.title': 'What I care about',
    'values.desc': 'Principles that guide my technical decisions and the way I collaborate.',
    'care.1': "Reliability and operational excellence",
    'care.2': "Secure-by-design and defense-in-depth",
    'care.3': "Reducing MTTR and improving observability",
    'care.4': "Engineering excellence and developer experience",
    'care.5': "Inner-source culture and knowledge sharing",

    /* Architecture */
    'arch.label': "Architecture and reliability",
    'arch.title': 'How I build systems',
    'arch.desc': "Reliability, resilience and security are built in from the start, not added afterwards.",
    'arch.1': 'Zero-trust boundaries between microservices: mutual TLS, scoped service accounts, and explicit authorization at every hop.',
    'arch.2': 'Event-driven architecture with idempotent consumers and the outbox pattern to ensure reliable semantics across distributed transactions.',
    'arch.3': 'Observability built on structured logs, distributed tracing, and RED metrics, with MTTR optimized from alert to root cause.',
    'arch.4': 'Threat modeling and SAST in CI, secrets scanning via pre-commit hooks, and dependency vulnerability gates on every build.',

    /* AI Agent Engineering */
    'ai.label': 'AI Agent Engineering',
    'ai.title': 'Making AI agents production-ready',
    'ai.desc': 'Design and implementation of harness engineering systems to make AI model-based agent usage reliable and production-grade.',
    'ai.point1.title': 'Agent Architecture',
    'ai.point1.desc': 'Defining agent architectures following the paradigm Agent = Model + Harness.',
    'ai.point2.title': 'Systemic Constraints',
    'ai.point2.desc': 'Static validation (type checking), linters, and runtime guardrails.',
    'ai.point3.title': 'Feedback Loops',
    'ai.point3.desc': 'Automatic error correction and output drift limitation.',
    'ai.point4.title': 'Context Engineering',
    'ai.point4.desc': 'Specification files, enriched documentation, and long-context management.',
    'ai.point5.title': 'Multi-Step Orchestration',
    'ai.point5.desc': 'Orchestrating multi-step agents with dependency and state control.',
    'ai.point6.title': 'Sandboxing',
    'ai.point6.desc': 'Secure environments for autonomous code execution.',
    'ai.point7.title': 'Tool Governance',
    'ai.point7.desc': 'Resource access governance (filesystem, APIs) with integrated security policies.',
    'ai.results.label': 'Results',
    'ai.results.1': 'Significant improvement in autonomous task success rate.',
    'ai.results.2': 'Reduction of non-deterministic errors and unpredictable behaviors.',
    'ai.results.3': 'Increased capacity to produce complex code reliably and reproducibly.',

    /* Game */
    'game.label': 'Mini-game',
    'game.title': 'snake<span style="color:var(--cyan)">.exe</span>',
    'game.desc': "Navigate the network. Consume the viruses. Reach <strong style=\"color:var(--text-primary);\">10 points</strong> to unlock the contact form below. No time to play? <a href=\"https://www.linkedin.com/in/tchoteau/\" target=\"_blank\" rel=\"noopener noreferrer\">Write to me on LinkedIn</a>.",
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
    'contact.locked.text': "Complete the game above with a score of <strong style=\"color:var(--text-primary);\">10 points</strong> to unlock the contact form.",
    'contact.locked.progress': 'Progress:',
    'contact.locked.cta': 'Play the game',
    'contact.locked.linkedin': "Or write to me directly <a href=\"https://www.linkedin.com/in/tchoteau/\" target=\"_blank\" rel=\"noopener noreferrer\">on LinkedIn</a>.",

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
    'form.sending': "Sending…",
    'form.failure': "✗ The message could not be sent. Please try again, or write to me on LinkedIn.",
    'form.subject': "New message from tchoteau.fr",

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
    'skip': "Aller au contenu",

    /* Hero */
    'hero.eyebrow': "Ingénieur informatique et IA · 15 ans d’expérience · Lille",
    'hero.title': "Tech Lead & AI Enabler",
    'hero.subtitle': "J’accompagne les équipes du cadrage à la production : architecture, pilotage technique, développement assisté par IA. Mon fil rouge : la fiabilité et l’excellence opérationnelle.",
    'hero.cta.game': 'Jouer pour débloquer le contact',
    'hero.cta.gh': 'GitHub',
    'hero.cta.lextia': "Lextia →",

    /* Working on */
    'working.label': 'Focus actuel',
    'working.title': 'Sur quoi je travaille',
    'working.desc': "Des systèmes fiables, du cadrage à la production, avec l’IA comme levier pour les équipes.",
    'card1.stack': "Refonte d’un système de stock magasin à grande échelle",
    'card1.desc': "Architecture modulaire, migration progressive et pilotage technique d’une plateforme critique pour un grand groupe de la distribution.",
    'card2.stack': "Harness engineering & spec-driven development (OpenSpec)",
    'card2.desc': "Cadrer les agents IA par des spécifications, des garde-fous et des boucles de revue, pour qu’ils livrent du code fiable en équipe.",
    'card3.stack': "Un serveur MCP pour le support, l’investigation et l’automatisation assistés par IA",
    'card3.desc': "Serveur Model Context Protocol connectant les agents IA aux outils internes et aux runbooks.",
    'lextia.label': "En parallèle",
    'lextia.title': "Fondateur de Lextia.",
    'lextia.text': "Le procès-verbal de constat rédigé à partir de l’enregistrement audio du commissaire de justice. Son lexique métier, enrichi des noms, lieux et termes de chaque étude, permet à l’IA d’écrire les mots de l’étude plutôt que des approximations.",

    /* Values */
    'values.label': 'Valeurs',
    'values.title': 'Ce qui me tient à cœur',
    'values.desc': 'Des principes qui guident mes décisions techniques et ma façon de collaborer.',
    'care.1': "Fiabilité et excellence opérationnelle",
    'care.2': "Sécurité par conception et défense en profondeur",
    'care.3': "Réduire le MTTR et améliorer l’observabilité",
    'care.4': "Excellence d’ingénierie et expérience développeur",
    'care.5': "Culture inner-source et partage de connaissances",

    /* Architecture */
    'arch.label': "Architecture et fiabilité",
    'arch.title': 'Comment je construis les systèmes',
    'arch.desc': "La fiabilité, la résilience et la sécurité font partie du design, elles ne se rajoutent pas après coup.",
    'arch.1': 'Frontières zero-trust entre microservices: mTLS, comptes de service à privilèges limités, autorisation explicite à chaque appel.',
    'arch.2': "Architecture event-driven avec consommateurs idempotents et outbox pattern, pour des traitements fiables sur des transactions distribuées.",
    'arch.3': "Observabilité basée sur logs structurés, traces distribuées et métriques RED, avec un MTTR optimisé de l'alerte à la cause racine.",
    'arch.4': "Threat modeling et SAST en CI, scan de secrets via hooks pre-commit, et garde-fous sur les dépendances à chaque build.",

    /* AI Agent Engineering */
    'ai.label': 'Ingénierie Agent & IA',
    'ai.title': 'Fiabiliser les agents IA pour la production',
    'ai.desc': "Conception et implémentation de systèmes de harness engineering pour rendre l’usage d’agents basés sur des modèles IA fiable et industrialisable.",
    'ai.point1.title': "Architecture d’agents",
    'ai.point1.desc': "Définition d’architectures selon le paradigme Agent = Modèle + Harnais.",
    'ai.point2.title': 'Contraintes systémiques',
    'ai.point2.desc': "Validation statique (type checking), linters et garde-fous d’exécution.",
    'ai.point3.title': 'Boucles de rétroaction',
    'ai.point3.desc': "Correction automatique des erreurs et limitation de la dérive des outputs.",
    'ai.point4.title': 'Ingénierie de contexte',
    'ai.point4.desc': "Fichiers de spécifications, documentation enrichie et gestion du contexte long.",
    'ai.point5.title': 'Orchestration multi-agents',
    'ai.point5.desc': "Orchestration d’agents multi-étapes avec contrôle des dépendances et des états.",
    'ai.point6.title': 'Sandboxing',
    'ai.point6.desc': "Environnements sécurisés pour l’exécution autonome de code.",
    'ai.point7.title': 'Gouvernance des outils',
    'ai.point7.desc': "Accès aux ressources (filesystem, APIs) avec politiques de sécurité intégrées.",
    'ai.results.label': 'Résultats',
    'ai.results.1': 'Amélioration significative du taux de réussite des tâches autonomes.',
    'ai.results.2': 'Réduction des erreurs non déterministes et des comportements imprévisibles.',
    'ai.results.3': "Augmentation de la capacité des agents à produire du code complexe de manière fiable.",

    /* Game */
    'game.label': 'Mini-jeu',
    'game.title': 'snake<span style="color:var(--cyan)">.exe</span>',
    'game.desc': "Naviguez dans le réseau. Consommez les virus. Atteignez <strong style=\"color:var(--text-primary);\">10 points</strong> pour débloquer le formulaire de contact. Pas le temps de jouer ? <a href=\"https://www.linkedin.com/in/tchoteau/\" target=\"_blank\" rel=\"noopener noreferrer\">Écrivez-moi sur LinkedIn</a>.",
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
    'contact.locked.text': "Terminez le jeu ci-dessus avec un score de <strong style=\"color:var(--text-primary);\">10 points</strong> pour débloquer le formulaire de contact.",
    'contact.locked.progress': 'Progression:',
    'contact.locked.cta': 'Jouer au jeu',
    'contact.locked.linkedin': "Ou écrivez-moi directement <a href=\"https://www.linkedin.com/in/tchoteau/\" target=\"_blank\" rel=\"noopener noreferrer\">sur LinkedIn</a>.",

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
    'form.sending': "Envoi…",
    'form.failure': "✗ Le message n’a pas pu partir. Réessayez, ou écrivez-moi sur LinkedIn.",
    'form.subject': "Nouveau message depuis tchoteau.fr",

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
