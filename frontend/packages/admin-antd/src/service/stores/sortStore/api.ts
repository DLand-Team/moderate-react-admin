import { http } from "src/common/httpOld";
import {
  Sort,
  DeleteApiParams,
  GetApiParams,
  GetListApiParams,
  GetListApiRes,
} from "./model";

const baseUrl = "/admin-api/usercenter/cpd-sort-item/";
// 增
function createApi(data: Sort) {
  return http.request({
    url: baseUrl + "create",
    method: "POST",
    data,
  });
}

// 删
function deleteApi(params: DeleteApiParams) {
  return http.request({
    url: baseUrl + "deleteByIds",
    method: "DELETE",
    params,
  });
}

// 改
function upadteApi(data: Sort) {
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
  return http.request<Sort>({
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
