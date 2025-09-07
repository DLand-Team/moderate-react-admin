import { PageBaseData } from "src/types/common";

export interface StoreState {
	filterType: FilterType;
	// 用户
	userList: User[];
	userPagination: PageBaseData;
	// 角色
	roleList: Role[];
	rolePagination: PageBaseData;
	// 部门（不支持分页）
	deptList: Dept[];
	currentDeptId: number | null;
	userModalType: ModalType;
	roleModalType: RoleModalType;
	currentUser: User | null;
	currentRole: Role | null;
	postList: Pos[];
	activedMenuList: MenuItem[];
	activedMenuTree: MenuItem[];
	roleMenuPermissions: Number[]; // 当前角色的菜单权限
	currentUserRole: number | null;
	userRoleList: Role[];
	currentUserRoles: number[];
}

// 菜单

export interface MenuItem {
	id: number;
	key: any;
	name: string;
	parentId: number;
	type: number;
	children?: MenuItem[];
}
export enum RoleModalType {
	ADD = "add",
	EDIT = "edit",
	MENU = "menu",
	DATA = "data",
	NONE = "",
}
export enum ModalType {
	ADD = "add",
	EDIT = "edit",
	NONE = "",
	ROLE = "role",
}

export enum FilterType {
	ALL = "all",
	ACTIVED = "actived",
}

// 用户
export interface User {
	avatar: string;
	createTime: number;
	deptId: number | null;
	deptName: string | null;
	email: string;
	id: number;
	loginDate: number;
	loginIp: string;
	mobile: string;
	nickname: string;
	postIds: number[] | undefined;
	remark: string | null;
	sex: number;
	status: number;
	username: string;
}

// 部门
export interface Dept {
	id: number;
	name: string;
	parentId: number;
}

// 职位
export interface Pos {
	id: number;
	name: string;
}

// 角色

export interface Role {
	code: string;
	createTime: number;
	dataScope: number;
	dataScopeDeptIds: number[];
	id: number;
	name: string;
	remark: string;
	sort: number;
	status: number;
	type: number;
}

// 接口参数
export interface QueryUserListApiReq extends PageBaseData {
	deptId?: number;
}
export interface QueryUserListApiRes {
	list: User[];
	total: number;
}

export type QueryDeptListApiRes = Dept[];

export type QueryPostListApiRes = Pos[];

export interface QueryRoleListApiReq extends PageBaseData {
	code?: string;
	name?: string;
}
export interface QueryRoleListApiRes {
	list: Role[];
	total: number;
}

export interface QueryRoleMenuPermissionsApiReq {
	roleId: number;
}
export type QueryRoleMenuPermissionsApiRes = Number[];

export interface QueryMenuListApiReq {
	id: number;
	name: string;
	checked: boolean;
}

export interface QueryMenuListApiRes {
	id: number;
	name: string;
	checked: boolean;
}
export interface QueryRoleApiReq {
	id: number;
}

export interface AssignUserRoleApiReq {
	userId: number;
	roleIds: number[];
}
