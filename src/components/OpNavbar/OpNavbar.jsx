import React from "react";
import "./OpNavbar.css";
import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
function Navbar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }
  return (
    <div className="op-navebar-div">
      <div className="user-info">
        <p>{user.name}, </p>
        <p> {user.email}</p>
        <p>{user.position}</p>
        <Link to="/" onClick={handleLogOut}>
          <button className="logout">
            <i className="fas fa-sign-in-alt"></i>
          </button>
        </Link>
      </div>
      <br />
      <div className="bar-links">
        <Link className="link-reat" to="/operations">
          Logs
        </Link>
        <Link className="link-reat" to="/allwells">
          Wells
        </Link>
        <Link className="link-reat" to="/production">
          Production
        </Link>
        <Link className="link-reat" to="/development">
          Drilling
        </Link>
        <Link className="link-reat" to="/Rigs">
          Rigs
        </Link>
        <Link className="link-reat" to="/graphs">
          Graphs
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
