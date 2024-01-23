export interface StoreState {
	dataList: PageType[];
	total: number;
	pageSize: number;
	pageNum: number;
	isShowAddModal: boolean;
	isUpdate: boolean;
	recordData: unknown;
	loading: boolean;
	isDetail: boolean;
}

export interface PageType {
	category_id: number;
	company_id: number;
	country: string;
	created_at: Date;
	deleted_at: Date;
	discount: number;
	geo_scope: GeoScope;
	id: number;
	marketPrice: number;
	pics: string[];
	postcode: string;
	priority: number;
	rating: number;
	region: string;
	reject_reason: string;
	scalingPrice: number;
	scalingPriceDesc: string;
	state: string;
	status: Status;
	tags: string[];
	tier: number;
	title: string;
	updated_at: Date;
	value_driven: boolean;
}

export enum GeoScope {
	Local = "LOCAL",
	National = "NATIONAL",
	Region = "REGION",
	State = "STATE",
}

export enum Status {
	Active = "active",
	Pending = "pending",
	Rejected = "rejected",
	Suspended = "suspended",
}

export interface QueryActParams {
	categories?: number[];
	company_id?: number;
	created_at?: string[];
	deleted_at?: string[];
	geo_scope?: GeoScope;
	ids?: number[];
	include_deleted?: boolean;
	national?: boolean;
	order?: { [key: string]: any };
	page?: number;
	page_size?: number;
	postcode?: string;
	rating?: number;
	region?: string;
	state?: string;
	status?: Status;
	tags?: string[];
	title?: string;
	updated_at?: string[];
	value_driven?: boolean;
}
