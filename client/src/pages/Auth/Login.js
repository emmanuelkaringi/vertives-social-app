import React from "react";
import { Link} from "react-router-dom";
import "./Auth.css";

const Login = () => {
  return (
    <div className="Auth">
      <form className="info-form auth-form">
        <h3>Log In</h3>

        <div>
          <label>Email or Username</label>
          <input
            type="text"
            placeholder="Email or Username"
            className="info-input"
            name="username"
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter a Password"
            className="info-input"
            name="password"
          />

          <button className="button info-button" type="submit">
            Login
          </button>

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
