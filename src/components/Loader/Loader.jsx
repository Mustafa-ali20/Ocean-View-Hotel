import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Loader.scss";

const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // wait for page to fully load then hide
    const hide = () => {
      setTimeout(() => setIsVisible(false), 1000); 
    };

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide);
      return () => window.removeEventListener("load", hide);
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="loader"
          initial={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 1.1,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.3,
          }}
        >
          <motion.div
            className="loader__content"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src="/images/LOGO-white.svg"
              alt="Ocean View"
              className="loader__logo"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;