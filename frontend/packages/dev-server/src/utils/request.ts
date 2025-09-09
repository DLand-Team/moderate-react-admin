// request.js
import axios from "axios";

const ConfigBaseURL = "https://localhost:8681/"; // 默认路径

// 使用 create 方法创建 axios 实例
export const request = axios.create({
  timeout: 7000, // 请求超时时间
  baseURL: ConfigBaseURL,
  method: "post",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

// 添加请求拦截器
request.interceptors.request.use((config) => {
  return config;
});

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);
