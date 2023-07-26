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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      username,
      password,
    };

    try {
      await dispatch(logIn(loginData));
      toast.success("Logged in successfully.");
      navigate("/feed");
    } catch (error) {
      console.log(error);
      toast.error("Log In failed, try again later");
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Vertives</h3>
          <span className="loginDesc">Connect with Authenticity</span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <form onSubmit={handleSubmit}>
              <h3>Login</h3>
              <input
                type="text"
                placeholder="Username"
                className="info-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
              />
              <input
                type="password"
                placeholder="Enter a Password"
                className="info-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to="/"
                  >
                    Don't have an account? Signup
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

export default Login;
