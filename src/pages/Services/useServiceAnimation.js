import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useServiceAnimation = () => {
  const paraRef = useRef(null);

  useEffect(() => {
    const para = paraRef.current;
    if (!para) return;

    // split paragraph into lines using a temporary measure element
    const text = para.textContent;
    const words = text.split(" ");

    // wrap each word in a span for line detection
    para.innerHTML = words
      .map((w) => `<span class="svc-word">${w} </span>`)
      .join("");

    const wordSpans = para.querySelectorAll(".svc-word");

    // group words into lines by their Y position
    const lines = [];
    let currentLine = [];
    let lastTop = null;

    wordSpans.forEach((span) => {
      const top = span.getBoundingClientRect().top;
      if (lastTop === null || Math.abs(top - lastTop) < 5) {
        currentLine.push(span);
      } else {
        if (currentLine.length) lines.push(currentLine);
        currentLine = [span];
      }
      lastTop = top;
    });
    if (currentLine.length) lines.push(currentLine);

    // wrap each line in an overflow:hidden container
    lines.forEach((lineWords) => {
      const wrapper = document.createElement("div");
      wrapper.className = "svc-line-wrap";
      const inner = document.createElement("div");
      inner.className = "svc-line-inner";
      lineWords.forEach((w) => inner.appendChild(w));
      wrapper.appendChild(inner);
      para.appendChild(wrapper);
    });

    // animate each line up from below
    const lineInners = para.querySelectorAll(".svc-line-inner");

    gsap.fromTo(
      lineInners,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: para,
          start: "top 82%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return { paraRef };
};

export default useServiceAnimation;