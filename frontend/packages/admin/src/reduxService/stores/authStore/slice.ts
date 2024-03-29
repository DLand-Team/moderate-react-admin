import { PayloadAction, createSliceCustom } from "redux-eazy";
import storageHelper from "src/common/utils/storageHelper";
import { ROUTE_INFO_CONFIG } from "src/config/routerConfig";
import names from "../names";
import { MenuPermissionItem, StoreState } from "./model";
import { ROUTE_ID_KEY } from "src/config/types";

const initialState = (): StoreState => {
	const defaultPermissions = Object.values(ROUTE_INFO_CONFIG)
		.filter((item) => {
			return item.isNoAuth;
		})
		.map((item) => {
			return item.id!;
		});
	return {
		userName: "",
		token: storageHelper.getItem("ACCESS_TOKEN") || "",
		isAdmin: storageHelper.getItem("IS_ADMIN") || false,
		qiniuToken: "",
		permissions: defaultPermissions!,
		routesPermissions: defaultPermissions,
		menuPermissions: null,
	};
};

const slice = createSliceCustom({
	name: names.authStore,
	stateInit: initialState,
	reducers: {
		setUserInfo(
			state,
			{
				payload,
			}: PayloadAction<
				Pick<StoreState, "token" | "isAdmin" | "userName">
			>,
		) {
			;
			return {
				...state,
				...payload,
			};
		},
		// 设置后端传过来的原始权限数据
		setPermissions(
			state,
			{
				payload,
			}: PayloadAction<{
				menuPermissions: MenuPermissionItem;
				permissions: ROUTE_ID_KEY[];
				routesPermissions: string[];
			}>,
		) {
			// 菜单权限
			state.menuPermissions = payload.menuPermissions;
			// 路由权限
			state.routesPermissions = payload.routesPermissions;
			// 按钮权限
			state.permissions = payload.permissions;
		},
		// 设置路由权限数据
		setRoutesPermissions(state, { payload }: PayloadAction<string[]>) {
			state.routesPermissions = [...state.routesPermissions, ...payload];
		},
	},
});

export default slice;
