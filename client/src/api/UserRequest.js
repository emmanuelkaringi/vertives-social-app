import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4010" });

export const getUser = (userId) => API.get(`/profile/${userId}`,{
    withCredentials: true,
})