import axios from "axios";

// Create initial axios instance without Authorization header
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST.replace('https', 'http'),
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  response => response, // Trả về response nếu không có lỗi
  error => {
    if (error.response.status === 401) {
      // Xóa token khỏi localStorage
      window.localStorage.removeItem("token");
      // Có thể điều hướng người dùng đến trang đăng nhập
      console.log("Token")
    }
    return Promise.reject(error);
  }
);

export default api;