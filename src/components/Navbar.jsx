import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", target: "/" },
  { label: "Programs", target: "/programs" },
  { label: "Destinations", target: "/destinations" },
  { label: "About Us", target: "/about" },
  { label: "Career", target: "/career" },
  { label: "Blog", target: "/blog" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Preserve the current site preference: the main navbar is shown on the home/hero page.
  // It is also shown on the public blog pages so visitors can navigate back.
  const showNavbar = location.pathname === "/" || location.pathname === "/blog" || location.pathname.startsWith("/blog/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  if (!showNavbar) return null;

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        <Link to="/" target="_blank" rel="noopener noreferrer" className="navbar__brand" aria-label="Go to homepage" onClick={() => setMenuOpen(false)}>
          <span className="navbar__logo" aria-hidden="true">
            <img src="/images/logo.png" alt="Usben Consults logo" />
          </span>
          <span className="navbar__name"></span>
        </Link>

        <nav className="navbar__links navbar__links--desktop" aria-label="Primary">
          {NAV_LINKS.map(link => (
            <Link key={link.target} to={link.target} target="_blank" rel="noopener noreferrer"
              className={`navbar__link ${location.pathname === link.target ? "navbar__link--active" : ""}`}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="navbar__mobile-wrapper">
          <button className={`navbar__toggle ${menuOpen ? "is-open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}
            onClick={() => setMenuOpen(open => !open)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      <div className={`navbar__mobile ${menuOpen ? "is-open" : ""}`}>
        <nav className="navbar__mobile-links" aria-label="Mobile">
          {NAV_LINKS.map(link => (
            <Link key={link.target} to={link.target} target="_blank" rel="noopener noreferrer"
              className={`navbar__mobile-link ${location.pathname === link.target ? "navbar__mobile-link--active" : ""}`}
              onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link to="/contact" target="_blank" rel="noopener noreferrer" className="btn btn--primary navbar__mobile-cta" onClick={() => setMenuOpen(false)}>
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
