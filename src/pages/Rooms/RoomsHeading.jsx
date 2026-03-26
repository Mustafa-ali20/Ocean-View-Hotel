import { motion } from "framer-motion";
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
              At
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
              &nbsp;home,
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
              in
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
              &nbsp;our rooms
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
          Your stay at Ocean View
        </motion.p>

        <motion.p
          className="rooms-heading__para"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          Cozy, bright, and full of thoughtful details: our rooms combine charm
          with modern comfort. Whether with a view or a peaceful corner,
          you'll find comfort, security, and the feeling of being at home.
        </motion.p>
      </div>
    </div>
  );
};

export default RoomsHeading;