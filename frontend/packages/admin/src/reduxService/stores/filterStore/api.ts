import { http } from "src/common/http";
import {
  Carrier,
  DeleteApiParams,
  GetApiParams,
  GetListApiParams,
  GetListApiRes,
} from "./model";

const baseUrl = "/admin-api/usercenter/cpd-carrier-family/";
// 增
function createApi(data: Carrier) {
  return http.request({
    url: baseUrl + "create",
    method: "POST",
    data,
  });
}

// 删
function deleteApi(params: DeleteApiParams) {
  return http.request({
    url: baseUrl + "delete",
    method: "DELETE",
    params,
  });
}

// 改
function upadteApi(data: Carrier) {
  return http.request({
    url: baseUrl + "update",
    method: "PUT",
    data,
  });
}

// 查 列表
function getListApi(params: GetListApiParams) {
  return http.request<GetListApiRes>({
    url: baseUrl + "page",
    method: "GET",
    params,
  });
}

// 查详情
function getDetail(params: GetApiParams) {
  return http.request<Carrier>({
    url: baseUrl + "get",
    method: "GET",
    params,
  });
}

const devApi = {
  getDetail,
  createApi,
  deleteApi,
  upadteApi,
  getListApi,
};

export default devApi;
