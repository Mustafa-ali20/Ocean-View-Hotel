import { useState, useRef, useCallback, useEffect } from "react";
import { carouselItems } from "./carouselData";

const TOTAL = carouselItems.length;

// returns wrapped index — keeps it within 0..TOTAL-1
const wrap = (index) => ((index % TOTAL) + TOTAL) % TOTAL;

const useCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const trackRef = useRef(null);
  const scrollAccumulator = useRef(0);
  const lastScrollTime = useRef(0);
  const touchStartX = useRef(0);

  const goTo = useCallback(
    (rawIndex) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setActiveIndex(wrap(rawIndex));
      setTimeout(() => setIsAnimating(false), 700);
    },
    [isAnimating]
  );

  const next = useCallback(() => {
    setActiveIndex((prev) => {
      const next = wrap(prev + 1);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 700);
      return next;
    });
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((prev) => {
      const next = wrap(prev - 1);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 700);
      return next;
    });
  }, []);

  // wheel scroll handler — accumulates delta to avoid overshooting
  const handleWheel = useCallback(
    (e) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastScrollTime.current < 80) return;

      scrollAccumulator.current += e.deltaX || e.deltaY;

      if (Math.abs(scrollAccumulator.current) > 60) {
        if (scrollAccumulator.current > 0) {
          next();
        } else {
          prev();
        }
        scrollAccumulator.current = 0;
        lastScrollTime.current = now;
      }
    },
    [next, prev]
  );

  // touch handlers for mobile swipe
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        diff > 0 ? next() : prev();
      }
    },
    [next, prev]
  );

  // attach wheel listener with passive:false so we can preventDefault
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  // get visual position relative to active: -2, -1, 0, 1, 2
  const getRelativePosition = useCallback(
    (index) => {
      let rel = index - activeIndex;
      // wrap for infinite feel
      if (rel > TOTAL / 2) rel -= TOTAL;
      if (rel < -TOTAL / 2) rel += TOTAL;
      return rel;
    },
    [activeIndex]
  );

  return {
    activeIndex,
    trackRef,
    goTo,
    next,
    prev,
    getRelativePosition,
    handleTouchStart,
    handleTouchEnd,
  };
};

export default useCarousel;