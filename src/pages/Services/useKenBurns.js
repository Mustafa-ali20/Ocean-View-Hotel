import { useState, useEffect, useRef } from "react";

const SLIDE_DURATION = 5000;
const FADE_DURATION = 2800;

const useKenBurns = (images = []) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideKey, setSlideKey] = useState(0); // 👈 add this
  const timerRef = useRef(null);

  useEffect(() => {
    if (!images.length || images.length < 2) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setSlideKey((prev) => prev + 1); // 👈 increment on every slide change
    }, SLIDE_DURATION);

    return () => clearInterval(timerRef.current);
  }, [images.length]);

  return { currentIndex, slideKey, FADE_DURATION }; // 👈 removed nextIndex/isFading
};

export default useKenBurns;