import { http, http2 } from "src/common/http";
import { Setting } from "../appStore/model";
import {
	AdcompanyPageParams,
	AddPluginApiParams,
	AddStoreParams,
	FetchPageListRes,
	FetchStoreListRes,
	GetPluginListApiRes,
	RemovePluginApiParams,
} from "./model";

const baseUrl = "/devApi";
const api = {
	fetchPageList() {
		return http.request<FetchPageListRes>({
			url: baseUrl + "/pageDev/getPageList",
			method: "GET",
		});
	},
	addPageApi(params: AdcompanyPageParams) {
		return http.request({
			url: baseUrl + "/pageDev/addPage",
			method: "POST",
			data: params,
		});
	},
	fetchStoreList() {
		return http.request<FetchStoreListRes>({
			url: baseUrl + "/storeDev/getStoreList",
			method: "GET",
		});
	},
	addStore(params: AddStoreParams) {
		return http.request({
			url: baseUrl + "/storeDev/addStore",
			method: "POST",
			data: params,
		});
	},
	fetchApiList() {
		return http.request<FetchStoreListRes>({
			url: baseUrl + "/apiDev/getApiList",
			method: "GET",
		});
	},
	addApi(params: AddStoreParams) {
		return http.request({
			url: baseUrl + "/apiDev/addApi",
			method: "POST",
			data: params,
		});
	},
	// plugins
	getPluginApi(params: { url: string }) {
		return http.request<{ content: string }>({
			url: baseUrl + "/pluginDev/getPlugin",
			method: "POST",
			data: params,
		});
	},
	getPluginListApi() {
		return http.request<GetPluginListApiRes>({
			url: baseUrl + "/pluginDev/getPluginList",
			method: "GET",
		});
	},
	addPluginApi(params: AddPluginApiParams) {
		return http2.fetch(
			{
				url: baseUrl + "/pluginDev/addPlugin",
				method: "POST",
				data: params,
			},
			{
				showLoading: true,
			},
		);
	},
	removePluginApi(params: RemovePluginApiParams) {
		return http.request({
			url: baseUrl + "/pluginDev/removePlugin",
			method: "POST",
			data: params,
		});
	},
	saveSettingApi(params: Setting) {
		return http.request({
			url: baseUrl + "/settingDev/updateSetting",
			method: "POST",
			data: params,
		});
	},
};

export default api;
