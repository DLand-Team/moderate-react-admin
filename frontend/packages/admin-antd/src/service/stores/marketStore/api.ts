import { http, httpBase } from "src/common/http";
import {
    DeleteApiParams,
    GetAgencyDataApiParams,
    GetDetailActParams,
    GetMarketItemListParams,
    GetMarketListApiParams,
    GetMarketListApiRes,
    Market,
    MarketCarrier,
    MarketItem,
} from "./model";

const baseUrl = "/admin-api/usercenter/cpd-market/";
// 增
function createApi(data: Market) {
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
function upadteApi(data: Market) {
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

// 查 market列表
function getMarketListApi(params: GetMarketListApiParams) {
    return httpBase.fetch<GetMarketListApiRes>({
        url: baseUrl + "page",
        method: "GET",
        params,
    });
}

function getAllMarketListApi() {
    return httpBase.fetch<Market[]>({
        url: baseUrl + "list",
        method: "POST",
    });
}

// 查 market
function getMarketDeatilApi(params: GetDetailActParams) {
    return httpBase.fetch<Market>(
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

// 查 marketItem
function getMarketItemListApi(params: GetMarketItemListParams) {
    return http.request<MarketItem[]>({
        url: baseUrl + "cpd-market-item/list-by-market-id",
        method: "GET",
        params,
    });
}

function getMarketCarrierListApi() {
    return http.request<MarketCarrier[]>({
        url: baseUrl + "getMarketCarrierList",
        method: "POST",
    });
}

function getLocationListApi() {
    return http.request<MarketCarrier[]>({
        url: baseUrl + "getLocationList",
        method: "POST",
    });
}

function getAgencyDataApi(data: GetAgencyDataApiParams) {
    return http.request<MarketCarrier[]>({
        url: baseUrl + "getAgencyData",
        method: "POST",
        data,
    });
}

const devApi = {
    getMarketDeatilApi,
    getLocationListApi,
    getAgencyDataApi,
    getMarketCarrierListApi,
    createApi,
    deleteApi,
    upadteApi,
    getMarketListApi,
    getMarketItemListApi,
    getAllMarketListApi,
};

export default devApi;
