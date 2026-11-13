document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initMobileNavigation();
  initMotion();
  initTypewriter();
  initGalleryFilter();
  initProjectModal();
  initProjectShowMore();
  initScrollLifecycle();
});

function initThemeToggle() {
  const toggleButtons = document.querySelectorAll("#theme-toggle, #drawer-theme-toggle, .btn-theme");
  if (toggleButtons.length === 0) return;

  toggleButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const isLight = document.documentElement.classList.contains("light-theme");
      const nextTheme = isLight ? "dark" : "light";

      document.documentElement.classList.remove("dark-theme", "light-theme");
      document.documentElement.classList.add(nextTheme + "-theme");
      localStorage.setItem("theme", nextTheme);
    });
  });
}

function initMobileNavigation() {
  const navToggle = document.getElementById("navToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const navBackdrop = document.getElementById("navBackdrop");
  const drawerClose = document.getElementById("drawerClose");
  const drawerLinks = document.querySelectorAll(".drawer-link");

  if (!navToggle || !mobileDrawer || !navBackdrop) return;

  function openDrawer() {
    mobileDrawer.classList.add("open");
    navBackdrop.classList.add("active");
    navToggle.classList.add("open");
    navToggle.setAttribute("aria-expanded", "true");
    mobileDrawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("drawer-open");
  }

  function closeDrawer() {
    mobileDrawer.classList.remove("open");
    navBackdrop.classList.remove("active");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    mobileDrawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("drawer-open");

    // Refresh ScrollTrigger after drawer transition finishes
    setTimeout(() => {
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
      }
    }, 380);
  }

  function toggleDrawer() {
    const isOpen = mobileDrawer.classList.contains("open");
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }

  navToggle.addEventListener("click", toggleDrawer);

  if (drawerClose) {
    drawerClose.addEventListener("click", closeDrawer);
  }

  navBackdrop.addEventListener("click", closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      closeDrawer();

      if (!href) return;
      const isHomePage = window.location.pathname === "/" || window.location.pathname === "";
      let targetId = null;

      if (href.startsWith("#")) {
        targetId = href.slice(1);
      } else if (isHomePage && href.startsWith("/#")) {
        targetId = href.slice(2);
      }

      if (targetId) {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: "smooth" });
          if (history.pushState) {
            history.pushState(null, "", "#" + targetId);
          }
          setTimeout(() => {
            if (typeof ScrollTrigger !== "undefined") {
              ScrollTrigger.refresh();
            }
          }, 400);
        }
      }
    });
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && mobileDrawer.classList.contains("open")) {
      closeDrawer();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768 && mobileDrawer.classList.contains("open")) {
      closeDrawer();
    }
  });
}

function initMotion() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  // ScrollReveal Fade-in animations
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    const animatedCards = gsap.utils.toArray(".project-card, .service-card, .skill-pill, .gallery-item, .testimonial-card, .blog-card, .about-col, .bento-box");
    animatedCards.forEach(elem => {
      gsap.fromTo(elem,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: {
            trigger: elem,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }

  // Link hijacking curtain transitions and smooth anchor navigation
  document.querySelectorAll("a").forEach(link => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("javascript:") || link.target === "_blank" || link.hasAttribute("download")) return;

    if (href.startsWith("mailto:") || href.startsWith("tel:")) return;

    const isHomePage = window.location.pathname === "/" || window.location.pathname === "";

    // In-page hash link
    if (href.startsWith("#")) {
      link.addEventListener("click", e => {
        const targetId = href.slice(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: "smooth" });
          if (history.pushState) {
            history.pushState(null, "", href);
          }
          setTimeout(() => {
            if (typeof ScrollTrigger !== "undefined") {
              ScrollTrigger.refresh();
            }
          }, 400);
        }
      });
      return;
    }

    // Homepage section link when currently on homepage
    if (isHomePage && href.startsWith("/#")) {
      link.addEventListener("click", e => {
        const targetId = href.slice(2);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: "smooth" });
          if (history.pushState) {
            history.pushState(null, "", "#" + targetId);
          }
          setTimeout(() => {
            if (typeof ScrollTrigger !== "undefined") {
              ScrollTrigger.refresh();
            }
          }, 400);
        }
      });
      return;
    }

    // External domain links should not trigger transition curtain
    if (href.startsWith("http://") || href.startsWith("https://")) {
      if (!href.startsWith(window.location.origin)) {
        return;
      }
    }

    if (link.getAttribute("role") === "button" && !href) return;

    link.addEventListener("click", e => {
      const curtain = document.querySelector(".transition-curtain");
      if (!curtain || typeof gsap === "undefined") {
        return;
      }

      e.preventDefault();
      gsap.to(curtain, {
        scaleY: 1,
        duration: 0.45,
        transformOrigin: "bottom",
        ease: "power4.inOut",
        onComplete: () => {
          window.location.href = href;
        }
      });
    });
  });
}

