# Personal Website

Personal website of Thomas Choteau, Tech Lead & AI Enabler in Lille and founder of Lextia — dark theme, cyan for the Tech Lead activity, gold reserved for Lextia.

## Stack

Pure **HTML / CSS / JS** — no build step, no dependencies. Fonts (Inter, JetBrains Mono, SIL OFL) are served from `fonts/`, with no call to Google Fonts.

## Features

- **Home** — Hero, "What I'm working on" with the Lextia block, "What I care about", Architecture & reliability, AI agent engineering
- **Game** — Cybersecurity-themed Snake (canvas). Snake head = terminal skull. Food = virus icons. Score 10 to unlock the contact form.
- **Contact** — Guarded form (accessible only after scoring 10, unlock persisted via `localStorage`), delivered by [Web3Forms](https://web3forms.com). A LinkedIn link is offered next to the game.
- Dark design: night-blue background, cyan/green neon accents, subtle blueprint grid, micro-animations. Lextia gold `#E8B84B` is used only for Lextia.
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
├── app.js          # Shared: sticky nav, lock state, scroll fade-in, contact form delivery (Web3Forms)
├── game.js         # Snake game engine (canvas)
├── i18n.js         # FR/EN translations
├── fonts/          # Self-hosted Inter and JetBrains Mono (woff2, SIL OFL)
├── og-image.png    # 1200 × 630 share image
├── lextia-chouette.svg  # Lextia owl
└── README.md
```

## Game Controls

| Input | Action |
|-------|--------|
| `↑ ↓ ← →` or `W A S D` | Move snake |
| `SPACE` or `ENTER` | Start / Restart |
| On-screen buttons | Touch / mobile |

## Contact form (Web3Forms)

Every `<form data-contact-form>` is sent by `app.js` to Web3Forms. Set the access key received by e-mail when creating the form on web3forms.com:

```js
// app.js
const WEB3FORMS_ACCESS_KEY = '…';
```

The key is public by design: it only lets someone send a message to the mailbox it was created for. The form was created for `https://www.tchoteau.fr`. If the key is ever emptied or refused, the form shows a failure message pointing to LinkedIn instead of pretending the message was sent.

## Contact Unlock Reset (dev)

To reset the lock state:
```js
// In browser console:
localStorage.removeItem('contactUnlocked')
```
