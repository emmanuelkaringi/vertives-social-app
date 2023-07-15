import React from "react";
import Landing from "../../img/Illustration.png";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="HomePage">
      <header>
        <nav>
          <h1 className="logo">Vertives</h1>
          <ul>
            <li>Home</li>
            <li>LogIn</li>
            <li>Sign Up</li>
          </ul>
        </nav>
      </header>
      <div className="container">
        <img src={Landing} alt="" />
        <div className="hero-text">
          <h1>Connect with Authenticity</h1>
          <p>
            Discover a new level of social networking - one that nourishes the
            soul and celebrates the essence of human connection.
          </p>
          <button className="button l-button">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
