import axios from "axios";

const service = axios.create({
  baseURL: "http://172.16.132.159:8888/",
});

//拦截器
service.interceptors.request.use(function (config) {
  // if (config.url !== "login") {
  //   const AUTH_TOKEN = localStorage.getItem("JSESSIONID");
  //   config.headers["Authorization"] = AUTH_TOKEN;
  // }
  // return config;
}),
  function (error) {
    return Promise.reject(error);
  };

export default service;
