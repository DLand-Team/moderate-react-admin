import { httpBase } from "src/common/http";
import { QueryListParams, UserEntity } from "./model";

const baseUrl = "/api/user/";

const api = {
	queryList(data: QueryListParams = {}) {
		return httpBase.request<any, UserEntity[]>({
			url: baseUrl + "query",
			method: "POST",
			data,
		});
	},
};

export default api;
