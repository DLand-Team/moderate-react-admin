import { http, httpBase } from "src/common/httpOld";
import { mockRuleListData } from "src/mock/rulePageMock";
import {
	DeleteApiParams,
	GetRuleDetailApiParams,
	GetRuleListApiParams,
	Rule,
	RuleCarrier,
} from "./model";
import { Carrier } from "../filterStore/model";

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
			total: 100,
		},
	});
	// return http.request<{ list: Rule[] }>({
	// 	url: baseUrl + "page",
	// 	method: "GET",
	// 	params,
	// });
}

function getRuleDetailApi(params: GetRuleDetailApiParams) {
	return Promise.resolve({
		data: mockRuleListData.find((item) => {
			return item.id == params.id;
		}),
	});
	// return http2.fetch<Rule>(
	//     {
	//         url: baseUrl + "get",
	//         method: "GET",
	//         params,
	//     },
	//     {
	//         showLoading: true,
	//     }
	// );
}

const devApi = {
	fetchRuleCarrierListApi() {
		return http.request<RuleCarrier[]>({
			url: baseUrl + "getRuleCarrierList",
			method: "POST",
		});
	},
	createApi,
	deleteApi,
	upadteApi,
	getRuleListApi,
	getRuleDetailApi,
	fetchRuleInitApi() {
		return http.request<{
			carrierFamilyList: Carrier[];
		}>({
			url: baseUrl + "init",
			method: "POST",
		});
	},
	activeRuleApi(params: Rule) {
		return httpBase.fetch(
			{
				url: baseUrl + "status",
				method: "POST",
				data: params,
			},
			{
				showLoading: true,
			},
		);
	},
};

export default devApi;
