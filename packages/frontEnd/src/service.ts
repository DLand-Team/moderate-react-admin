import { http } from "@/common/http";

//获得权限
export function getPermissions() {
  return http.request({
    url: "/api/users/getPermissions",
    method: "GET",
  });
}


