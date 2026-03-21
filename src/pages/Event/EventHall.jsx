import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./EventHall.scss";

gsap.registerPlugin(ScrollTrigger);

const EventHall = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const img = imgRef.current;
    const content = contentRef.current;
    if (!section || !container || !img || !content) return;

    // ── container scale expand ────────────────────────────────
    gsap.fromTo(
      container,
      {
        width: "80%",
        height: "65vh",
        borderRadius: "12px",
      },
      {
        width: "100%",
        height: "100vh",
        borderRadius: "0px",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          end: "top 10%",
          scrub: 1.4,
        },
      }
    );

    // ── image parallax — moves slower than container ──────────
    gsap.fromTo(
      img,
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      }
    );

    // ── text reveal synced with scroll ────────────────────────
    gsap.fromTo(
      content,
      { opacity: 0, scale: 0.94 },
      {
        opacity: 1,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 20%",
          scrub: 1.2,
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="eh" ref={sectionRef}>
      {/* expanding image container */}
      <div className="eh__container" ref={containerRef}>
        <img
          src="/images/services/Hall.jpg"
          alt="Event Hall"
          className="eh__img"
          ref={imgRef}
          draggable={false}
        />

        {/* dark overlay for readability */}
        <div className="eh__overlay" />

        {/* text content */}
        <div className="eh__content" ref={contentRef}>
          <p className="eh__mini">Celebrate with Elegance</p>
          <h2 className="eh__heading">
            Your Perfect<br />Celebration Space
          </h2>
          <p className="eh__para">
            Host your most special occasions in a setting designed to impress.
            From intimate gatherings to grand celebrations, our elegant event
            spaces, refined service, and ocean-inspired ambiance create memories
            that last a lifetime.
          </p>
          <a
            href="https://wa.me/96511111111?text=Hi, I'd like to plan an event"
            target="_blank"
            rel="noopener noreferrer"
            className="eh__btn"
          >
            Plan Your Event
          </a>
        </div>
      </div>
    </section>
  );
};

export default EventHall;