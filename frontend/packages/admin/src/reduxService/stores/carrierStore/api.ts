import { http } from "src/common/http";
import {
	GetAgencyDataApiParams,
	GetPosListApiParams,
	Pos,
	PosCarrier,
} from "./model";

const baseUrl = "/admin-api/usercenter/cpd-pos/";
// 增
function createApi(data: Pos) {
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

// 查 pos列表
function getPosListApi(params: GetPosListApiParams) {
	return http.request<{ list: Pos[] }>({
		url: baseUrl + "page",
		method: "GET",
		params,
	});
}

function getPosCarrierListApi() {
	return http.request<PosCarrier[]>({
		url: baseUrl + "getPosCarrierList",
		method: "POST",
	});
}

function getLocationListApi() {
	return http.request<PosCarrier[]>({
		url: baseUrl + "getLocationList",
		method: "POST",
	});
}

function getAgencyDataApi(data: GetAgencyDataApiParams) {
	return http.request<PosCarrier[]>({
		url: baseUrl + "getAgencyData",
		method: "POST",
		data,
	});
}

const devApi = {
	getLocationListApi,
	getAgencyDataApi,
	getPosCarrierListApi,
	createApi,
	deleteApi,
	upadteApi,
	getPosListApi,
};

export default devApi;
