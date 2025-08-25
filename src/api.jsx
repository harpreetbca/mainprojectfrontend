// src/api.jsx
import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-zzym.onrender.com", // <-- your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
