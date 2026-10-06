const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav-links a");

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

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
document.getElementById("year").textContent = new Date().getFullYear();