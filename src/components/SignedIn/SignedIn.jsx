import React from "react";
import "./SignedIn.css";
import * as userService from "../../utilities/users-service";
import { Link } from "react-router-dom";

function SignedIn({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }
  return (
    <div className="signed-in">
      <p>You are signed in as {user.name}</p>
      <p>Your Email : {user.email}</p>
      <Link to="/" onClick={handleLogOut}>
        <button className="logout-button">
          <i className="fas fa-sign-in-alt"></i>
        </button>
      </Link>
    </div>
  );
}

export default SignedIn;
