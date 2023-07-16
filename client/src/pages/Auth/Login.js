import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      // If the input contains an "@" symbol, it's considered an email; otherwise, it's a username.
      email: /@/.test(username) ? username : "",
      username: /@/.test(username) ? "" : username,
      password,
    };

    console.log(loginData);
    // Store the token in localStorage

    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        loginData,
        {
          withCredentials: true,
        }
      );
      console.log(response);

      // Handle successful login response here

      navigate("/feed");
    } catch (error) {
      if (error.response) {
        // Handle server errors
        setError(error.response.data.error);
      } else if (error.request) {
        // Handle no response from server
        setError("No response from server. Please try again later.");
      } else {
        // Handle other errors
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="Auth">
      <form className="info-form auth-form" onSubmit={handleSubmit}>
        <h3>Log In</h3>

        <div>
          <label>Email or Username</label>
          <input
            type="text"
            placeholder="Email or Username"
            className="info-input"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            name="username"
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter a Password"
            className="info-input"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            name="password"
          />

          <button className="button info-button" type="submit">
            Login
          </button>
          {error && <p className="error">{error}</p>}

          <div className="login_option">
            <span style={{ fontSize: "12px" }}>
              <Link to="/signup">Don't have an account? Signup</Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
