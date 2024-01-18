import React from "react";
import "./HomePage.css";

function HomePage() {
  return (
    <>
      <div className="section-1">
        <div className="landing-image">
          <img
            className="offshore-image"
            src="https://eco-cdn.iqpc.com/eco/images/channel_content/images/biggest_oil_and_gas_companies.webp"
          />
        </div>
        <div className="section-1-div">
          <p>Revolutionizing Well and Rig Operations</p>
          <h1>Efficient. Connected. Control.</h1>
          <p className="section-1-par">
            Elevate your oil and gas field management with our state-of-the-art
            solution. Seamlessly track and manage all wells and rigs, monitor
            ongoing operations, and ensure optimum production efficiency.
            Empowering company men and managers alike, our platform simplifies
            communication, approval processes, and real-time decision-making.
          </p>
          <div>
            <button className="newProductButton">Explore Features</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
