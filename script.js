/* ============================================================
   TRADECHEM - скрипт страницы.
   Плиты и фронт покрытия · перевод RU/KZ · меню · лента · каталог ·
   кнопки «Оставить заявку» → форма → WhatsApp. Библиотек нет.
   ============================================================ */
(function(){
"use strict";
var WA = "77713203740";                 /* WhatsApp TradeChem */
var RED = matchMedia("(prefers-reduced-motion: reduce)").matches;
var HAS_IO = typeof IntersectionObserver === "function";
var root = document.documentElement;

/* ---------------- КОНВЕРСИИ GOOGLE ADS ----------------
   Ярлыки заданы в index.html (window.TC_CONV). Основная - отправка заявки,
   клик по кнопке WhatsApp - дополнительная (контакт). */
function conv(key){
  var id = (window.TC_CONV || {})[key];
  if (!id || typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", {send_to: id, value: 1.0, currency: "USD"});
}

/* клик по кнопке WhatsApp; окно после отправки формы открывается через window.open и сюда не попадает */
document.addEventListener("click", function(e){
  var a = e.target.closest ? e.target.closest('a[href*="wa.me/"]') : null;
  if (a) conv("contact");
});

/* ---------------- КАЗАХСКИЙ СЛОВАРЬ ----------------
   Лежит в assets/lang/kk.js и грузится только когда человек сам выбрал KZ
   (или открыл ?lang=kk / выбрал раньше). В разметке и в этом файле казахского текста нет:
   проверка Google Ads («Неподдерживаемый язык») видит только русский сайт.
   Версия файла - из ?v= этого скрипта, бампается вместе с остальными ассетами.
   Ключа нет → строка остаётся русской. */
var ASSET_V = ((document.currentScript && document.currentScript.src.match(/[?&]v=([^&]+)/)) || [])[1] || "";
var KK = null;   /* window.SITE_KK после загрузки */
var KZ = {};
function loadKK(done){
  if (KK) return done();
  var s = document.createElement("script");
  s.src = "assets/lang/kk.js" + (ASSET_V ? "?v=" + ASSET_V : "");
  s.onload = function(){ if (window.SITE_KK){ KK = window.SITE_KK; KZ = KK.dict || {}; } done(); };
  s.onerror = function(){ done(); };
  document.head.appendChild(s);
}

/* тексты заявки, которая уходит в WhatsApp после отправки формы */
var MSG_RU = {hello:"Здравствуйте! Заявка с сайта TradeChem.", reason:"Причина", name:"Имя", phone:"Телефон", note:"Комментарий", item:"Позиция: {n} ({t})", area:"Площадь объекта"};
function MSG(){ return (curLang() === "kk" && KK && KK.msg) ? KK.msg : MSG_RU; }

var TICK = ["Protherma O","Protherma ВД","Protherma O-AC","Грунт-эмаль 3 в 1","ПФ-115","ГФ-021","POLY TOP","Rubber Master","Aqua Fix-01","ХВ-785","ХС-010","Растворитель 646","Р-4","Смывка PR-10"];

/* ---------------- ПЕРЕВОД ---------------- */
var RU = {};
function snapshot(){
  document.querySelectorAll("[data-i]").forEach(function(el){ if (RU[el.dataset.i] === undefined) RU[el.dataset.i] = el.innerHTML; });
  document.querySelectorAll("[data-i-alt]").forEach(function(el){ RU[el.dataset.iAlt] = el.alt; });
  document.querySelectorAll("[data-i-aria]").forEach(function(el){ RU[el.dataset.iAria] = el.getAttribute("aria-label"); });
  document.querySelectorAll("[data-i-c]").forEach(function(el){ RU[el.dataset.iC] = el.getAttribute("content"); });
}
function pick(k, kk){ return (kk && KZ[k] !== undefined) ? KZ[k] : RU[k]; }
function curLang(){ return root.lang === "kk" ? "kk" : "ru"; }

function applyLang(lang){
  var kk = lang === "kk" && !!KK;       /* словарь не загрузился - остаёмся на русском */
  root.setAttribute("lang", kk ? "kk" : "ru");
  document.querySelectorAll("[data-i]").forEach(function(el){
    var v = pick(el.dataset.i, kk); if (v !== undefined) el.innerHTML = v;
  });
  document.querySelectorAll("[data-i-alt]").forEach(function(el){
    var v = pick(el.dataset.iAlt, kk); if (v !== undefined) el.alt = v;
  });
  document.querySelectorAll("[data-i-aria]").forEach(function(el){
    var v = pick(el.dataset.iAria, kk); if (v !== undefined) el.setAttribute("aria-label", v);
  });
  document.querySelectorAll("[data-i-c]").forEach(function(el){
    var v = pick(el.dataset.iC, kk); if (v !== undefined) el.setAttribute("content", v);
  });
  var og = document.querySelector('meta[property="og:locale"]');
  if (og) og.setAttribute("content", kk ? "kk_KZ" : "ru_RU");
  document.querySelectorAll(".lang button").forEach(function(b){
    var on = b.getAttribute("data-lang") === (kk ? "kk" : "ru");
    b.classList.toggle("is-active", on);
    b.setAttribute("aria-pressed", on ? "true" : "false");
  });
  try { localStorage.setItem("tc-lang", kk ? "kk" : "ru"); } catch(e){}
  fillTicker();
  renderPrices();
  requestAnimationFrame(fitText);
}
function initLang(){
  var url = new URLSearchParams(location.search).get("lang");
  var saved = null;
  try { saved = localStorage.getItem("tc-lang"); } catch(e){}
  /* ?lang= в адресе главнее сохранённого выбора: русское объявление всегда открывает русский сайт.
     Язык по navigator.language не угадываем - казахский только явным выбором человека. */
  var lang = (url === "kk" || url === "ru") ? url : (saved === "kk" ? "kk" : "ru");
  setLang(lang);
}
function setLang(lang){
  if (lang === "kk") loadKK(function(){ applyLang("kk"); });
  else applyLang("ru");
}
document.querySelectorAll(".lang button").forEach(function(b){
  b.addEventListener("click", function(){ setLang(b.getAttribute("data-lang")); });
});

/* дисплейные строки: казахский длиннее - ужимаем, пока не влезет */
function fitText(){
  document.querySelectorAll(".h1 .l1, .h1 .l2, .kphone").forEach(function(el){
    el.style.fontSize = "";
    var box = el.parentElement.clientWidth;
    if (!box) return;
    var size = parseFloat(getComputedStyle(el).fontSize), base = size;
    while (el.scrollWidth > box + 1 && size > base * 0.55) {
      size *= 0.95;
      el.style.fontSize = size + "px";
    }
  });
}

/* ---------------- БЕГУЩАЯ ЛЕНТА ----------------
   Копий столько, чтобы дорожка была шире двух экранов; шаг цикла - одна копия. */
function fillTicker(){
  var el = document.getElementById("ticker"); if (!el) return;
  var list = (curLang() === "kk" && KK && KK.tick) ? KK.tick : TICK;
  var one = list.map(function(t){ return "<b>" + t + "</b>"; }).join("");
  el.innerHTML = one;
  var w = el.scrollWidth || 1000;
  var need = Math.max(2, Math.ceil((innerWidth * 2) / w) + 1);
  var html = "";
  for (var i = 0; i < need; i++) html += one;
  el.innerHTML = html;
  el.style.setProperty("--tkw", w + "px");
}
var tkTimer;
addEventListener("resize", function(){ clearTimeout(tkTimer); tkTimer = setTimeout(function(){ fillTicker(); fitText(); }, 200); });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ fillTicker(); fitText(); });

/* ---------------- МЕНЮ ---------------- */
var burger = document.getElementById("burger");
var mnav = document.getElementById("mnav");
function closeMenu(){
  document.body.classList.remove("menu-open");
  if (burger) burger.setAttribute("aria-expanded", "false");
}
if (burger) burger.addEventListener("click", function(){
  var open = document.body.classList.toggle("menu-open");
  burger.setAttribute("aria-expanded", open ? "true" : "false");
});
if (mnav) mnav.addEventListener("click", function(e){ if (e.target.closest("a")) closeMenu(); });
addEventListener("keydown", function(e){ if (e.key === "Escape") closeMenu(); });

/* ---------------- ЯКОРЯ ---------------- */
var HH = function(){ return parseFloat(getComputedStyle(root).getPropertyValue("--hh")) || 64; };
document.addEventListener("click", function(e){
  var a = e.target.closest('a[href^="#"]'); if (!a) return;
  var id = a.getAttribute("href").slice(1); if (!id) return;
  var t = document.getElementById(id); if (!t) return;
  e.preventDefault();
  closeMenu();
  var top = t.getBoundingClientRect().top + scrollY - (t.classList.contains("pw") ? 0 : HH() + 12);
  scrollTo({ top: Math.max(0, top), behavior: RED ? "auto" : "smooth" });
  try { history.pushState(null, "", "#" + id); } catch(err){}
});

/* ---------------- ПЛИТЫ И ФРОНТ ПОКРЫТИЯ ----------------
   Один слушатель scroll через rAF. На каждую обёртку .pw пишем
   --enter / --exit / --stay и --open (фронт), герою ещё --f.
   Дальше всё делает CSS через calc. */
var pws = [].slice.call(document.querySelectorAll(".pw"));
var heroPw = document.getElementById("top");
var hero = heroPw ? heroPw.querySelector(".hero") : null;
var bar = document.getElementById("bar");
var kont = document.getElementById("kontakty");
var introK = 1, introDone = true;       /* 0..1 - ход интро; introDone - интро закончено или отменено */
function clamp(v){ return v < 0 ? 0 : (v > 1 ? 1 : v); }
function easeOut(t){ return 1 - Math.pow(1 - t, 2.4); }
function easeInOut(t){ return t < .5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2) / 2; }
function update(){
  var H = innerHeight || root.clientHeight;
  pws.forEach(function(pw){
    var r = pw.getBoundingClientRect();
    var enter = clamp(1 - r.top / H);
    var exit  = clamp(1 - r.bottom / H);
    var stay  = r.height > H + 1 ? clamp(-r.top / (r.height - H)) : enter;
    pw.style.setProperty("--enter", enter.toFixed(3));
    pw.style.setProperty("--exit",  exit.toFixed(3));
    pw.style.setProperty("--stay",  stay.toFixed(3));
    pw.style.setProperty("--open",  easeOut(clamp((enter - 0.22) / 0.62)).toFixed(3));
    pw.classList.toggle("gone", exit >= 1);
    pw.classList.toggle("on", enter > 0.62);
    if (pw === heroPw) {
      var f = easeInOut(clamp(stay * 1.35)) - 0.8 * (1 - introK);
      pw.style.setProperty("--f", f.toFixed(3));
    }
  });
  /* липкая панель: после 55 % первого экрана, прячется на контактах */
  if (bar) {
    var onKont = kont && kont.getBoundingClientRect().top < H * 0.6;
    bar.classList.toggle("show", scrollY > H * 0.55 && !onKont);
  }
}
if (RED) {
  root.classList.add("no-plate");
  root.classList.add("no-intro");
  if (hero) hero.classList.add("on");
} else {
  var tick = false;
  addEventListener("scroll", function(){
    if (tick) return; tick = true;
    requestAnimationFrame(function(){ tick = false; update(); });
  }, {passive:true});
  addEventListener("resize", update);
  addEventListener("load", update);
  /* интро: фронт покрытия наплывает снизу 1300 мс; пропускаем при хэше / прокрутке */
  var skip = location.hash || scrollY > 80;
  if (skip) {
    root.classList.add("no-intro");
    if (hero) hero.classList.add("on");
    update();
  } else {
    introK = 0; introDone = false; update();
    var t0 = null;
    var step = function(ts){
      if (introDone) return;
      if (t0 === null) t0 = ts;
      var p = clamp((ts - t0) / 1300);
      introK = easeOut(p);
      update();
      if (p < 1) requestAnimationFrame(step);
      else { introDone = true; if (hero) hero.classList.add("on"); }
    };
    requestAnimationFrame(step);
    setTimeout(function(){ if (hero) hero.classList.add("on"); }, 700);
  }
}
window.plateSync = function(){ introDone = true; introK = 1; if (hero) hero.classList.add("on"); update(); };
addEventListener("hashchange", function(){ root.classList.add("no-intro"); });

