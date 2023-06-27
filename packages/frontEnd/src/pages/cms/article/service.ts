import { http } from "@/common/http";

// export function login(params: loginParamsT) {
//   return http.request<{isAdmin:boolean,token:string}>({
//     url: "/login",
//     method: "POST",
//     data: params,
//   });
// }

//获得权限
export function getQiNiuToken() {
  return http.request<{token:string}>({
    url: "/api/qiniu/token",
    method: "GET",
  });
}

export function requestArticleAdd(params:{content:string,title:string,subTitle:string}) {
  return http.request({
    url: "/api/article/add",
    method: "POST",
  });
}


