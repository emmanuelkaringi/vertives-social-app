import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4010" });

export const getUser = (userId) => API.get(`/profile/${userId}`, {
    withCredentials: true,
  });

export const updateUser = (id, formData) => API.put(`/profile/${id}`,formData,{
    withCredentials: true,
})

export const getAllUsers = () => API.get('/profile/all',{
    withCredentials: true,
})

export const followUser = (id, data) => API.post(`/follow/${id}`, data,{
    withCredentials: true,
})

export const unFollowUser = (id, data) => API.post(`/unfollow/${id}`, data,{
    withCredentials: true,
})

export const getFollowing = (id, data) => API.post(`/following/${id}`, data,{
    withCredentials: true,
})

export const getFollowers = (id, data) => API.post(`/followers/${id}`, data,{
    withCredentials: true,
})

export const deleteUser = (id) => API.delete(`/profile/${id}`,{
    withCredentials: true,
})