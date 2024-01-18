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
      <div>
        <p>Welcome {user.name}, </p>
        <hr />
        <p> Logged In : {user.email}</p>
        <Link to="" onClick={handleLogOut}>
          <button className="logout">Log-Out</button>
        </Link>
      </div>
      <hr />
      <br />
      <div>
        <Link to="/allwells">All Wells</Link>
        <hr />
        <Link to="/production">Production</Link>
        <hr />
        <Link to="/development">Drilling</Link>
        <hr />
        <Link to="/Rigs">Rigs</Link>
        <hr />
        <Link to="/graphs">Production Graphs</Link>
      </div>
    </div>
  );
}

export default Navbar;
