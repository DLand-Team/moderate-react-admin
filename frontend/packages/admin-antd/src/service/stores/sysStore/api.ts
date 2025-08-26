import http from "src/common/http";
import {
	QueryDeptListApiRes,
	QueryUserListApiReq,
	QueryUserListApiRes,
	User,
} from "./model";

const devApi = {
	queryUserListApi(data: Partial<QueryUserListApiReq>) {
		return http.get<QueryUserListApiRes>({
			url: "/admin-api/system/user/page",
			params: data,
		});
	},
	queryDeptListApi() {
		return http.get<QueryDeptListApiRes>({
			url: "/admin-api/system/dept/simple-list",
		});
	},
	updateUserApi(data: Partial<User>) {
		return http.put<QueryDeptListApiRes>({
			url: "/admin-api/system/user/update",
			data,
		});
	},
	createUserApi(data: Partial<User>) {
		return http.post<QueryDeptListApiRes>({
			url: "/admin-api/system/user/create",
			data,
		});
	},
	queryUserApi(params: { id: number }) {
		return http.get<User>({
			url: `/admin-api/system/user/get`,
			params,
		});
	},
};

export default devApi;
