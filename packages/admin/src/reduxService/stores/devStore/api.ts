import { http } from "@/common/http";
import {
	AdcompanyPageParams,
	AddStoreParams,
	FetchPageListRes,
	FetchStoreListRes,
} from "./model";

const api = {
	fetchPageList() {
		return http.request<FetchPageListRes>({
			url: "/api/pageDev/getPageList",
			method: "GET",
		});
	},
	adcompanyPageList(params: AdcompanyPageParams) {
		return http.request({
			url: "/api/pageDev/addPage",
			method: "POST",
			data: params,
		});
	},
	fetchStoreList() {
		return http.request<FetchStoreListRes>({
			url: "/api/storeDev/getStoreList",
			method: "GET",
		});
	},
	addStore(params: AddStoreParams) {
		return http.request({
			url: "/api/storeDev/addStore",
			method: "POST",
			data: params,
		});
	},
	fetchApiList() {
		return http.request<FetchStoreListRes>({
			url: "/api/apiDev/getApiList",
			method: "GET",
		});
	},
	addApi(params: AddStoreParams) {
		return http.request({
			url: "/api/apiDev/addApi",
			method: "POST",
			data: params,
		});
	},
};

export default api;
