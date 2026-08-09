// EMS/frontend/src/utils/api.js
import axios from 'axios';

// Automatically uses Vercel environment variable or defaults to local dev URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
});

export default api;
export { API_BASE_URL };