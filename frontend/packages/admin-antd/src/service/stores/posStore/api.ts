import { http, httpBase } from "src/common/httpOld";
import {
    DeleteApiParams,
    GetAgencyDataApiParams,
    GetDetailActParams,
    GetPosItemListParams,
    GetPosListApiParams,
    Pos,
    PosCarrier,
    PosItem,
} from "./model";

const baseUrl = "/admin-api/usercenter/cpd-pos/";
// 增
function createApi(data: Pos) {
    return httpBase.fetch(
        {
            url: baseUrl + "create",
            method: "POST",
            data,
        },
        {
            showLoading: true,
        }
    );
}

// 删
function deleteApi(params: DeleteApiParams) {
    return httpBase.fetch(
        {
            url: baseUrl + "deleteByIds",
            method: "DELETE",
            params,
        },
        {
            showLoading: true,
        }
    );
}

// 改
function upadteApi(data: Pos) {
    return httpBase.fetch(
        {
            url: baseUrl + "update",
            method: "PUT",
            data,
        },
        {
            showLoading: true,
        }
    );
}

// 查 pos列表
function getPosPageApi(params: GetPosListApiParams) {
    return httpBase.fetch<{ list: Pos[]; total: number }>({
        url: baseUrl + "page",
        method: "GET",
        params,
    });
}

function getPosListApi() {
    return httpBase.fetch<Pos[]>({
        url: baseUrl + "list",
        method: "POST",
    });
}

// 查 pos
async function getPosDeatilApi(params: GetDetailActParams) {
    return httpBase.fetch<Pos>(
        {
            url: baseUrl + "get",
            method: "GET",
            params,
        },
        {
            showLoading: true,
        }
    );
}

// 查 posItem
function getPosItemListApi(params: GetPosItemListParams) {
    return http.request<PosItem[]>({
        url: baseUrl + "cpd-pos-item/list-by-pos-id",
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
    getPosItemListApi,
    getPosPageApi,
    getPosListApi,
};

export default devApi;
