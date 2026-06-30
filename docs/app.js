/* =========================================================================
 * Approach — Cold Approach Coach
 * Swipe missions, accept, do it in 5 minutes, earn XP, level up.
 * All state lives in localStorage; works fully offline.
 * ========================================================================= */
(function () {
  "use strict";

  var XP_BY_DIFF = { 1: 10, 2: 25, 3: 50, 4: 100 };
  var MISSION_SECONDS = 300;
  var STORE_KEY = "approach.v1";

  /* ---- Level ladders ---- */
  var LEVELS = [
    { xp: 0,    title: "Wallflower" },
    { xp: 50,   title: "Observer" },
    { xp: 130,  title: "Icebreaker" },
    { xp: 260,  title: "Small-Talker" },
    { xp: 450,  title: "Conversationalist" },
    { xp: 700,  title: "Smooth Talker" },
    { xp: 1020, title: "Approacher" },
    { xp: 1420, title: "Charmer" },
    { xp: 1900, title: "Magnetic" },
    { xp: 2480, title: "Charismatic" },
    { xp: 3180, title: "Socialite" },
    { xp: 4000, title: "Connector" },
    { xp: 5000, title: "Naturally Bold" },
    { xp: 6200, title: "Fearless" },
    { xp: 7600, title: "Social Legend" }
  ];
  var LEVELS_DE = [
    { xp: 0,    title: "Mauerblümchen" },
    { xp: 50,   title: "Beobachter" },
    { xp: 130,  title: "Eisbrecher" },
    { xp: 260,  title: "Plaudertasche" },
    { xp: 450,  title: "Gesprächsführer" },
    { xp: 700,  title: "Charmeur" },
    { xp: 1020, title: "Mutiger Ansprecher" },
    { xp: 1420, title: "Bezauberer" },
    { xp: 1900, title: "Magnetisch" },
    { xp: 2480, title: "Charismatiker" },
    { xp: 3180, title: "Netzwerker" },
    { xp: 4000, title: "Verbinder" },
    { xp: 5000, title: "Natürlich Mutig" },
    { xp: 6200, title: "Furchtlos" },
    { xp: 7600, title: "Soziale Legende" }
  ];

  /* ---- Strings i18n ---- */
  var STRINGS = {
    en: {
      subtitle: "Your cold-approach coach",
      hint: "← swipe to skip  ·  swipe to accept →",
      stampYes: "Do it", stampNo: "Skip",
      doneBtn: "I did it 🙌", failBtn: "Not this time",
      shareBtn: "Share this mission 📤",
      missionLabel: "Mission accepted",
      timerSub: "5 minutes to make it happen",
      timerWarn: "Time's up — did you still do it?",
      progressTitle: "Your progress",
      catQ: "Who are you opening?",
      catBoth: "Everyone", catAttractive: "Someone attractive", catStranger: "Any stranger",
      diffTitle: "Difficulty",
      d1: "Warm-up · 10xp", d2: "Medium · 25xp", d3: "Hard · 50xp", d4: "Elite · 100xp",
      reminderTitle: "Daily reminder",
      reminderSub: "A nudge to do today's mission",
      reminderOn: "On", reminderOff: "Off",
      ladderTitle: "Level ladder",
      resetBtn: "Reset all progress",
      keepGoing: "Keep going",
      luLabel: "Level up",
      emptyTitle: "No missions match your filters",
      emptyBody: "Open your profile and widen the category or difficulty.",
      diffLabel: { 1: "Warm-up", 2: "Medium", 3: "Hard", 4: "Elite" },
      catLabel: { attractive: "Attractive", stranger: "Stranger" },
      xpToNext: "XP to level",
      maxLevel: "Max level reached",
      statDone: "Missions completed",
      statStreak: "Day streak 🔥",
      statXp: "Total XP",
      toastXp: function (g, onTime) { return "⚡ +" + g + " XP" + (onTime ? "" : " (after time — still counts!)"); },
      toastFail: "No worries — the rep still counts. Next one's easier 👊",
      toastReset: "Progress reset. Fresh start 🌱",
      toastReminderOn: function (t) { return "Daily reminder on for " + t; },
      toastReminderSet: function (t) { return "Reminder set for " + t; },
      toastNotifDenied: "Permission denied — enable notifications for Approach in your phone settings to use this.",
      toastNotifUnsupported: "Notifications aren't supported in this tab — add Approach to your Home Screen first, then try again.",
      toastStreak: function (s) { return "👋 No mission done today yet — streak: " + s + (s === 1 ? " day" : " days"); },
      confirmReset: "Reset all XP, levels and progress? This can't be undone.",
      notifBody1: "Nice, you already trained today 💪 Want another rep?",
      notifBody2: "Today's approach mission is waiting 💬 Five minutes is all it takes.",
      shareText: function (text) { return "Mission: \"" + text + "\" — Approach cold-approach coach"; }
    },
    de: {
      subtitle: "Dein Ansprech-Coach",
      hint: "← wischen zum Überspringen  ·  wischen zum Annehmen →",
      stampYes: "Mach's", stampNo: "Skip",
      doneBtn: "Erledigt 🙌", failBtn: "Dieses Mal nicht",
      shareBtn: "Mission teilen 📤",
      missionLabel: "Mission angenommen",
      timerSub: "5 Minuten – mach es möglich",
      timerWarn: "Zeit abgelaufen – hast du es trotzdem getan?",
      progressTitle: "Dein Fortschritt",
      catQ: "Wen sprichst du an?",
      catBoth: "Alle", catAttractive: "Jemand Attraktives", catStranger: "Beliebige Person",
      diffTitle: "Schwierigkeit",
      d1: "Aufwärmen · 10xp", d2: "Mittel · 25xp", d3: "Schwer · 50xp", d4: "Elite · 100xp",
      reminderTitle: "Tägliche Erinnerung",
      reminderSub: "Deine tägliche Mission nicht vergessen",
      reminderOn: "An", reminderOff: "Aus",
      ladderTitle: "Level-Leiter",
      resetBtn: "Alle Fortschritte zurücksetzen",
      keepGoing: "Weiter so",
      luLabel: "Level-Up",
      emptyTitle: "Keine Missionen für diese Filter",
      emptyBody: "Öffne dein Profil und erweitere Kategorie oder Schwierigkeit.",
      diffLabel: { 1: "Aufwärmen", 2: "Mittel", 3: "Schwer", 4: "Elite" },
      catLabel: { attractive: "Attraktiv", stranger: "Fremd" },
      xpToNext: "XP bis Level",
      maxLevel: "Maximales Level erreicht",
      statDone: "Missionen abgeschlossen",
      statStreak: "Tages-Streak 🔥",
      statXp: "Gesamt-XP",
      toastXp: function (g, onTime) { return "⚡ +" + g + " XP" + (onTime ? "" : " (nach der Zeit – zählt trotzdem!)"); },
      toastFail: "Kein Problem — die Übung zählt trotzdem. Nächste wird leichter 👊",
      toastReset: "Fortschritt zurückgesetzt. Frischer Start 🌱",
      toastReminderOn: function (t) { return "Tägliche Erinnerung aktiv für " + t + " Uhr"; },
      toastReminderSet: function (t) { return "Erinnerung gesetzt für " + t + " Uhr"; },
      toastNotifDenied: "Zugriff verweigert — aktiviere Benachrichtigungen für Approach in den Telefoneinstellungen.",
      toastNotifUnsupported: "Benachrichtigungen werden in diesem Tab nicht unterstützt — füge Approach zuerst zum Homescreen hinzu.",
      toastStreak: function (s) { return "👋 Noch keine Mission heute — Streak: " + s + (s === 1 ? " Tag" : " Tage"); },
      confirmReset: "Alle XP, Level und Fortschritte zurücksetzen? Das kann nicht rückgängig gemacht werden.",
      notifBody1: "Super, du hast heute schon trainiert 💪 Noch eine Runde?",
      notifBody2: "Deine heutige Mission wartet 💬 Fünf Minuten reichen.",
      shareText: function (text) { return "Mission: „" + text + "“ — Approach Ansprech-Coach"; }
    }
  };

  function S() { return STRINGS[state.lang] || STRINGS.en; }
  function LVLS() { return state.lang === "de" ? LEVELS_DE : LEVELS; }
  function OPENERS_CURRENT() {
    return (state.lang === "de" && window.OPENERS_DE && window.OPENERS_DE.length)
      ? window.OPENERS_DE
      : (window.OPENERS || []);
  }
  function RECENT_KEY() { return state.lang === "de" ? "recentDe" : "recent"; }

  /* ---- State ---- */
  var state = load();

  function defaultState() {
    return {
      xp: 0,
      done: 0,
      skipped: 0,
      recent: [],
      recentDe: [],
      cat: "both",
      diffs: [1, 2, 3, 4],
      lastDay: null,
      streak: 0,
      seenHint: false,
      lang: "en",
      reminder: { enabled: false, time: "18:00", lastFired: null }
    };
  }
  function load() {
    try {
      var s = JSON.parse(localStorage.getItem(STORE_KEY));
      if (!s || typeof s.xp !== "number") return defaultState();
      var d = defaultState();
      for (var k in d) if (!(k in s)) s[k] = d[k];
      return s;
    } catch (e) { return defaultState(); }
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  /* ---- Level helpers ---- */
  function levelFor(xp) {
    var lv = 1;
    var ladder = LVLS();
    for (var i = 0; i < ladder.length; i++) if (xp >= ladder[i].xp) lv = i + 1;
    return lv;
  }
  function levelInfo(xp) {
    var ladder = LVLS();
    var lv = levelFor(xp);
    var cur = ladder[lv - 1];
    var next = ladder[lv];
    var floor = cur.xp;
    var ceil = next ? next.xp : cur.xp;
    var into = xp - floor;
    var span = next ? (ceil - floor) : 1;
    return {
      level: lv,
      title: cur.title,
      pct: next ? Math.min(100, (into / span) * 100) : 100,
      toNext: next ? (ceil - xp) : 0,
      next: next
    };
  }

  /* ---- Pool / shuffle bag ---- */
  function pool() {
    var ops = OPENERS_CURRENT();
    return ops.map(function (o, i) { return i; }).filter(function (i) {
      var o = ops[i];
      var catOk = state.cat === "both" || o.category === state.cat;
      var diffOk = state.diffs.indexOf(o.difficulty) !== -1;
      return catOk && diffOk;
    });
  }
  function pickNext() {
    var p = pool();
    if (!p.length) return null;
    var rk = RECENT_KEY();
    var recentCap = Math.min(40, Math.floor(p.length * 0.6));
    var recent = state[rk].slice(-recentCap);
    var fresh = p.filter(function (i) { return recent.indexOf(i) === -1; });
    var choices = fresh.length ? fresh : p;
    var idx = choices[Math.floor(Math.random() * choices.length)];
    state[rk].push(idx);
    if (state[rk].length > 80) state[rk] = state[rk].slice(-80);
    save();
    return idx;
  }

  /* ---- DOM refs ---- */
  var $ = function (id) { return document.getElementById(id); };
  var deck = $("deck"), empty = $("empty");
  var levelNum = $("levelNum"), levelTitle = $("levelTitle"), xpBar = $("xpBar"),
      xpNow = $("xpNow"), xpNext = $("xpNext");

  var current = null;
  var dragCard = null;

  /* ---- Apply i18n strings to static DOM ---- */
  function applyStrings() {
    var s = S();
    var langIsDE = state.lang === "de";

    $("brandSub").textContent = s.subtitle;
    $("deckHint").innerHTML = s.hint;
    $("langBtn").textContent = langIsDE ? "DE" : "EN";
    $("langBtn").style.color = langIsDE ? "var(--accent-2)" : "var(--muted)";
    $("emptyTitle").textContent = s.emptyTitle;
    $("emptyBody").textContent = s.emptyBody;
    $("missionLabelEl").textContent = s.missionLabel;
    $("doneBtn").textContent = s.doneBtn;
    $("failBtn").textContent = s.failBtn;
    $("shareBtn").textContent = s.shareBtn;
    $("panelTitle").textContent = s.progressTitle;
    $("catTitle").textContent = s.catQ;
    $("diffTitle").textContent = s.diffTitle;
    $("reminderTitle").textContent = s.reminderTitle;
    $("reminderSubEl").textContent = s.reminderSub;
    $("ladderTitle").textContent = s.ladderTitle;
    $("resetBtn").textContent = s.resetBtn;
    $("luClose").textContent = s.keepGoing;
    $("statXpLabel").textContent = s.statXp;
    $("statDoneLabel").textContent = s.statDone;
    $("statStreakLabel").textContent = s.statStreak;

    // category chips
    var cc = $("catChips").children;
    var catKeys = ["both", "attractive", "stranger"];
    var catTexts = [s.catBoth, s.catAttractive, s.catStranger];
    for (var i = 0; i < cc.length; i++) cc[i].textContent = catTexts[i];

    // difficulty chips
    var dc = $("diffChips").children;
    var diffTexts = [s.d1, s.d2, s.d3, s.d4];
    for (var j = 0; j < dc.length; j++) dc[j].textContent = diffTexts[j];

    // level-up modal header
    var luH2 = document.querySelector(".levelup h2");
    if (luH2) luH2.textContent = s.luLabel;
  }

  /* ---- Render header ---- */
  function renderHeader() {
    var info = levelInfo(state.xp);
    var s = S();
    levelNum.textContent = info.level;
    levelTitle.textContent = info.title;
    xpBar.style.width = info.pct + "%";
    xpNow.textContent = state.xp + " XP";
    xpNext.textContent = info.next
      ? (info.toNext + " " + s.xpToNext + " " + (info.level + 1))
      : s.maxLevel;
  }

  /* ---- Build a card element ---- */
  function makeCard(i, top) {
    var ops = OPENERS_CURRENT();
    var o = ops[i];
    var s = S();
    var el = document.createElement("div");
    el.className = "card";
    el.dataset.idx = i;
    el.innerHTML =
      '<div class="badges">' +
        '<span class="diff" data-d="' + o.difficulty + '"><i></i>' + s.diffLabel[o.difficulty] + '</span>' +
        '<span class="tag cat">' + s.catLabel[o.category] + '</span>' +
      '</div>' +
      '<div class="line">' + escapeHtml(o.text) + '</div>' +
      '<div class="tip">' + escapeHtml(o.tip) + '</div>' +
      '<div class="reward">⚡ ' + XP_BY_DIFF[o.difficulty] + ' XP</div>' +
      '<div class="stamp yes">' + s.stampYes + '</div>' +
      '<div class="stamp no">' + s.stampNo + '</div>';
    if (!top) {
      el.style.transform = "scale(.94) translateY(14px)";
      el.style.filter = "brightness(.8)";
    }
    return el;
  }

  /* ---- Render deck ---- */
  function renderDeck() {
    deck.innerHTML = "";
    var p = pool();
    if (!p.length) { empty.style.display = "flex"; current = null; return; }
    empty.style.display = "none";

    if (current === null) current = pickNext();
    var nextIdx = pickPeek(current);

    if (nextIdx !== null) deck.appendChild(makeCard(nextIdx, false));
    var topEl = makeCard(current, true);
    deck.appendChild(topEl);
    attachDrag(topEl);
    dragCard = topEl;
  }
  function pickPeek(exclude) {
    var p = pool().filter(function (i) { return i !== exclude; });
    if (!p.length) return null;
    return p[Math.floor(Math.random() * p.length)];
  }

  /* ---- Swipe / drag ---- */
  function attachDrag(el) {
    var startX = 0, startY = 0, dx = 0, dy = 0, dragging = false;
    var yes = el.querySelector(".stamp.yes"), no = el.querySelector(".stamp.no");

    function down(e) {
      dragging = true;
      var p = point(e);
      startX = p.x; startY = p.y; dx = 0; dy = 0;
      el.style.transition = "none";
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    }
    function move(e) {
      if (!dragging) return;
      var p = point(e);
      dx = p.x - startX; dy = p.y - startY;
      var rot = dx / 18;
      el.style.transform = "translate(" + dx + "px," + dy + "px) rotate(" + rot + "deg)";
      var k = Math.min(1, Math.abs(dx) / 110);
      yes.style.opacity = dx > 0 ? k : 0;
      no.style.opacity = dx < 0 ? k : 0;
    }
    function up() {
      dragging = false;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      if (dx > 100) return fling(el, 1);
      if (dx < -100) return fling(el, -1);
      el.style.transition = "transform .25s cubic-bezier(.2,.8,.2,1)";
      el.style.transform = "";
      yes.style.opacity = 0; no.style.opacity = 0;
    }
    el.addEventListener("pointerdown", down);
  }
  function point(e) {
    if (e.touches && e.touches[0]) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  }

  function fling(el, dir) {
    el.style.transition = "transform .35s ease-out, opacity .35s ease-out";
    el.style.transform = "translate(" + (dir * 600) + "px," + (dir * 40) + "px) rotate(" + (dir * 30) + "deg)";
    el.style.opacity = "0";
    buzz(8);
    if (dir > 0) {
      acceptMission(current);
    } else {
      state.skipped++; save();
      current = null;
      setTimeout(renderDeck, 180);
    }
  }

  function programmaticSwipe(dir) {
    if (!dragCard || current === null) return;
    fling(dragCard, dir);
  }

  /* ---- Mission timer ---- */
  var sheet = $("sheet"), ringProg = $("ringProg"), timeText = $("timeText"),
      timerSub = $("timerSub"), timerBox = $("timerBox"), missionLine = $("missionLine");
  var CIRC = 2 * Math.PI * 66;
  var timerId = null, remaining = 0, activeIdx = null;

  function acceptMission(i) {
    activeIdx = i;
    var o = OPENERS_CURRENT()[i];
    missionLine.textContent = o.text;
    remaining = MISSION_SECONDS;
    timerBox.classList.remove("warn");
    updateTimerUI();
    sheet.classList.add("show");
    clearInterval(timerId);
    timerId = setInterval(tick, 1000);
    current = null;
    renderDeck();
  }
  function tick() {
    remaining--;
    if (remaining <= 0) { remaining = 0; clearInterval(timerId); }
    if (remaining <= 30) timerBox.classList.add("warn");
    updateTimerUI();
    if (remaining === 0) {
      timerSub.textContent = S().timerWarn;
      buzz([60, 40, 60]);
    }
  }
  function updateTimerUI() {
    var m = Math.floor(remaining / 60), s = remaining % 60;
    timeText.textContent = m + ":" + (s < 10 ? "0" : "") + s;
    var frac = remaining / MISSION_SECONDS;
    ringProg.style.strokeDashoffset = (CIRC * (1 - frac)).toFixed(1);
    if (remaining > 30) timerSub.textContent = S().timerSub;
  }
  function closeMission() {
    clearInterval(timerId);
    sheet.classList.remove("show");
    activeIdx = null;
  }

  function completeMission() {
    if (activeIdx === null) return;
    var o = OPENERS_CURRENT()[activeIdx];
    var base = XP_BY_DIFF[o.difficulty];
    var onTime = remaining > 0;
    var gained = onTime ? base : Math.round(base / 2);
    var prevLevel = levelFor(state.xp);

    state.xp += gained;
    state.done++;
    updateStreak();
    save();

    var newLevel = levelFor(state.xp);
    closeMission();
    renderHeader();
    fxBurst();
    buzz([20, 30, 60]);

    if (newLevel > prevLevel) {
      showLevelUp(newLevel);
    } else {
      toast(S().toastXp(gained, onTime));
    }
    current = null;
    renderDeck();
  }
  function failMission() {
    state.skipped++;
    save();
    closeMission();
    toast(S().toastFail);
    current = null;
    renderDeck();
  }

  function updateStreak() {
    var today = new Date().toISOString().slice(0, 10);
    if (state.lastDay === today) return;
    var yesterday = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    state.streak = (state.lastDay === yesterday) ? state.streak + 1 : 1;
    state.lastDay = today;
  }

  /* ---- Share mission ---- */
  function shareMission() {
    if (activeIdx === null) return;
    var o = OPENERS_CURRENT()[activeIdx];
    var text = S().shareText(o.text);
    if (navigator.share) {
      navigator.share({ text: text }).catch(function () {});
    } else {
      try { navigator.clipboard.writeText(text).then(function () { toast("📋 Copied to clipboard!"); }); }
      catch (e) { toast(text); }
    }
  }

  /* ---- Level-up modal ---- */
  var levelup = $("levelup"), luLevel = $("luLevel"), luTitle = $("luTitle");
  function showLevelUp(lv) {
    luLevel.textContent = "Level " + lv;
    luTitle.textContent = LVLS()[lv - 1].title;
    levelup.classList.add("show");
    fxBurst(true);
    buzz([40, 50, 40, 50, 80]);
  }
  $("luClose").addEventListener("click", function () { levelup.classList.remove("show"); });

  /* ---- Toast ---- */
  var toastEl = $("toast"), toastT = null;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove("show"); }, 2800);
  }

  /* ---- Confetti FX ---- */
  var fx = $("fx"), ctx = fx.getContext("2d"), parts = [], rafId = null;
  function sizeFx() { fx.width = innerWidth; fx.height = innerHeight; }
  sizeFx(); addEventListener("resize", sizeFx);
  function fxBurst(big) {
    var n = big ? 130 : 60;
    var cols = ["#c8922a", "#e8b96b", "#34d399", "#fbbf24", "#38bdf8", "#ffffff", "#e0aa4a"];
    for (var i = 0; i < n; i++) {
      parts.push({
        x: innerWidth / 2, y: big ? innerHeight / 2 : innerHeight * 0.62,
        vx: (Math.random() - 0.5) * (big ? 16 : 11),
        vy: (Math.random() - 1) * (big ? 15 : 11) - 3,
        g: 0.34 + Math.random() * 0.18,
        s: 4 + Math.random() * 6,
        c: cols[(Math.random() * cols.length) | 0],
        r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4,
        life: 90 + Math.random() * 40
      });
    }
    if (!rafId) rafId = requestAnimationFrame(fxLoop);
  }
  function fxLoop() {
    ctx.clearRect(0, 0, fx.width, fx.height);
    for (var i = parts.length - 1; i >= 0; i--) {
      var p = parts[i];
      p.vy += p.g; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life--;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.fillStyle = p.c; ctx.globalAlpha = Math.max(0, Math.min(1, p.life / 30));
      ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6); ctx.restore();
      if (p.life <= 0 || p.y > fx.height + 30) parts.splice(i, 1);
    }
    if (parts.length) rafId = requestAnimationFrame(fxLoop);
    else { rafId = null; ctx.clearRect(0, 0, fx.width, fx.height); }
  }

  /* ---- Haptics ---- */
  function buzz(pat) { if (navigator.vibrate) try { navigator.vibrate(pat); } catch (e) {} }

  /* ---- Language toggle ---- */
  function toggleLang() {
    state.lang = state.lang === "en" ? "de" : "en";
    current = null;
    save();
    applyStrings();
    renderHeader();
    renderPanel();
    renderDeck();
    toast(state.lang === "de" ? "🇩🇪 Deutsch aktiviert" : "🇬🇧 English activated");
  }

  /* ---- Daily reminder ---- */
  function notifAvailable() { return typeof Notification !== "undefined"; }
  function updateReminderUI() {
    var s = S();
    var on = state.reminder.enabled;
    $("reminderToggle").classList.toggle("on", on);
    $("reminderLabel").textContent = on ? (s.reminderOn + " · " + state.reminder.time) : s.reminderOff;
    $("reminderTime").value = state.reminder.time;
  }
  function toggleReminder() {
    if (state.reminder.enabled) {
      state.reminder.enabled = false; save(); updateReminderUI();
      return;
    }
    if (!notifAvailable()) {
      toast(S().toastNotifUnsupported);
      return;
    }
    Notification.requestPermission().then(function (perm) {
      if (perm !== "granted") { toast(S().toastNotifDenied); return; }
      state.reminder.enabled = true; save(); updateReminderUI();
      toast(S().toastReminderOn(state.reminder.time));
    });
  }
  function checkReminder() {
    if (!state.reminder.enabled || !notifAvailable() || Notification.permission !== "granted") return;
    var now = new Date();
    var today = now.toISOString().slice(0, 10);
    if (state.reminder.lastFired === today) return;
    var parts = state.reminder.time.split(":");
    var target = new Date(now); target.setHours(+parts[0], +parts[1] || 0, 0, 0);
    if (now < target) return;
    state.reminder.lastFired = today; save();
    var msg = state.lastDay === today ? S().notifBody1 : S().notifBody2;
    if (navigator.serviceWorker && navigator.serviceWorker.ready) {
      navigator.serviceWorker.ready.then(function (reg) {
        reg.showNotification("Approach", { body: msg, icon: "icons/icon-192.png", tag: "daily-reminder" });
      });
    } else {
      try { new Notification("Approach", { body: msg, icon: "icons/icon-192.png" }); } catch (e) {}
    }
  }
  setInterval(checkReminder, 60000);

  function nudgeIfMissedToday() {
    var today = new Date().toISOString().slice(0, 10);
    if (state.done > 0 && state.lastDay !== today) {
      setTimeout(function () {
        toast(S().toastStreak(state.streak));
      }, 900);
    }
  }

  /* ---- Profile panel ---- */
  var panel = $("panel");
  function openPanel() { renderPanel(); panel.classList.add("show"); }
  function renderPanel() {
    var info = levelInfo(state.xp);
    var s = S();
    $("sLevel").textContent = info.level;
    $("sTitle").textContent = info.title;
    $("sXp").textContent = state.xp;
    $("sDone").textContent = state.done;
    $("sStreak").textContent = state.streak;
    updateReminderUI();

    var cc = $("catChips").children;
    for (var i = 0; i < cc.length; i++)
      cc[i].classList.toggle("on", cc[i].dataset.cat === state.cat);

    var dc = $("diffChips").children;
    for (var j = 0; j < dc.length; j++)
      dc[j].classList.toggle("on", state.diffs.indexOf(+dc[j].dataset.d) !== -1);

    var ladder = $("ladder"); ladder.innerHTML = "";
    var lvls = LVLS();
    lvls.forEach(function (L, idx) {
      var lv = idx + 1, cur = lv === info.level, done = lv < info.level;
      var row = document.createElement("div");
      row.className = "rung" + (cur ? " cur" : "") + (done ? " done" : "");
      row.innerHTML = '<div class="lv">' + lv + '</div><div class="nm">' + L.title +
        '</div><div class="xp">' + L.xp + ' XP</div>';
      ladder.appendChild(row);
    });
  }

  /* ---- Wire up controls ---- */
  $("skipBtn").addEventListener("click", function () { programmaticSwipe(-1); });
  $("acceptBtn").addEventListener("click", function () { programmaticSwipe(1); });
  $("infoBtn").addEventListener("click", function () {
    if (current === null) return;
    toast("💡 " + OPENERS_CURRENT()[current].tip);
  });
  $("doneBtn").addEventListener("click", completeMission);
  $("failBtn").addEventListener("click", failMission);
  $("shareBtn").addEventListener("click", shareMission);
  $("closeSheet").addEventListener("click", function () {
    closeMission(); current = null; renderDeck();
  });
  $("profileBtn").addEventListener("click", openPanel);
  $("closePanel").addEventListener("click", function () { panel.classList.remove("show"); });
  $("langBtn").addEventListener("click", toggleLang);

  $("catChips").addEventListener("click", function (e) {
    var b = e.target.closest(".chip"); if (!b) return;
    state.cat = b.dataset.cat; save(); current = null; renderPanel(); renderDeck();
  });
  $("diffChips").addEventListener("click", function (e) {
    var b = e.target.closest(".chip"); if (!b) return;
    var d = +b.dataset.d, k = state.diffs.indexOf(d);
    if (k === -1) state.diffs.push(d);
    else if (state.diffs.length > 1) state.diffs.splice(k, 1);
    save(); current = null; renderPanel(); renderDeck();
  });
  $("reminderToggle").addEventListener("click", toggleReminder);
  $("reminderTime").addEventListener("change", function (e) {
    state.reminder.time = e.target.value;
    state.reminder.lastFired = null;
    save(); updateReminderUI();
    if (state.reminder.enabled) toast(S().toastReminderSet(state.reminder.time));
  });
  $("resetBtn").addEventListener("click", function () {
    if (confirm(S().confirmReset)) {
      state = defaultState(); save();
      current = null; applyStrings(); renderHeader(); renderPanel(); renderDeck();
      toast(S().toastReset);
    }
  });

  addEventListener("keydown", function (e) {
    if (sheet.classList.contains("show") || panel.classList.contains("show")) return;
    if (e.key === "ArrowLeft") programmaticSwipe(-1);
    if (e.key === "ArrowRight") programmaticSwipe(1);
    if (e.key === "l" || e.key === "L") toggleLang();
  });

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---- Boot ---- */
  applyStrings();
  renderHeader();
  renderDeck();
  checkReminder();
  nudgeIfMissedToday();

  if ("serviceWorker" in navigator) {
    addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    });
  }
})();
