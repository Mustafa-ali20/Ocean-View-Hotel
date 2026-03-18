import { motion } from "framer-motion";
import useParallax from "./useParallax.js";
import useServiceAnimation from "./useServiceAnimation";
import "./ServiceSection.scss";

// heading reveal animation variants
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
  const isReversed = data.layout === "text-right";

  const ContentBlock = (
    <div className="svc__content">
      <div className="svc__headings">
        {/* mini heading */}
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

        {/* main heading */}
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

      {/* paragraph — gsap line reveal */}
      <p className="svc__para" ref={paraRef}>
        {data.paragraph}
      </p>

      {/* button — only for non-cafe sections */}
      {data.hasButton && (
        <motion.a
          href={`https://wa.me/96511111111?text=Hi, I'd like to book ${data.mainHeading}`}
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
      {/* main large image */}
      <div className="svc__main-img-wrap">
        <img
          src={data.mainImage}
          alt={data.mainHeading}
          className="svc__main-img"
          ref={mainImgRef}
          draggable={false}
        />
      </div>

      {/* inner smaller image */}
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