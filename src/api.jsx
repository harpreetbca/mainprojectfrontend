// src/api.jsx
import axios from "axios";

const API = axios.create({
  baseURL: "https://backendonrender.com", // <-- your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
