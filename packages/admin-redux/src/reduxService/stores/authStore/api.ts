// import { http } from "@/common/http";

import { UUID } from "@/common/utils";
export interface LoginApiParams {
	userName: string;
	password: string;
}
function loginApi(_: LoginApiParams) {
	return Promise.resolve({
		data: {
			token: UUID(),
		},
	});
	// return http.request({
	// 	url: "/javaApi/user/auth/updatePermissions",
	// 	method: "POST",
	// 	data: {
	// 		permission: JSON.stringify(params),
	// 	},
	// });
}

const api = {
	loginApi,
};

export default api;
