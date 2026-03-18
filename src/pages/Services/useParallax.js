import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useParallax = () => {
  const mainImgRef = useRef(null);
  const innerImgRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const main = mainImgRef.current;
    const inner = innerImgRef.current;
    const section = sectionRef.current;
    if (!main || !inner || !section) return;

    // main image moves slower than scroll — parallax
    const mainTween = gsap.to(main, {
      yPercent: -12,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    // inner image moves at slightly different speed for depth
    const innerTween = gsap.to(inner, {
      yPercent: -6,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    });

    return () => {
      mainTween.scrollTrigger?.kill();
      innerTween.scrollTrigger?.kill();
    };
  }, []);

  return { sectionRef, mainImgRef, innerImgRef };
};

export default useParallax;