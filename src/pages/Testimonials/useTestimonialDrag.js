import { useRef, useEffect, useState } from "react";

const useTestimonialDrag = (itemCount) => {
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const animFrameRef = useRef(null);
  const velocityRef = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // ── infinite loop setup ───────────────────────────────────
    // clone all cards and append/prepend for seamless loop
    const cards = Array.from(track.children);
    const cardWidth = cards[0]?.offsetWidth || 0;
    const gap = 24; // must match CSS gap
    const totalWidth = (cardWidth + gap) * itemCount;

    // start scroll in the middle clone zone
    track.scrollLeft = totalWidth;

    const checkLoop = () => {
      if (!track) return;
      // if scrolled past real items into clones, jump back silently
      if (track.scrollLeft >= totalWidth * 2) {
        track.scrollLeft -= totalWidth;
      } else if (track.scrollLeft <= 0) {
        track.scrollLeft += totalWidth;
      }
    };

    track.addEventListener("scroll", checkLoop, { passive: true });

    // ── drag logic ────────────────────────────────────────────
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
      const walk = (x - startX.current) * 1.2;
      track.scrollLeft = scrollLeft.current - walk;

      const now = Date.now();
      const dt = now - lastTime.current;
      if (dt > 0) {
        velocityRef.current = (e.pageX - lastX.current) / dt;
        lastX.current = e.pageX;
        lastTime.current = now;
      }
    };

    const applyMomentum = () => {
      if (Math.abs(velocityRef.current) < 0.05) return;
      track.scrollLeft -= velocityRef.current * 12;
      velocityRef.current *= 0.92;
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
      const walk = (x - startX.current) * 1.2;
      track.scrollLeft = scrollLeft.current - walk;

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

    track.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchmove", onTouchMove, { passive: true });
    track.addEventListener("touchend", onTouchEnd);

    return () => {
      track.removeEventListener("scroll", checkLoop);
      track.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchmove", onTouchMove);
      track.removeEventListener("touchend", onTouchEnd);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [itemCount]);

  return { trackRef };
};

export default useTestimonialDrag;