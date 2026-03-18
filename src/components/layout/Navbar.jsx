import useNavbar from "./useNavbar";
import "./Navbar.scss";

const navLinks = [
  { label: "Rooms", href: "#rooms" },
  { label: "Wellness", href: "#wellness" },
  { label: "Cafè", href: "#cafè" },
  { label: "About Us", href: "#about" },
];

const Navbar = () => {
  const { scrolled, menuOpen, toggleMenu, closeMenu } = useNavbar();

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <nav className="navbar__inner">
        <a href="#" className="navbar__logo" onClick={closeMenu}>
          <img
            src="/images/LOGO.svg"
            alt="Ocean View"
            className="navbar__logo-img"
          />
        </a>

        {/* Desktop nav links — center */}
        <ul className="navbar__links">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <a href={href} className="navbar__link">
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar__right">
          <a href="#contact" className="navbar__link">
            Contact
          </a>
          <a href="#faq" className="navbar__link">
            FAQ
          </a>
        </div>

        {/* Hamburger — mobile only */}
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
                onClick={closeMenu}
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
