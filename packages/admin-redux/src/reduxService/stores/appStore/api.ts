// import { http } from "@/common/http";

function geoQueryApi(params: { id: string }) {
	return Promise.resolve({});
	// return http.request({
	// 	url: "/javaApi/user/auth/updatePermissions",
	// 	method: "POST",
	// 	data: {
	// 		permission: JSON.stringify(params),
	// 	},
	// });
}

const api = {
	geoQueryApi,
};

export default api;