/* ---------------- ПОЯВЛЕНИЕ ---------------- */
if (HAS_IO) {
  if (!RED) root.classList.add("js");
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  }, {threshold:.12, rootMargin:"0px 0px -6% 0px"});
  document.querySelectorAll(".rv").forEach(function(el){ io.observe(el); });
  setTimeout(function(){ document.querySelectorAll(".rv:not(.in)").forEach(function(el){
    if (el.getBoundingClientRect().top < innerHeight) el.classList.add("in");
  }); }, 1500);
} else {
  document.querySelectorAll(".rv").forEach(function(el){ el.classList.add("in"); });
}

/* ---------------- КАТАЛОГ: фильтр и «показать все» ---------------- */
(function(){
  var fl = document.getElementById("filters"), grid = document.getElementById("grid"), more = document.getElementById("more");
  if (!fl || !grid) return;
  var cards = [].slice.call(grid.querySelectorAll(".card"));
  var expanded = false, MOB = 8;
  function apply(g){
    var shown = 0;
    cards.forEach(function(c){
      var ok = g === "all" || c.dataset.g === g;
      c.hidden = !ok;
      if (ok) { shown++; c.classList.toggle("more-hide", g === "all" && !expanded && shown > MOB); }
      else c.classList.remove("more-hide");
      if (ok) c.classList.add("in");
    });
    if (more) more.parentElement.classList.toggle("done", g !== "all" || expanded);
  }
  fl.addEventListener("click", function(e){
    var b = e.target.closest("button[data-g]"); if (!b) return;
    fl.querySelectorAll("button").forEach(function(x){ x.classList.toggle("is-on", x === b); });
    apply(b.dataset.g);
  });
  if (more) more.addEventListener("click", function(){
    expanded = true; apply("all");
  });
  apply("all");
})();

