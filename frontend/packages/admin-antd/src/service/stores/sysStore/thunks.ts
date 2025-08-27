import { createThunks, dpChain } from "src/service";
import api from "./api";
import { QueryUserListApiReq, User } from "./model";

const thunks = createThunks("sysStore", {
	async queryUserListAct(req: Partial<QueryUserListApiReq>, store) {
		const { userPagination } = store.getState().sysStore;
		const { data: { list = [], total = 0 } = {} } =
			await api.queryUserListApi({ ...userPagination, ...req });

		dpChain("sysStore").setUserList({
			list: list,
			total,
		});
	},
	async queryDeptListAct() {
		const { data } = await api.queryDeptListApi();
		dpChain("sysStore").setDeptList(data);
	},
	async queryUserAct(data: { id: number }) {
		const { data: userData } = await api.queryUserApi(data);
		dpChain("sysStore").setCurrentUser(userData);
	},
	async updateUserAct(data: Partial<User>) {
		await api.updateUserApi(data);
	},
	async createUserAct(data: Partial<User>) {
		await api.createUserApi(data);
	},
	async queryPostListAct() {
		const { data } = await api.queryPostListApi();
		dpChain("sysStore").setPostList(data);
	},
	async deleteUserAct(data: { id: number }) {
		await api.deleteUserApi(data);
	},
	async updateUserPasswordAct(data: { id: number; password: string }) {
		await api.updateUserPasswordApi(data);
	},
});
export default thunks;
