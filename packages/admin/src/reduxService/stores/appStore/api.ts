// import { http } from "src/common/http";

function geoQueryApi(params: { id: string }) {
	return Promise.resolve({});
	// return http.request({
	// 	url: "/javaApi/user/auth/setPermissions",
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
