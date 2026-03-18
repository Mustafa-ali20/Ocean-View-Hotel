import useCarousel from "./useCarousel";
import { carouselItems } from "./carouselData";
import "./AboutCarousel.scss";

const AboutCarousel = () => {
  const {
    activeIndex,
    trackRef,
    next,
    prev,
    getRelativePosition,
    handleTouchStart,
    handleTouchEnd,
  } = useCarousel();

  return (
    <section className="carousel">
      <div
        className="carousel__track"
        ref={trackRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {carouselItems.map((item, index) => {
          const rel = getRelativePosition(index);
          const isActive = rel === 0;
          const isVisible = Math.abs(rel) <= 2;

          if (!isVisible) return null;

          return (
            <div
              key={item.id}
              className={`carousel__card ${isActive ? "carousel__card--active" : ""}`}
              data-rel={rel}
              onClick={() => {
                if (rel === 1) next();
                if (rel === -1) prev();
              }}
            >
              {/* image container — overflow hidden for zoom effect */}
              <div className="carousel__img-wrap">
                <img
                  src={item.image}
                  alt={item.heading}
                  className="carousel__img"
                />
              </div>

              {/* content — only shown on active card */}
              <div className={`carousel__content ${isActive ? "carousel__content--visible" : ""}`}>
                <h3 className="carousel__heading">{item.heading}</h3>
                <p className="carousel__para">{item.paragraph}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* nav arrows */}
      <div className="carousel__nav">
        <button
          className="carousel__arrow carousel__arrow--prev"
          onClick={prev}
          aria-label="Previous"
        >
          ←
        </button>
        <button
          className="carousel__arrow carousel__arrow--next"
          onClick={next}
          aria-label="Next"
        >
          →
        </button>
      </div>
    </section>
  );
};

export default AboutCarousel;