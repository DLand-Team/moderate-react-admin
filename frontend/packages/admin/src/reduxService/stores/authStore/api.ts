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
// 登录接口
function loginApi(params: LoginApiParams) {
  return http.request<{ accessToken: string }>({
    url: baseUrl + "/auth/login-uc",
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
//获取滑块图片
function getImageUrlApi() {
  return http.request({
    url: baseUrl + "/auth/imageUrl",
    method: "POST",
  });
}
//获取活块验证成功标志
function getCaptchaApi() {
  return http.request({
    url: baseUrl + "/auth/captcha",
    method: "POST",
  });
}
//获取邮箱验证码
function getLoginCodeApi(params: any = {}) {
  return http.request({
    url: baseUrl + "/captcha/getUc",
    method: "POST",
    data: params,
  });
}

const api = {
  loginNestApi,
  loginApi,
  fetchUserPermissins,
  getImageUrlApi,
  getCaptchaApi,
  getLoginCodeApi,
};

export default api;
