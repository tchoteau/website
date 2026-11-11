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
    'arch.title': "How I evolve a system in production",
    'arch.desc': "Evolving a critical platform without stopping it, with reliability at the core.",
    'arch.1': "Split by business domain: a modular monolith where each module exposes only its façade, rather than premature microservices.",
    'arch.2': "Migrate without a big bang: an adapter to the existing system, dual publishing and API versions side by side, a progressive switch-over, one use case at a time.",
    'arch.3': "Event-driven architecture with a transactional outbox: every published event matches a state that was actually stored.",
    'arch.4': "Retire the old system cleanly: measure the switch-over, then stop the old contract once the last consumer has migrated.",

    /* AI Agent Engineering */
    'ai.label': "AI Enabler",
    'ai.title': "Bringing a team to AI-assisted development",
    'ai.desc': "Making AI agents reliable day to day, in a real team and on production code.",
    'ai.point1.title': "Spec-driven development",
    'ai.point1.desc': "Start from a specification reviewed as a team (OpenSpec) before writing code, whether a human or an agent writes it.",
    'ai.point2.title': "Harness engineering",
    'ai.point2.desc': "Instructions per repository, guidelines that grow from code reviews, guardrails that stop the agent from working around a test.",
    'ai.point3.title': "Agentic code review",
    'ai.point3.desc': "A review along two axes, compliance with the standards and with the specification: the agent proposes, the human decides.",
    'ai.point4.title': "AI for production support",
    'ai.point4.desc': "Agents that help diagnose production incidents and propose a fix plan, without carrying it out.",
    'ai.point5.title': "Supporting teams",
    'ai.point5.desc': "Workshops, shared practices and tools, so everyone progresses at their own pace.",

    /* Game */
    'game.label': 'Mini-game',
    'game.title': 'snake<span style="color:var(--cyan)">.exe</span>',
    'game.desc': "Navigate the network. Consume the viruses. Reach <strong style=\"color:var(--text-primary);\">3 points</strong> to unlock the contact form below. No time to play? <a href=\"https://www.linkedin.com/in/tchoteau/\" target=\"_blank\" rel=\"noopener noreferrer\">Write to me on LinkedIn</a>.",
    'game.score': 'SCORE',
    'game.status': 'Keyboard: <kbd style="font-family:var(--font-mono);color:var(--cyan);">↑ ↓ ← →</kbd> or <kbd style="font-family:var(--font-mono);color:var(--cyan);">W A S D</kbd> · <kbd style="font-family:var(--font-mono);color:var(--cyan);">SPACE</kbd> to restart',
    'game.overlay.start.title': '[ SNAKE.EXE ]',
    'game.overlay.start.subtitle': 'Press [SPACE], [↑], or tap to start',
    'game.overlay.start.btn': '▶ Start',
    'game.overlay.win.title': '🔓 ACCESS GRANTED',
    'game.overlay.win.subtitle': 'Score 3 reached. Contact unlocked.',
    'game.overlay.lose.subtitle': 'Press [SPACE] or tap to retry',

    /* Contact locked */
    'contact.locked.title': 'Contact locked',
    'contact.locked.text': "Complete the game above with a score of <strong style=\"color:var(--text-primary);\">3 points</strong> to unlock the contact form.",
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
    'arch.title': "Comment je fais évoluer un système en production",
    'arch.desc': "Faire évoluer une plateforme critique sans l’arrêter, avec la fiabilité au centre.",
    'arch.1': "Découper par domaine métier : un monolithe modulaire où chaque module n’expose que sa façade, plutôt que des microservices prématurés.",
    'arch.2': "Migrer sans big bang : adaptateur vers l’existant, double publication et versions d’API en parallèle, bascule progressive cas d’usage par cas d’usage.",
    'arch.3': "Architecture event-driven avec outbox transactionnel : chaque événement publié correspond à un état réellement enregistré.",
    'arch.4': "Retirer l’ancien proprement : mesurer la bascule, puis arrêter l’ancien contrat une fois le dernier consommateur migré.",

    /* AI Agent Engineering */
    'ai.label': "AI Enabler",
    'ai.title': "Faire passer une équipe au développement assisté par IA",
    'ai.desc': "Rendre l’usage des agents IA fiable au quotidien, dans une vraie équipe et sur du code de production.",
    'ai.point1.title': "Spec-driven development",
    'ai.point1.desc': "Partir d’une spécification relue en équipe (OpenSpec) avant d’écrire du code, qu’il vienne d’un humain ou d’un agent.",
    'ai.point2.title': "Harness engineering",
    'ai.point2.desc': "Instructions par dépôt, guidelines qui s’enrichissent des revues de code, garde-fous qui empêchent l’agent de contourner un test.",
    'ai.point3.title': "Revue de code agentique",
    'ai.point3.desc': "Une revue sur deux axes, conformité aux standards et à la spécification : l’agent propose, l’humain décide.",
    'ai.point4.title': "L’IA au service du support",
    'ai.point4.desc': "Des agents qui aident à diagnostiquer les incidents de production et proposent un plan de correction, sans l’exécuter.",
    'ai.point5.title': "Accompagnement des équipes",
    'ai.point5.desc': "Ateliers, pratiques et outils partagés, pour que chacun progresse à son rythme.",

    /* Game */
    'game.label': 'Mini-jeu',
    'game.title': 'snake<span style="color:var(--cyan)">.exe</span>',
    'game.desc': "Naviguez dans le réseau. Consommez les virus. Atteignez <strong style=\"color:var(--text-primary);\">3 points</strong> pour débloquer le formulaire de contact. Pas le temps de jouer ? <a href=\"https://www.linkedin.com/in/tchoteau/\" target=\"_blank\" rel=\"noopener noreferrer\">Écrivez-moi sur LinkedIn</a>.",
    'game.score': 'SCORE',
    'game.status': 'Clavier: <kbd style="font-family:var(--font-mono);color:var(--cyan);">↑ ↓ ← →</kbd> ou <kbd style="font-family:var(--font-mono);color:var(--cyan);">W A S D</kbd> · <kbd style="font-family:var(--font-mono);color:var(--cyan);">ESPACE</kbd> pour redémarrer',
    'game.overlay.start.title': '[ SNAKE.EXE ]',
    'game.overlay.start.subtitle': 'Appuyez sur [ESPACE], [↑] ou touchez l’écran pour démarrer',
    'game.overlay.start.btn': '▶ Démarrer',
    'game.overlay.win.title': '🔓 ACCÈS ACCORDÉ',
    'game.overlay.win.subtitle': 'Score 3 atteint. Contact débloqué.',
    'game.overlay.lose.subtitle': 'Appuyez sur [ESPACE] ou touchez l’écran pour réessayer',

    /* Contact locked */
    'contact.locked.title': 'Contact verrouillé',
    'contact.locked.text': "Terminez le jeu ci-dessus avec un score de <strong style=\"color:var(--text-primary);\">3 points</strong> pour débloquer le formulaire de contact.",
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
