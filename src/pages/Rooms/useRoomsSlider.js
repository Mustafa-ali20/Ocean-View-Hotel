import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { roomsData } from "./roomsData";

const TOTAL = roomsData.length;

const useRoomsSlider = () => {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const velocityRef = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const animFrameRef = useRef(null);
  const isScrolling = useRef(false);

  const updateActiveIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.querySelectorAll(".rooms-slide"));
    if (!cards.length) return;

    const trackCenter = track.scrollLeft + track.offsetWidth / 2;
    let closest = 0;
    let minDist = Infinity;

    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(trackCenter - cardCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });

    setActiveIndex(closest % TOTAL);
  }, []);

  // ── GSAP scale animation ──────────────────────────────────────
  const animateSlides = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.querySelectorAll(".rooms-slide"));
    const trackCenter = track.scrollLeft + track.offsetWidth / 2;

    cards.forEach((card) => {
      const img = card.querySelector(".rooms-slide__img");
      if (!img) return;

      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(trackCenter - cardCenter);
      const maxDist = track.offsetWidth * 0.8;
      const progress = Math.min(dist / maxDist, 1);

      // 1.08 when far away, 1.0 when centered
      const scale = 1 + 0.08 * progress;

      gsap.to(img, {
        scale,
        duration: 0.4,
        ease: "power2.out",
        overwrite: true,
      });
    });
  }, []);

  // snap to a specific card index in the looped array
  const snapToCard = useCallback((index) => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.querySelectorAll(".rooms-slide"));
    if (!cards || !cards[index]) return;

    const card = cards[index];
    const targetScroll =
      card.offsetLeft - track.offsetWidth / 2 + card.offsetWidth / 2;

    track.scrollTo({ left: targetScroll, behavior: "smooth" });

    setTimeout(() => updateActiveIndex(), 400);
  }, [updateActiveIndex]);

  // find which card is currently centered in the looped array
  const getCurrentLoopedIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return TOTAL;

    const cards = Array.from(track.querySelectorAll(".rooms-slide"));
    const trackCenter = track.scrollLeft + track.offsetWidth / 2;
    let closest = 0;
    let minDist = Infinity;

    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(trackCenter - cardCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });

    return closest;
  }, []);

  const slideNext = useCallback(() => {
    const current = getCurrentLoopedIndex();
    snapToCard(current + 1);
  }, [getCurrentLoopedIndex, snapToCard]);

  const slidePrev = useCallback(() => {
    const current = getCurrentLoopedIndex();
    snapToCard(current - 1);
  }, [getCurrentLoopedIndex, snapToCard]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.querySelectorAll(".rooms-slide"));
    if (!cards.length) return;
    const cardWidth = cards[0].offsetWidth + 24;
    track.scrollLeft = cardWidth * TOTAL;

    // run once on mount so initial state is correct
    animateSlides();

    const checkLoop = () => {
      const totalWidth = cardWidth * TOTAL;
      if (track.scrollLeft >= totalWidth * 2) {
        track.scrollLeft -= totalWidth;
      } else if (track.scrollLeft <= 0) {
        track.scrollLeft += totalWidth;
      }
    };

    const onScroll = () => {
      checkLoop();
      animateSlides(); // ← fires every scroll tick
      if (!isScrolling.current) {
        isScrolling.current = true;
        requestAnimationFrame(() => {
          updateActiveIndex();
          isScrolling.current = false;
        });
      }
    };

    const onMouseDown = (e) => {
      isDragging.current = true;
      startX.current = e.pageX - track.offsetLeft;
      scrollLeft.current = track.scrollLeft;
      lastX.current = e.pageX;
      lastTime.current = Date.now();
      velocityRef.current = 0;
      track.style.cursor = "grabbing";
      track.style.userSelect = "none";
      cancelAnimationFrame(animFrameRef.current);
    };

    const onMouseMove = (e) => {
      if (!isDragging.current) return;
      const x = e.pageX - track.offsetLeft;
      track.scrollLeft = scrollLeft.current - (x - startX.current) * 1.1;
      const now = Date.now();
      const dt = now - lastTime.current;
      if (dt > 0) {
        velocityRef.current = (e.pageX - lastX.current) / dt;
        lastX.current = e.pageX;
        lastTime.current = now;
      }
    };

    const applyMomentum = () => {
      if (Math.abs(velocityRef.current) < 0.05) {
        updateActiveIndex();
        return;
      }
      track.scrollLeft -= velocityRef.current * 10;
      velocityRef.current *= 0.93;
      animFrameRef.current = requestAnimationFrame(applyMomentum);
    };

    const onMouseUp = () => {
      isDragging.current = false;
      track.style.cursor = "grab";
      track.style.userSelect = "";
      animFrameRef.current = requestAnimationFrame(applyMomentum);
    };

    const onTouchStart = (e) => {
      startX.current = e.touches[0].pageX - track.offsetLeft;
      scrollLeft.current = track.scrollLeft;
      lastX.current = e.touches[0].pageX;
      lastTime.current = Date.now();
      velocityRef.current = 0;
      cancelAnimationFrame(animFrameRef.current);
    };

    const onTouchMove = (e) => {
      const x = e.touches[0].pageX - track.offsetLeft;
      track.scrollLeft = scrollLeft.current - (x - startX.current) * 1.1;
      const now = Date.now();
      const dt = now - lastTime.current;
      if (dt > 0) {
        velocityRef.current = (e.touches[0].pageX - lastX.current) / dt;
        lastX.current = e.touches[0].pageX;
        lastTime.current = now;
      }
    };

    const onTouchEnd = () => {
      animFrameRef.current = requestAnimationFrame(applyMomentum);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchmove", onTouchMove, { passive: true });
    track.addEventListener("touchend", onTouchEnd);

    return () => {
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchmove", onTouchMove);
      track.removeEventListener("touchend", onTouchEnd);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [updateActiveIndex, animateSlides]);

  return { trackRef, activeIndex, slideNext, slidePrev };
};

export default useRoomsSlider;