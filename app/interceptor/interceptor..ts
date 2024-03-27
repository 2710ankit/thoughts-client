// axiosInterceptorInstance.js

import axios from "axios";

const axiosInterceptorInstance = axios.create({
  baseURL: "https://thoughts-server-nu.vercel.app/", // Replace with your API base URL
});

// Request interceptor
axiosInterceptorInstance.interceptors.request.use(
  (config) => {
    
    // Modify the request config here (add headers, authentication tokens)
    // const accessToken = JSON.parse(localStorage.getItem("token"));

    // // If token is present, add it to request's Authorization Header
    const accessToken = localStorage.getItem('token')
    if (accessToken) {
      if (config.headers) config.headers.token = accessToken;
    }
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    // Modify the response data here

    return response;
  },
  (error) => {
    // Handle response errors here
    return Promise.reject(error);
  }
);

export default axiosInterceptorInstance;
