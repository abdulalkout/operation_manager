import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";

function Navbar({ user }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Add an event listener to check for changes in the media query
    const mediaQuery = window.matchMedia("(max-width: 800px)");
    const handleMediaQueryChange = () => {
      setMobileMenuOpen(mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Initialize the state based on the current media query
    setMobileMenuOpen(mediaQuery.matches);

    // Clean up the event listener on component unmount
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <div className="sticky-nav">
      <div className={`navbar ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}>
        <p className="logo">OP.Manager</p>
        <div className={`pageLinks ${isMobileMenuOpen ? "active" : ""}`}>
          <Link to="/" className="nav-links">
            {isMobileMenuOpen ? <i className="fas fa-home"></i> : <h3>Home</h3>}
          </Link>
          <Link to="/about" className="nav-links">
            {isMobileMenuOpen ? (
              <i className="fas fa-info-circle"></i>
            ) : (
              <h3>About</h3>
            )}
          </Link>
          <Link to="/graphs" className="nav-links">
            {isMobileMenuOpen ? (
              <i className="fas fa-cogs"></i>
            ) : (
              <h3>Operations</h3>
            )}
          </Link>
          <Link to="/auth" className="nav-links">
            {isMobileMenuOpen ? (
              <i className="fas fa-sign-in-alt"></i>
            ) : (
              <h3>{user ? <>{user.name}</> : " SignIn"}</h3>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
