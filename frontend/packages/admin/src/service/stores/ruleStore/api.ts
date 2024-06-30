import { http } from "src/common/http";
import {
	DeleteApiParams,
	GetRuleDetailApiParams,
	GetRuleListApiParams,
	Rule,
	RuleCarrier,
} from "./model";
import { mockRuleListData } from "src/mock/rulePageMock";

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
function deleteApi(params: DeleteApiParams) {
	return http.request({
		url: baseUrl + "deleteByIds",
		method: "DELETE",
		params,
	});
}

// 改
function upadteApi(data: Rule) {
	return http.request({
		url: baseUrl + "update",
		method: "PUT",
		data,
	});
}

// 查 rule列表
function getRuleListApi(_: GetRuleListApiParams) {
	return Promise.resolve({
		data: {
			list: mockRuleListData,
		},
	});
	// return http.request<{ list: Rule[] }>({
	//   url: baseUrl + "page",
	//   method: "GET",
	//   params,
	// });
}

function getRuleCarrierListApi() {
	return http.request<RuleCarrier[]>({
		url: baseUrl + "getRuleCarrierList",
		method: "POST",
	});
}
function getRuleDetailApi(params: GetRuleDetailApiParams) {
	return Promise.resolve({
		data: mockRuleListData.find((item) => {
      return item.id == params.id;
    })
	});
	// return http.request<Rule>({
	// 	url: baseUrl + "get",
	// 	method: "GET",
	// 	params,
	// });
}

const devApi = {
	getRuleCarrierListApi,
	createApi,
	deleteApi,
	upadteApi,
	getRuleListApi,
	getRuleDetailApi,
};

export default devApi;
