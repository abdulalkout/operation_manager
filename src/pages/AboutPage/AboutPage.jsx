// AboutPage.jsx
import React from "react";
import "./AboutPage.css";
import pic1 from "../../images/pic.jpg";
import pic2 from "../../images/pic2.jpg";

function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-section">
        <h2>About Us</h2>
        <p>
          Welcome to OP.Manager, where we revolutionize well and rig operations.
          Our state-of-the-art solution is designed to elevate oil and gas field
          management, providing efficiency, connectivity, and control.
        </p>
      </section>

      <section className="team-section">
        <h2>Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src={pic2} alt="Team Member 1" />
            <h3>Abdul Alkout</h3>
            <p>Co-founder & CEO</p>
          </div>
          <div className="team-member">
            <img src={pic1} alt="Team Member 2" />
            <h3>Abdul Alkout</h3>
            <p>Co-founder & CTO</p>
          </div>
        </div>
      </section>

      <section className="project-details-section">
        <h2>Project Details</h2>
        <p>
          Our platform simplifies communication, approval processes, and
          real-time decision-making. Whether you're managing wells, rigs, or
          exploring production graphs, OP.Manager is your go-to solution for
          seamless operations.
        </p>
      </section>

      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>
          Have questions or suggestions? We'd love to hear from you! Reach out
          to us through the contact form below.
        </p>
        <div className="git-linkedin">
          <a
            href="https://github.com/abdulalkout/operation_manager"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-github about-link-img"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/abdul-alkout/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-linkedin about-link-img"></i>
          </a>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
