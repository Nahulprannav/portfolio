const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");
const heroArt = document.querySelector("#hero-art");
const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

menuToggle?.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  primaryNav?.classList.toggle("is-open", !isExpanded);
});

primaryNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    primaryNav.classList.remove("is-open");
  });
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (heroArt && !prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
  const scene = heroArt.querySelector(".art-scene");
  const depthLayers = heroArt.querySelectorAll("[data-depth]");

  heroArt.addEventListener("pointermove", (event) => {
    const bounds = heroArt.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    if (scene) {
      scene.style.transform = `rotateY(${x * 8}deg) rotateX(${y * -7}deg)`;
    }

    depthLayers.forEach((layer) => {
      const depth = Number(layer.getAttribute("data-depth"));
      layer.style.translate = `${x * depth * 22}px ${y * depth * 18}px`;
    });
  });

  heroArt.addEventListener("pointerleave", () => {
    if (scene) {
      scene.style.transform = "";
    }
    depthLayers.forEach((layer) => {
      layer.style.translate = "";
    });
  });
}

if (!prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      card.style.setProperty("--tilt-x", `${(x - 0.5) * 9}deg`);
      card.style.setProperty("--tilt-y", `${(0.5 - y) * 7}deg`);
      card.style.setProperty("--glow-x", `${x * 100}%`);
      card.style.setProperty("--glow-y", `${y * 100}%`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("--tilt-x");
      card.style.removeProperty("--tilt-y");
      card.style.removeProperty("--glow-x");
      card.style.removeProperty("--glow-y");
    });
  });
}

const revealElements = document.querySelectorAll(
  ".section-heading, .project-card, .about-heading, .about-copy, .experience-item, .toolkit-item, .contact-content",
);

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  document.body.classList.add("reveal-ready");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal", "is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  revealElements.forEach((element) => {
    element.classList.add("reveal");
    revealObserver.observe(element);
  });
}
