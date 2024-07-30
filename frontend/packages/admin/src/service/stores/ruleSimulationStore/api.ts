import { http } from "src/common/http";

//地址都不对，之后改
const baseUrl = "/admin-api/usercenter/cpd-rule/";

function queryListApi(data: any) {
  return http.request({
    url: baseUrl + "/rule/simulate",
    method: "POST",
    data,
  });
}

function queryLocationListApi(data: any) {
  return http.request({
    url: baseUrl + "/market/getLocationListByName",
    method: "POST",
    data,
  });
}

const devApi = {
  queryListApi,
  queryLocationListApi,
};

export default devApi;
