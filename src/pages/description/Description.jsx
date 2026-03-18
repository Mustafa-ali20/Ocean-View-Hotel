import { useEffect, useRef } from "react";
import useDescription, { keywordImages } from "./useDescription";
import {
  splitIntoWords,
  initScrollReveal,
  initMobileImageReveal,
} from "./descriptionAnimation";
import "./Description.scss";
import { mobileImages } from "./useDescription";

const Paragraph = ({ hoveredKeyword, onMouseEnter, onMouseLeave }) => {
  const renderKeyword = (word) => {
    // when something is hovered: active = this word, dim = any other word
    const isActive = hoveredKeyword === word;
    const isDimmed = hoveredKeyword !== null && !isActive;

    return (
      <span
        key={word}
        className={[
          "desc-keyword",
          isActive ? "desc-keyword--active" : "",
          isDimmed ? "desc-keyword--dim" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onMouseEnter={(e) => onMouseEnter(word, e)}
        onMouseLeave={onMouseLeave}
      >
        {word}
      </span>
    );
  };

  return (
    <>
      <span className="desc-style">Find </span>
      {renderKeyword("your room")}
      <span className="desc-style"> in the </span>
      {renderKeyword("Ocean View")}
      <span className="desc-style">, enjoy what our </span>
      {renderKeyword("café")}
      <span className="desc-style"> creates in harmony with the seasons, and let </span>
      {renderKeyword("our story")}
      <span className="desc-style"> become part of yours.</span>
    </>
  );
};

const Description = () => {
  const textRef = useRef(null);
  const {
    hoveredKeyword,
    imagePos,
    handleMouseEnter,
    handleMouseLeave,
    getMobileImageStyle,
  } = useDescription();

  useEffect(() => {
    splitIntoWords(textRef);
    const cleanup = initScrollReveal(textRef);
    initMobileImageReveal();
    return cleanup;
  }, []);

  const activeImg = hoveredKeyword ? keywordImages[hoveredKeyword] : null;

  return (
    <section
      className="desc"
      data-hovering={hoveredKeyword ? "true" : "false"}
    >
      <div className="desc__inner">

        <p className="desc__label">Experience life at Ocean View</p>

        <h2 className="desc__text" ref={textRef}>
          <Paragraph
            hoveredKeyword={hoveredKeyword}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </h2>

        {activeImg && (
          <div
            className="desc-hover-img desc-hover-img--visible"
            style={{
              left: `${imagePos.x}px`,
              top: `${imagePos.y}px`,
              width: `${activeImg.width}px`,
              height: `${activeImg.height}px`,
            }}
          >
            <img src={activeImg.src} alt={activeImg.alt} />
          </div>
        )}

        <div className="desc-mobile-images" aria-hidden="true">
          {mobileImages.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt}
              className={img.className}
              style={getMobileImageStyle(img)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Description;