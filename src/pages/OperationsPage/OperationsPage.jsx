import React from "react";
import "./OperationsPage.css";
import OpNavbar from "../../components/OpNavbar/OpNavbar";

function OperationsPage({ user, setUser }) {
  return (
    <div className="operations-page-div">
      <OpNavbar user={user} setUser={setUser} />
      <div>
        {user.logs.length > 0 ? (
          <div className="logs-list">
            <div className="log-card user-data">
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Title: {user.position}</p>
            </div>
            {user.logs.map((log, i) => {
              return (
                <div className="log-card">
                  <div>
                    <p>{log.createdAt}</p>
                    <p>{log.name}</p>
                  </div>
                  <div>
                    <p>Activity</p>
                    <p>{log.activity}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <div className="log-card user-data">
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Title: {user.position}</p>
            </div>
            <p className="log-card">{user.name} has no activities</p>
          </>
        )}
      </div>
    </div>
  );
}

export default OperationsPage;
