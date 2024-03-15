import { http } from "src/common/http";

import { LoginApiParams, MenuPermissionItem } from "./model";

function loginApi(params: LoginApiParams) {
	return http.request({
		url: "/admin-api/system/auth/login",
		method: "POST",
		data: params,
	});
}
function fetchUserPermissins() {
	return http.request<{ permissions: any; menus: MenuPermissionItem[] }>({
		url: "/admin-api/system/auth/get-permission-info",
		method: "GET",
	});
}

const api = {
	loginApi,
	fetchUserPermissins,
};

export default api;
