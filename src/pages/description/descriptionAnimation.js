import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Splits text content of an element into individual word spans
 * while preserving styled keyword spans inside
 */
export function splitIntoWords(containerRef) {
  const container = containerRef.current;
  if (!container) return;

  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    null
  );

  const textNodes = [];
  let node;
  while ((node = walker.nextNode())) {
    if (node.textContent.trim()) {
      textNodes.push(node);
    }
  }

  textNodes.forEach((textNode) => {
    const words = textNode.textContent.split(/(\s+)/);
    const fragment = document.createDocumentFragment();

    words.forEach((word) => {
      if (word.match(/^\s+$/)) {
        fragment.appendChild(document.createTextNode(word));
      } else {
        const span = document.createElement("span");
        span.classList.add("desc-word");
        span.textContent = word;
        fragment.appendChild(span);
      }
    });

    textNode.parentNode.replaceChild(fragment, textNode);
  });
}

/**
 * GSAP scroll-triggered word reveal animation
 * Responsive: different timing/scrub for large, tablet, and mobile screens
 */
export function initScrollReveal(containerRef) {
  const container = containerRef.current;
  if (!container) return;

  const words = container.querySelectorAll(".desc-word");
  const width = window.innerWidth;

  // ── Responsive config ───────────────────────────────────────
  let scrollConfig;

  if (width > 1024) {
    // Large screens — standard feel, moderate scrub
    scrollConfig = {
      stagger: 0.04,
      scrub: 2,
      start: "top 95%",
      end: "bottom 70%",
    };
  } else if (width > 768) {
    // Tablet — slightly faster stagger, tighter scrub window
    scrollConfig = {
      stagger: 0.035,
      scrub: 1.5,
      start: "top 90%",
      end: "bottom 60%",
    };
  } else {
    // Mobile — faster reveal, shorter scrub so it completes before user scrolls past
    scrollConfig = {
      stagger: 0.025,
      scrub: 1,
      start: "top 100%",
      end: "top 40%",
    };
  }

  gsap.fromTo(
    words,
    { color: "rgba(232, 221, 208, 0.2)" },
    {
      color: "#E8DDD0",
      stagger: scrollConfig.stagger,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: scrollConfig.start,
        end: scrollConfig.end,
        scrub: scrollConfig.scrub,
      },
    }
  );

  return () => ScrollTrigger.getAll().forEach((t) => t.kill());
}

// Mobile scroll-in animation for corner images
export function initMobileImageReveal() {
  if (window.innerWidth > 768) return;

  gsap.fromTo(
    ".desc-mobile-img",
    { opacity: 0, scale: 0.88 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.9,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".desc",
        start: "top 80%",
      },
    }
  );
}