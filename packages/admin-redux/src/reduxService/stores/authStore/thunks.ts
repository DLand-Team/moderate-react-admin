import { dp } from "@/reduxService";
import { createThunks } from "../../setup";
import names from "../names";
import httpApi, { LoginApiParams } from "./api";
import storageHelper from "@/common/utils/storageHelper";

const thunks = createThunks(names.appStore, {
	login: async (arg: LoginApiParams, api) => {
		// 第一步：登录获取token，并存储
		const {
			data: { token },
		} = await httpApi.loginApi(arg);
		// 第二步：根据token获取权限，并存储
		const isAdmin = true;
		dp("authStore", "setUserInfo", {
			userName: arg.userName,
			token: token,
			isAdmin: isAdmin,
		});
		storageHelper.setItem("ACCESS_TOKEN", token);
		storageHelper.setItem("IS_ADMIN", token);
	},
	updatePermissionsAct: async (arg: any, api) => {},
});
export default thunks;