function initScrollLifecycle() {
  // Handle direct hash landing
  if (window.location.hash) {
    const hashTarget = document.querySelector(window.location.hash);
    if (hashTarget) {
      setTimeout(() => {
        hashTarget.scrollIntoView({ behavior: "smooth" });
        if (typeof ScrollTrigger !== "undefined") {
          ScrollTrigger.refresh();
        }
      }, 200);
    }
  }

  // Refresh ScrollTrigger when images and resources load
  window.addEventListener("load", () => {
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }
  });

  // Debounced resize refresh for ScrollTrigger
  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
      }
    }, 150);
  });
}

function initTypewriter() {
  const elem = document.querySelector(".typewriter-text");
  if (!elem) return;

  const words = JSON.parse(elem.getAttribute("data-words") || "[]");
  if (words.length === 0) return;

  let wordIndex = 0;
  let txt = "";
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      txt = currentWord.substring(0, txt.length - 1);
    } else {
      txt = currentWord.substring(0, txt.length + 1);
    }

    elem.textContent = txt;

    let typeSpeed = 100;
    if (isDeleting) {
      typeSpeed /= 2;
    }

    if (!isDeleting && txt === currentWord) {
      typeSpeed = 1500;
      isDeleting = true;
    } else if (isDeleting && txt === "") {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

function initGalleryFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const toggleBtn = document.getElementById("toggleMoreProjects");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");
      const isExpanded = toggleBtn && toggleBtn.getAttribute("data-expanded") === "true";

      galleryItems.forEach(item => {
        const matchesFilter = filterValue === "all" || item.classList.contains(filterValue);
        const isOverflow = item.getAttribute("data-overflow") === "true";

        if (matchesFilter) {
          if (filterValue === "all" && isOverflow && !isExpanded) {
            item.classList.add("hidden");
          } else {
            item.classList.remove("hidden");
            gsap.fromTo(item, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.35 });
          }
        } else {
          item.classList.add("hidden");
        }
      });

      setTimeout(() => {
        if (typeof ScrollTrigger !== "undefined") {
          ScrollTrigger.refresh();
        }
      }, 120);
    });
  });
}

function initProjectShowMore() {
  const toggleBtn = document.getElementById("toggleMoreProjects");
  if (!toggleBtn) return;

  let expanded = false;
  toggleBtn.addEventListener("click", () => {
    expanded = !expanded;
    toggleBtn.setAttribute("data-expanded", expanded ? "true" : "false");
    const activeFilterBtn = document.querySelector(".filter-btn.active");
    const currentFilter = activeFilterBtn ? activeFilterBtn.getAttribute("data-filter") : "all";

    const allItems = document.querySelectorAll(".gallery-item");
    allItems.forEach(item => {
      const matchesFilter = currentFilter === "all" || item.classList.contains(currentFilter);
      const isOverflow = item.getAttribute("data-overflow") === "true";

      if (matchesFilter) {
        if (isOverflow) {
          if (expanded) {
            item.classList.remove("hidden");
            gsap.fromTo(item, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.35 });
          } else {
            item.classList.add("hidden");
          }
        } else {
          item.classList.remove("hidden");
        }
      } else {
        item.classList.add("hidden");
      }
    });

    toggleBtn.innerHTML = expanded ? "Show Less &uarr;" : `Show All (${allItems.length}) &darr;`;

    setTimeout(() => {
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
      }
    }, 150);
  });
}

function initProjectModal() {
  const modal = document.getElementById("projectModal");
  if (!modal) return;

  const backdrop = document.getElementById("projectModalBackdrop");
  const closeBtn = document.getElementById("projectModalClose");
  const modalImg = document.getElementById("projectModalImg");
  const modalCat = document.getElementById("projectModalCat");
  const modalTitle = document.getElementById("projectModalTitle");
  const modalDesc = document.getElementById("projectModalDesc");

  function openModal(item) {
    const title = item.getAttribute("data-title") || "";
    const cat = item.getAttribute("data-category") || "";
    const img = item.getAttribute("data-img") || "";
    const desc = item.getAttribute("data-desc") || "";

    if (modalImg) {
      modalImg.src = img;
      modalImg.alt = title;
    }
    if (modalCat) modalCat.textContent = cat;
    if (modalTitle) modalTitle.textContent = title;
    if (modalDesc) modalDesc.textContent = desc;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".gallery-item").forEach(item => {
    item.addEventListener("click", () => openModal(item));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(item);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}
