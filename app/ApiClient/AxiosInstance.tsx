import axios from "axios";
import { error } from "console";

const axiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com",
});


axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("access");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Unauthorized access - possibly invalid token.");
      } else if (error.response.status === 404) {
        console.error("Requested resource not found.");
      } else {
        console.error(
          "An error occurred:",
          error.response.status,
          error.response.data
        );
      }
    } else {
      console.error("An error occurred:", error.message);
    }
    return Promise.reject(error);
  }
);
export default axiosInstance