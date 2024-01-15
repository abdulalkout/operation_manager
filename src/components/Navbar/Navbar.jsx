import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="sticky-nav">
      <div className="navbar">
        {/* <img className="logo" src="" alt="Logo" /> */}
        <p className="logo">OP.Manager</p>
        <div className={`pageLinks ${isMobileMenuOpen ? "active" : ""}`}>
          <Link to="/" className="nav-links">
            <h3>Home</h3>
          </Link>
          <Link to="/about" className="nav-links">
            <h3>About</h3>
          </Link>
          <Link to="/operations" className="nav-links">
            <h3>Operations</h3>
          </Link>
          <Link to="/auth" className="nav-links">
            <h3>SignIn</h3>
          </Link>
        </div>

        <div className="mobileMenuIcon" onClick={toggleMobileMenu}>
          &#9776;
        </div>
      </div>
    </div>
  );
}

export default Navbar;
