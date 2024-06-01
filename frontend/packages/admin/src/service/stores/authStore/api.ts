import { http } from "src/common/http";

import { LoginApiParams, MenuPermissionItem } from "./model";
import { dp } from "src/service";

const baseUrl = "/api/system";

const api = {
	loginNestApi(_: any) {
		return new Promise((resolve) => {
			dp("appStore", "setIsLoading", true);
			setTimeout(() => {
				dp("appStore", "setIsLoading", false);
				resolve({
					data: {
						content: "http://localhost:8681",
					},
				});
			}, 3000);
		});
		// return httpBase.fetch<
		// 	any,
		// 	{
		// 		code: number;
		// 		data: {
		// 			content: string;
		// 		};
		// 	}
		// >(
		// 	{
		// 		url: "/api/auth/login/local",
		// 		method: "POST",
		// 		data: {
		// 			email: params.username,
		// 			password: params.password,
		// 		},
		// 	},
		// 	{
		// 		showLoading: true,
		// 	},
		// );
	},
	loginApi(params: LoginApiParams) {
		return http.request<{ accessToken: string }>({
			url: baseUrl + "/auth/login-uc",
			method: "POST",
			data: params,
		});
	},
	fetchUserPermissions() {
		return http.request<{ permissions: any; menus: MenuPermissionItem[] }>({
			url: baseUrl + "/auth/get-permission-info",
			method: "GET",
		});
	},
	getImageUrlApi() {
		return http.request({
			url: baseUrl + "/auth/imageUrl",
			method: "POST",
		});
	},
	getCaptchaApi() {
		return http.request({
			url: baseUrl + "/auth/captcha",
			method: "POST",
		});
	},
	getLoginCodeApi(params: any = {}) {
		return http.request({
			url: baseUrl + "/captcha/getUc",
			method: "POST",
			data: params,
		});
	},
};

export default api;
