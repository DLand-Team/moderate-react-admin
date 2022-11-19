import { http } from "@/common/http";

interface loginParamsT {
  name: string;
  password: string;
}

export function login(params: loginParamsT) {
  return http.request({
    url: "/login",
    method: "POST",
    data: params,
  });
}

//获得权限
export function getPermissions() {
  return http.request({
    url: "/users/getPermissions",
    method: "GET",
  });
}


