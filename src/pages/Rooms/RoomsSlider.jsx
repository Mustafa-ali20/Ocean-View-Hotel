import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import useRoomsSlider from "./useRoomsSlider";
import { roomsData } from "./roomsData";
import "./RoomsSlider.scss";

gsap.registerPlugin(ScrollTrigger);

const nameVariant = {
  initial: { y: "100%" },
  animate: {
    y: "0%",
    transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    y: "-100%",
    transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] },
  },
};

const detailVariant = {
  initial: { y: "100%" },
  animate: (i) => ({
    y: "0%",
    transition: {
      duration: 0.45,
      ease: [0.4, 0, 0.2, 1],
      delay: i * 0.07,
    },
  }),
  exit: { y: "-100%", transition: { duration: 0.25 } },
};

const animateParagraph = (paraEl) => {
  if (!paraEl) return;

  const text = paraEl.dataset.original || paraEl.textContent.trim();
  paraEl.dataset.original = text;

  const words = text.split(" ");
  paraEl.innerHTML = words
    .map((w) => `<span class="rooms-word">${w} </span>`)
    .join("");

  const wordSpans = paraEl.querySelectorAll(".rooms-word");
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
    const wrap = document.createElement("div");
    wrap.className = "rooms-line-wrap";
    const inner = document.createElement("div");
    inner.className = "rooms-line-inner";
    lineWords.forEach((w) => inner.appendChild(w));
    wrap.appendChild(inner);
    paraEl.appendChild(wrap);
  });

  gsap.fromTo(
    paraEl.querySelectorAll(".rooms-line-inner"),
    { y: "100%", opacity: 0 },
    { y: "0%", opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" },
  );
};

const RoomsSlider = () => {
  // ── destructure everything from hook ──────────────────────────
  const {
    trackRef,
    activeIndex,
    slideNext,
    slidePrev,
    getRelativePosition,
    handleTouchStart,
    handleTouchEnd,
  } = useRoomsSlider();

  const paraRef = useRef(null);
  const { t, i18n } = useTranslation();

  const translatedRooms = roomsData.map((room, i) => ({
    ...room,
    name: t(`rooms.room${i + 1}_name`),
    description: t(`rooms.room${i + 1}_desc`),
    guests: t(`rooms.room${i + 1}_guests`),
    bed1: t(`rooms.room${i + 1}_bed1`),
    bed2: room.bed2 ? t(`rooms.room${i + 1}_bed2`) : null,
  }));

  const activeRoom = translatedRooms[activeIndex];

  // animate paragraph when room changes or language changes
  useEffect(() => {
    if (paraRef.current) {
      delete paraRef.current.dataset.original;
    }
    animateParagraph(paraRef.current);
  }, [activeIndex, i18n.language]);

  const details = [activeRoom.guests, activeRoom.bed1, activeRoom.bed2].filter(Boolean);

  return (
    <div className="rooms-slider" id="rooms">

      {/* ── Overlay content ───────────────────────────────── */}
      <div className="rooms-overlay">
        <div className="rooms-overlay__left">
          <div className="rooms-overlay__name-wrap">
            <AnimatePresence mode="wait">
              <motion.h3
                key={activeRoom.name}
                className="rooms-overlay__name"
                variants={nameVariant}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {activeRoom.name}
              </motion.h3>
            </AnimatePresence>
          </div>

          <p className="rooms-overlay__para" ref={paraRef}>
            {activeRoom.description}
          </p>
        </div>

        <div className="rooms-overlay__center">
          <AnimatePresence mode="wait">
            <div key={activeRoom.name} className="rooms-overlay__details">
              {details.map((detail, i) => (
                <div key={detail} className="rooms-overlay__detail-wrap">
                  <motion.span
                    className="rooms-overlay__detail"
                    custom={i}
                    variants={detailVariant}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {detail}
                  </motion.span>
                </div>
              ))}
            </div>
          </AnimatePresence>
        </div>

        <div className="rooms-overlay__right">
          <a
            href={`https://wa.me/96563331736?text=Hi, ${t("rooms.book")} ${activeRoom.name} room.`}
            target="_blank"
            rel="noopener noreferrer"
            className="rooms-overlay__btn"
          >
            {t("rooms.book")}
          </a>
        </div>
      </div>

      {/* ── Slider + Arrows wrapper ───────────────────────── */}
      <div className="rooms-slider__wrapper">

        {/* Left arrow */}
        <button
          className="rooms-arrow rooms-arrow--left"
          onClick={slidePrev}
          aria-label="Previous room"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Image track */}
        <div
          className="rooms-track"
          ref={trackRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {translatedRooms.map((room, i) => {
            const rel = getRelativePosition(i);
            const isVisible = Math.abs(rel) <= 2;
            if (!isVisible) return null;

            return (
              <div
                key={room.id}
                className="rooms-slide"
                data-rel={rel}
                onClick={() => {
                  if (rel === 1) slideNext();
                  if (rel === -1) slidePrev();
                }}
              >
                <img
                  src={room.image}
                  alt={room.name}
                  className="rooms-slide__img"
                  draggable={false}
                />
              </div>
            );
          })}
        </div>

        {/* Right arrow */}
        <button
          className="rooms-arrow rooms-arrow--right"
          onClick={slideNext}
          aria-label="Next room"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

      </div>
    </div>
  );
};

export default RoomsSlider;