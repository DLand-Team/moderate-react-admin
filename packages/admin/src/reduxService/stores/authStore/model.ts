export type PermissionItem = string;
export interface StoreState {
	userName: string;
	token: string;
	isAdmin: boolean;
	qiniuToken: string;
	permissions: string[];
	menuPermissions: MenuPermissionItem;
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
	componentName: string;
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
