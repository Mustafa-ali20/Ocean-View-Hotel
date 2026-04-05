import { useTranslation } from "react-i18next";
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
  const renderKeyword = (word, index) => {
    const isActive = hoveredKeyword === index;
    const isDimmed = hoveredKeyword !== null && !isActive;

    return (
      <span
        className={[
          "desc-keyword",
          isActive ? "desc-keyword--active" : "",
          isDimmed ? "desc-keyword--dim" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{
          color: isActive
            ? "#e8ddd0"
            : isDimmed
              ? "rgba(232, 221, 208, 0.12)"
              : undefined,
        }}
        onMouseEnter={(e) => onMouseEnter(index, e)}
        onMouseLeave={onMouseLeave}
      >
        {word}
      </span>
    );
  };

  const { t } = useTranslation();

  return (
    <>
      <span className="desc-style">{t("description.text_1")}</span>
      {renderKeyword(t("description.keyword_1"), 1)}
      <span className="desc-style">{t("description.text_2")}</span>
      {renderKeyword(t("description.keyword_2"), 2)}
      <span className="desc-style">{t("description.text_3")}</span>
      {renderKeyword(t("description.keyword_3"), 3)}
      <span className="desc-style">{t("description.text_4")}</span>
      {renderKeyword(t("description.keyword_4"), 4)}
      <span className="desc-style">{t("description.text_5")}</span>
    </>
  );
};

const Description = () => {
  const textRef = useRef(null);

  const { t } = useTranslation();

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
      id="about"
      className="desc"
      data-hovering={hoveredKeyword ? "true" : "false"}
    >
      <div className="desc__inner">
        <p className="desc__label">{t("description.label")}</p>
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
