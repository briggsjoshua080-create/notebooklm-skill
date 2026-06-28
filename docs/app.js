/* =========================================================================
 * Approach — Cold Approach Coach
 * Swipe missions, accept, do it in 5 minutes, earn XP, level up.
 * All state lives in localStorage; works fully offline.
 * ========================================================================= */
(function () {
  "use strict";

  var OPENERS = window.OPENERS || [];
  var XP_BY_DIFF = { 1: 10, 2: 25, 3: 50, 4: 100 };
  var DIFF_NAME = { 1: "Warm-up", 2: "Medium", 3: "Hard", 4: "Elite" };
  var CAT_NAME = { attractive: "Attractive", stranger: "Stranger" };
  var MISSION_SECONDS = 300; // 5 minutes
  var STORE_KEY = "approach.v1";

  /* ---- Level ladder: cumulative XP thresholds + titles ---- */
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

  /* ---- State ---- */
  var state = load();

  function defaultState() {
    return {
      xp: 0,
      done: 0,
      skipped: 0,
      recent: [],            // indices shown recently (avoid repeats)
      cat: "both",           // both | attractive | stranger
      diffs: [1, 2, 3, 4],   // enabled difficulties
      lastDay: null,         // YYYY-MM-DD of last completion
      streak: 0,
      seenHint: false
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
    for (var i = 0; i < LEVELS.length; i++) if (xp >= LEVELS[i].xp) lv = i + 1;
    return lv;
  }
  function levelInfo(xp) {
    var lv = levelFor(xp);
    var cur = LEVELS[lv - 1];
    var next = LEVELS[lv]; // may be undefined at max
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

  /* ---- Pool / shuffle bag (avoid repeats too soon) ---- */
  function pool() {
    return OPENERS.map(function (o, i) { return i; }).filter(function (i) {
      var o = OPENERS[i];
      var catOk = state.cat === "both" || o.category === state.cat;
      var diffOk = state.diffs.indexOf(o.difficulty) !== -1;
      return catOk && diffOk;
    });
  }
  function pickNext() {
    var p = pool();
    if (!p.length) return null;
    // exclude recently seen, but relax if that empties the pool
    var recentCap = Math.min(40, Math.floor(p.length * 0.6));
    var recent = state.recent.slice(-recentCap);
    var fresh = p.filter(function (i) { return recent.indexOf(i) === -1; });
    var choices = fresh.length ? fresh : p;
    var idx = choices[Math.floor(Math.random() * choices.length)];
    state.recent.push(idx);
    if (state.recent.length > 80) state.recent = state.recent.slice(-80);
    save();
    return idx;
  }

  /* ---- DOM refs ---- */
  var $ = function (id) { return document.getElementById(id); };
  var deck = $("deck"), empty = $("empty");
  var levelNum = $("levelNum"), levelTitle = $("levelTitle"), xpBar = $("xpBar"),
      xpNow = $("xpNow"), xpNext = $("xpNext");

  var current = null;     // currently top opener index
  var dragCard = null;    // top card element being dragged

  /* ---- Render header ---- */
  function renderHeader() {
    var info = levelInfo(state.xp);
    levelNum.textContent = info.level;
    levelTitle.textContent = info.title;
    xpBar.style.width = info.pct + "%";
    xpNow.textContent = state.xp + " XP";
    xpNext.textContent = info.next
      ? (info.toNext + " XP to level " + (info.level + 1))
      : "Max level reached";
  }

  /* ---- Build a card element ---- */
  function makeCard(i, top) {
    var o = OPENERS[i];
    var el = document.createElement("div");
    el.className = "card";
    el.dataset.idx = i;
    el.innerHTML =
      '<div class="badges">' +
        '<span class="diff" data-d="' + o.difficulty + '"><i></i>' + DIFF_NAME[o.difficulty] + '</span>' +
        '<span class="tag cat">' + CAT_NAME[o.category] + '</span>' +
      '</div>' +
      '<div class="line">' + escapeHtml(o.text) + '</div>' +
      '<div class="tip">' + escapeHtml(o.tip) + '</div>' +
      '<div class="reward">⚡ ' + XP_BY_DIFF[o.difficulty] + ' XP</div>' +
      '<div class="stamp yes">Do it</div>' +
      '<div class="stamp no">Skip</div>';
    if (!top) {
      el.style.transform = "scale(.94) translateY(14px)";
      el.style.filter = "brightness(.8)";
    }
    return el;
  }

  /* ---- Render the deck (two stacked cards) ---- */
  function renderDeck() {
    deck.innerHTML = "";
    var p = pool();
    if (!p.length) { empty.style.display = "flex"; current = null; return; }
    empty.style.display = "none";

    if (current === null) current = pickNext();
    var nextIdx = pickPeek(current);

    // back card first (so it's underneath)
    if (nextIdx !== null) deck.appendChild(makeCard(nextIdx, false));
    var topEl = makeCard(current, true);
    deck.appendChild(topEl);
    attachDrag(topEl);
    dragCard = topEl;
  }
  // peek at a likely-next index without committing it to recent yet
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
      var threshold = 100;
      if (dx > threshold) return fling(el, 1);
      if (dx < -threshold) return fling(el, -1);
      // snap back
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

  /* button-driven swipe */
  function programmaticSwipe(dir) {
    if (!dragCard || current === null) return;
    fling(dragCard, dir);
  }

  /* ---- Mission timer ---- */
  var sheet = $("sheet"), ringProg = $("ringProg"), timeText = $("timeText"),
      timerSub = $("timerSub"), timerBox = $("timerBox"), missionLine = $("missionLine");
  var CIRC = 2 * Math.PI * 66; // 414.69
  var timerId = null, remaining = 0, activeIdx = null;

  function acceptMission(i) {
    activeIdx = i;
    var o = OPENERS[i];
    missionLine.textContent = o.text;
    remaining = MISSION_SECONDS;
    timerBox.classList.remove("warn");
    updateTimerUI();
    sheet.classList.add("show");
    clearInterval(timerId);
    timerId = setInterval(tick, 1000);
    // prepare next deck behind the sheet
    current = null;
    renderDeck();
  }
  function tick() {
    remaining--;
    if (remaining <= 0) { remaining = 0; clearInterval(timerId); }
    if (remaining <= 30) timerBox.classList.add("warn");
    updateTimerUI();
    if (remaining === 0) {
      timerSub.textContent = "Time's up — did you still do it?";
      buzz([60, 40, 60]);
    }
  }
  function updateTimerUI() {
    var m = Math.floor(remaining / 60), s = remaining % 60;
    timeText.textContent = m + ":" + (s < 10 ? "0" : "") + s;
    var frac = remaining / MISSION_SECONDS;
    ringProg.style.strokeDashoffset = (CIRC * (1 - frac)).toFixed(1);
    if (remaining > 30) timerSub.textContent = "5 minutes to make it happen";
  }
  function closeMission() {
    clearInterval(timerId);
    sheet.classList.remove("show");
    activeIdx = null;
  }

  function completeMission() {
    if (activeIdx === null) return;
    var o = OPENERS[activeIdx];
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
      toast("⚡ +" + gained + " XP" + (onTime ? "" : " (after time — still counts!)"));
    }
    current = null;
    renderDeck();
  }
  function failMission() {
    state.skipped++;
    save();
    closeMission();
    toast("No worries — the rep still counts. Next one's easier 👊");
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

  /* ---- Level-up modal ---- */
  var levelup = $("levelup"), luLevel = $("luLevel"), luTitle = $("luTitle");
  function showLevelUp(lv) {
    luLevel.textContent = "Level " + lv;
    luTitle.textContent = LEVELS[lv - 1].title;
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
    toastT = setTimeout(function () { toastEl.classList.remove("show"); }, 2600);
  }

  /* ---- Confetti FX ---- */
  var fx = $("fx"), ctx = fx.getContext("2d"), parts = [], rafId = null;
  function sizeFx() { fx.width = innerWidth; fx.height = innerHeight; }
  sizeFx(); addEventListener("resize", sizeFx);
  function fxBurst(big) {
    var n = big ? 130 : 60;
    var cols = ["#7c6cff", "#ec4899", "#34d399", "#fbbf24", "#38bdf8", "#ffffff"];
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

  /* ---- Profile / settings panel ---- */
  var panel = $("panel");
  function openPanel() { renderPanel(); panel.classList.add("show"); }
  function renderPanel() {
    var info = levelInfo(state.xp);
    $("sLevel").textContent = info.level;
    $("sTitle").textContent = info.title;
    $("sXp").textContent = state.xp;
    $("sDone").textContent = state.done;
    $("sStreak").textContent = state.streak;

    // category chips
    var cc = $("catChips").children;
    for (var i = 0; i < cc.length; i++)
      cc[i].classList.toggle("on", cc[i].dataset.cat === state.cat);
    // difficulty chips
    var dc = $("diffChips").children;
    for (var j = 0; j < dc.length; j++)
      dc[j].classList.toggle("on", state.diffs.indexOf(+dc[j].dataset.d) !== -1);

    // ladder
    var ladder = $("ladder"); ladder.innerHTML = "";
    LEVELS.forEach(function (L, idx) {
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
    toast("💡 " + OPENERS[current].tip);
  });
  $("doneBtn").addEventListener("click", completeMission);
  $("failBtn").addEventListener("click", failMission);
  $("closeSheet").addEventListener("click", function () {
    // cancelling returns the mission to the deck (no penalty)
    closeMission(); current = null; renderDeck();
  });
  $("profileBtn").addEventListener("click", openPanel);
  $("closePanel").addEventListener("click", function () { panel.classList.remove("show"); });

  $("catChips").addEventListener("click", function (e) {
    var b = e.target.closest(".chip"); if (!b) return;
    state.cat = b.dataset.cat; save(); current = null; renderPanel(); renderDeck();
  });
  $("diffChips").addEventListener("click", function (e) {
    var b = e.target.closest(".chip"); if (!b) return;
    var d = +b.dataset.d, k = state.diffs.indexOf(d);
    if (k === -1) state.diffs.push(d);
    else if (state.diffs.length > 1) state.diffs.splice(k, 1); // keep at least one
    save(); current = null; renderPanel(); renderDeck();
  });
  $("resetBtn").addEventListener("click", function () {
    if (confirm("Reset all XP, levels and progress? This can't be undone.")) {
      state = defaultState(); save();
      current = null; renderHeader(); renderPanel(); renderDeck();
      toast("Progress reset. Fresh start 🌱");
    }
  });

  // keyboard for desktop testing
  addEventListener("keydown", function (e) {
    if (sheet.classList.contains("show") || panel.classList.contains("show")) return;
    if (e.key === "ArrowLeft") programmaticSwipe(-1);
    if (e.key === "ArrowRight") programmaticSwipe(1);
  });

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---- Boot ---- */
  renderHeader();
  renderDeck();

  // register service worker (offline / installable)
  if ("serviceWorker" in navigator) {
    addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    });
  }
})();
