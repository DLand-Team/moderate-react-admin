import http from "src/common/http";
import {
	MenuItem,
	QueryDeptListApiRes,
	QueryMenuListApiRes,
	QueryPostListApiRes,
	QueryRoleApiReq,
	QueryRoleListApiReq,
	QueryRoleListApiRes,
	QueryRoleMenuPermissionsApiReq,
	QueryRoleMenuPermissionsApiRes,
	QueryUserListApiReq,
	QueryUserListApiRes,
	Role,
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
	deleteUserApi(params: { id: number }) {
		return http.delete({
			url: `/admin-api/system/user/delete`,
			params,
		});
	},
	updateUserPasswordApi(data: { id: number; password: string }) {
		return http.put({
			url: `/admin-api/system/user/update-password`,
			data,
		});
	},
	queryRoleListApi(data: Partial<QueryRoleListApiReq>) {
		return http.get<QueryRoleListApiRes>({
			url: `/admin-api/system/role/page`,
			params: data,
		});
	},

	// Role-related APIs
	queryRoleApi(params: QueryRoleApiReq) {
		return http.get<Role>({
			url: `/admin-api/system/role/get`,
			params,
		});
	},
	createRoleApi(data: Partial<Role>) {
		return http.post({
			url: `/admin-api/system/role/create`,
			data,
		});
	},
	deleteRoleApi(data: { id: number }) {
		return http.delete({
			url: `/admin-api/system/role/delete`,
			data,
		});
	},
	updateRoleApi(data: Partial<Role>) {
		return http.put({
			url: `/admin-api/system/role/update`,
			data,
		});
	},
	queryRoleMenuPermissionsApi(params: QueryRoleMenuPermissionsApiReq) {
		return http.get<QueryRoleMenuPermissionsApiRes>({
			url: `/admin-api/system/permission/list-role-menus`,
			params,
		});
	},
	queryMenuListApi() {
		return http.get<MenuItem[]>({
			url: `/admin-api/system/menu/simple-list`,
		});
	},
	// /system/permission/assign-role-menu
	assignRoleMenuApi(data: { roleId: number; menuIds: number[] }) {
		return http.post({
			url: `/admin-api/system/permission/assign-role-menu`,
			data,
		});
	},
};

export default devApi;
