import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../../actions/AuthAction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Auth.css";

const SignUp = () => {
  const dispatch = useDispatch();
  const [full_name, setfull_name] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [DOB, setDOB] = useState("");
  const [city, setcity] = useState("");
  const [password, setpassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm_password) {
      setPasswordError("*Password and confirm password do not match");
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
      await dispatch(signUp(registrationData));
      toast.success(
        "Account created successfully, check your email for the welcome message"
      );
      // Navigate to login page
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Registration failed, try again later");
      // Do not navigate to login page
      return false;
    }
  };

  return (
    <div className="signup">
      <div className="signupWrapper">
        <div className="signupLeft">
          <h3 className="signupLogo">Vertives</h3>
          <span className="signupDesc">Connect with Authenticity</span>
        </div>
        <div className="signupRight">
          <div className="signupBox">
            <form onSubmit={handleSubmit}>
              <h3>Sign up</h3>
              <input
                required
                type="text"
                placeholder="Full Name"
                className="info-input"
                value={full_name}
                onChange={(e) => setfull_name(e.target.value)}
                name="fullname"
              />

              <input
                required
                type="text"
                placeholder="Username"
                className="info-input"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                name="username"
              />

              <input
                required
                type="email"
                placeholder="Email"
                className="info-input"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                name="email"
              />

              <input
                required
                type="date"
                placeholder="Date of Birth"
                className="info-input"
                value={DOB}
                onChange={(e) => setDOB(e.target.value)}
                name="DOB"
              />

              <input
                required
                type="text"
                placeholder="City"
                className="info-input"
                value={city}
                onChange={(e) => setcity(e.target.value)}
                name="city"
              />

              <input
                required
                type="password"
                placeholder="Enter a Password"
                className="info-input"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                name="password"
              />

              <input
                required
                type="password"
                placeholder="Confirm Your Password"
                className="info-input"
                value={confirm_password}
                onChange={(e) => setconfirm_password(e.target.value)}
                name="c_password"
              />

              {passwordError && <p className="error">{passwordError}</p>}

              <button className="button info-button" type="submit">
                Signup{" "}
              </button>

              <div className="login_option">
                <span>
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to="/login"
                  >
                    Already have an account? Login
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default SignUp;
