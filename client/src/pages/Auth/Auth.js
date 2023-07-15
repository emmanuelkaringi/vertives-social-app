import React from "react";
import "./Auth.css";

const Auth = () => {
  return (
    <div className="Auth">

      <Login/>
      {/* <Signup /> */}
    </div>
  );
};

function Login() {
  return (
    <div>
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
              Don't have an account? Signup
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

function Signup() {
  return (
    <div>
      <form className="info-form auth-form">
        <h3>Sign up</h3>

        <div>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            className="info-input"
            name="fullname"
          />

          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            className="info-input"
            name="username"
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            className="info-input"
            name="email"
          />

          <label>Date of Birth</label>
          <input
            type="date"
            placeholder="Date of Birth"
            className="info-input"
            name="DOB"
          />

          <label>City</label>
          <input
            type="text"
            placeholder="City"
            className="info-input"
            name="city"
          />
          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter a Password"
              className="info-input"
              name="password"
            />

            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Your Password"
              className="info-input"
              name="password"
            />
          </div>

          <button className="button info-button" type="submit">
            Signup
          </button>

          <div className="login_option">
            <span style={{ fontSize: "12px" }}>
              Already have an account? Login
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Auth;

// password
// confirmpassword
