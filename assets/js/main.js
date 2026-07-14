/* Portfolio — light interactivity: nav state, mobile menu, scroll reveal,
   card glow tracking, current year. Vanilla JS, no dependencies. */
(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---- Sticky nav background on scroll ---- */
  const nav = document.querySelector("[data-nav]");
  if (nav) {
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Mobile menu toggle ---- */
  const menuBtn = document.querySelector("[data-menu-btn]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  if (menuBtn && mobileMenu) {
    const setOpen = (open) => {
      mobileMenu.classList.toggle("hidden", !open);
      menuBtn.setAttribute("aria-expanded", String(open));
    };
    menuBtn.addEventListener("click", () => {
      const open = mobileMenu.classList.contains("hidden");
      setOpen(open);
    });
    mobileMenu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => setOpen(false))
    );
  }

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length) {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const delay = entry.target.getAttribute("data-reveal-delay");
              if (delay) entry.target.style.transitionDelay = delay + "ms";
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      revealEls.forEach((el) => io.observe(el));
    }
  }

  /* ---- Card glow follows cursor (pointer devices only) ---- */
  if (!prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
        card.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
      });
    });
  }

  /* ---- Contact modal ---- */
  const contactModal = document.querySelector("[data-contact-modal]");
  if (contactModal) {
    let lastFocused = null;
    const openContact = () => {
      lastFocused = document.activeElement;
      contactModal.hidden = false;
      document.body.style.overflow = "hidden";
      const first = contactModal.querySelector("a, button");
      if (first) first.focus();
    };
    const closeContact = () => {
      contactModal.hidden = true;
      document.body.style.overflow = "";
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    };
    document.querySelectorAll("[data-contact-open]").forEach((el) =>
      el.addEventListener("click", (e) => {
        e.preventDefault();
        openContact();
      })
    );
    contactModal.querySelectorAll("[data-contact-close]").forEach((el) =>
      el.addEventListener("click", closeContact)
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !contactModal.hidden) closeContact();
    });
  }

  /* ---- Current year in footer ---- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();
