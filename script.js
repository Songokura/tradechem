/* ============================================================
   TRADECHEM - скрипт страницы.
   Плиты и фронт покрытия · перевод RU/KZ · меню · лента · каталог ·
   форма в WhatsApp. Библиотек нет.
   ============================================================ */
(function(){
"use strict";
var WA = "77713203740";                 /* WhatsApp TradeChem */
var RED = matchMedia("(prefers-reduced-motion: reduce)").matches;
var HAS_IO = typeof IntersectionObserver === "function";
var root = document.documentElement;

/* ---------------- КАЗАХСКИЙ СЛОВАРЬ ----------------
   Разметка русская. Ключа нет → строка остаётся русской. */
var KZ = {
"m.title":"Астанадағы қорғаныш жабындар: өрттен қорғау, коррозиядан қорғау, гидрооқшаулау - TradeChem",
"m.desc":"«Tradechem» ЖШС, Астана: қоймада қорғаныш жабындар. Protherma өрттен қорғау бояулары, ГОСТ бойынша коррозияға қарсы грунттар мен эмальдар, гидрооқшаулау, POLY TOP эпоксидті едендер, еріткіштер. Қазақстан мен Ресей зауыттарынан тікелей, бүкіл ел бойынша жеткізу.",
"m.ogt":"Астанадағы қорғаныш жабындар - TradeChem",
"m.ogd":"Қоймадағы қорғаныш жабындар: Protherma өрттен қорғау, ГОСТ бойынша коррозияға қарсы грунттар мен эмальдар, гидрооқшаулау, POLY TOP эпоксидті едендер, еріткіштер. Зауыттардан тікелей, Қазақстан бойынша жеткізу.",
"a.home":"TradeChem, басты бетке","a.nav":"Сайт бөлімдері","a.lang":"Сайт тілі","a.call":"Қоңырау шалу","a.menu":"Мәзір",
"nav.og":"Өрттен қорғау","nav.gi":"Гидрооқшаулау","nav.po":"Едендер","nav.po2":"Құйылмалы едендер","nav.ak":"Коррозиядан қорғау",
"nav.ra":"Еріткіштер","nav.kat":"Каталог","nav.ds":"Жеткізу","nav.kt":"Байланыс",
"b.wa":"WhatsApp арқылы бағасын білу","b.wa2":"WhatsApp-қа жазу","b.cat":"Каталог","b.price":"Бағасын білу",
"b.ds":"Жеткізуді есептеу","b.call":"Қоңырау шалу","b.more":"Толық каталогты көрсету",

"h.kick":"Астана · дистрибьюция · 2023 жылдан","h.h1a":"Қорғаныш","h.h1b":"жабындар",
"h.sub":"Өрттен қорғау · коррозиядан қорғау · гидрооқшаулау · құйылмалы едендер",
"h.lead":"Ыдыстары 15-30 кг. ГОСТ және СТ-KZ, Қазақстан мен Ресей зауыттарынан тікелей жеткізілім, бүкіл Қазақстан бойынша жеткізу.",
"h.a":"Боялған болат фермалар: қорғалған металл конструкциялар",

"og.k":"Өрттен қорғау · 4 позиция","og.h":"Болат конструкциялар мен ағашты өрттен қорғау",
"og.l":"Бағаналар, арқалықтар мен фермаларға арналған көпіршіктенетін Protherma бояулары, сыртқы жұмысқа атмосфераға төзімді нұсқасы, ағашқа арналған сіңдірме.",
"og.a":"Болат бағана мен от фонындағы Protherma O өрттен қорғау бояуы",
"gi.k":"Гидрооқшаулау · 2 позиция","gi.h":"Шатыр, іргетас және бассейндерді гидрооқшаулау",
"gi.l":"Rubber Master резеңке бояуы және Aqua Fix-01 мастикасы: бетон, кірпіш және сылақ бетінде серпімді су өткізбейтін қабық.",
"gi.a":"Rubber Master резеңке бояуы, 20 кг шелек",
"po.k":"Эпоксидті жабындар · 6 позиция","po.h":"Бетон бойынша өнеркәсіптік едендер",
"po.l":"POLY TOP жүйесі: сіңдірме, грунттар, құйылмалы компаунд, эпоксидті бояу және полиуретан эмалі. RAL бойынша түс, жіксіз, цех пен қоймаға.",
"po.a":"Цехтың құйылмалы еденіндегі POLY TOP эпоксидті компаунды",
"po.c1":"Грунт-сіңдірме","po.c2":"Мөлдір грунт","po.c4":"Компаунд","po.c5":"Эпоксидті бояу","po.c6":"ПУ-эмаль",
"ak.k":"Коррозиядан қорғау · 11 позиция","ak.h":"Металға арналған коррозияға қарсы грунттар мен эмальдар",
"ak.l":"Тот үстінен жағылатын 3-і 1-де грунт-эмальдан ГОСТ бойынша химияға төзімді ХВ және ХС-ке дейін. Ыдысы 18-30 кг, Астанадағы қоймадан.",
"ak.a":"Бояу камерасында болат конструкцияны бояу","ak.c1":"3-і 1-де",
"ra.k":"Кетіргіштер мен еріткіштер · 3 позиция","ra.h":"Еріткіштер және ескі бояу кетіргіші",
"ra.l":"ГОСТ бойынша Р-4 және 646 көтерме 175 кг-нан, PR-10 қышқылды кетіргіші эпоксид, полиуретан және ұнтақ жабындарды 1-10 минутта алады.",
"ra.a":"646 еріткішінің бөшкесі","ra.c1":"Р-4 еріткіші","ra.c2":"646 еріткіші","ra.c3":"PR-10 кетіргіші",

"kat.k":"Каталог","kat.h":"Қоймадағы материалдар",
"kat.l":"Бағаны көлем мен мекенжайға қарай есептейміз. «Бағасын білу» батырмасын басыңыз - позиция бойынша сұрақ бірден WhatsApp-қа кетеді.",
"f.all":"Барлығы","g.og":"Өрттен қорғау","g.gi":"Гидрооқшаулау","g.po":"Эпоксидті едендер","g.ak":"Коррозиядан қорғау","g.ra":"Еріткіштер",
"t.r4":"175 кг-нан","t.r646":"200 кг-нан",
"c.protherma-o":"органикалық негіздегі өрттен қорғау бояуы","c.protherma-vd":"су-дисперсиялық өрттен қорғау бояуы",
"c.protherma-oac":"атмосфераға төзімді өрттен қорғау бояуы","c.protherma-wood":"ағашқа арналған өртке қарсы сіңдірме",
"c.rubber-master":"сумен сұйылтылатын, түс беруге болатын, жартылай күңгірт акрилат бояуы","c.aqua-fix":"гидрооқшаулағыш мастика",
"c.pt-propitka":"бетонға арналған, екі компонентті","c.pt-prozr":"мөлдір, құйылмалы еден астына","c.pt-eko":"екі компонентті эпоксидті",
"c.pt-pu-emal":"сумен сұйылтылатын, УК-ге төзімді","c.pt-kompaund":"құйылмалы, RAL бойынша түс","c.pt-kraska":"жұқа қабатты, RAL бойынша түс",
"c.grunt-emal-3v1":"тот үстінен, тазалаусыз","c.pf115":"алкидті, ГОСТ 6465-76","c.gf021":"коррозияға қарсы, ГОСТ 25129-82",
"c.hs010":"қызыл-қоңыр","c.hv062":"сұр","c.hs059":"қышқыл мен сілтіге төзімді","c.nc132":"нитроэмаль, ГОСТ 6631-74",
"c.hv785":"химияға төзімді, ГОСТ 7313-75","c.hv161":"қасбеттік","c.surik":"ГОСТ 10503-71, қызыл-қоңыр","c.hv784":"химияға төзімді, ХВ-785-пен жүйеде",
"c.pr10":"қышқылды, эпоксид пен ұнтақты алады","c.r4":"ГОСТ 7827-74","c.r646":"ГОСТ 18188-72",

"tr.k":"Неге TradeChem","tr.h":"Қазақстан мен Ресей зауыттарынан тікелей жеткізілім",
"tr.1":"ГОСТ және СТ-KZ","tr.1p":"Әр позицияға сертификат","tr.2":"Зауыт бағасы","tr.2p":"Делдалсыз, тікелей келісімшарт бойынша",
"tr.3":"Міндетке сай таңдау","tr.3p":"Нысанның климаты мен жүктемесіне қарай материал","tr.4":"Нақты мерзім","tr.4p":"Келісілген күні тиеп жөнелту",
"tr.a":"Лак-бояу материалдарының қоймасы","tr.cap":"Қойма · Астана",

"ds.k":"Жеткізу","ds.h":"Бүкіл Қазақстан бойынша жеткізу",
"ds.l":"Құны тапсырыс көлеміне байланысты. Астана бойынша тапсырыс кезінде нақтыланады.",
"ds.a":"Тас жолдағы жүк көлігі: материалдарды Қазақстан бойынша жеткізу",

"st.k":"Қалай жұмыс істейміз","st.h":"Өтінімнен нысанға дейін",
"st.1":"Өтінім","st.1p":"WhatsApp-қа жазасыз немесе қоңырау шаласыз: қандай нысан, қандай материалдар.",
"st.2":"Таңдау және есептеу","st.2p":"Материалды міндетке сай таңдаймыз, көлемі мен бағасын есептейміз.",
"st.3":"Тиеп жөнелту","st.3p":"Тапсырысты Астанадағы қоймада жинаймыз, құжаттарын береміз.",
"st.4":"Жеткізу","st.4p":"Қазақстанның кез келген қаласындағы нысанға жеткіземіз.",

"kt.k":"Байланыс","kt.h":"Нысанға материал керек пе? Жазыңыз",
"kt.l":"Жұмыс уақытында жауап береміз, тізіміңіз бойынша есеп - сол күні.",
"kt.city":"Астана, Қазақстан","kt.geo":"Астанадағы қоймадан тиеп жөнелту, бүкіл Қазақстан бойынша жеткізу",
"fm.name":"Атыңыз","fm.phone":"Телефон","fm.msg":"Не керек және қанша","fm.send":"WhatsApp-қа жіберу",
"fm.ok":"Рақмет! WhatsApp ашылады, хабарлама дайын.","fm.err":"Атыңыз бен телефоныңызды көрсетіңіз.",
"f.sub":"Қорғаныш жабындар · Астана · 2023 жылдан",
"f.copy":"© 2026 «Tradechem» ЖШС. Өрттен қорғау, коррозиядан қорғау, гидрооқшаулау, құйылмалы едендер."
};

/* готовые тексты WhatsApp под каждый блок */
var WA_TXT = {
ru:{
  hero:"Здравствуйте! Интересуют защитные покрытия. Подскажите цену и наличие: ",
  og:"Здравствуйте! Интересует огнезащита Protherma. Объект и объём: ",
  gi:"Здравствуйте! Интересует гидроизоляция (Rubber Master / Aqua Fix-01). Объект и объём: ",
  po:"Здравствуйте! Интересуют эпоксидные покрытия POLY TOP для бетонного пола. Площадь и объект: ",
  ak:"Здравствуйте! Интересуют антикоррозионные грунты и эмали. Позиции и объём: ",
  ra:"Здравствуйте! Интересуют растворители / смывка. Позиции и объём: ",
  ds:"Здравствуйте! Нужна доставка материалов. Город, адрес объекта и объём заказа: ",
  kontakty:"Здравствуйте! Пишу с сайта TradeChem. Нужен расчёт по материалам: ",
  item:"Здравствуйте! Интересует {n} ({t}). Подскажите цену и наличие. Объём: "
},
kk:{
  hero:"Сәлеметсіз бе! Қорғаныш жабындар қызықтырады. Бағасы мен қоймадағы бар-жоғын айтыңызшы: ",
  og:"Сәлеметсіз бе! Protherma өрттен қорғау бояуы қызықтырады. Нысан мен көлемі: ",
  gi:"Сәлеметсіз бе! Гидрооқшаулау (Rubber Master / Aqua Fix-01) қызықтырады. Нысан мен көлемі: ",
  po:"Сәлеметсіз бе! Бетон еденге арналған POLY TOP эпоксидті жабындары қызықтырады. Ауданы мен нысан: ",
  ak:"Сәлеметсіз бе! Коррозияға қарсы грунттар мен эмальдар қызықтырады. Позициялар мен көлемі: ",
  ra:"Сәлеметсіз бе! Еріткіштер / кетіргіш қызықтырады. Позициялар мен көлемі: ",
  ds:"Сәлеметсіз бе! Материалдарды жеткізу керек. Қала, нысанның мекенжайы және тапсырыс көлемі: ",
  kontakty:"Сәлеметсіз бе! TradeChem сайтынан жазып отырмын. Материалдар бойынша есеп керек: ",
  item:"Сәлеметсіз бе! {n} ({t}) қызықтырады. Бағасы мен бар-жоғын айтыңызшы. Көлемі: "
}};

var TICK = ["Protherma O","Protherma ВД","Protherma O-AC","Грунт-эмаль 3 в 1","ПФ-115","ГФ-021","POLY TOP","Rubber Master","Aqua Fix-01","ХВ-785","ХС-010","Растворитель 646","Р-4","Смывка PR-10"];
var TICK_KZ = ["Protherma O","Protherma ВД","Protherma O-AC","Грунт-эмаль 3-і 1-де","ПФ-115","ГФ-021","POLY TOP","Rubber Master","Aqua Fix-01","ХВ-785","ХС-010","646 еріткіші","Р-4","PR-10 кетіргіші"];

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

function setWaLinks(){
  var L = curLang();
  document.querySelectorAll("[data-wa]").forEach(function(a){
    var t = WA_TXT[L][a.dataset.wa] || WA_TXT[L].hero;
    a.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(t);
    a.target = "_blank"; a.rel = "noopener";
  });
  document.querySelectorAll("[data-wa-item]").forEach(function(a){
    var c = a.closest(".card"); if (!c) return;
    var tara = c.dataset.tara;
    if (L === "kk" && /^от /.test(tara)) tara = tara.replace(/^от /, "") + "-нан";
    var t = WA_TXT[L].item.replace("{n}", c.dataset.name).replace("{t}", tara);
    a.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(t);
    a.target = "_blank"; a.rel = "noopener";
  });
}

function applyLang(lang){
  var kk = lang === "kk";
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
  setWaLinks();
  fillTicker();
  renderPrices();
  requestAnimationFrame(fitText);
}
function initLang(){
  var url = new URLSearchParams(location.search).get("lang");
  var saved = null;
  try { saved = localStorage.getItem("tc-lang"); } catch(e){}
  var lang = (url === "kk" || url === "ru") ? url : (saved === "kk" ? "kk" : "ru");
  applyLang(lang);
}
document.querySelectorAll(".lang button").forEach(function(b){
  b.addEventListener("click", function(){ applyLang(b.getAttribute("data-lang")); });
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
  var list = curLang() === "kk" ? TICK_KZ : TICK;
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
  var top = t.getBoundingClientRect().top + scrollY - (t.classList.contains("pw") ? 0 : HH());
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
var UNIT = {
  ru: {"за кг":"₸/кг", "за тару":"₸ за тару", "за шт":"₸/шт", "за литр":"₸/л"},
  kk: {"за кг":"₸/кг", "за тару":"₸ ыдыс үшін", "за шт":"₸/дана", "за литр":"₸/л"}
};
var ORDER_TXT = {ru:"Заказать", kk:"Тапсырыс беру"};

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
    var flag = /^(да|иә|ия|от|yes|true)$/i.test((r[5] || "").trim());   /* старый формат колонки F */
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
/* Тара в казахской версии: «от 175 кг» → «175 кг-нан». */
function taraTxt(t, kk){
  return (kk && /^от\s/i.test(t)) ? t.replace(/^от\s*/i, "") + "-нан" : t;
}
function renderPrices(){
  if (!PRICES) return;
  var kk = curLang() === "kk", L = kk ? "kk" : "ru", touched = false;
  document.querySelectorAll(".card[data-sku]").forEach(function(c){
    var box = c.querySelector(".pr"), btn = c.querySelector("[data-wa-item]");
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
      if (c.dataset.name !== p.n){ c.dataset.name = p.n; touched = true; }
    }
    /* C - тара */
    if (p.t){
      var tEl = c.querySelector(".tara"), tv = taraTxt(p.t, kk);
      if (tEl && tEl.textContent !== tv) tEl.textContent = tv;
      if (c.dataset.tara !== p.t){ c.dataset.tara = p.t; touched = true; }
    }
    /* D + E + F - цена */
    if (!box) return;
    if (!(p.v > 0)){
      box.hidden = true;
      if (btn) btn.innerHTML = pick("b.price", kk);
      return;
    }
    var s = money(p.v) + " " + (UNIT[L][p.u] || UNIT[L]["за кг"]);
    box.textContent = p.ot ? (kk ? s + " бастап" : "от " + s) : s;
    box.hidden = false;
    if (btn) btn.textContent = ORDER_TXT[L];
  });
  if (touched) setWaLinks();          /* имя и тара уехали в текст ссылки WhatsApp */
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

/* ---------------- ФОРМА → WhatsApp ---------------- */
var form = document.getElementById("form");
if (form) form.addEventListener("submit", function(e){
  e.preventDefault();
  var ok = document.getElementById("fmok"), err = document.getElementById("fmerr");
  if (form.company && form.company.value) return;          /* honeypot */
  var name = form.name.value.trim(), phone = form.phone.value.trim(), msg = form.msg.value.trim();
  if (!name || phone.replace(/\D/g, "").length < 10) { err.hidden = false; ok.hidden = true; return; }
  err.hidden = true;
  var L = curLang();
  var t = (L === "kk"
    ? "Сәлеметсіз бе! TradeChem сайтынан өтінім.\nАты: " + name + "\nТелефон: " + phone + (msg ? "\nНе керек: " + msg : "")
    : "Здравствуйте! Заявка с сайта TradeChem.\nИмя: " + name + "\nТелефон: " + phone + (msg ? "\nЧто нужно: " + msg : ""));
  ok.hidden = false;
  window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(t), "_blank", "noopener");
});

/* ---------------- СТАРТ ---------------- */
snapshot();
initLang();
loadPrices();
})();
