import { http } from "@/common/http";

// 查询文章列表，post
function fetchPageList() {
  return http.request({
    url: "/api/pageDev/getPageList",
    method: "GET",
  });
}

// 添加页面
function adcompanyPageList(params) {
  return http.request({
    url: "/api/pageDev/addPage",
    method: "POST",
    data: params,
  });
}

const devApi = {
  fetchPageList,
  adcompanyPageList,
};

export default devApi;
