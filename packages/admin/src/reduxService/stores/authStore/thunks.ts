import { dp, routerHelper } from "src/reduxService";
import { createThunks } from "../../setup";
import names from "../names";
import httpApi from "./api";
import storageHelper from "src/common/utils/storageHelper";
import { LoginApiParams } from "./model";
import { RouterHelper } from "src/reduxService/helper/routerHelper";

const thunks = createThunks(names.authStore, {
	login: async (arg: LoginApiParams, api) => {
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
	getUserPermissionsAct: async (arg: any, api) => {
		const {
			data: { permissions, menus },
		} = await httpApi.fetchUserPermissins();
		const menuPermissions = menus.find((item) => {
			return item.path == "/usercenter";
		});
		// 需要根据后端的menu权限跟前端的权限结合，生成一个权限数据
		// 生成一个路由数据权限
		const { routesPermissions } =
			RouterHelper.createMenuDataLoopByPermissions(
				menuPermissions.children,
				[],
				[],
			);
		// 持久化一下
		storageHelper.setItem(
			"MENU_DATA",
			menuPermissions ? menuPermissions : [],
		);
		storageHelper.setItem("PERMISSIONS_DATA", permissions);
		// redux存储一下
		dp("authStore", "setPermissions", {
			menuPermissions,
			permissions,
			routesPermissions,
		});
	},
	updatePermissionsAct: async (arg: any, api) => {},
});
export default thunks;
