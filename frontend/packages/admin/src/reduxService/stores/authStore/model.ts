import { ROUTE_ID_KEY } from "src/config/types";

export type PermissionItem = string;
export interface StoreState {
	userName: string;
	token: string;
	isAdmin: boolean;
	qiniuToken: string;
	permissions: ROUTE_ID_KEY[];
	menuPermissions: MenuPermissionItem | null;
	routesPermissions: string[];
}

export interface LoginApiParams {
	username: string;
	password: string;
	captchaVerification?: string;
}
export interface MenuPermissionItem {
	id: number;
	parentId: number;
	name: string;
	path: string;
	component: string;
	componentName: ROUTE_ID_KEY;
	icon: string;
	visible: boolean;
	keepAlive: boolean;
	alwaysShow: boolean;
	children: MenuPermissionItem[];
}
export interface FetchUserPermissinsRes {
	permissions: string[];
	menus: MenuPermissionItem;
}
