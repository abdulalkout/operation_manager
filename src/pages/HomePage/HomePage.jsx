import React from "react";
import "./HomePage.css";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

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
      <div className="section-2">
        <div className="circle">
          <Link to="/allwells">
            <i className="fa-solid fa-oil-well"></i>
          </Link>
          <p>All Wells</p>
        </div>
        <div className="circle">
          <Link to="/allrigs">
            <i className="fa-solid fa-oil-well"></i>
          </Link>
          <p>All Rigs</p>
        </div>
        <div className="circle">
          <Link to="/production">
            <i className="fas fa-chart-bar"></i>
          </Link>
          <p>Production Wells</p>
        </div>
        <div className="circle">
          <Link to="/development">
            <i className="fas fa-cogs"></i>
          </Link>
          <p>Development Wells</p>
        </div>
      </div>
      <div className="section-3">
        <img
          className="section-3-img"
          src="https://images.unsplash.com/photo-1516199423456-1f1e91b06f25?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2lsJTIwYW5kJTIwZ2FzfGVufDB8fDB8fHww"
          alt=""
        />
        <div className="section-3-div">
          <h2>Transform Your Oil and Gas Field Management</h2>
          <p>
            Our state-of-the-art platform is designed to revolutionize well and
            rig operations, providing an efficient, connected, and controlled
            environment. Elevate your company's performance with features that
            simplify communication, streamline approval processes, and empower
            real-time decision-making.
          </p>
          <p>
            Monitor ongoing operations, track all wells and rigs seamlessly, and
            ensure optimum production efficiency. Our platform is tailored to
            meet the unique needs of company men and managers, offering
            user-friendly tools to enhance productivity and drive success.
          </p>
          <Link to="/operations" className="newProductButton">
            Operation Management
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
