import { http2 } from "src/common/http";
import { QueryListParams, UserEntity } from "./model";

const baseUrl = "/api/user/";

const api = {
	queryList(data: QueryListParams = {}) {
		return http2.request<any, UserEntity[]>({
			url: baseUrl + "query",
			method: "POST",
			data,
		});
	},
};

export default api;
