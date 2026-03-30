import React from "react";
import image from "../images/aboutimg.jpg";

const AboutUs = () => {
  return (
    <>
      <section className="container">
        <h2 className="page-heading about-heading">About Us</h2>
        <div className="about">
          <div className="hero-img">
            <img
              src={image}
              alt="hero"
            />
          </div>
          <div className="hero-content">
            <p>
            Welcome, your trusted partner in health and wellness. We’re a dedicated team of medical professionals committed to making quality healthcare accessible and hassle-free. Our online appointment system helps you book consultations with experienced doctors in just a few clicks—anytime, anywhere.

Whether you need a routine check-up, a specialist consultation, or urgent care, we’ve got you covered. Our mission is to ensure you receive timely, personalized, and compassionate care every time you visit.

Your health is our priority, and your convenience is our promise.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
