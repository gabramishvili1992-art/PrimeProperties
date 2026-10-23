/* theme.js: დღე/ღამის (Light/Dark) გადამრთველი ყველა გვერდისთვის.
   არჩევანი ინახება localStorage-ში ('theme') და ყველა გვერდზე ერთნაირად მუშაობს,
   ისევე, როგორც ენის არჩევანი ('lang').
   სანამ ვიზიტორი თავად არ აირჩევს, გამოიყენება დროზე დამოკიდებული რეჟიმი:
   20:00–06:00 ღამე, დანარჩენ დროს დღე. */
(function () {
  var KEY = 'theme';
  var root = document.documentElement;

  function stored() {
    try { var v = localStorage.getItem(KEY); return (v === 'dark' || v === 'light') ? v : null; }
    catch (e) { return null; }
  }
  function auto() { var h = new Date().getHours(); return (h >= 20 || h < 6) ? 'dark' : 'light'; }
  function current() { return stored() || auto(); }

  var LABELS = {
    ka: { light: 'დღე', dark: 'ღამე', aria: 'დღე / ღამე' },
    en: { light: 'Light', dark: 'Dark', aria: 'Light / Dark mode' }
  };
  function curLang() {
    var l = root.getAttribute('lang');
    if (l !== 'ka' && l !== 'en') { try { l = localStorage.getItem('lang'); } catch (e) {} }
    return l === 'en' ? 'en' : 'ka';
  }

  var box = null, btnLight = null, btnDark = null, txtLight = null, txtDark = null;

  function paint() {
    if (!box) return;
    var m = current(), t = LABELS[curLang()];
    box.setAttribute('aria-label', t.aria);
    txtLight.textContent = t.light;
    txtDark.textContent = t.dark;
    btnLight.classList.toggle('on', m === 'light');
    btnDark.classList.toggle('on', m === 'dark');
    btnLight.setAttribute('aria-pressed', m === 'light');
    btnDark.setAttribute('aria-pressed', m === 'dark');
  }

  function apply(mode) {
    root.setAttribute('data-theme', mode);
    paint();
  }

  function choose(mode) {
    try { localStorage.setItem(KEY, mode); } catch (e) {}
    apply(mode);
  }

  function makeBtn(icon, mode) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('data-mode', mode);
    var i = document.createElement('span'); i.setAttribute('aria-hidden', 'true'); i.textContent = icon;
    var s = document.createElement('span');
    b.appendChild(i); b.appendChild(s);
    b.addEventListener('click', function () { choose(mode); });
    return { btn: b, txt: s };
  }

  function build() {
    if (box) return;
    box = document.createElement('div');
    box.className = 'theme-toggle';
    box.setAttribute('role', 'group');
    var a = makeBtn('☀', 'light'), b = makeBtn('☾', 'dark');
    btnLight = a.btn; txtLight = a.txt; btnDark = b.btn; txtDark = b.txt;
    box.appendChild(btnLight); box.appendChild(btnDark);

    // ენის გადამრთველის მარცხნივ, ერთ ხაზზე ვათავსებთ
    var host = document.querySelector('.lang-switch') || document.querySelector('.lang');
    if (host && host.parentNode) {
      var wrap = document.createElement('div');
      wrap.className = 'lang-wrap';
      host.parentNode.insertBefore(wrap, host);
      wrap.appendChild(box);   // დღე/ღამე მარცხნივ
      wrap.appendChild(host);  // ენა (EN / GEO) მარჯვნივ
    } else {
      // გვერდზე ენის გადამრთველი არ არის (მაგ. გალერეა)
      box.classList.add('solo');
      var nav = document.querySelector('.nav-links') || document.querySelector('.nav') || document.querySelector('header');
      if (nav) nav.appendChild(box);
    }
    paint();
  }

  // ფლეში რომ არ იყოს, რეჟიმს ვაყენებთ დაუყოვნებლივ
  apply(current());

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();

  // ენის შეცვლისას წარწერები განახლდეს (ენის სკრიპტები <html lang>-ს ცვლიან)
  new MutationObserver(paint).observe(root, { attributes: true, attributeFilter: ['lang'] });

  // სხვა ჩანართში შეცვლისას ეს გვერდიც განახლდეს
  window.addEventListener('storage', function (e) {
    if (e.key === KEY && (e.newValue === 'dark' || e.newValue === 'light')) apply(e.newValue);
  });
  // უკან დაბრუნებისას (Back) ქეშიდან აღდგენილი გვერდიც განახლდეს
  window.addEventListener('pageshow', function (e) { if (e.persisted) apply(current()); });
})();
