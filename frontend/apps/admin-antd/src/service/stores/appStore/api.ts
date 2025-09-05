import { http } from "src/common/httpOld";
import { GetPswInfoParams } from "./model";

const api = {
	changePswApi(params: GetPswInfoParams) {
		return http.request({
			url: "/auth/login-uc",
			method: "POST",
			data: params,
		});
	},
};

export default api;
