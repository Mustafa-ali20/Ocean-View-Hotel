import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./Marquee.scss";

gsap.registerPlugin(ScrollTrigger);

const Marquee = () => {
  const sectionRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    if (!section || !line1 || !line2) return;

    // line 1 starts pushed right (partially off screen), moves to center
    gsap.fromTo(
      line1,
      { x: "55%" },
      {
        x: "0%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "center center",
          scrub: 1.2,
        },
      }
    );

    // line 2 starts pushed left (partially off screen), moves to center
    gsap.fromTo(
      line2,
      { x: "-55%" },
      {
        x: "0%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "center center",
          scrub: 1.2,
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="mq" ref={sectionRef}>
      <div className="mq__inner">

        {/* Line 1 — moves from right */}
        <div className="mq__line" ref={line1Ref}>
          <span className="mq__text">ocean living</span>
          <div className="mq__img-wrap mq__img-wrap--1">
            <img src="/images/hero/OceanView2.jpg" alt="Pure nature" className="mq__img" />
          </div>
        </div>

        {/* Line 2 — moves from left */}
        <div className="mq__line" ref={line2Ref}>
          <div className="mq__img-wrap mq__img-wrap--2">
            <img src="/images/description/wellness.jpeg" alt="Alpine cuisine" className="mq__img" />
          </div>
          <span className="mq__text">pure wellness</span>
        </div>

      </div>
    </section>
  );
};

export default Marquee;