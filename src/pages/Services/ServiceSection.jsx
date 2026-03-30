import { motion } from "framer-motion";
import useParallax from "./useParallax.js";
import useServiceAnimation from "./useServiceAnimation";
import useKenBurns from "./useKenBurns";
import "./ServiceSection.scss";

// heading reveal animation variants — unchanged
const headingVariants = {
  hidden: { y: "40%", opacity: 0 },
  visible: (i) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: [0.4, 0, 0.2, 1],
      delay: i * 0.1,
    },
  }),
};

const ServiceSection = ({ data }) => {
  const { sectionRef, mainImgRef, innerImgRef } = useParallax();
  const { paraRef } = useServiceAnimation();
  const { currentIndex, nextIndex, isFading, FADE_DURATION } = useKenBurns(
    data.galleryImages || [data.mainImage],
  );

  const isReversed = data.layout === "text-right";
  const images = data.galleryImages || [data.mainImage];

  const ContentBlock = (
    <div className="svc__content">
      <div className="svc__headings">
        <div className="svc__mini-wrap">
          <motion.p
            className="svc__mini"
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={headingVariants}
          >
            {data.miniHeading}
          </motion.p>
        </div>

        <div className="svc__heading-wrap">
          <motion.h2
            className="svc__heading"
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={headingVariants}
          >
            {data.mainHeading}
          </motion.h2>
        </div>
      </div>

      <p className="svc__para" ref={paraRef}>
        {data.paragraph}
      </p>

      {data.hasButton && (
        <motion.a
          href={`https://wa.me/${data.whatsappNumber}?text=Hi`}
          target="_blank"
          rel="noopener noreferrer"
          className="svc__btn"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
        >
          {data.buttonText}
        </motion.a>
      )}
    </div>
  );

  const ImageBlock = (
    <div className="svc__images">
      {/* Ken Burns main image slideshow */}
      <div className="svc__main-img-wrap">
        {/* current image — underneath, stays visible */}
        <img
          src={images[currentIndex]}
          alt={data.mainHeading}
          className="svc__main-img svc__main-img--current"
          ref={mainImgRef}
          draggable={false}
        />

        {/* next image — smooth luxury fade in */}
        <motion.img
          key={images[nextIndex]}
          src={images[nextIndex]}
          alt={data.mainHeading}
          className="svc__main-img svc__main-img--next"
          draggable={false}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{
            opacity: isFading ? 1 : 0,
            scale: isFading ? 1 : 1.15,
          }}
          transition={{
            duration: FADE_DURATION / 1000,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      </div>

      {/* inner smaller image — unchanged */}
      <div className="svc__inner-img-wrap">
        <img
          src={data.innerImage}
          alt={`${data.mainHeading} detail`}
          className="svc__inner-img"
          ref={innerImgRef}
          draggable={false}
        />
      </div>
    </div>
  );

  return (
    <section
      className={`svc ${isReversed ? "svc--reversed" : ""}`}
      ref={sectionRef}
      id={data.id}
    >
      <div className="svc__inner">
        {isReversed ? (
          <>
            {ImageBlock}
            {ContentBlock}
          </>
        ) : (
          <>
            {ContentBlock}
            {ImageBlock}
          </>
        )}
      </div>
    </section>
  );
};

export default ServiceSection;
