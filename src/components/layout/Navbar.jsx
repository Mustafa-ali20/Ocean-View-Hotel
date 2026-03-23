import useNavbar from "./useNavbar";
import lenis from "../../lib/lenis";
import "./Navbar.scss";

const navLinks = [
  { label: "Rooms", href: "#rooms" },
  { label: "Wellness", href: "#wellness" },
  { label: "Cafè", href: "#cafè" },
  { label: "About Us", href: "#about" },
];

const Navbar = () => {
  const { scrolled, menuOpen, toggleMenu, closeMenu } = useNavbar();

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
        <a href="#" className="navbar__logo" onClick={(e) => handleClick(e, "#")}>
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
            Contact
          </a>
          <a
            href="#faq"
            className="navbar__link"
            onClick={(e) => handleClick(e, "#faq")}
          >
            FAQ
          </a>
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
            { label: "Contact", href: "#contact" },
            { label: "FAQ", href: "#faq" },
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
        </ul>

        <div className="navbar__mobile-contact">
          <a href="tel:+96511111111" className="navbar__mobile-phone">
            +965 1111 1111
          </a>
          <a href="mailto:hotel@gmail.com" className="navbar__mobile-email">
            hotel@gmail.com
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;