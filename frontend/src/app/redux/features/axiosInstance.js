import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9000/api/v1",
  withCredentials: true,  // <-- This is important to send and receive cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Remove this interceptor because token is stored in HttpOnly cookie, not in localStorage
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default axiosInstance;
