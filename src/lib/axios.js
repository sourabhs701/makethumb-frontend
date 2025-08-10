import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? import.meta.env.VITE_API_URL || "http://localhost:9000/"
      : import.meta.env.VITE_API_URL,
  timeout: 20000,
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Normalize network errors
    if (error.code === "ECONNABORTED" || error.message === "Network Error") {
      error.normalizedMessage = "Network error. Please check your connection.";
    }

    // Handle unauthorized -> optionally logout
    const status = error.response?.status;
    if (status === 401) {
      // Don't automatically logout during token exchange redirects
      // Consumers can check status and act accordingly
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
