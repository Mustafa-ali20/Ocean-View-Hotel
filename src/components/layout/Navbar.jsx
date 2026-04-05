import { useTranslation } from "react-i18next";
import useNavbar from "./useNavbar";
import lenis from "../../lib/lenis";
import "./Navbar.scss";

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const navLinks = [
    { label: t("navbar.rooms"), href: "#rooms" },
    { label: t("navbar.wellness"), href: "#wellness" },
    { label: t("navbar.cafe"), href: "#cafe" },
    { label: t("navbar.about"), href: "#about" },
  ];
  const { scrolled, menuOpen, toggleMenu, closeMenu } = useNavbar();

  const toggleLang = () => {
    const next = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(next);
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = next;
  };

  const isArabic = i18n.language === "ar";

  const handleClick = (e, href) => {
    e.preventDefault();
    if (href === "#") {
      lenis.scrollTo(0, { duration: 1.4 });
    } else {
      const target = document.querySelector(href);
      if (target) {
        lenis.scrollTo(target, {
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    }
    closeMenu();
  };

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <nav className="navbar__inner">
        {/* Logo */}
        <a
          href="#"
          className="navbar__logo"
          onClick={(e) => handleClick(e, "#")}
        >
          <img
            src={scrolled ? "/images/LOGO.svg" : "/images/LOGO-white.svg"}
            alt="Ocean View"
            className="navbar__logo-img"
          />
        </a>

        {/* Desktop nav links */}
        <ul className="navbar__links">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="navbar__link"
                onClick={(e) => handleClick(e, href)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop right links */}
        <div className="navbar__right">
          <a
            href="#contact"
            className="navbar__link"
            onClick={(e) => handleClick(e, "#contact")}
          >
            {t("navbar.contact")}
          </a>
          <a
            href="#faq"
            className="navbar__link"
            onClick={(e) => handleClick(e, "#faq")}
          >
            {t("navbar.faq")}
          </a>
          <button className="navbar__lang" onClick={toggleLang}>
            {isArabic ? "EN" : "عربي"}
          </button>
        </div>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? "navbar__hamburger--open" : ""}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`navbar__mobile-menu ${menuOpen ? "navbar__mobile-menu--open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <ul className="navbar__mobile-links">
          {[
            ...navLinks,
            { label: t("navbar.contact"), href: "#contact" },
            { label: t("navbar.faq"), href: "#faq" },
          ].map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="navbar__mobile-link"
                onClick={(e) => handleClick(e, href)}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <button
              className="navbar__mobile-link navbar__lang-mobile"
              onClick={toggleLang}
            >
              {isArabic ? "EN" : "عربي"}
            </button>
          </li>
        </ul>

        <div className="navbar__mobile-contact">
          <a href="tel:+96511111111" className="navbar__mobile-phone">
            {t("navbar.phone")}
          </a>
          <a href="mailto:hotel@gmail.com" className="navbar__mobile-email">
            {t("navbar.email")}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
