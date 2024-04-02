import { http, http2 } from "src/common/http";

import {
  LoginApiParams,
  MenuPermissionItem,
  LoginNestApiParams,
} from "./model";
const baseUrl = "/admin-api/system";

function loginNestApi(params: LoginNestApiParams) {
  return http2.request<
    any,
    {
      code: number;
      data: {
        content: string;
      };
    }
  >({
    url: "/api/auth/login/local",
    method: "POST",
    data: {
      email: params.username,
      password: params.password,
    },
  });
}

function loginApi(params: LoginApiParams) {
  return http.request<{ accessToken: string }>({
    url: baseUrl + "/auth/login",
    method: "POST",
    data: params,
  });
}
function fetchUserPermissins() {
  return http.request<{ permissions: any; menus: MenuPermissionItem[] }>({
    url: baseUrl + "/auth/get-permission-info",
    method: "GET",
  });
}

function getImageUrlApi() {
  return http.request({
    url: baseUrl + "/auth/imageUrl",
    method: "POST",
  });
}
function getCaptchaApi() {
  return http.request({
    url: baseUrl + "/auth/captcha",
    method: "POST",
  });
}

const api = {
  loginNestApi,
  loginApi,
  fetchUserPermissins,
  getImageUrlApi,
  getCaptchaApi,
};

export default api;
