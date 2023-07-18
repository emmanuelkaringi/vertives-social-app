import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../actions/AuthAction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Auth.css";

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      // If the input contains an "@" symbol, it's considered an email; otherwise, it's a username.
      email: /@/.test(username) ? username : "",
      username: /@/.test(username) ? "" : username,
      password,
    };

    console.log(loginData);

    try {
      await dispatch(logIn(loginData));
      toast.success("Logged in successfully.");
      navigate("/feed"); // Redirect to the feed page after successful login
    } catch (error) {
      console.log(error);
      toast.error("Log In failed, try again later");
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

          <button
            className="button info-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <div className="login_option">
            <span style={{ fontSize: "12px" }}>
              <Link to="/signup">Don't have an account? Signup</Link>
            </span>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
