import { http } from "@/common/http";
import { ResponseType } from "@/common/http/overrideHttpType";

let baseUrl = "/nestApi/notification/";
// 增
function addApi(data) {
	return http.request({
		url: baseUrl + "create",
		method: "POST",
		data: {
			...data,
			is_read: Boolean(data.is_read),
		},
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
			Notification_type: data.notification_type,
			Notification_type_source_id: data.notification_type_source_id
		},
	});
}

const devApi = {
	addApi,
	deleteApi,
	upadteApi,
	queryApi,
};

export default devApi;
