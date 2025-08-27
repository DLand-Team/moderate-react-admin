import { PageBaseData } from "src/types/common";

export interface StoreState {
	filterType: FilterType;
	// 用户
	userList: User[];
	userPagination: PageBaseData;
	// 部门（不支持分页）
	deptList: Dept[];
	currentDeptId: number | null;
	userModalType: ModalType;
	currentUser: User | null;
	postList: QueryPostListApiRes;
}

export enum ModalType {
	ADD = "add",
	EDIT = "edit",
	NONE = "",
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
	postIds: string | null;
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

export interface Pos {
	id: number;
	name: string;
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
