import axios from "axios";

// Axios instance with base URL from .env

//  Create a custom Axios instance called 'API'
//  It sets a base URL so you don't need to write the full backend URL every time
//  The base URL is loaded from the .env file using Vite's import.meta.env system
//  This makes your API calls shorter and your code cleaner
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default API;