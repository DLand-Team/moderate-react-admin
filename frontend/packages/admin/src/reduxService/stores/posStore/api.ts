import { http } from "src/common/http";
import {
  GetAgencyDataApiParams,
  GetDetailActParams,
  GetPosItemListParams,
  GetPosListApiParams,
  Pos,
  PosCarrier,
  PosItem,
} from "./model";

const baseUrl = "/admin-api/usercenter/cpd-pos/";
// 增
function createApi(data: Pos) {
  return http.request({
    url: baseUrl + "create",
    method: "POST",
    data,
  });
}

// 删
function deleteApi(data: any) {
  return http.request({
    url: baseUrl + "delete",
    method: "POST",
    data,
  });
}

// 改
function upadteApi(data: Pos) {
  return http.request({
    url: baseUrl + "update",
    method: "PUT",
    data,
  });
}

// 查 pos列表
function getPosListApi(params: GetPosListApiParams) {
  return http.request<{ list: Pos[] }>({
    url: baseUrl + "page",
    method: "GET",
    params,
  });
}

// 查 pos
function getPosDeatilApi(params: GetDetailActParams) {
  return http.request<Pos>({
    url: baseUrl + "get",
    method: "GET",
    params,
  });
}

// 查 posItem
function getPosItemListApi(params: GetPosItemListParams) {
  return http.request<PosItem[]>({
    url: baseUrl + "cpd-pos-item/list-by-pos-id",
    method: "GET",
    params,
  });
}

function getPosCarrierListApi() {
  return http.request<PosCarrier[]>({
    url: baseUrl + "getPosCarrierList",
    method: "POST",
  });
}

function getLocationListApi() {
  return http.request<PosCarrier[]>({
    url: baseUrl + "getLocationList",
    method: "POST",
  });
}

function getAgencyDataApi(data: GetAgencyDataApiParams) {
  return http.request<PosCarrier[]>({
    url: baseUrl + "getAgencyData",
    method: "POST",
    data,
  });
}

const devApi = {
  getPosDeatilApi,
  getLocationListApi,
  getAgencyDataApi,
  getPosCarrierListApi,
  createApi,
  deleteApi,
  upadteApi,
  getPosListApi,
  getPosItemListApi,
};

export default devApi;
