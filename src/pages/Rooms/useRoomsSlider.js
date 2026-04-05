import { useState, useRef, useCallback, useEffect } from "react";
import gsap from "gsap";
import { roomsData } from "./roomsData";

const TOTAL = roomsData.length;
const wrap = (index) => ((index % TOTAL) + TOTAL) % TOTAL;

const useRoomsSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const trackRef = useRef(null);
  const touchStartX = useRef(0);
  const dragStartX = useRef(0);
  const isDragging = useRef(false);

  const goTo = useCallback((rawIndex) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(wrap(rawIndex));
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating]);

  const slideNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const slidePrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  // get position of each card relative to active: -2, -1, 0, 1, 2
  const getRelativePosition = useCallback((index) => {
    let rel = index - activeIndex;
    if (rel > TOTAL / 2) rel -= TOTAL;
    if (rel < -TOTAL / 2) rel += TOTAL;
    return rel;
  }, [activeIndex]);

  // GSAP scale based on relative position
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.querySelectorAll(".rooms-slide"));
    cards.forEach((card, i) => {
      const img = card.querySelector(".rooms-slide__img");
      if (!img) return;
      const rel = Math.abs(getRelativePosition(i));
      const scale = rel === 0 ? 1 : 1 + 0.08 * Math.min(rel, 1);
      gsap.to(img, { scale, duration: 0.5, ease: "power2.out", overwrite: true });
    });
  }, [activeIndex, getRelativePosition]);

  // mouse drag
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onMouseDown = (e) => {
      isDragging.current = true;
      dragStartX.current = e.pageX;
      track.style.cursor = "grabbing";
    };

    const onMouseUp = (e) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      track.style.cursor = "grab";
      const diff = dragStartX.current - e.pageX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? slideNext() : slidePrev();
      }
    };

    const onMouseLeave = () => {
      if (isDragging.current) {
        isDragging.current = false;
        track.style.cursor = "grab";
      }
    };

    track.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    track.addEventListener("mouseleave", onMouseLeave);

    return () => {
      track.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      track.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [slideNext, slidePrev]);

  // touch swipe
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? slideNext() : slidePrev();
    }
  }, [slideNext, slidePrev]);

  return {
    activeIndex,
    trackRef,
    slideNext,
    slidePrev,
    getRelativePosition,
    handleTouchStart,
    handleTouchEnd,
  };
};

export default useRoomsSlider;