import axios from "axios";

// Create initial axios instance without Authorization header
const apiHost = process.env.NEXT_PUBLIC_API_HOST.replace(/^https?:\/\//, '');

// Create initial axios instance without Authorization header
// const api = axios.create({
//   baseURL: `https://${apiHost}`, // Ensure the protocol is included
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST.replace('https', 'http'),
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  response => response, // Return response if no error
  error => {
    if (error.response && error.response.status === 401) {
      // Remove token from localStorage
      window.localStorage.removeItem("token");
      // Optionally redirect to the login page
      console.log("Token expired. Redirecting to login."); // Adjust the path as needed
    }
    return Promise.reject(error);
  }
);

export default api;