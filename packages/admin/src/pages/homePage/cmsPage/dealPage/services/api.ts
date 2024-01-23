import { http } from "@/common/http";
import { ResponseType } from "@/common/http/overrideHttpType";

let baseUrl = "/nestApi/deal/";
// 增
function addApi(data) {
	return http.request({
		url: baseUrl + "create",
		method: "POST",
		data,
	});
}

// 删
function deleteApi(data) {
	return http.request({
		url: baseUrl + "delete",
		method: "POST",
		data,
	});
}

// 改
function upadteApi(data) {
	return http.request({
		url: baseUrl + "update",
		method: "POST",
		data,
	});
}

// 查
function queryApi<T>(data: any) {
	return http.request<{}, ResponseType<{ count: number; content: T[] }>>({
		url: baseUrl + "query",
		method: "POST",
		data: {
			...data,
			ids: data.id ? [Number(data.id)] : undefined,
		},
	});
}

function approveApi(data: { id: number; title: string }) {
	return http.request({
		url: baseUrl + "approve-deal",
		method: "POST",
		data,
	});
}

function rejectApi(data: { id: number; reject_reason: string }) {
	return http.request({
		url: baseUrl + "reject-deal",
		method: "POST",
		data,
	});
}

const devApi = {
	addApi,
	deleteApi,
	upadteApi,
	queryApi,
	approveApi,
	rejectApi,
};

export default devApi;
