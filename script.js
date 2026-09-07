// Année dans le footer
var yearNow = new Date().getFullYear();
var yFr = document.getElementById("year-fr");
var yEn = document.getElementById("year-en");
if (yFr) yFr.textContent = yearNow;
if (yEn) yEn.textContent = yearNow;

// Ancrage doux pour tous les liens internes
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener("click", function (e) {
    var target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

/* ---------- Langue FR / EN ---------- */
var titles = {
  fr: "Programmer un drone Tello | Innocent Twagirumukiza",
  en: "Programming a Tello Drone | Innocent Twagirumukiza"
};

function applyLang(lang) {
  document.documentElement.setAttribute("lang", lang);
  document.documentElement.setAttribute("data-lang", lang);
  document.title = titles[lang] || titles.fr;

  document.querySelectorAll(".i18n-fr").forEach(function (el) {
    el.style.display = lang === "fr" ? "" : "none";
  });
  document.querySelectorAll(".i18n-en").forEach(function (el) {
    el.style.display = lang === "en" ? "" : "none";
  });

  document.querySelectorAll(".lang-btn").forEach(function (btn) {
    var active = btn.getAttribute("data-lang-btn") === lang;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });

  localStorage.setItem("tc-lang", lang);
}

document.querySelectorAll(".lang-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    applyLang(btn.getAttribute("data-lang-btn"));
  });
});

applyLang(document.documentElement.getAttribute("data-lang") || "fr");

/* ---------- Thème clair / sombre ---------- */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("tc-theme", theme);
  var btn = document.getElementById("theme-toggle");
  if (btn) btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
}

var themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  themeToggle.addEventListener("click", function () {
    var current = document.documentElement.getAttribute("data-theme") || "light";
    applyTheme(current === "light" ? "dark" : "light");
  });
}
applyTheme(document.documentElement.getAttribute("data-theme") || "light");

/* ---------- Taille du texte ---------- */
var FS_MIN = 0.85;
var FS_MAX = 1.3;
var FS_STEP = 0.1;

function applyFontScale(scale) {
  scale = Math.min(FS_MAX, Math.max(FS_MIN, Math.round(scale * 100) / 100));
  document.documentElement.style.setProperty("--fs", scale);
  localStorage.setItem("tc-fs", scale);
  return scale;
}

var currentFs = parseFloat(
  getComputedStyle(document.documentElement).getPropertyValue("--fs")
) || 1;
currentFs = applyFontScale(currentFs);

var fsDec = document.getElementById("fs-dec");
var fsInc = document.getElementById("fs-inc");
if (fsDec) fsDec.addEventListener("click", function () { currentFs = applyFontScale(currentFs - FS_STEP); });
if (fsInc) fsInc.addEventListener("click", function () { currentFs = applyFontScale(currentFs + FS_STEP); });

/* ---------- Menu burger (tablette / mobile) ---------- */
var burgerToggle = document.getElementById("burger-toggle");
var mobileMenu = document.getElementById("mobile-menu");

function closeMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.remove("open");
  if (burgerToggle) burgerToggle.setAttribute("aria-expanded", "false");
}

if (burgerToggle && mobileMenu) {
  burgerToggle.addEventListener("click", function () {
    var isOpen = mobileMenu.classList.toggle("open");
    burgerToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
  mobileMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMobileMenu);
  });
}

