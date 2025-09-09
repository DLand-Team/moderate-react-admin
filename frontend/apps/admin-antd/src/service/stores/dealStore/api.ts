import { http } from "src/common/httpOld";
import { RankApiParams } from "./model";

const baseUrl = "/api/deal/";

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
function queryApi<T>(data: any) {
  return http.request<{ count: number; content: T[] }>({
    url: baseUrl + "query",
    method: "POST",
    data: {
      ...data,
      ids: data?.id ? [Number(data.id)] : undefined,
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

function rankApi(data: RankApiParams) {
  return http.request({
    url: baseUrl + "ranking",
    method: "POST",
    data,
  });
}

const devApi = {
  addApi,
  deleteApi,
  updateApi,
  queryApi,
  approveApi,
  rejectApi,
  rankApi,
};

export default devApi;
