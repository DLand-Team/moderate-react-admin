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
    userId: string;
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
