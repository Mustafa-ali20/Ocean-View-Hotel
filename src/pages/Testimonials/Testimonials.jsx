import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { testimonialsData } from "./testimonialsData";
import TestimonialCard from "./TestimonialCard";
import useTestimonialDrag from "./useTestimonialDrag";
import "./Testimonials.scss";

gsap.registerPlugin(ScrollTrigger);

const MAPS_LINK =
  "https://www.google.com/maps/place/Ocean+View+Hotel+Kuwait+-+%D9%81%D9%86%D8%AF%D9%82+%D8%A3%D9%88%D8%B4%D9%86+%D9%81%D9%8A%D9%88%E2%80%AD/@29.1390563,48.1270824,17z/data=!4m11!3m10!1s0x3fcf097833cc7d35:0x672580c9f88bd0b2!5m2!4m1!1i2!8m2!3d29.1390563!4d48.1296573!9m1!1b1!16s%2Fg%2F11wqk61vy7?entry=ttu&g_ep=EgoyMDI2MDMxOC4xIKXMDSoASAFQAw%3D%3D";

// heading reveal variants
const revealVariants = {
  hidden: { y: "40%", opacity: 0 },
  visible: (i) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1],
      delay: i * 0.12,
    },
  }),
};

// triple the items for seamless infinite loop
const loopedItems = [
  ...testimonialsData,
  ...testimonialsData,
  ...testimonialsData,
];

const Testimonials = () => {
  const paraRef = useRef(null);
  const { trackRef } = useTestimonialDrag(testimonialsData.length);

  // GSAP line-by-line paragraph reveal
  useEffect(() => {
    const para = paraRef.current;
    if (!para) return;

    const text = para.textContent;
    const words = text.split(" ");
    para.innerHTML = words
      .map((w) => `<span class="ts-word">${w} </span>`)
      .join("");

    const wordSpans = para.querySelectorAll(".ts-word");
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

    lines.forEach((lineWords) => {
      const wrapper = document.createElement("div");
      wrapper.className = "ts-line-wrap";
      const inner = document.createElement("div");
      inner.className = "ts-line-inner";
      lineWords.forEach((w) => inner.appendChild(w));
      wrapper.appendChild(inner);
      para.appendChild(wrapper);
    });

    const lineInners = para.querySelectorAll(".ts-line-inner");
    gsap.fromTo(
      lineInners,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.7,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: {
          trigger: para,
          start: "top 85%",
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="ts">
      {/* ── Top header area ─────────────────────────────── */}
      <div className="ts__header">
        {/* left — headings */}
        <div className="ts__header-left">
          <div className="ts__mini-wrap">
            <motion.p
              className="ts__mini"
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={revealVariants}
            >
              Guest Voices
            </motion.p>
          </div>
          <div className="ts__heading-wrap">
            <motion.h2
              className="ts__heading"
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={revealVariants}
            >
              What Our<br />Guests Say
            </motion.h2>
          </div>
        </div>

        {/* right — para + button */}
        <div className="ts__header-right">
          <p className="ts__para" ref={paraRef}>
            Real experiences and honest words. Discover how our guests have
            experienced their stay at the Ocean View Hotel. Authentic
            impressions that say more than any description.
          </p>
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="ts__btn"
          >
            Share Your Experience
          </a>
        </div>
      </div>

      {/* ── Cards track ─────────────────────────────────── */}
      <div className="ts__track-wrap">
        <div className="ts__track" ref={trackRef}>
          {loopedItems.map((item, i) => (
            <TestimonialCard key={`${item.id}-${i}`} data={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;