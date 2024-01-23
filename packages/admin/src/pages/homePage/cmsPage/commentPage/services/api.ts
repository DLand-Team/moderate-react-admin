import { http } from "@/common/http";
import { ResponseType } from "@/common/http/overrideHttpType";

let baseUrl = "/nestApi/comment/";
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
		// NOTE: 后端返回数据为字段为id，但要求入参为comment_id
		data: { ...data, comment_id: data.id },
	});
}

// 查
function queryApi<T>(data: any) {
	// 当筛选项为空字符串时, 返回数据为空. 置空.
	const _data = { ...data }
	Object.keys(data).forEach((key) => {
		if (_data[key] === "") {
			_data[key] = undefined;
		}
	});

	return http.request<{},ResponseType<{count:number,content:T[]}>>({
		url: baseUrl + "query",
		method: "POST",
		data: _data
	});
}

const devApi = {
	addApi,
	deleteApi,
	upadteApi,
	queryApi,
};

export default devApi;