/* ---------------- КАРТОЧКИ ТОВАРА ИЗ GOOGLE-ТАБЛИЦЫ ----------------
   Клиент правит таблицу, сайт читает её как CSV через gviz.
   Живые колонки - все: B товар · C тара · D цена точная · E единица · F цена «от».
   A (артикул) - технический ключ, по нему карточка находится, его не трогают.
   D заполнена → «4 200 ₸/кг». D пустая, F заполнена → «от 4 200 ₸/кг».
   Обе пустые → блок цены скрыт, в футере остаётся кнопка «Узнать цену».
   Порядок источников: кэш браузера (мгновенно) → таблица → prices.json (запасной
   прайс в репозитории, если Google недоступен). */
var SHEET_ID = "1oupf07NhRrjUnryWf8kb-EU1hyplGj21EeHxFilfAPg";
var SHEET_CSV = "https://docs.google.com/spreadsheets/d/" + SHEET_ID + "/gviz/tq?tqx=out:csv&gid=0";
var PRICES = null;   /* артикул → {n: товар, t: тара, v: цена, u: единица, ot: цена «от»} */
var UNIT_RU = {"за кг":"₸/кг", "за тару":"₸ за тару", "за шт":"₸/шт", "за литр":"₸/л"};

/* CSV с кавычками и переводами строк внутри ячеек */
function csvRows(t){
  var rows = [], row = [], cur = "", q = false;
  t = t.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  for (var i = 0; i < t.length; i++){
    var c = t.charAt(i);
    if (q){
      if (c === '"'){ if (t.charAt(i + 1) === '"'){ cur += '"'; i++; } else q = false; }
      else cur += c;
    }
    else if (c === '"') q = true;
    else if (c === ","){ row.push(cur); cur = ""; }
    else if (c === "\n"){ row.push(cur); rows.push(row); row = []; cur = ""; }
    else cur += c;
  }
  if (cur !== "" || row.length){ row.push(cur); rows.push(row); }
  return rows;
}
/* Число из человеческого ввода: «4 200», «3850,50», «5100 тг» → 4200 / 3850.5 / 5100.
   Текст без цифр («да», пусто) → 0. */
