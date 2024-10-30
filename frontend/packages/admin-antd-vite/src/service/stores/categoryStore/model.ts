export interface StoreState {
	pageData: PageData;
	isShowAddModal: boolean;
	isUpdate: boolean;
	currentData: unknown;
	loading: boolean;
	isDetail: boolean;
	formVersion: string;
}

export interface PageData {
	dataList: Category[];
	pageSize: number;
	pageNum: number;
	total: number;
}

export interface Category {
	created_at: Date;
	deleted_at: Date;
	description: string;
	id: number;
	name: string;
	parent_id: number;
	prime_id: number;
	updated_at: Date;
}

export interface QueryActParams {
	created_at?: string[];
	deleted_at?: string[];
	ids?: number[];
	names?: string[];
	order?: { [key: string]: any };
	page?: number;
	page_size?: number;
	parrent_id?: number;
	prime_id?: number;
	updated_at?: string[];
}
