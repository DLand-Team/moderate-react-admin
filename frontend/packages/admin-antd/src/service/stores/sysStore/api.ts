import http from "src/common/http";
import {
	QueryDeptListApiRes,
	QueryPostListApiRes,
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
	queryPostListApi() {
		return http.get<QueryPostListApiRes>({
			url: "/admin-api/system/post/simple-list",
		});
	},
	// /admin-api/system/user/delete?id=139
	deleteUserApi(params: { id: number }) {
		return http.delete({
			url: `/admin-api/system/user/delete`,
			params,
		});
	},
	// /admin-api/system/user/update-password
	updateUserPasswordApi(data: { id: number; password: string }) {
		return http.put({
			url: `/admin-api/system/user/update-password`,
			data,
		});
	},
};

export default devApi;
