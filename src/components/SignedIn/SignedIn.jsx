import React from "react";
import "./SignedIn.css";
import * as userService from "../../utilities/users-service";

function SignedIn({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }
  return (
    <div className="signed-in">
      <p>You are signed in as {user.name}</p>
      <p>Your Email : {user.email}</p>
      <button className="logout-button" onClick={handleLogOut}>
        <i className="fas fa-sign-in-alt"></i>
      </button>
    </div>
  );
}

export default SignedIn;
