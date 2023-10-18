import { http } from "@/common/http";

interface LoginApiInput {
	username: string;
	password: string;
}

interface LoginApiOutput {
	token: string;
}

// 更新权限
export function updatePermissions(data: string[]) {
	return http.request({
		url: "/javaApi/user/auth/updatePermissions",
		method: "POST",
		data: {
			permission: JSON.stringify(data),
		},
	});
}

function login(params: LoginApiInput) {
	let temp = {
		email: params.username,
		password: params.password,
	};
	return http.request<LoginApiOutput>({
		url: "/api/auth/login",
		method: "POST",
		data: temp,
	});
}

const userInfoApi = {
	login,
	updatePermissions,
};

export default userInfoApi;
