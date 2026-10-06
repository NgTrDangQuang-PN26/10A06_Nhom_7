const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const header = document.querySelector(".site-header");
const navLinks = document.querySelectorAll(".nav-links a");
const progress = document.querySelector(".scroll-progress span");
const heroContent = document.querySelector(".hero-content");
const schoolLogo = document.querySelector(".school-logo");
const logoFallback = document.querySelector(".brand-mark-fallback");

menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    nav?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

schoolLogo?.addEventListener("error", () => {
  schoolLogo.style.display = "none";
  if (logoFallback) logoFallback.style.display = "grid";
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -30px" });

document.querySelectorAll(".reveal").forEach((el, index) => {
  el.style.transitionDelay = Math.min(index * 25, 220) + "ms";
  observer.observe(el);
});

function updateScrollEffects() {
  const scrollY = window.scrollY || window.pageYOffset;
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? scrollY / max : 0;

  if (progress) progress.style.width = (ratio * 100).toFixed(2) + "%";
  header?.classList.toggle("scrolled", scrollY > 24);

  if (heroContent && scrollY < window.innerHeight * 1.1) {
    const offset = Math.min(scrollY * 0.16, 95);
    heroContent.style.transform = "translate3d(0," + offset + "px,0)";
    heroContent.style.opacity = String(Math.max(0.5, 1 - scrollY / (window.innerHeight * 1.05)));
  }
}

window.addEventListener("scroll", updateScrollEffects, { passive: true });
window.addEventListener("resize", updateScrollEffects);
updateScrollEffects();

document.getElementById("year").textContent = new Date().getFullYear();