import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const SignUp = () => {
  const [full_name, setfull_name] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [DOB, setDOB] = useState("");
  const [city, setcity] = useState("");
  const [password, setpassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signupStatus, setSignupStatus] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm_password) {
      setPasswordError("Password and confirm password do not match");
      return;
    }
    const registrationData = {
      full_name,
      username,
      email,
      DOB,
      city,
      password,
      confirm_password,
    };

    console.log(registrationData);

    try {
      const response = await axios.post(
        "http://localhost:4000/register",
        registrationData
      );
      setSignupStatus("success");
      console.log(response);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
        // Check if error is related to password
        if (error.response.data.message === "Invalid password") {
          setPasswordError(
            "Invalid password. Please choose a stronger password."
          );
        } else {
          setPasswordError("Signup failed. Please try again later.");
        }
        setSignupStatus("error");
      } else if (error.request) {
        console.error("No response from server:", error.request);
        setPasswordError("No response from server. Please try again later.");
        setSignupStatus("error");
      } else {
        console.error("Error:", error.message);
        setPasswordError("An error occurred. Please try again later.");
        setSignupStatus("error");
      }
    }
  };

  return (
    <div className="Auth">
      <form className="info-form auth-form" onSubmit={handleSubmit}>
        <h3>Sign up</h3>

        <div>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            className="info-input"
            value={full_name}
            onChange={(e) => setfull_name(e.target.value)}
            name="fullname"
          />

          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            className="info-input"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            name="username"
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            className="info-input"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            name="email"
          />

          <label>Date of Birth</label>
          <input
            type="date"
            placeholder="Date of Birth"
            className="info-input"
            value={DOB}
            onChange={(e) => setDOB(e.target.value)}
            name="DOB"
          />

          <label>City</label>
          <input
            type="text"
            placeholder="City"
            className="info-input"
            value={city}
            onChange={(e) => setcity(e.target.value)}
            name="city"
          />
          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter a Password"
              className="info-input"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              name="password"
            />

            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Your Password"
              className="info-input"
              value={confirm_password}
              onChange={(e) => setconfirm_password(e.target.value)}
              name="c_password"
            />
          </div>
          {passwordError && <p className="error">{passwordError}</p>}

          <button className="button info-button" type="submit">
            Signup
          </button>

          {signupStatus === "success" && (
            <p className="toast success">Signup successful!</p>
          )}
          {signupStatus === "error" && (
            <p className="toast error">Signup failed. Please try again.</p>
          )}

          <div className="login_option">
            <span>
              <Link to="/login">Already have an account? Login</Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};
export default SignUp;
