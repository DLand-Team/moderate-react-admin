import { http } from "src/common/http";
import {
  GetAgencyDataApiParams,
  GetDetailActParams,
  GetMarketItemListParams,
  GetMarketListApiParams,
  GetMarketListApiRes,
  Market,
  MarketCarrier,
  MarketItem,
  DeleteApiParams
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
function deleteApi(params: DeleteApiParams) {
  return http.request({
    url: baseUrl + "deleteByIds",
    method: "DELETE",
    params,
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

// 查 market列表
function getMarketListApi(params: GetMarketListApiParams) {
  return http.request<GetMarketListApiRes>({
    url: baseUrl + "page",
    method: "GET",
    params,
  });
}

// 查 market
function getMarketDeatilApi(params: GetDetailActParams) {
  return http.request<Market>({
    url: baseUrl + "get",
    method: "GET",
    params,
  });
}

// 查 marketItem
function getMarketItemListApi(params: GetMarketItemListParams) {
  return http.request<MarketItem[]>({
    url: baseUrl + "cpd-market-item/list-by-market-id",
    method: "GET",
    params,
  });
}

function getMarketCarrierListApi() {
  return http.request<MarketCarrier[]>({
    url: baseUrl + "getMarketCarrierList",
    method: "POST",
  });
}

function getLocationListApi() {
  return http.request<MarketCarrier[]>({
    url: baseUrl + "getLocationList",
    method: "POST",
  });
}

function getAgencyDataApi(data: GetAgencyDataApiParams) {
  return http.request<MarketCarrier[]>({
    url: baseUrl + "getAgencyData",
    method: "POST",
    data,
  });
}

const devApi = {
  getMarketDeatilApi,
  getLocationListApi,
  getAgencyDataApi,
  getMarketCarrierListApi,
  createApi,
  deleteApi,
  upadteApi,
  getMarketListApi,
  getMarketItemListApi,
};

export default devApi;