function num(x){
  var raw = String(x == null ? "" : x).replace(/[\s\u00a0]/g, "").replace(",", ".").replace(/[^\d.]/g, "");
  var v = parseFloat(raw);
  return isFinite(v) && v > 0 ? v : 0;
}
/* Строка таблицы → запись товара. Живыми должны быть ВСЕ колонки:
   A артикул (ключ) · B товар · C тара · D цена точная · E единица · F цена «от». */
function parsePrices(rows){
  var map = {};
  rows.forEach(function(r){
    var sku = (r[0] || "").trim();
    if (!sku || /^артикул$/i.test(sku)) return;
    var rec = {
      n: (r[1] || "").trim(),
      t: (r[2] || "").trim(),
      u: ((r[4] || "").trim() || "за кг").toLowerCase(),
      v: 0, ot: false
    };
    var v = num(r[3]), vo = num(r[5]);
    var flag = /^(да|и\u04d9|ия|от|yes|true)$/i.test((r[5] || "").trim());   /* старый формат колонки F */
    if (v > 0){ rec.v = v; rec.ot = flag; }
    else if (vo > 0){ rec.v = vo; rec.ot = true; }
    map[sku] = rec;
  });
  return map;
}
function money(n){
  var r = Math.round(n * 100) / 100;
  var s = (r % 1 ? r.toFixed(2) : r.toFixed(0)).split("."), int = s[0];
  return int.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (s[1] ? "," + s[1] : "");
}
/* Тара в казахской версии: «от 175 кг» → «175 кг-нан» (суффикс из kk.js). */
function taraTxt(t, kk){
  return (kk && KK && /^от\s/i.test(t)) ? t.replace(/^от\s*/i, "") + KK.tara : t;
}
function renderPrices(){
  if (!PRICES) return;
  var kk = curLang() === "kk" && !!KK, unit = kk ? KK.unit : UNIT_RU;
  document.querySelectorAll(".card[data-sku]").forEach(function(c){
    var box = c.querySelector(".pr"), btn = c.querySelector("[data-lead=item]");
    var p = PRICES[c.dataset.sku];
    if (!p){
      if (box) box.hidden = true;
      if (btn) btn.innerHTML = pick("b.price", kk);
      return;
    }
    /* B - название товара */
    var h3 = c.querySelector("h3");
    if (p.n){
      if (h3 && h3.textContent !== p.n) h3.textContent = p.n;
      if (c.dataset.name !== p.n) c.dataset.name = p.n;
    }
    /* C - тара */
    if (p.t){
      var tEl = c.querySelector(".tara"), tv = taraTxt(p.t, kk);
      if (tEl && tEl.textContent !== tv) tEl.textContent = tv;
      if (c.dataset.tara !== p.t) c.dataset.tara = p.t;
    }
    /* D + E + F - цена */
    if (!box) return;
    if (!(p.v > 0)){
      box.hidden = true;
      if (btn) btn.innerHTML = pick("b.price", kk);
      return;
    }
    var s = money(p.v) + " " + (unit[p.u] || unit["за кг"]);
    box.textContent = p.ot ? (kk ? s + KK.from : "от " + s) : s;
    box.hidden = false;
    if (btn) btn.textContent = kk ? KK.order : "Заказать";
  });
}
function setPrices(map, save){
  PRICES = map || {};
  renderPrices();
  if (save) try { localStorage.setItem("tc-prices2", JSON.stringify({t: Date.now(), d: PRICES})); } catch(e){}
}
function loadPrices(){
  if (!window.fetch) return;
  try {
    var c = JSON.parse(localStorage.getItem("tc-prices2") || "null");
    if (c && c.d && Date.now() - c.t < 7 * 864e5) setPrices(c.d, false);
  } catch(e){}
  fetch(SHEET_CSV, {cache: "no-store"})
    .then(function(r){ if (!r.ok) throw 0; return r.text(); })
    .then(function(t){ setPrices(parsePrices(csvRows(t)), true); })
    .catch(function(){
      if (PRICES) return;                                  /* кэш уже показан */
      fetch("prices.json", {cache: "no-store"}).then(function(r){ return r.json(); })
        .then(function(d){ setPrices(d, false); }).catch(function(){});
    });
}

