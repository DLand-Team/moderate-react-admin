import { http, http2 } from "src/common/httpOld";
import { Category } from "./model";

const baseUrl = "/api/category/";

// 增
function addApi(data: any) {
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
function updateApi(data: any) {
	return http.request({
		url: baseUrl + "update",
		method: "POST",
		data,
	});
}

// 查
function queryApi(data: any) {
	return http2.request<any, Category[]>({
		url: baseUrl + "query",
		method: "POST",
		data,
	});
}

const devApi = {
	addApi,
	deleteApi,
	updateApi,
	queryApi,
};

export default devApi;
