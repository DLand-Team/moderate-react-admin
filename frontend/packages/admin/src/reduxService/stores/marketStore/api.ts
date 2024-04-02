import { http } from "src/common/http";
import {
  GetMarketListApiParams,
  Market,
  DeleteApiParams,
  DetailApiParams,
} from "./model";

const baseUrl = "/admin-api/usercenter/cpd-market/";
// 增
function createApi(data: Market) {
  return http.request({
    url: baseUrl + "create",
    method: "POST",
    data,
  });
}

// 删
function deleteApi(data: DeleteApiParams) {
  return http.request({
    url: baseUrl + "deleteByIds",
    method: "DELETE",
    data,
  });
}

// 改
function upadteApi(data: Market) {
  return http.request({
    url: baseUrl + "update",
    method: "PUT",
    data,
  });
}

// 查列表
function getMarketListApi(params: GetMarketListApiParams) {
  return http.request<{ list: Market[] }>({
    url: baseUrl + "page",
    method: "GET",
    params,
  });
}

//查详情
function getMarketDetailListApi(params: DetailApiParams) {
  return http.request({
    url: baseUrl + "cpd-market-item/list-by-market-id",
    method: "GET",
    params,
  });
}

//获取locationList列表
function getLocationListApi() {
  return http.request({
    url: baseUrl + "getLocationList",
    method: "POST",
  });
}

const devApi = {
  getLocationListApi,
  getMarketDetailListApi,
  createApi,
  deleteApi,
  upadteApi,
  getMarketListApi,
};

export default devApi;