/* ---------------- КНОПКИ «ОСТАВИТЬ ЗАЯВКУ» → ФОРМА ----------------
   Все обращения идут через форму: кнопки ведут на #zayavka и подставляют
   причину обращения (блок) и позицию (карточка каталога). Прокрутку делает обработчик якорей. */
var form = document.getElementById("zayavka");
var lastAuto = "";   /* текст, который подставили сами: чужой ввод не затираем */
document.addEventListener("click", function(e){
  var a = e.target.closest ? e.target.closest("a[data-lead]") : null;
  if (!a || !form) return;
  var kind = a.getAttribute("data-lead"), card = null;
  if (kind === "item") { card = a.closest(".card"); kind = card ? card.dataset.g : ""; }
  var opt = kind && form.reason.querySelector('option[data-k="' + kind + '"]');
  if (opt) { form.reason.value = opt.value; form.reason.classList.remove("is-bad"); }
  if (card) {
    var tara = taraTxt(card.dataset.tara || "", curLang() === "kk");
    var pre = MSG().item.replace("{n}", card.dataset.name).replace("{t}", tara);
    if (!form.msg.value.trim() || form.msg.value === lastAuto) { form.msg.value = pre; lastAuto = pre; }
  }
  /* на десктопе курсор в первое пустое поле, когда прокрутка доедет */
  if (matchMedia("(hover:hover)").matches) setTimeout(function(){
    var f = !form.name.value.trim() ? form.name : (!normPhone(form.phone.value) ? form.phone : null);
    if (f) try { f.focus({preventScroll: true}); } catch(x){}
  }, 800);
});

