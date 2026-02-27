# Personal Website

A professional personal website — dark premium theme for software engineering, distributed systems, and secure-by-design.

## Stack

Pure **HTML / CSS / JS** — no build step, no dependencies, works offline.

## Features

- **Home** — Hero, "What I'm working on", "What I care about", Architecture & Security
- **Game** — Cybersecurity-themed Snake (canvas). Snake head = terminal skull. Food = virus icons. Score 10 to unlock the contact form.
- **Contact** — Guarded form (accessible only after scoring 10). Persisted via `localStorage`.
- Dark premium design: bleu nuit background, cyan/green neon accents, gold shimmer, subtle blueprint grid, micro-animations.
- Responsive mobile/desktop. Accessible (WCAG AA contrast, keyboard navigation, visible focus, skip-to-content, aria-labels).

## Launch

### Option A — Open directly

```bash
open index.html
```

> Some browsers restrict `localStorage` on `file://` origins. Use Option B for full functionality.

### Option B — Local server (recommended)

**npx (Node.js required):**
```bash
npx serve .
# Visit http://localhost:3000
```

**Python 3:**
```bash
python3 -m http.server 8080
# Visit http://localhost:8080
```

**VS Code:** Install the _Live Server_ extension, right-click `index.html` → _Open with Live Server_.

## File Structure

```
website/
├── index.html      # Home page
├── game.html       # Snake game + locked/unlocked contact form
├── contact.html    # Contact page (redirects to game.html if not unlocked)
├── styles.css      # Full design system (variables, layout, components, animations)
├── app.js          # Shared: sticky nav, lock state, scroll fade-in animations
├── game.js         # Snake game engine (canvas)
└── README.md
```

## Game Controls

| Input | Action |
|-------|--------|
| `↑ ↓ ← →` or `W A S D` | Move snake |
| `SPACE` or `ENTER` | Start / Restart |
| On-screen buttons | Touch / mobile |

## Customization

1. **Your name** — Replace `Your Name` in `index.html` hero section.
2. **GitHub / LinkedIn** — Update `href` on footer links in all pages.
3. **Copyright year** — Update footer `©` year.

## Contact Unlock Reset (dev)

To reset the lock state:
```js
// In browser console:
localStorage.removeItem('contactUnlocked')
```
