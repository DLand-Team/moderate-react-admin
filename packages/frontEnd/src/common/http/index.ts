import axios from "axios";
import { HttpError } from "./HttpError";

let isDev = process.env.NODE_ENV === "development";
let baseUrl = isDev ? "/api" : "/";
export const http = axios.create({
  baseURL: baseUrl,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

http.interceptors.request.use(
  (req) => {
    // @ts-ignore
    req.headers.authorization = 'Bearer '+sessionStorage.getItem("ACCESS_TOKEN");
    return req;
  },
  (err) => {
    // err.message
    throw err;
  }
);

http.interceptors.response.use(
  (res) => {
    const { code } = res.data;
    if (code === 401) {
      // window.location.replace("/");
    }
    if (code != "200") {
      // Message.error(res.data.message)
      throw new HttpError(
        res.data?.message || "网络错误！",
        Number(res.data.status)
      );
    }
    return res.data;
  },
  (err) => {
    const {response} = err;
    const { code } = response.data;
    if (code === 401) {
      // window.location.replace("/");
    }
    // err.message
    throw err;
  }
);