/* ---------------- ФОРМА: обязателен только телефон ---------------- */
function normPhone(v){
  var d = String(v || "").replace(/\D/g, "");
  if (d.length === 11 && d.charAt(0) === "8") d = "7" + d.slice(1);
  if (d.length === 10) d = "7" + d;
  if (d.length !== 11 || d.charAt(0) !== "7") return "";
  return "+7 " + d.slice(1, 4) + " " + d.slice(4, 7) + " " + d.slice(7, 9) + " " + d.slice(9, 11);
}
if (form) {
  var fmOk = document.getElementById("fmok"), fmErr = document.getElementById("fmerr");
  var checks = [
    [form.phone,  function(){ return !!normPhone(form.phone.value); }]
  ];
  checks.forEach(function(c){
    var ev = c[0].tagName === "SELECT" ? "change" : "input";
    c[0].addEventListener(ev, function(){
      if (c[1]()) c[0].classList.remove("is-bad");
      if (!fmErr.hidden && checks.every(function(x){ return x[1](); })) fmErr.hidden = true;
    });
  });
  form.phone.addEventListener("input", function(){
    var v = form.phone.value.replace(/[^\d+()\-\s]/g, "");
    if (v !== form.phone.value) form.phone.value = v;
  });
  /* Проверка на window в фазе захвата - раньше трекера LeadBot (он слушает submit на document).
     Незаполненная заявка и бот-ловушка не доходят ни до бота, ни до Google Ads. */
  window.addEventListener("submit", function(e){
    if (e.target !== form) return;
    if (form.hp_extra && form.hp_extra.value) { e.preventDefault(); e.stopPropagation(); return; }
    var bad = checks.filter(function(c){ var ok = c[1](); c[0].classList.toggle("is-bad", !ok); return !ok; });
    if (bad.length) {
      e.preventDefault(); e.stopPropagation();
      fmErr.hidden = false; fmOk.hidden = true;
      bad[0][0].focus();
      return;
    }
    form.name.value = form.name.value.trim();
    form.phone.value = normPhone(form.phone.value);   /* в бот уходит номер в едином виде */
  }, true);

  form.addEventListener("submit", function(e){
    e.preventDefault();
    var M = MSG(), parts = [M.hello];
    [[form.reason, M.reason], [form.area, M.area || "Площадь объекта"]].forEach(function(x){
      if (x[0] && x[0].value) parts.push(x[1] + ": " + x[0].options[x[0].selectedIndex].textContent.trim());
    });
    if (form.msg.value.trim()) parts.push(M.note + ": " + form.msg.value.trim());
    if (form.name.value) parts.push(M.name + ": " + form.name.value);
    parts.push(M.phone + ": " + form.phone.value);
    fmErr.hidden = true; fmOk.hidden = false;
    /* Google Ads: конверсия «Отправка формы для потенциальных клиентов» */
    conv("lead");
    /* WhatsApp сразу после отправки - LeadBot склеивает форму и WhatsApp в одно обращение */
    window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(parts.join("\n")), "_blank", "noopener");
  });
}

/* ---------------- СТАРТ ---------------- */
snapshot();
initLang();
loadPrices();
})();
