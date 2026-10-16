import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "./Logo.jsx";

// Every page of the site, in display order
const navigationLinks = [
  { label: "Home", path: "/" },
  { label: "About Me", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Education", path: "/education" },
  { label: "Services", path: "/services" },
  { label: "Contact Me", path: "/contact" },
];

/**
 * Navbar: logo + links to all six pages. Collapses into a menu button on small screens.
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <Logo />
          <span className="navbar-brand-text">Francis Torres</span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((previousState) => !previousState)}
        >
          <span className="sr-only">Toggle navigation menu</span>
          <span className="menu-toggle-bar" />
          <span className="menu-toggle-bar" />
          <span className="menu-toggle-bar" />
        </button>

        <ul id="primary-navigation" className={`navbar-links ${isMenuOpen ? "is-open" : ""}`}>
          {navigationLinks.map((navLink) => (
            <li key={navLink.path}>
              <NavLink
                to={navLink.path}
                end={navLink.path === "/"}
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                onClick={closeMenu}
              >
                {navLink.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
