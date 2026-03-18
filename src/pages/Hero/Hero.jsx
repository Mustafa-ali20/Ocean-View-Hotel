import useHero from "./useHero";
import "./Hero.scss";

// ─── Data ─────────────────────────────────────────────────────────────────────
const subheadings = [
  {
    id: "rooms",
    label: "In Our Rooms.",
    imageSrc: "/images/hero/Room.webp",
    imageAlt: "Hotel Rooms",
  },
  {
    id: "cafe",
    label: "At The Café.",
    imageSrc: "/images/hero/cafe.webp",
    imageAlt: "The Café",
  },
  {
    id: "wellness",
    label: "In Wellness.",
    imageSrc: "/images/hero/wellness.webp",
    imageAlt: "Wellness & Spa",
  },
  {
    id: "with-us",
    label: "With Us.",
    imageSrc: "/images/hero/withus.webp",
    imageAlt: "With Us",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
const Hero = () => {
  const { hoveredIndex, imageVisible, handleMouseEnter, handleMouseLeave } =
    useHero();

  return (
    <section className="hero">
      {/* Background */}
      <div className="hero__bg">
        <img src="/images/hero/OceanView2.jpg" alt="Ocean View Hotel" />
      </div>

      {/* Main content */}
      <div className="hero__content">
        <div className="hero__center">
          {/* Line 1: "Your Home," */}
          <h1 className="hero__heading">
            <span className="hero__heading-main">Your</span>
            <span className="hero__heading-script">Home,</span>
          </h1>

          <div className="hero__sub-row">
            <p className="hero__subtitle">Ocean View.</p>

            {/* Right: hoverable subheadings */}
            <div className="hero__subheadings" onMouseLeave={handleMouseLeave}>
              {/* Portrait hover image — positioned relative to subheadings block */}
              <div
                className={`hero__hover-image ${imageVisible ? "hero__hover-image--visible" : ""}`}
                aria-hidden="true"
              >
                {hoveredIndex !== null && subheadings[hoveredIndex].imageSrc ? (
                  <img
                    src={subheadings[hoveredIndex].imageSrc}
                    alt={subheadings[hoveredIndex].imageAlt}
                  />
                ) : (
                  <div className="hero__hover-image-placeholder">
                    <span>
                      {hoveredIndex !== null
                        ? subheadings[hoveredIndex].imageAlt
                        : ""}
                    </span>
                  </div>
                )}
              </div>

              {subheadings.map((item, index) => (
                <span
                  key={item.id}
                  className={`hero__subheading ${hoveredIndex === index ? "hero__subheading--hovered" : ""}`}
                  onMouseEnter={() => handleMouseEnter(index)}
                >
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
