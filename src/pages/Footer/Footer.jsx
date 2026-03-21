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

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about" },
  { label: "Wellness", href: "#wellness" },
  { label: "Cafes", href: "#cafe" },
  { label: "Contact Us", href: "#contact" },
];

const contactLinks = [
  { label: "Get in Touch", href: "#contact" },
  {
    label: "Book a Room",
    href: "https://wa.me/96512345678?text=Hi, I'd like to book a room",
  },
];

const subheadings = [
  {
    label: "Book a Room",
    href: "https://wa.me/96512345678?text=Hi, I'd like to book a room",
  },
  { label: "View Route", href: "https://maps.google.com" },
  { label: "Get in Touch", href: "#contact" },
];

const Footer = () => {
  return (
    <footer className="footer">
      {/* ── Top center heading area ───────────────────────── */}
      <div className="footer__top">
        <div className="footer__heading-wrap">
          {/* main heading */}
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
                Come Stay
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
                &nbsp;With Us,
              </motion.span>
            </div>
          </div>

          {/* ocean view + subheadings row */}
          <div className="footer__sub-row">
            {/* hotel name */}
            <div className="footer__overflow">
              <motion.p
                className="footer__hotel-name"
                custom={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={revealVariants}
              >
                Ocean View
              </motion.p>
            </div>

            {/* subheadings — hover group */}
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
        {/* left — logo + socials */}
        <div className="footer__left">
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

        {/* right — link columns */}
        <div className="footer__links">
          {/* column 1 — ocean view nav */}
          <div className="footer__col">
            <p className="footer__col-heading">Ocean View</p>
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

          {/* column 2 — contact */}
          <div className="footer__col">
            <p className="footer__col-heading">Contact Us</p>
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
              <p>Salem Sabah Al Salem Al Sabah St 54003</p>
              <a href="tel:+96512345678" className="footer__link">
                +965 1234 5678
              </a>
              <a href="mailto:info@oceanviewkuw.com" className="footer__link">
                info@oceanviewkuw.com
              </a>
            </address>
          </div>
        </div>
      </div>

      {/* ── Copyright bar ─────────────────────────────────── */}
      <div className="footer__bar">
        <p className="footer__copy">
          © {new Date().getFullYear()} Ocean View Hotel — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
