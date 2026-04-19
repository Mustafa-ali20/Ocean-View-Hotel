import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import useHero from "./useHero";
import "./Hero.scss";

gsap.registerPlugin(ScrollTrigger);

// ─── Animation variants ───────────────────────────────────────────────────────
// heading reveal — slides up from below overflow container
const headingVariant = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: [0.76, 0, 0.24, 1],
      delay: 1.7 + i * 0.12,
    },
  }),
};

// subheadings — quick opacity reveal with small upward motion, staggered
const subVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
      delay: 2.2 + i * 0.08,
    },
  }),
};

// ─── Component ────────────────────────────────────────────────────────────────
const Hero = () => {
  const { hoveredIndex, imageVisible, handleMouseEnter, handleMouseLeave } =
    useHero();

  const { t } = useTranslation();

  const bgImgRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const bg = bgImgRef.current;
    const section = sectionRef.current;
    if (!bg || !section) return;

    // bg image starts slightly scaled up, eases to normal on scroll
    gsap.fromTo(
      bg,
      { scale: 1.08 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.8,
        },
      },
    );
  }, []);

  // ─── Data ─────────────────────────────────────────────────────────────────────
  const subheadings = [
    {
      id: "rooms",
      label: t("hero.sub1"),
      imageSrc: "/images/hero/Room.webp",
      imageAlt: "Hotel Rooms",
    },
    {
      id: "cafe",
      label: t("hero.sub2"),
      imageSrc: "/images/hero/cafe.webp",
      imageAlt: "The Café",
    },
    {
      id: "wellness",
      label: t("hero.sub3"),
      imageSrc: "/images/hero/wellness.webp",
      imageAlt: "Wellness & Spa",
    },
    {
      id: "with-us",
      label: t("hero.sub4"),
      imageSrc: "/images/hero/withus.webp",
      imageAlt: "With Us",
    },
    {
      id: "events",
      label: t("hero.sub5"),
      imageSrc: "/images/hero/events.jpeg",
      imageAlt: "Banquets & Events",
    },
  ];

  return (
    <section className="hero" ref={sectionRef}>
      {/* Background image */}
      <div className="hero__bg">
        <img
          src="/images/hero/OceanView3.jpg"
          alt="Ocean View Hotel"
          ref={bgImgRef}
        />
      </div>

      {/* Main content */}
      <div className="hero__content">
        <div className="hero__center">
          {/* Line 1: "Your Home," — each word in overflow container */}
          <h1 className="hero__heading">
            <div className="hero__overflow">
              <motion.span
                className="hero__heading-main"
                custom={0}
                initial="hidden"
                animate="visible"
                variants={headingVariant}
              >
                {t("hero.heading_main")}
              </motion.span>
            </div>
            <div className="hero__overflow">
              <motion.span
                className="hero__heading-script"
                custom={1}
                initial="hidden"
                animate="visible"
                variants={headingVariant}
              >
                {t("hero.heading_script")}
              </motion.span>
            </div>
          </h1>

          <div className="hero__sub-row">
            {/* "Ocean View." subtitle */}
            <div className="hero__overflow">
              <motion.p
                className="hero__subtitle"
                custom={2}
                initial="hidden"
                animate="visible"
                variants={headingVariant}
              >
                {t("hero.subtitle")}
              </motion.p>
            </div>

            {/* Right: hoverable subheadings */}
            <div className="hero__subheadings" onMouseLeave={handleMouseLeave}>
              {/* Portrait hover image */}
              <div
                className={`hero__hover-image ${imageVisible ? "hero__hover-image--visible" : ""}`}
                aria-hidden="true"
              >
                {hoveredIndex !== null && subheadings[hoveredIndex].imageSrc ? (
                  <img
                    src={subheadings[hoveredIndex].imageSrc}
                    alt={subheadings[hoveredIndex].imageAlt}
                  />
                ) : (
                  <div className="hero__hover-image-placeholder">
                    <span>
                      {hoveredIndex !== null
                        ? subheadings[hoveredIndex].imageAlt
                        : ""}
                    </span>
                  </div>
                )}
              </div>

              {subheadings.map((item, index) => (
                <motion.span
                  key={item.id}
                  className={`hero__subheading ${hoveredIndex === index ? "hero__subheading--hovered" : ""}`}
                  onMouseEnter={() => handleMouseEnter(index)}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={subVariant}
                >
                  {item.label}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
