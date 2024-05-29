import storageHelper from "src/common/utils/storageHelper";
import { dp } from "src/service";
import { AuthHelper } from "src/service/helper";
import { createThunks } from "../../setup";
import names from "../names";
import httpApi from "./api";
import { LoginApiParams } from "./model";

const thunks = createThunks(names.authStore, {
	loginNest: async (arg: LoginApiParams) => {
		// 第一步：登录获取token，并存储
		const {
			data: { content },
		} = await httpApi.loginNestApi(arg);
		// 第二步：根据token获取权限，并存储
		const isAdmin = true;
		dp("authStore", "setUserInfo", {
			userName: arg.username,
			token: content,
			isAdmin: isAdmin,
		});
		storageHelper.setItem("ACCESS_TOKEN", content);
		storageHelper.setItem("IS_ADMIN", isAdmin);
	},
	login: async (arg: LoginApiParams) => {
		// 第一步：登录获取token，并存储
		const {
			data: { accessToken },
		} = await httpApi.loginApi(arg);
		// 第二步：根据token获取权限，并存储
		const isAdmin = true;
		dp("authStore", "setUserInfo", {
			userName: arg.username,
			token: accessToken,
			isAdmin: isAdmin,
		});
		storageHelper.setItem("ACCESS_TOKEN", accessToken);
		storageHelper.setItem("IS_ADMIN", accessToken);
	},
	getUserPermissionsAct: async () => {
		const {
			data: { permissions, menus },
		} = await httpApi.fetchUserPermissions();
		// 需要根据后端的menu权限跟前端的权限结合，生成一个权限数据
		// 生成一个路由数据权限

		const { menuPermissions, routesPermissions } =
			AuthHelper.createRoutesPermissionsByMenu(menus || []);
		// redux存储一下
		menuPermissions &&
			dp("authStore", "setPermissions", {
				menuPermissions,
				permissions,
				routesPermissions,
			});
	},
	updatePermissionsAct: async () => {},
	getImageUrlAct: async () => {
		const { data } = await httpApi.getImageUrlApi();
		dp("authStore", "setImageUrl", data.url);
	},
	getCaptchaAct: async () => {
		const { data } = await httpApi.getCaptchaApi();
		dp("authStore", "setCaptcha", data.captcha);
	},
	getLoginCodeAct: async (arg: any) => {
		const { data } = await httpApi.getLoginCodeApi(arg);
		dp("authStore", "setCodeImg", data);
	},
});
export default thunks;
