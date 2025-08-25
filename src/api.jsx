import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-zzym.onrender.com", // backend URL
  headers: { "Content-Type": "application/json" },
});

export default API;
