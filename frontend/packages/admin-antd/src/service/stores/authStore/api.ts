import http from "src/common/http";
import storageHelper from "src/common/utils/storageHelper";
import {
	GetIdByNameApiReq,
	GetUserInfoParams,
	LoginApiReq,
	LoginApiRes,
	MenuItemData,
	MenuPermissionItem,
} from "./model";
import { getRefreshToken } from "src/common/http/auth";

const baseUrl = "/admin-api/system";

const api = {
	refreshToken() {
		return http.post<{
			data: {
				refreshToken: string;
				accessToken: string;
			};
		}>({
			url:
				"/admin-api/system/auth/refresh-token?refreshToken=" +
				getRefreshToken(),
		});
	},
	captchaApi() {
		return http.post<any>({
			url: "/admin-api/system/captcha/get",
			data: {
				captchaType: "blockPuzzle",
			},
		});
	},
	getIdByNameApi(data: GetIdByNameApiReq) {
		return http.get<any>({
			url:
				"/admin-api/system/tenant/get-id-by-name?name=" +
				data.tenantName,
		});
	},
	loginApi(data: LoginApiReq) {
		return http.post<{ data: LoginApiRes }>({
			url: "/admin-api/system/auth/login",
			data,
		});
	},
	// 获取权限
	getPermissionInfoApi() {
		return http.get<{ data: LoginApiRes }>({
			url: "/admin-api/system/auth/get-permission-info",
		});
	},
	fetchUserPermissions() {
		return http.get<{
			data: { permissions: any; menus: MenuPermissionItem[] };
		}>({
			url: baseUrl + "/auth/get-permission-info",
		});
	},

	getMenuListApi() {
		return http.get<{ data: MenuItemData[] }>({
			url: "/admin-api/system/menu/list",
		});
	},

	//获取滑块图片
	getImageUrlApi() {
		return http.post({
			url: baseUrl + "/auth/imageUrl",
		});
	},

	//获取活块验证成功标志
	getCaptchaApi() {
		return http.post({
			url: baseUrl + "/auth/captcha",
		});
	},

	//获取邮箱验证码
	getLoginCodeApi(params: any = {}) {
		return http.post({
			url: baseUrl + "/captcha/getUc",
			data: params,
		});
	},
	getUserInfoApi(params: GetUserInfoParams) {
		return http.get<{
			data: { deptId: string };
		}>({
			url: "/admin-api/system/user/get",
			params,
		});
	},
};

export default api;
