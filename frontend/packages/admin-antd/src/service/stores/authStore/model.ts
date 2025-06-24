import { ROUTE_ID_KEY } from "src/router";

export type PermissionItem = string;
export interface StoreState {
	userName: string;
	token: string;
	qiniuToken: string;
	permissions: ROUTE_ID_KEY[];
	menuPermissions: MenuPermissionItem | null;
	routesPermissions: string[];
	locale: string;
	btnCon: string;
	btnTime: number;
	imgUrl: string;
	captcha: string;
	codeImg: string;
	captchaVerification: string;
	demoData: DemoData | null;
	userId: number | null;
	menuTreeData: MenuItemData[] | null;
	menuListData: MenuItemData[] | null;
	modalType: ModalType;
}
export interface LoginNestApiParams {
	username: string;
	password: string;
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

export interface RefreshTokenRes {
	accessToken: string;
	refreshToken: string;
	userId?: string;
}

export interface DemoData {
	url: string;
	sname: string;
	spswd: string;
	userType: string;
	officeType: string;
}

export interface GetUserInfoParams {
	id: string;
}

// 业务模型

export type ModalType = "add" | "edit" | "";
export interface MenuItemData {
	alwaysShow: boolean;
	component: string;
	componentName: string;
	createTime: number;
	icon: string;
	id: number;
	key: string;
	keepAlive: boolean;
	name: string;
	parentId: number;
	path: string;
	permission: string;
	sort: number;
	status: number;
	type: number;
	visible: boolean;
}

// 接口参数
export interface LoginApiReq {
	password: string;
	rememberMe: boolean;
	tenantName?: string;
	username: string;
}

export interface LoginApiRes {
	userId: number;
	accessToken: string;
	refreshToken: string;
	expiresTime: number;
}

export interface GetIdByNameApiReq {
	tenantName: string;
}
