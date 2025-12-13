import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Optional: Automatically attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
