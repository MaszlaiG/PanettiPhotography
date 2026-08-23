/* ============================================================
   PANETTI PHOTOGRAPHY — main.js
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Évszám ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Belépő (betöltő) animáció ---------- */
  var intro = document.getElementById("intro");
  if (intro) {
    var seen = false;
    try { seen = !!sessionStorage.getItem("panetti-intro"); } catch (e) {}
    var reduceIntro = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduceIntro) {
      if (intro.parentNode) intro.parentNode.removeChild(intro);
    } else {
      try { sessionStorage.setItem("panetti-intro", "1"); } catch (e) {}
      document.body.style.overflow = "hidden";

      // a logó vonalainak "kirajzolása" — a virágtól kifelé (data-delay szerint)
      var lns = intro.querySelectorAll(".intro__draw .ln");
      for (var i = 0; i < lns.length; i++) {
        var p = lns[i];
        var L;
        try { L = p.getTotalLength(); } catch (e) { L = 2000; }
        p.style.strokeDasharray = L;
        p.style.strokeDashoffset = L;
        var delay = 220 + Math.round((parseInt(p.getAttribute("data-delay"), 10) || 0) * 0.62);
        if (p.animate) {
          p.animate(
            [{ strokeDashoffset: L }, { strokeDashoffset: 0 }],
            { duration: 850, delay: delay, easing: "ease", fill: "forwards" }
          );
        } else {
          p.style.strokeDashoffset = 0;
        }
      }

      setTimeout(function () {
        intro.classList.add("is-done");
        document.body.style.overflow = "";
      }, 5400);
    }
  }

  /* ---------- Nav: háttér görgetéskor ---------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 40) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobil menü ---------- */
  var burger = document.getElementById("burger");
  var navLinks = document.getElementById("navLinks");
  var navScrim = document.getElementById("navScrim");
  function closeMenu() {
    navLinks.classList.remove("is-open");
    burger.classList.remove("is-open");
    if (navScrim) navScrim.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
  }
  burger.addEventListener("click", function () {
    var open = navLinks.classList.toggle("is-open");
    burger.classList.toggle("is-open", open);
    if (navScrim) navScrim.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("no-scroll", open);
  });
  if (navScrim) navScrim.addEventListener("click", closeMenu);
  // Esc zárja a menüt
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navLinks.classList.contains("is-open")) closeMenu();
  });
  navLinks.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });

  /* ============================================================
     NYELVVÁLTÁS (HU / EN)
     ============================================================ */
  var META = {
    hu: {
      title: "Panetti Photography — Palicskó Anett | Fotós, Nyírbátor",
      sent: "Köszönöm! Megnyílik a levelezőprogramod az elküldéshez.",
      fill: "Kérlek töltsd ki a szükséges mezőket."
    },
    en: {
      title: "Panetti Photography — Anett Palicskó | Photographer, Nyírbátor",
      sent: "Thank you! Your email app will open to send the message.",
      fill: "Please fill in the required fields."
    }
  };

  function applyLang(lang) {
    document.documentElement.lang = lang;

    // Szöveges tartalom
    document.querySelectorAll("[data-hu]").forEach(function (el) {
      var val = el.getAttribute("data-" + lang);
      if (val !== null) el.textContent = val;
    });
    // Placeholderek
    document.querySelectorAll("[data-hu-ph]").forEach(function (el) {
      var val = el.getAttribute("data-" + lang + "-ph");
      if (val !== null) el.setAttribute("placeholder", val);
    });
    // Cím
    if (META[lang]) document.title = META[lang].title;

    // Gomb állapot
    document.querySelectorAll(".lang__opt").forEach(function (o) {
      o.classList.toggle("is-active", o.getAttribute("data-lang") === lang);
    });

    try { localStorage.setItem("panetti-lang", lang); } catch (e) {}
    currentLang = lang;
  }

  var currentLang = "hu";
  try {
    var saved = localStorage.getItem("panetti-lang");
    if (saved === "hu" || saved === "en") currentLang = saved;
  } catch (e) {}
  applyLang(currentLang);

  document.getElementById("langToggle").addEventListener("click", function () {
    applyLang(currentLang === "hu" ? "en" : "hu");
  });

  /* ============================================================
     GALÉRIA SZŰRŐ
     ============================================================ */
  var filters = document.getElementById("galleryFilters");
  var items = Array.prototype.slice.call(document.querySelectorAll(".gitem"));
  if (filters) {
    filters.addEventListener("click", function (e) {
      var btn = e.target.closest(".chip");
      if (!btn) return;
      filters.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var f = btn.getAttribute("data-filter");
      items.forEach(function (it) {
        var show = f === "all" || it.getAttribute("data-cat") === f;
        it.classList.toggle("is-hidden", !show);
      });
    });
  }

  /* ============================================================
     LIGHTBOX
     ============================================================ */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbClose = document.getElementById("lbClose");
  var lbPrev = document.getElementById("lbPrev");
  var lbNext = document.getElementById("lbNext");
  var visibleItems = [];
  var lbIndex = 0;

  function openLightbox(fig) {
    visibleItems = items.filter(function (it) { return !it.classList.contains("is-hidden"); });
    lbIndex = visibleItems.indexOf(fig);
    showLb();
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function showLb() {
    var img = visibleItems[lbIndex].querySelector("img");
    lbImg.src = img.src;
    lbImg.alt = img.alt;
  }
  function closeLightbox() {
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  function step(dir) {
    lbIndex = (lbIndex + dir + visibleItems.length) % visibleItems.length;
    showLb();
  }

  items.forEach(function (fig) {
    fig.addEventListener("click", function () { openLightbox(fig); });
  });
  lbClose.addEventListener("click", closeLightbox);
  lbPrev.addEventListener("click", function () { step(-1); });
  lbNext.addEventListener("click", function () { step(1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  /* ============================================================
     REVEAL ANIMÁCIÓ
     ============================================================ */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (r) { io.observe(r); });
  } else {
    reveals.forEach(function (r) { r.classList.add("is-visible"); });
  }

  /* ============================================================
     KAPCSOLAT ŰRLAP (mailto)
     ============================================================ */
  var form = document.getElementById("contactForm");
  var hint = document.getElementById("formHint");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var type = form.type;
      var typeLabel = type.options[type.selectedIndex].textContent;
      var msg = form.message.value.trim();

      if (!name || !email || !msg) {
        hint.textContent = META[currentLang].fill;
        return;
      }

      var subjectHu = "Fotózás érdeklődés — " + typeLabel;
      var subjectEn = "Photography enquiry — " + typeLabel;
      var subject = currentLang === "hu" ? subjectHu : subjectEn;

      var bodyLines = currentLang === "hu"
        ? ["Név: " + name, "E-mail: " + email, "Fotózás típusa: " + typeLabel, "", "Üzenet:", msg]
        : ["Name: " + name, "Email: " + email, "Type: " + typeLabel, "", "Message:", msg];

      var mailto = "mailto:panettiphoto@gmail.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(bodyLines.join("\n"));

      hint.textContent = META[currentLang].sent;
      window.location.href = mailto;
    });
  }

  /* ============================================================
     HERO — lencse-bokeh részecskék (canvas)
     ============================================================ */
  var canvas = document.getElementById("heroBokeh");
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var CW, CH, dpr, parts = [], streaks = [], raf = null, running = false;

    function rnd(a, b) { return a + Math.random() * (b - a); }

    function sizeCanvas() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      CW = canvas.clientWidth || window.innerWidth;
      CH = canvas.clientHeight || window.innerHeight;
      canvas.width = CW * dpr;
      canvas.height = CH * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function build() {
      parts = [];
      var n = Math.round(Math.min(46, CW / 26));
      for (var i = 0; i < n; i++) {
        parts.push({
          x: rnd(0, CW), y: rnd(0, CH),
          r: rnd(6, 34),
          vy: rnd(4, 16) / 100,
          drift: rnd(-8, 8) / 100,
          a: rnd(0.05, 0.26),
          tw: rnd(0, Math.PI * 2),
          hex: Math.random() < 0.4,
          rot: rnd(0, Math.PI)
        });
      }
      streaks = [];
      var ns = CW < 700 ? 1 : 2;
      for (var j = 0; j < ns; j++) {
        streaks.push({
          x: rnd(0, CW), y: rnd(CH * 0.15, CH * 0.7),
          len: rnd(160, 300), ry: rnd(3, 6),
          vx: rnd(6, 14) / 100 * (Math.random() < 0.5 ? 1 : -1),
          a: rnd(0.05, 0.14), tw: rnd(0, Math.PI * 2)
        });
      }
    }
    function hexPath(x, y, r, rot) {
      ctx.beginPath();
      for (var k = 0; k < 6; k++) {
        var a = rot + k * Math.PI / 3;
        var px = x + Math.cos(a) * r, py = y + Math.sin(a) * r;
        if (k === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
    }
    function render() {
      ctx.clearRect(0, 0, CW, CH);
      ctx.globalCompositeOperation = "lighter";

      // anamorf fénycsíkok (mozis lencsefény)
      for (var s = 0; s < streaks.length; s++) {
        var st = streaks[s];
        st.tw += 0.01;
        var sa = st.a * (0.5 + 0.5 * Math.sin(st.tw));
        ctx.save();
        ctx.translate(st.x, st.y);
        ctx.scale(st.len, st.ry);
        var sg = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
        sg.addColorStop(0, "rgba(230,205,150," + sa + ")");
        sg.addColorStop(1, "rgba(230,205,150,0)");
        ctx.fillStyle = sg;
        ctx.beginPath();
        ctx.arc(0, 0, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // bokeh — kerek + hatszögletű (kamera-rekesz jelleg)
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.tw += 0.02;
        var alpha = p.a * (0.6 + 0.4 * Math.sin(p.tw));
        var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        if (p.hex) {
          g.addColorStop(0, "rgba(201,168,106," + (alpha * 0.5) + ")");
          g.addColorStop(0.72, "rgba(201,168,106," + (alpha * 0.26) + ")");
          g.addColorStop(0.92, "rgba(224,196,140," + alpha + ")");
          g.addColorStop(1, "rgba(201,168,106,0)");
          ctx.save();
          hexPath(p.x, p.y, p.r, p.rot);
          ctx.clip();
          ctx.fillStyle = g;
          ctx.fillRect(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
          ctx.restore();
        } else {
          g.addColorStop(0, "rgba(201,168,106," + alpha + ")");
          g.addColorStop(0.5, "rgba(201,168,106," + (alpha * 0.4) + ")");
          g.addColorStop(1, "rgba(201,168,106,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalCompositeOperation = "source-over";
    }
    function tick() {
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.y -= p.vy;
        p.x += p.drift;
        if (p.y + p.r < 0) { p.y = CH + p.r; p.x = rnd(0, CW); }
        if (p.x < -p.r) p.x = CW + p.r; else if (p.x > CW + p.r) p.x = -p.r;
      }
      for (var s = 0; s < streaks.length; s++) {
        var st = streaks[s];
        st.x += st.vx;
        if (st.x - st.len > CW) { st.x = -st.len; st.y = rnd(CH * 0.15, CH * 0.7); }
        else if (st.x + st.len < 0) { st.x = CW + st.len; st.y = rnd(CH * 0.15, CH * 0.7); }
      }
      render();
      raf = requestAnimationFrame(tick);
    }
    function startBokeh() { if (running) return; running = true; raf = requestAnimationFrame(tick); }
    function stopBokeh() { running = false; if (raf) cancelAnimationFrame(raf); raf = null; }

    sizeCanvas();
    build();

    if (reduce) {
      render(); // statikus kép csökkentett mozgásnál
    } else {
      startBokeh();
      var rt;
      window.addEventListener("resize", function () {
        clearTimeout(rt);
        rt = setTimeout(function () { sizeCanvas(); build(); }, 200);
      });
      document.addEventListener("visibilitychange", function () {
        if (document.hidden) stopBokeh(); else startBokeh();
      });
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
          entries.forEach(function (e) { if (e.isIntersecting) startBokeh(); else stopBokeh(); });
        }, { threshold: 0 }).observe(canvas);
      }
    }
  }
})();
