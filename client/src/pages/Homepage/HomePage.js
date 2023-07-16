import React from "react";
import Landing from "../../img/Illustration.png";
import { Link } from 'react-router-dom';
import "./HomePage.css";



const HomePage = () => {
  return (
    <div className="HomePage">
      <header>
        <nav>
          <h1 className="logo">Vertives</h1>
          <ul>
            <Link to='/'><li>Home</li></Link>
            <Link to='/login'><li>LogIn</li></Link>
            <Link to='/signup'><li>Sign Up</li></Link>
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
          <Link to='/signup' ><button className="button l-button">Get Started</button></Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
