import React from "react";
import "./OperationsPage.css";
import OpNavbar from "../../components/OpNavbar/OpNavbar";

function OperationsPage({ user, setUser }) {
  return (
    <div className="operations-page-div">
      <OpNavbar user={user} setUser={setUser} />
      <p>write some stuff as it would be landing</p>
    </div>
  );
}

export default OperationsPage;
