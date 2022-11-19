import { http } from "@/common/http";

//获得权限
export function updatePermissions(data: string[]) {
  return http.request({
    url: "/users/updatePermissions",
    method: "POST",
    data,
  });
}
