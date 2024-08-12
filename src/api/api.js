import axios from "axios";

// Create initial axios instance without Authorization header
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST.replace('https', 'http'),
  headers: {
    'Content-Type': 'application/json',
  },
});


export default api;