# Approach — Cold Approach Coach 💬

A swipe-to-dare social courage trainer, inspired by gamified coaching apps like
Poise. It deals you **conversation-opener missions** of random difficulty. Swipe
**left to skip**, **right to accept**. Once accepted you get **5 minutes** to do
it in real life — then claim your **XP** and **level up**.

Built as a fully offline, installable web app (PWA) with a dark theme. No
accounts, no servers, no tracking — all progress is stored locally on your phone.

---

## What it does

- **155 hand-written openers** across two contexts:
  - 🌹 *Someone attractive* — natural cold-approach lines, grounded in real
    social-skills coaching (be specific, give non-physical compliments, state
    intent honestly — no cheesy pickup lines).
  - 👥 *Any stranger* — low-stakes openers to build the habit of talking to people.
- **4 difficulty tiers** with scaled XP:
  | Tier | XP | Vibe |
  |------|----|------|
  | Warm-up | 10 | Logistical / situational, zero pressure |
  | Medium | 25 | Light banter, genuine compliments |
  | Hard | 50 | Direct approach, get a name / number |
  | Elite | 100 | Big swings — ask out on the spot |
- **5-minute mission timer** with a countdown ring. Complete in time for full XP;
  complete late and you still get half (honesty is rewarded).
- **15-level ladder** — *Wallflower → … → Social Legend* — with a level-up
  celebration and confetti.
- **Day streak**, completed-mission and total-XP stats.
- Each card includes a short **coaching tip** explaining *why* the line works and
  how to deliver it (tap 💡 to re-read it).
- A **shuffle bag** ensures you won't see the same line again for a long time.
- **Filters** so you can train only the context / difficulty you want.

---

## Put it on your home screen

The app lives entirely in this `docs/` folder, so the easiest way to host it for
free is **GitHub Pages**:

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under *Build and deployment*, choose **Deploy from a branch**, pick your branch,
   and set the folder to **`/docs`**. Save.
4. After a minute GitHub gives you a URL like
   `https://<you>.github.io/<repo>/`.

Then on your phone:

- **iPhone (Safari):** open the URL → tap the **Share** button → **Add to Home
  Screen**. It launches full-screen like a native app with its own icon.
- **Android (Chrome):** open the URL → menu **⋮** → **Install app** / **Add to
  Home screen**.

Because it's a PWA with a service worker, it works **offline** after the first load.

> Prefer not to use GitHub Pages? Any static host works (Netlify, Vercel, Cloudflare
> Pages, or even opening `index.html` locally). It just needs HTTPS for the
> "install" / offline features to fully kick in.

---

## Files

| File | Purpose |
|------|---------|
| `index.html` | App shell / markup |
| `styles.css` | Dark theme & layout |
| `app.js` | Swipe, timer, XP, levels, persistence |
| `openers.js` | The opener "word bank" (edit to add your own) |
| `manifest.webmanifest` | PWA metadata for home-screen install |
| `sw.js` | Service worker for offline use |
| `icons/` | App icons (regenerate with `node ../scripts/make_icons.js`) |

### Add your own openers

Open `openers.js` and add objects to the `window.OPENERS` array:

```js
{ text: "Your line or dare here",
  category: "attractive",   // "attractive" | "stranger"
  difficulty: 2,            // 1 Warm-up | 2 Medium | 3 Hard | 4 Elite
  tip: "Why it works / how to say it" }
```

---

*This is a personal training tool. Always be respectful — read the situation,
take no for an answer gracefully, and never make anyone uncomfortable. The goal
is your confidence, not anyone else's discomfort.*
