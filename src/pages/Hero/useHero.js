import { useState, useCallback } from "react";

const useHero = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [imageVisible, setImageVisible] = useState(false);

  const handleMouseEnter = useCallback((index) => {
    setHoveredIndex(index);
    setImageVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setImageVisible(false);
    setTimeout(() => setHoveredIndex(null), 400); // wait for fade-out
  }, []);

  return {
    hoveredIndex,
    imageVisible,
    handleMouseEnter,
    handleMouseLeave,
  };
};

export default useHero;