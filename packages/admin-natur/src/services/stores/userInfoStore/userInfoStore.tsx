// 用户信息仓库，信息包括：
// token：登录凭证
// isAdmin：是否是管理员，最高权限，直接跳过权限校验
import action from "./userInfoStore.action";
import type { UseInfoStoreState } from "./userInfoStore.model";

// 状态初始化函数
// 写成函数，方便初始化
export const initState = (): UseInfoStoreState => {
	let permissions: string[] =
		JSON.parse(sessionStorage.getItem("PERMISSIONS")) || [];

	return {
		permissions,
		userName: "",
		password: "",
		token: sessionStorage.getItem("ACCESS_TOKEN") || "",
		isAdmin: sessionStorage.getItem("IS_ADMIN") === "1",
		qiniuToken: sessionStorage.getItem("QINIU_TOKEN") || "",
	};
};

const userInfoStore = {
	state: initState(),
	actions: {
		...action,
		init: initState,
	},
};

export default userInfoStore;
