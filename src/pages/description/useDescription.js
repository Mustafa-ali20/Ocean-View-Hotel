import { useState, useCallback, useRef } from "react";

// placeholder images — replace src with real ones later
export const keywordImages = {
  "your room": {
    src: "/images/description/Room.jpeg",
    alt: "Hotel room",
    width: 400,
    height: 500,
    offsetX: -90,
    offsetY: 360,
  },
  "Ocean View": {
    src: "/images/description/view.jpg",
    alt: "Ocean view",
    width: 420,
    height: 300,
    offsetX: 100,
    offsetY: 160,
  },
  café: {
    src: "/images/description/cafe.jpeg",
    alt: "Café",
    width: 380,
    height: 240,
    offsetX: -20,
    offsetY: 160,
  },
  "our story": {
    src: "/images/description/Hotel.jpeg",
    alt: "Our story",
    width: 280,
    height: 380,
    offsetX: 0,
    offsetY: 250,
  },
};

// ── Mobile corner image config ─────────────────────────────────
// customize position and size per image independently
export const mobileImages = [
  {
    src: "/images/description/Room.jpeg",
    alt: "Hotel room",
    className: "desc-mobile-img",
    // tablet (<=768px)
    tablet: { top: "4%", left: "-3%", width: "20vw", height: "30vw" },
    // mobile (<=480px)
    mobile: { top: "2%", left: "-4%", width: "28vw", height: "39vw" },
  },
  {
    src: "/images/description/view.jpg",
    alt: "Ocean view",
    className: "desc-mobile-img",
    tablet: { top: "30%", right: "0%", width: "28vw", height: "20vw" },
    mobile: { top: "0%", right: "0%", width: "30vw", height: "20vw" },
  },
  {
    src: "/images/description/cafe.jpeg",
    alt: "Café",
    className: "desc-mobile-img",
    tablet: { bottom: "4%", left: "0%", width: "28vw", height: "19vw" },
    mobile: { bottom: "2%", left: "-1%", width: "29vw", height: "20vw" },
  },
  {
    src: "/images/description/Hotel.jpeg",
    alt: "Our story",
    className: "desc-mobile-img",
    tablet: { bottom: "-8%", right: "5%", width: "20vw", height: "30vw" },
    mobile: { bottom: "1%", right: "-4%", width: "34vw", height: "45vw" },
  },
];

const useDescription = () => {
  const [hoveredKeyword, setHoveredKeyword] = useState(null);
  const [imagePos, setImagePos] = useState({ x: 0, y: 0 });
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  const handleMouseEnter = useCallback(
    (keyword, e) => {
      if (isMobile) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const img = keywordImages[keyword];
      setImagePos({
        x: rect.left + rect.width / 2 + img.offsetX,
        y: rect.top + img.offsetY,
      });
      setHoveredKeyword(keyword);
    },
    [isMobile],
  );

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;
    setHoveredKeyword(null);
  }, [isMobile]);

  // get inline styles for mobile images based on screen size
  const getMobileImageStyle = (imgConfig) => {
    const isTinyMobile =
      typeof window !== "undefined" && window.innerWidth <= 480;
    const config = isTinyMobile ? imgConfig.mobile : imgConfig.tablet;
    return {
      position: "absolute",
      objectFit: "cover",
      opacity: 0, // gsap animates this
      rotate: config.rotate,
      ...(config.top && { top: config.top }),
      ...(config.bottom && { bottom: config.bottom }),
      ...(config.left && { left: config.left }),
      ...(config.right && { right: config.right }),
      width: config.width,
      height: config.height,
    };
  };

  return {
    hoveredKeyword,
    imagePos,
    handleMouseEnter,
    handleMouseLeave,
    getMobileImageStyle,
  };
};

export default useDescription;
