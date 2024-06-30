import { http } from "src/common/http";
import {
	GetAgencyDataApiParams,
	GetDetailActParams,
	GetPosItemListParams,
	GetPosListApiParams,
	Pos,
	PosCarrier,
	DeleteApiParams,
} from "./model";
import { posCreater, posItemCreater } from "src/shapes/pos";
import { delay } from "src/common/utils";

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
function deleteApi(params: DeleteApiParams) {
	return http.request({
		url: baseUrl + "deleteByIds",
		method: "DELETE",
		params,
	});
}

// 改
function upadteApi(data: Pos) {
	return http.request({
		url: baseUrl + "update",
		method: "PUT",
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

// 查 pos
async function getPosDeatilApi(_: GetDetailActParams) {
	await delay(1000);
	return Promise.resolve({
		data: posCreater({
			posName: "posName",
			ownerId: "ownerId",
			comment: "comment",
		}),
	});
	// return http.request<Pos>({
	//     url: baseUrl + "get",
	//     method: "GET",
	//     params,
	// });
}

// 查 posItem
function getPosItemListApi(_: GetPosItemListParams) {
	return Promise.resolve({
		data: [posItemCreater({ id: _.posId || 1 })],
	});
	// return http.request<PosItem[]>({
	//     url: baseUrl + "cpd-pos-item/list-by-pos-id",
	//     method: "GET",
	//     params,
	// });
}

function getPosCarrierListApi() {
	return http.request<PosCarrier[]>({
		url: baseUrl + "getPosCarrierList",
		method: "POST",
	});
}

function getLocationListApi() {
	return http.request<PosCarrier[]>({
		url: "/admin-api/usercenter/cpd-market/" + "getLocationList",
		method: "POST",
	});
}

function getAgencyDataApi(data: GetAgencyDataApiParams) {
	return http.request<string[]>({
		url: baseUrl + "getAgencyData",
		method: "POST",
		data,
	});
}

const devApi = {
	getPosDeatilApi,
	getLocationListApi,
	getAgencyDataApi,
	getPosCarrierListApi,
	createApi,
	deleteApi,
	upadteApi,
	getPosListApi,
	getPosItemListApi,
};

export default devApi;
