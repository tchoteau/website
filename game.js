/**
 * game.js — Cybersecurity-themed Snake game
 * - Snake head: terminal skull (canvas-drawn)
 * - Food: virus/bug icons
 * - Keyboard: arrows + WASD
 * - Touch: on-screen buttons
 * - Unlock contact at score >= 10
 */

(function () {
  'use strict';

  /* ── Config ─────────────────────────────────────────────── */
  const GRID = 20;       // cells
  const BASE_SPEED = 150; // ms per tick
  const UNLOCK_SCORE = 10;
  const UNLOCK_KEY = 'contactUnlocked';

  /* ── Canvas setup ────────────────────────────────────────── */
  const canvas = document.getElementById('gameCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Make canvas square, responsive
  function resizeCanvas() {
    const maxSize = Math.min(window.innerWidth - 40, 420);
    const size = Math.floor(maxSize / GRID) * GRID; // snap to grid
    canvas.width = size;
    canvas.height = size;
  }
  resizeCanvas();

  const CELL = () => canvas.width / GRID;

  /* ── Colors ─────────────────────────────────────────────── */
  const C = {
    bg:        '#07091a',
    grid:      'rgba(0, 229, 255, 0.04)',
    snakeBody: '#00b8d4',
    snakeDark: '#006064',
    head:      '#00e5ff',
    food:      '#ff4444',
    foodGlow:  'rgba(255, 68, 68, 0.35)',
    gold:      '#c9a84c',
    text:      '#8a96b0',
    cyan:      '#00e5ff',
    green:     '#39ff14',
  };

  /* ── State ────────────────────────────────────────────────── */
  let snake, dir, nextDir, score, gameLoop, speed, running, gameOver, started;

  function resetState() {
    const mid = Math.floor(GRID / 2);
    snake = [
      { x: mid,     y: mid },
      { x: mid - 1, y: mid },
      { x: mid - 2, y: mid },
    ];
    dir = { x: 1, y: 0 };
    nextDir = { x: 1, y: 0 };
    score = 0;
    speed = BASE_SPEED;
    running = false;
    gameOver = false;
    started = false;
    updateScoreDisplay();
    updateProgressBar();
    spawnFood();
  }

  let food = { x: 5, y: 5 };
  function spawnFood() {
    let pos;
    do {
      pos = {
        x: Math.floor(Math.random() * GRID),
        y: Math.floor(Math.random() * GRID),
      };
    } while (snake.some(s => s.x === pos.x && s.y === pos.y));
    food = pos;
  }

  /* ── Drawing ─────────────────────────────────────────────── */
  function drawGrid() {
    const cell = CELL();
    ctx.strokeStyle = C.grid;
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cell, 0);
      ctx.lineTo(i * cell, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cell);
      ctx.lineTo(canvas.width, i * cell);
      ctx.stroke();
    }
  }

  function drawSnake() {
    const cell = CELL();
    snake.forEach((seg, i) => {
      const x = seg.x * cell;
      const y = seg.y * cell;
      const pad = 2;

      if (i === 0) {
        // Head — terminal skull
        drawHead(x, y, cell);
      } else {
        // Body segments with gradient
        const alpha = 0.45 + 0.55 * (1 - i / snake.length);
        ctx.fillStyle = `rgba(0, 184, 212, ${alpha})`;
        ctx.strokeStyle = `rgba(0, 97, 100, ${alpha})`;
        ctx.lineWidth = 1;

        const r = Math.min(cell * 0.3, 6);
        roundRect(ctx, x + pad, y + pad, cell - pad * 2, cell - pad * 2, r);
        ctx.fill();
        ctx.stroke();
      }
    });
  }

  function drawHead(x, y, cell) {
    const cx = x + cell / 2;
    const cy = y + cell / 2;
    const r = cell * 0.42;

    // Glow
    const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 1.6);
    grd.addColorStop(0, 'rgba(0, 229, 255, 0.25)');
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 1.6, 0, Math.PI * 2);
    ctx.fill();

    // Skull shape (hexagon-ish)
    ctx.fillStyle = C.head;
    ctx.beginPath();
    ctx.arc(cx, cy - r * 0.1, r, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    const eyeR = r * 0.2;
    const eyeOffX = r * 0.3;
    const eyeOffY = r * 0.05;
    ctx.fillStyle = C.bg;
    ctx.beginPath();
    ctx.arc(cx - eyeOffX, cy - eyeOffY, eyeR, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + eyeOffX, cy - eyeOffY, eyeR, 0, Math.PI * 2);
    ctx.fill();

    // X marks in eyes
    ctx.strokeStyle = C.cyan;
    ctx.lineWidth = Math.max(1.5, r * 0.15);
    [[cx - eyeOffX, cy - eyeOffY], [cx + eyeOffX, cy - eyeOffY]].forEach(([ex, ey]) => {
      const d = eyeR * 0.6;
      ctx.beginPath(); ctx.moveTo(ex - d, ey - d); ctx.lineTo(ex + d, ey + d); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(ex + d, ey - d); ctx.lineTo(ex - d, ey + d); ctx.stroke();
    });

    // Teeth
    ctx.fillStyle = C.bg;
    const teethY = cy + r * 0.35;
    const toothW = r * 0.28;
    const toothH = r * 0.3;
    const toothGap = r * 0.08;
    for (let t = -1; t <= 1; t++) {
      ctx.fillRect(
        cx + t * (toothW + toothGap) - toothW / 2,
        teethY,
        toothW,
        toothH
      );
    }
  }

  /* Draw virus food */
  function drawFood() {
    const cell = CELL();
    const cx = food.x * cell + cell / 2;
    const cy = food.y * cell + cell / 2;
    const r = cell * 0.35;

    // Glow
    ctx.shadowColor = C.food;
    ctx.shadowBlur = 12;

    // Body (hexagon)
    ctx.fillStyle = C.food;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      const px = cx + r * Math.cos(angle);
      const py = cy + r * Math.sin(angle);
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();

    // Spikes
    ctx.strokeStyle = '#ff6b6b';
    ctx.lineWidth = Math.max(1, cell * 0.06);
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i;
      ctx.beginPath();
      ctx.moveTo(cx + r * 0.7 * Math.cos(a), cy + r * 0.7 * Math.sin(a));
      ctx.lineTo(cx + r * 1.45 * Math.cos(a), cy + r * 1.45 * Math.sin(a));
      ctx.stroke();
    }

    // Inner dot
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.25, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function render() {
    // Clear
    ctx.fillStyle = C.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawFood();
    drawSnake();
  }

  /* ── Game loop ───────────────────────────────────────────── */
  function tick() {
    if (!running) return;

    dir = { ...nextDir };
    const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

    // Wall collision
    if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID) {
      endGame(false); return;
    }
    // Self collision (skip tail — it will have moved)
    if (snake.slice(0, -1).some(s => s.x === head.x && s.y === head.y)) {
      endGame(false); return;
    }

    const ate = head.x === food.x && head.y === food.y;
    snake.unshift(head);
    if (ate) {
      score++;
      updateScoreDisplay();
      updateProgressBar();
      if (score % 5 === 0) speed = Math.max(60, speed - 20); // speed up
      if (score >= UNLOCK_SCORE) {
        endGame(true); return;
      }
      spawnFood();
    } else {
      snake.pop();
    }

    render();
    gameLoop = setTimeout(tick, speed);
  }

  function startGame() {
    if (running) return;
    hideOverlay();
    resetState();
    running = true;
    started = true;
    tick();
  }

  function endGame(won) {
    running = false;
    clearTimeout(gameLoop);
    render();
    gameOver = !won;

    if (won) {
      unlockContact();
      showOverlay('game.overlay.win.title', 'game.overlay.win.subtitle', 'rgb(57,255,20)');
    } else {
      showOverlay('💀 GAME OVER', 'game.overlay.lose.subtitle', C.cyan);
    }
  }

  /* ── Overlay ─────────────────────────────────────────────── */
  const overlay = document.getElementById('gameOverlay');
  const overlayTitle = document.getElementById('overlayTitle');
  const overlaySubtitle = document.getElementById('overlaySubtitle');

  function showOverlay(titleKey, subtitleKey, color) {
    if (!overlay) return;
    const tr = window.t || (k => k);
    overlayTitle.textContent    = tr(titleKey);
    overlayTitle.style.color    = color || C.cyan;
    overlayTitle._i18nKey       = titleKey;
    overlaySubtitle.textContent = tr(subtitleKey);
    overlaySubtitle._i18nKey    = subtitleKey;
    const btn = document.getElementById('overlayBtn');
    if (btn) btn.textContent = tr('game.overlay.start.btn');
    overlay.classList.remove('hidden');
  }

  function hideOverlay() {
    overlay?.classList.add('hidden');
  }

  /* ── Score UI ────────────────────────────────────────────── */
  function updateScoreDisplay() {
    const el = document.getElementById('scoreValue');
    if (el) el.textContent = score;
  }

  function updateProgressBar() {
    const fill = document.getElementById('scoreProgressFill');
    if (fill) fill.style.width = `${Math.min(100, (score / UNLOCK_SCORE) * 100)}%`;
    const label = document.getElementById('scoreProgressLabel');
    if (label) label.textContent = score;
    // Update aria value
    const bar = document.querySelector('.score-progress');
    if (bar) bar.setAttribute('aria-valuenow', score);
  }

  /* ── Unlock contact ──────────────────────────────────────── */
  function unlockContact() {
    localStorage.setItem(UNLOCK_KEY, 'true');
    window.dispatchEvent(new Event('contactUnlocked'));

    // Reveal contact form on single page
    const locked = document.getElementById('contactLocked');
    const form   = document.getElementById('contactFormSection');
    if (locked) locked.style.display = 'none';
    if (form)   form.classList.add('visible');

    // Update nav badge
    const badge = document.querySelector('.lock-badge');
    if (badge) {
      badge.textContent = 'unlocked';
      badge.classList.remove('locked');
      badge.classList.add('unlocked');
    }
    const contactNavLink = document.getElementById('contactNavLink');
    if (contactNavLink) contactNavLink.classList.remove('disabled');

    // Smooth-scroll to contact section after a brief delay
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 800);
  }

  /* ── Input handling ──────────────────────────────────────── */
  const DIR_MAP = {
    ArrowUp:    { x: 0, y: -1 }, w: { x: 0, y: -1 },
    ArrowDown:  { x: 0, y:  1 }, s: { x: 0, y:  1 },
    ArrowLeft:  { x: -1, y: 0 }, a: { x: -1, y: 0 },
    ArrowRight: { x: 1,  y: 0 }, d: { x: 1,  y: 0 },
  };

  document.addEventListener('keydown', e => {
    const d = DIR_MAP[e.key] || DIR_MAP[e.key.toLowerCase()];
    if (d) {
      e.preventDefault();
      // Prevent reversing
      if (d.x === -dir.x && d.y === -dir.y) return;
      nextDir = d;
      if (!started) startGame();
    }
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (!started || gameOver) { resetState(); startGame(); }
    }
  });

  // Touch / on-screen buttons
  function bindTouchBtn(id, d) {
    const btn = document.getElementById(id);
    if (!btn) return;
    const handler = (e) => {
      e.preventDefault();
      if (d.x === -dir.x && d.y === -dir.y) return;
      nextDir = d;
      if (!started || gameOver) { resetState(); startGame(); }
    };
    btn.addEventListener('touchstart', handler, { passive: false });
    btn.addEventListener('mousedown', handler);
  }

  bindTouchBtn('btnUp',    { x: 0,  y: -1 });
  bindTouchBtn('btnDown',  { x: 0,  y:  1 });
  bindTouchBtn('btnLeft',  { x: -1, y:  0 });
  bindTouchBtn('btnRight', { x: 1,  y:  0 });

  // Start on canvas click/tap
  canvas.addEventListener('click', () => {
    if (!started || gameOver) { resetState(); startGame(); }
  });

  /* ── Init ────────────────────────────────────────────────── */
  resetState();
  render();

  // Check if already unlocked
  if (localStorage.getItem(UNLOCK_KEY) === 'true') {
    const locked = document.getElementById('contactLocked');
    const form = document.getElementById('contactFormSection');
    if (locked) locked.style.display = 'none';
    if (form) form.classList.add('visible');
  }

  // Show start overlay
  showOverlay('game.overlay.start.title', 'game.overlay.start.subtitle', C.cyan);

  // Handle window resize
  window.addEventListener('resize', () => {
    resizeCanvas();
    render();
  });

  // Re-translate overlay text when language switches
  window.addEventListener('langChange', () => {
    if (overlay && !overlay.classList.contains('hidden')) {
      const tr = window.t || (k => k);
      if (overlayTitle._i18nKey) overlayTitle.textContent = tr(overlayTitle._i18nKey);
      if (overlaySubtitle._i18nKey) overlaySubtitle.textContent = tr(overlaySubtitle._i18nKey);
      const btn = document.getElementById('overlayBtn');
      if (btn) btn.textContent = tr('game.overlay.start.btn');
    }
  });

})();
