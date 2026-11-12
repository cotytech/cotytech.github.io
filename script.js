/* ============ TYPING LINE ============
   ✏️ EDIT: put your own roles / taglines in this list. */
const roles = [
  "developer",
  "designer",
  "creator",
  "coffee enthusiast",
];

const typed = document.getElementById("typed");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion) {
  typed.textContent = roles[0];
} else {
  let role = 0, char = 0, deleting = false;
  (function tick() {
    const word = roles[role];
    typed.textContent = word.slice(0, char);
    let delay = deleting ? 40 : 85;

    if (!deleting && char === word.length) { deleting = true; delay = 1400; }
    else if (deleting && char === 0) { deleting = false; role = (role + 1) % roles.length; delay = 350; }
    else { char += deleting ? -1 : 1; }

    setTimeout(tick, delay);
  })();
}

/* ============ SMOOTH SECTION LINKS ============
   Anchor links (#projects etc.) scroll smoothly (CSS does the scrolling).
   Here we also update the address bar and highlight the active nav link. */
const navLinks = document.querySelectorAll(".nav-links a");

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    history.replaceState(null, "", a.getAttribute("href"));
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id));
  });
}, { rootMargin: "-40% 0px -55% 0px" });

document.querySelectorAll("section[id]").forEach(s => observer.observe(s));

/* ============ SMOOTH PAGE TRANSITIONS ============
   Any link with the data-page attribute fades the screen out, then opens the page.
   Example: <a href="blog.html" data-page>Blog</a> */
const fade = document.querySelector(".fade");

document.querySelectorAll("a[data-page]").forEach(a => {
  a.addEventListener("click", e => {
    e.preventDefault();
    fade.classList.add("show");
    setTimeout(() => (window.location.href = a.href), 350);
  });
});
window.addEventListener("pageshow", () => fade.classList.remove("show")); // when using the back button

/* ============ COPY EMAIL BUTTON ============ */
const copyBtn = document.getElementById("copy");
const copyLabel = document.getElementById("copy-label");

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(copyBtn.dataset.email);
    copyLabel.textContent = "Copied!";
  } catch {
    copyLabel.textContent = "Press Ctrl+C to copy: " + copyBtn.dataset.email;
  }
  setTimeout(() => (copyLabel.textContent = "Copy email address"), 2000);
});

/* ============ FOOTER YEAR ============ */
document.getElementById("year").textContent = new Date().getFullYear();
