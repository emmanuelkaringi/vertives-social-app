import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });

export const signUp = (registrationData) =>
  API.post("/register", registrationData, {
    withCredentials: true,
  });
export const logIn = (loginData) =>
  API.post("/login", loginData, {
    withCredentials: true,
  });
