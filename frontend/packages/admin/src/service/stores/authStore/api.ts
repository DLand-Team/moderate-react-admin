import { http } from "src/common/http";
import { dpChain } from "src/service";
import { LoginApiParams, MenuPermissionItem } from "./model";

const baseUrl = "/admin-api/system";

const api = {
	loginNestApi(_: any) {
		return new Promise<{
			data: { content: string };
		}>((resolve) => {
			dpChain("appStore").setIsLoading(true);
			setTimeout(() => {
        dpChain("appStore").setIsLoading(false);
				resolve({
					data: {
						content: "http://localhost:8681",
					},
				});
			}, 3000);
		});
		
	},

	// 登录接口
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

	//获取滑块图片
	getImageUrlApi() {
		return http.request({
			url: baseUrl + "/auth/imageUrl",
			method: "POST",
		});
	},

	//获取活块验证成功标志
	getCaptchaApi() {
		return http.request({
			url: baseUrl + "/auth/captcha",
			method: "POST",
		});
	},

	//获取邮箱验证码
	getLoginCodeApi(params: any = {}) {
		return http.request({
			url: baseUrl + "/captcha/getUc",
			method: "POST",
			data: params,
		});
	},
	createCpdSortItemDefaultApi() {
		return http.request({
			url: "/admin-api/usercenter/cpd-sort-item/createCpdSortItemDefault",
			method: "GET",
		});
	},
};

export default api;
