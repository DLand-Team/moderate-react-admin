import { http } from "@/common/http";
import { UUID } from "@/common/utils";

interface LoginApiInput {
	username: string;
	password: string;
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
	return {
		data: {
			content: UUID(),
		},
	};
}

const userInfoApi = {
	login,
	updatePermissions,
};

export default userInfoApi;
