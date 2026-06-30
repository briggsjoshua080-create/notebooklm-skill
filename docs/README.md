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

## Where do I open this app?

The code lives in this `docs/` folder, but it isn't hosted anywhere yet — that's
a one-time, 30-second step on GitHub's side:

1. On GitHub, open this repo (`notebooklm-skill`) → **Settings → Pages**.
2. Under *Build and deployment* → *Source*, choose **Deploy from a branch**.
3. Set **Branch** to `claude/cold-approach-coach-app-ty2iww` (this branch — or
   `master` once it's merged) and the folder to **`/docs`**. Click **Save**.
4. Wait ~1 minute, then refresh the Pages settings page. GitHub shows your live
   URL, something like:
   `https://briggsjoshua080-create.github.io/notebooklm-skill/`

That URL *is* the app. Open it on your phone:

- **iPhone (Safari):** open the URL → tap the **Share** icon (square with an
  arrow) → **Add to Home Screen** → **Add**. A real app icon appears on your
  home screen and it opens full-screen, no browser bar.
- **Android (Chrome):** open the URL → tap **⋮** → **Install app** (or **Add to
  Home screen**).

After the first load it's cached, so it keeps working **offline**.

> Prefer not to use GitHub Pages? Any static host works (Netlify, Vercel,
> Cloudflare Pages, or just opening `index.html` locally). It needs HTTPS for
> install/offline/notifications to fully work.

---

## How to use it

1. **Open the app.** The top card shows a mission: a difficulty badge (Warm-up /
   Medium / Hard / Elite), who it's for, the line/dare itself, a coaching tip,
   and the XP it's worth.
2. **Swipe.** Drag the card — **left to skip** it, **right to accept** it. (Or
   use the ✕ / ✓ buttons at the bottom; arrow keys work too if you're testing on
   a laptop.) Tap 💡 anytime to re-read the coaching tip for the current card.
3. **Accepting starts the clock.** A 5:00 countdown ring appears. Go do the
   mission for real, right now.
4. **Report back.** Tap **"I did it 🙌"** to bank the XP (full XP if the ring
   hadn't run out, half if it had — you're still rewarded for honesty). Tap
   **"Not this time"** if you bailed — no penalty beyond the rep not counting.
5. **Watch your level climb.** XP fills the bar under your name; level-ups get
   a confetti moment. Tap the 👤 icon top-right anytime to see your stats, switch
   who you're practicing on (attractive / any stranger / everyone), turn
   difficulty tiers on or off, set up daily reminders, or check the level ladder.

---

## Daily reminders

In **Settings (👤) → Daily reminder**, flip the toggle and pick a time. The
app will ask for notification permission once, then try to nudge you at that
time each day with a one-line reminder.

**The honest limitation:** browsers can't reliably wake a fully-closed app at a
scheduled time without a server sending the notification (true "push"). This
in-app toggle is a free bonus that works well if Approach is open, or was
recently open, around your chosen time — but it can't be guaranteed to fire if
your phone has had the app fully closed for hours.

**For a reminder that always fires, even with the app closed (iPhone):**

1. Open the **Shortcuts** app (built into iOS).
2. Go to the **Automation** tab → **+** → **Create Personal Automation**.
3. Choose **Time of Day**, set the time you want your daily nudge, set it to
   repeat **Daily**, then **Next**.
4. Tap **Add Action**, search for **"Show Notification"**, add it, and type
   something like *"Time for today's Approach mission 💬"*.
5. Tap **Next** → **Done**. On the automation's settings, turn **off** "Ask
   Before Running" so it fires silently without a confirmation prompt.

That's a real, guaranteed local notification — zero code, zero servers. Tapping
it just dismisses it; tapping the **Approach** icon on your home screen right
after takes you straight into a mission.

(Android: **Settings → Clock/Digital Wellbeing → Set a daily alarm or reminder**
pointed at "open Approach", or use an automation app like Tasker/Macrodroid the
same way.)

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
