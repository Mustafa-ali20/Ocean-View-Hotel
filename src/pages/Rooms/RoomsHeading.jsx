import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./RoomsHeading.scss";

const revealVariant = {
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

const RoomsHeading = () => {
  const { t } = useTranslation();

  return (
    <div className="rooms-heading">
      {/* Left — big heading */}
      <div className="rooms-heading__left">
        <div className="rooms-heading__line">
          <div className="rooms-heading__overflow">
            <motion.span
              className="rooms-heading__main"
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={revealVariant}
            >
              {t("rooms.heading_1")}
            </motion.span>
          </div>
          <div className="rooms-heading__overflow">
            <motion.span
              className="rooms-heading__style"
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={revealVariant}
            >
              &nbsp;{t("rooms.heading_2")}
            </motion.span>
          </div>
        </div>

        <div className="rooms-heading__line">
          <div className="rooms-heading__overflow">
            <motion.span
              className="rooms-heading__main"
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={revealVariant}
            >
              {t("rooms.heading_3")}
            </motion.span>
          </div>
          <div className="rooms-heading__overflow">
            <motion.span
              className="rooms-heading__style"
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={revealVariant}
            >
              &nbsp;{t("rooms.heading_4")}
            </motion.span>
          </div>
        </div>
      </div>

      {/* Right — mini heading + paragraph */}
      <div className="rooms-heading__right">
        <motion.p
          className="rooms-heading__mini"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {t("rooms.mini")}
        </motion.p>

        <motion.p
          className="rooms-heading__para"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          {t("rooms.para")}
        </motion.p>
      </div>
    </div>
  );
};

export default RoomsHeading;