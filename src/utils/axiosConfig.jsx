import React from "react";
import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:8080/",
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const accessToken = user.access_token;
      console.log(accessToken);
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
