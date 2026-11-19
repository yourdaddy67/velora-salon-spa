/* Velora Salon & Spa — shared behaviour. Front-end only, no backend. */
(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var fine = window.matchMedia("(pointer:fine)").matches;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- data (v1 content, reused) ---------- */
  var SERVICES = [
    { name: "Signature Haircut & Finish", cat: "hair", price: "₹1,200", note: "", dur: "60 min", desc: "Consultation, precision cut, wash and a glossy blow-finish matched to your face shape." },
    { name: "Balayage & Global Colour", cat: "hair", price: "₹6,500", note: "from", dur: "150 min", desc: "Hand-painted, sun-melted colour with bond-builder and toner included. Strand test first, always." },
    { name: "Keratin Smoothening", cat: "hair", price: "₹8,000", note: "", dur: "180 min", desc: "Frizz erased for 4–6 months. Formaldehyde-free formula, includes first wash and finish." },
    { name: "Hair Spa & Repair Ritual", cat: "hair", price: "₹1,800", note: "", dur: "75 min", desc: "Deep-conditioning repair with scalp massage and steam — the reset for dry, stressed hair." },
    { name: "Signature Glow Facial", cat: "skin", price: "₹2,500", note: "", dur: "60 min", desc: "Deep cleanse, gentle exfoliation and lymphatic massage. The one clients rebook monthly." },
    { name: "HydraFacial Treatment", cat: "skin", price: "₹3,999", note: "", dur: "75 min", desc: "Hydra-dermabrasion that vacuums, infuses and plumps in one sitting. Zero downtime, instant glow." },
    { name: "Full Body Polishing", cat: "skin", price: "₹3,200", note: "", dur: "90 min", desc: "Full-body exfoliation and tan removal, finished with a rich moisturising wrap." },
    { name: "Aromatherapy Spa Massage", cat: "skin", price: "₹2,800", note: "", dur: "60 min", desc: "Warm oils, slow pressure and a quiet room. Choose your blend — lavender, mogra or sandalwood." },
    { name: "Classic Manicure", cat: "nails", price: "₹900", note: "", dur: "45 min", desc: "Soak, cuticle care, shaping and polish. The tidy-up your hands have been asking for." },
    { name: "Spa Pedicure", cat: "nails", price: "₹1,100", note: "", dur: "60 min", desc: "Warm soak, scrub, massage and polish — with a proper foot-health check built in." },
    { name: "Gel Nail Extensions", cat: "nails", price: "₹1,999", note: "", dur: "90 min", desc: "Length and strength that survive typing, dishes and weddings. Any shape, any finish." },
    { name: "Nail Art Studio", cat: "nails", price: "₹699", note: "per set", dur: "30 min", desc: "Hand-painted art, chrome, French fades and festive detailing by our nail artists." },
    { name: "Bridal Makeup Trial", cat: "bridal", price: "₹2,999", note: "", dur: "90 min", desc: "Full makeup and hair trial with photos. Fully adjusted if you book a package within 30 days." },
    { name: "Party Makeup & Hair", cat: "bridal", price: "₹3,500", note: "", dur: "90 min", desc: "Sangeet, cocktail or reception — HD makeup and styled hair that last the whole evening." },
    { name: "Pre-Bridal Glow Plan", cat: "bridal", price: "₹14,999", note: "4 weeks", dur: "8 sessions", desc: "Facials, body polishing and hair rituals scheduled backwards from your wedding date." },
    { name: "The Velora Bride — Complete", cat: "bridal", price: "₹25,000", note: "from", dur: "Full day", desc: "Our complete bridal package — see the Bridal page for Silver, Gold and Royal inclusions." }
  ];
  var PLANS = {
    glow: { name: "Glow Monthly", price: "₹2,999 / month", per: "₹2,999 / month", ritual: "1 facial or hair spa / month", off: "10% off everything else" },
    radiance: { name: "Radiance Quarterly", price: "₹7,999 / quarter", per: "₹2,666 / month", ritual: "1 facial or hair spa / month", off: "15% off everything else" },
    royal: { name: "Royal Annual", price: "₹24,000 / year", per: "₹2,000 / month", ritual: "2 facials or hair spas / month", off: "20% off everything else" }
  };
  var SLOTS = ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"];

  /* ---------- header / nav ---------- */
  var header = $(".site-header");
  var onScroll = function () { if (header) header.classList.toggle("scrolled", window.scrollY > 10); };
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  var page = document.body.getAttribute("data-page") || "home";
  $$(".main-nav a").forEach(function (a) { if (a.getAttribute("data-nav") === page) a.classList.add("active"); });
  var menuBtn = $("#menuBtn"), nav = $("#mainNav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menuBtn.classList.toggle("open", open);
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    $$("a", nav).forEach(function (a) { a.addEventListener("click", function () { nav.classList.remove("open"); menuBtn.classList.remove("open"); }); });
  }

  /* ---------- scroll reveals + icon draw ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  $$(".rv, .draw").forEach(function (el) { io.observe(el); });

  /* ---------- magnetic CTAs (desktop only) ---------- */
  if (fine && !reduced) {
    $$(".magnetic").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.18;
        var y = (e.clientY - r.top - r.height / 2) * 0.28;
        el.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }

  /* ---------- dot + ring cursor with label disc (desktop only) ---------- */
  if (fine && !reduced) {
    var dot = $("#cursorDot"), ring = $("#cursorRing"), label = $("#cursorLabel");
    var mx = -100, my = -100, rx = -100, ry = -100;
    document.addEventListener("mousemove", function (e) { mx = e.clientX; my = e.clientY; });
    (function loop() {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      if (dot) dot.style.transform = "translate(" + (mx - 4) + "px," + (my - 4) + "px)";
      if (ring) ring.style.transform = "translate(" + (rx - 19) + "px," + (ry - 19) + "px)";
      requestAnimationFrame(loop);
    })();
    $$("[data-cursor]").forEach(function (el) {
      el.addEventListener("mouseenter", function () { if (ring && label) { label.textContent = el.getAttribute("data-cursor"); ring.classList.add("label"); } });
      el.addEventListener("mouseleave", function () { if (ring) ring.classList.remove("label"); });
    });
  }

  /* ---------- helpers ---------- */
  function refCode(prefix) {
    var chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789", out = "";
    for (var i = 0; i < 4; i++) out += chars[Math.floor(Math.random() * chars.length)];
    return prefix + "-" + out;
  }
  function setInvalid(field, bad) { field.classList.toggle("invalid", !!bad); return !bad; }
  function validPhone(v) { return /^[6-9]\d{9}$/.test(v.replace(/[\s-]/g, "")); }
  function fmtDate(iso) {
    var d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
  }

  /* ---------- services filter ---------- */
  var svcGrid = $("#svcGrid");
  if (svcGrid) {
    var countLine = $("#svcCount");
    $$(".filters .chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        $$(".filters .chip").forEach(function (c) { c.classList.remove("active"); });
        chip.classList.add("active");
        var f = chip.getAttribute("data-filter"), n = 0;
        $$(".svc", svcGrid).forEach(function (card) {
          var show = f === "all" || card.getAttribute("data-cat") === f;
          card.style.display = show ? "" : "none";
          if (show) n++;
        });
        if (countLine) countLine.innerHTML = "<b>" + n + " of " + SERVICES.length + " services</b> · prices include consultation and the finish";
      });
    });
  }

  /* ---------- before / after sliders ---------- */
  $$(".ba").forEach(function (ba) {
    var setX = function (clientX) {
      var r = ba.getBoundingClientRect();
      var x = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100));
      ba.style.setProperty("--x", x.toFixed(1) + "%");
      ba.setAttribute("aria-valuenow", Math.round(x));
    };
    var dragging = false;
    ba.addEventListener("pointerdown", function (e) { dragging = true; ba.setPointerCapture(e.pointerId); setX(e.clientX); });
    ba.addEventListener("pointermove", function (e) { if (dragging) setX(e.clientX); });
    ["pointerup", "pointercancel"].forEach(function (ev) { ba.addEventListener(ev, function () { dragging = false; }); });
    ba.addEventListener("keydown", function (e) {
      var cur = parseFloat(ba.style.getPropertyValue("--x")) || 50;
      if (e.key === "ArrowLeft") { ba.style.setProperty("--x", Math.max(0, cur - 5) + "%"); e.preventDefault(); }
      if (e.key === "ArrowRight") { ba.style.setProperty("--x", Math.min(100, cur + 5) + "%"); e.preventDefault(); }
    });
  });

  /* ---------- FAQ accordion ---------- */
  $$(".faq-item").forEach(function (item) {
    var q = $(".faq-q", item), a = $(".faq-a", item);
    q.addEventListener("click", function () {
      var open = item.classList.toggle("open");
      a.style.maxHeight = open ? a.scrollHeight + "px" : "0px";
    });
  });

  /* ---------- gallery lightbox ---------- */
  var lb = $("#lightbox");
  if (lb) {
    var lbImg = $("#lbImg"), lbCap = $("#lbCap");
    $$(".look").forEach(function (fig) {
      fig.addEventListener("click", function () {
        var img = $("img", fig);
        lbImg.src = img.src; lbImg.alt = img.alt;
        lbCap.innerHTML = "<b>" + fig.getAttribute("data-title") + "</b><span>" + fig.getAttribute("data-sub") + "</span>";
        lb.classList.add("open"); document.body.style.overflow = "hidden";
      });
    });
    var closeLb = function () { lb.classList.remove("open"); document.body.style.overflow = ""; };
    $(".lb-close", lb).addEventListener("click", closeLb);
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLb(); });
  }

  /* ---------- membership plan select ---------- */
  $$("[data-plan]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var p = PLANS[btn.getAttribute("data-plan")];
      if (!p) return;
      $("#sumPlanName").textContent = p.name;
      $("#sumPlanPrice").textContent = p.price;
      $("#sumPlanPer").textContent = p.per;
      $("#sumPlanRitual").textContent = p.ritual;
      $("#sumPlanOff").textContent = p.off;
      var sum = $("#planSummary");
      if (sum) sum.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
    });
  });

  /* ---------- booking form ---------- */
  var bookForm = $("#bookForm");
  if (bookForm) {
    var svcSel = $("#bkService"), dateIn = $("#bkDate"), slotsBox = $("#bkSlots"), stylistSel = $("#bkStylist");
    SERVICES.forEach(function (s) {
      var o = document.createElement("option");
      o.value = s.name; o.textContent = s.name + " — " + (s.note ? s.note + " " : "") + s.price + " · " + s.dur;
      svcSel.appendChild(o);
    });
    var today = new Date(); today.setHours(0, 0, 0, 0);
    dateIn.min = today.toISOString().split("T")[0];
    SLOTS.forEach(function (t) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "slot"; b.textContent = t;
      b.addEventListener("click", function () { $$(".slot", slotsBox).forEach(function (x) { x.classList.remove("selected"); }); b.classList.add("selected"); });
      slotsBox.appendChild(b);
    });
    var params = new URLSearchParams(window.location.search);
    var pre = params.get("service");
    if (pre) { var opt = $$("option", svcSel).find(function (o) { return o.value === pre; }); if (opt) svcSel.value = pre; }
    var preSty = params.get("stylist");
    if (preSty && stylistSel) { var so = $$("option", stylistSel).find(function (o) { return o.value === preSty; }); if (so) stylistSel.value = preSty; }

    bookForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      var nameF = $("#fName"), phoneF = $("#fPhone"), svcF = $("#fService"), dateF = $("#fDate"), slotF = $("#fSlot");
      ok = setInvalid(nameF, $("#bkName").value.trim().length < 2) && ok;
      ok = setInvalid(phoneF, !validPhone($("#bkPhone").value.trim())) && ok;
      ok = setInvalid(svcF, !svcSel.value) && ok;
      var dv = dateIn.value, dateBad = !dv;
      if (dv) {
        var d = new Date(dv + "T00:00:00");
        if (d.getDay() === 1) { dateBad = true; $("#fDate .err-msg").textContent = "We're closed on Mondays — please pick another day."; }
        else if (d < today) { dateBad = true; $("#fDate .err-msg").textContent = "Please pick today or a future date."; }
        else { $("#fDate .err-msg").textContent = "Please pick a date — we're closed on Mondays."; }
      }
      ok = setInvalid(dateF, dateBad) && ok;
      var chosenSlot = $(".slot.selected", slotsBox);
      ok = setInvalid(slotF, !chosenSlot) && ok;
      if (!ok) { var firstBad = $(".field.invalid", bookForm); if (firstBad) firstBad.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" }); return; }
      var svc = SERVICES.find(function (s) { return s.name === svcSel.value; }) || {};
      $("#cRef").textContent = refCode("VEL-APT");
      $("#cService").textContent = svc.name + " — " + (svc.note ? svc.note + " " : "") + (svc.price || "");
      $("#cWhen").textContent = fmtDate(dv) + " · " + chosenSlot.textContent;
      $("#cStylist").textContent = stylistSel.value || "First available";
      $("#cPrice").textContent = (svc.note ? svc.note + " " : "") + (svc.price || "—");
      bookForm.style.display = "none";
      $("#bookConfirm").classList.add("show");
      $("#bookConfirm").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
    });
    var again = $("#bookAgain");
    if (again) again.addEventListener("click", function () {
      bookForm.reset(); $$(".slot", slotsBox).forEach(function (x) { x.classList.remove("selected"); });
      $("#bookConfirm").classList.remove("show"); bookForm.style.display = "";
    });
    dateIn.addEventListener("change", function () { if (dateIn.value) { var d = new Date(dateIn.value + "T00:00:00"); if (d.getDay() === 1) { $("#fDate").classList.add("invalid"); $("#fDate .err-msg").textContent = "We're closed on Mondays — please pick another day."; } else { $("#fDate").classList.remove("invalid"); } } });
    $("#bkPhone").addEventListener("blur", function () { var v = $("#bkPhone").value.trim(); if (v) setInvalid($("#fPhone"), !validPhone(v)); });
  }

  /* ---------- bridal quote form ---------- */
  var quoteForm = $("#quoteForm");
  if (quoteForm) {
    quoteForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      ok = setInvalid($("#qNameF"), $("#qName").value.trim().length < 2) && ok;
      ok = setInvalid($("#qPhoneF"), !validPhone($("#qPhone").value.trim())) && ok;
      ok = setInvalid($("#qDateF"), !$("#qDate").value) && ok;
      ok = setInvalid($("#qPkgF"), !$("#qPkg").value) && ok;
      if (!ok) return;
      $("#qRef").textContent = refCode("VEL-QTE");
      quoteForm.style.display = "none";
      $("#quoteConfirm").classList.add("show");
    });
    var qAgain = $("#quoteAgain");
    if (qAgain) qAgain.addEventListener("click", function () {
      quoteForm.reset(); $("#quoteConfirm").classList.remove("show"); quoteForm.style.display = "";
    });
  }

  /* ---------- contact form ---------- */
  var contactForm = $("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      ok = setInvalid($("#cNameF"), $("#cName").value.trim().length < 2) && ok;
      ok = setInvalid($("#cContactF"), $("#cContact").value.trim().length < 6) && ok;
      ok = setInvalid($("#cMsgF"), $("#cMsg").value.trim().length < 3) && ok;
      if (!ok) return;
      contactForm.style.display = "none";
      $("#contactConfirm").classList.add("show");
    });
    var cAgain = $("#contactAgain");
    if (cAgain) cAgain.addEventListener("click", function () {
      contactForm.reset(); $("#contactConfirm").classList.remove("show"); contactForm.style.display = "";
    });
  }
})();
