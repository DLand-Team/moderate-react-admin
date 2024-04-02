import { http } from "src/common/http";
import {
  GetAgencyDataApiParams,
  GetRuleListApiParams,
  Rule,
  RuleCarrier,
} from "./model";

const baseUrl = "/admin-api/usercenter/cpd-rule/";
// 增
function createApi(data: Rule) {
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
function upadteApi(data: any) {
  return http.request({
    url: baseUrl + "update",
    method: "POST",
    data,
  });
}

// 查 rule列表
function getRuleListApi(params: GetRuleListApiParams) {
  return http.request<{ list: Rule[] }>({
    url: baseUrl + "page",
    method: "GET",
    params,
  });
}

function getRuleCarrierListApi() {
  return http.request<RuleCarrier[]>({
    url: baseUrl + "getRuleCarrierList",
    method: "POST",
  });
}

function getLocationListApi() {
  return http.request<RuleCarrier[]>({
    url: baseUrl + "getLocationList",
    method: "POST",
  });
}

function getAgencyDataApi(data: GetAgencyDataApiParams) {
  return http.request<RuleCarrier[]>({
    url: baseUrl + "getAgencyData",
    method: "POST",
    data,
  });
}

const devApi = {
  getLocationListApi,
  getAgencyDataApi,
  getRuleCarrierListApi,
  createApi,
  deleteApi,
  upadteApi,
  getRuleListApi,
};

export default devApi;
