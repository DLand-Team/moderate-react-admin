export interface StoreState {
	routePageList: string[];
	pageList: PageType[];
	storeList: CommonType[];
	apiList: CommonType[];
	total: number;
	pageSize: number;
	pageNum: number;
}
export interface PageType {
	id: string;
	name: string;
	path: string;
	active: boolean;
}

export interface CommonType {
	name: string;
	id: string;
}
// 接口
export interface AdcompanyPageParams {
	pageName: string;
	pagePath: string;
	pageRemark: string;
}

export interface AddStoreParams {
	name: string;
	path: string;
	remark?: string;
}

export interface FetchPageListRes {
	pageList: PageType[];
	exportList: string[];
}

export interface FetchStoreListRes {
	list: CommonType[];
}
