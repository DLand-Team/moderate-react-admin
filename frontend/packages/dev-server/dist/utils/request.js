"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
// request.js
const axios_1 = __importDefault(require("axios"));
const ConfigBaseURL = "https://localhost:8681/"; // 默认路径
// 使用 create 方法创建 axios 实例
exports.request = axios_1.default.create({
    timeout: 7000,
    baseURL: ConfigBaseURL,
    method: "post",
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
    },
});
// 添加请求拦截器
exports.request.interceptors.request.use((config) => {
    return config;
});
// 添加响应拦截器
exports.request.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    return Promise.reject(error);
});
//# sourceMappingURL=request.js.map