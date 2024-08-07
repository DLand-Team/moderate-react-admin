import { http } from "src/common/http";
import { MarketCarrier, RedisData } from "./model";

function getLocationListApi() {
    return http.request<MarketCarrier[]>({
        url: "/admin-api/usercenter/cpd-market/" + "getLocationList",
        method: "POST",
    });
}

function getRedisDataApi() {
    return http.request<RedisData>({
        url: "/admin-api/usercenter/cpd-redis/syncAllData",
        method: "POST",
    });
}

function getIsAuditApi(params:any) {
    return http.request({
        url: "/admin-api/system/audit/page",
        method: "GET",
        params,
    });
}

function createAuditApi(params:any) {
    return http.request({
        url: "/admin-api/system/audit/create",
        method: "POST",
        data: params,
    });
}

const devApi = {
    getLocationListApi,
    getRedisDataApi,
    getIsAuditApi,
    createAuditApi
};

export default devApi;
