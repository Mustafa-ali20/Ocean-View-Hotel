import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import "./Footer.scss";

const revealVariants = {
  hidden: { y: "40%", opacity: 0 },
  visible: (i) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1],
      delay: i * 0.1,
    },
  }),
};

const Footer = () => {
  const { t } = useTranslation();

  const navLinks = [
    { label: t("footer.link_home"), href: "#" },
    { label: t("footer.link_about"), href: "#about" },
    { label: t("footer.link_wellness"), href: "#wellness" },
    { label: t("footer.link_cafes"), href: "#cafe" },
    { label: t("footer.link_contact"), href: "#contact" },
  ];

  const contactLinks = [
    { label: t("footer.get_in_touch"), href: "tel:+96563331736" },
    {
      label: t("footer.book_room"),
      href: "https://wa.me/96563331736?text=Hi, I'd like to book a room",
    },
  ];

  const subheadings = [
    {
      label: t("footer.sub1"),
      href: "https://wa.me/96563331736?text=Hi, I'd like to book a room",
    },
    {
      label: t("footer.sub2"),
      href: "https://maps.app.goo.gl/2frMoADAuRNFhHQ59",
    },
    { label: t("footer.sub3"), href: "tel:+96563331736" },
  ];

  return (
    <footer id="contact" className="footer">
      {/* ── Top center heading area ───────────────────────── */}
      <div className="footer__top">
        <div className="footer__heading-wrap">
          <div className="footer__main-heading-row">
            <div className="footer__overflow">
              <motion.span
                className="footer__come-stay"
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={revealVariants}
              >
                {t("footer.come_stay")}
              </motion.span>
            </div>
            <div className="footer__overflow">
              <motion.span
                className="footer__with-us"
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={revealVariants}
              >
                &nbsp;{t("footer.with_us")}
              </motion.span>
            </div>
          </div>

          <div className="footer__sub-row">
            <div className="footer__overflow">
              <motion.p
                className="footer__hotel-name"
                custom={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={revealVariants}
              >
                {t("footer.hotel_name")}
              </motion.p>
            </div>

            <ul
              className="footer__subheadings"
              onMouseEnter={(e) =>
                e.currentTarget.classList.add("footer__subheadings--hovering")
              }
              onMouseLeave={(e) =>
                e.currentTarget.classList.remove(
                  "footer__subheadings--hovering",
                )
              }
            >
              {subheadings.map((item, i) => (
                <li key={item.label}>
                  <motion.a
                    href={item.href}
                    className="footer__sublink"
                    custom={3 + i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={revealVariants}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom section ────────────────────────────────── */}
      <div className="footer__bottom">
        {/* Left — Big map */}
        <div className="footer__map">
          <a
            href="https://maps.app.goo.gl/2frMoADAuRNFhHQ59"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__map-link"
            aria-label="View on Google Maps"
          >
            <iframe
              title="Ocean View Hotel Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3479.4!2d48.0!3d29.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDE4JzAwLjAiTiA0OMKwMDAnMDAuMCJF!5e0!3m2!1sen!2skw!4v1"
              className="footer__map-iframe"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              tabIndex={-1}
            />
            <div className="footer__map-overlay">
              <span className="footer__map-cta">View on Google Maps ↗</span>
            </div>
          </a>
        </div>

        {/* Center — Link columns */}
        <div className="footer__links">
          <div className="footer__col">
            <p className="footer__col-heading">{t("footer.col1_heading")}</p>
            <ul
              className="footer__link-list"
              onMouseEnter={(e) =>
                e.currentTarget.classList.add("footer__link-list--hovering")
              }
              onMouseLeave={(e) =>
                e.currentTarget.classList.remove("footer__link-list--hovering")
              }
            >
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <p className="footer__col-heading">{t("footer.col2_heading")}</p>
            <ul
              className="footer__link-list footer__link-list--contact"
              onMouseEnter={(e) =>
                e.currentTarget.classList.add("footer__link-list--hovering")
              }
              onMouseLeave={(e) =>
                e.currentTarget.classList.remove("footer__link-list--hovering")
              }
            >
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer__link"
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <address className="footer__address">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://maps.app.goo.gl/2frMoADAuRNFhHQ59"
              >
                {t("footer.address")}
              </a>
              <a href="tel:+96563331736" className="footer__link">
                {t("footer.phone")}
              </a>
              <a href="mailto:reservations@oceanviewkw.com" className="footer__link">
                {t("footer.email")}
              </a>
            </address>
          </div>
        </div>

        {/* Right — Logo + socials */}
        <div className="footer__right">
          <div className="footer__logo">
            <img
              src="/images/LOGO.svg"
              alt="Ocean View Hotel"
              className="footer__logo-img"
            />
          </div>
          <div className="footer__socials">
            <a
              href="https://www.facebook.com/people/Ocean-View-Hotel-KW/61568069143294/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/oceanviewkwt/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@oceanviewkwt"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Tiktok"
            >
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      {/* ── Copyright bar ─────────────────────────────────── */}
      <div className="footer__bar">
        <p className="footer__copy">
          © {new Date().getFullYear()} {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
