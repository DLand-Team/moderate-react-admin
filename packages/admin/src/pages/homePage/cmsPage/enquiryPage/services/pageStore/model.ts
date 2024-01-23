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
	company: string;
	connected_at?: Date;
	content?: string;
	created_at: Date;
	deleted_at: Date;
	email: string;
	finished_at?: Date;
	id: number;
	mobile: string;
	opportunity_id: number;
	status: Status;
	title: string;
	updated_at: Date;
	user_id: number;
}

export enum Status {
	Closed = "closed",
	Connected = "connected",
	Finished = "finished",
	Open = "open",
	Pending = "pending",
}

export interface QueryActParams {
	connected_at?: string[];
	created_at?: string[];
	deleted_at?: string[];
	finished_at?: string[];
	id?: number;
	include_deleted?: boolean;
	opportunity_ids?: number[];
	order?: { [key: string]: any };
	page?: number;
	page_size?: number;
	status?: Status;
	title?: string;
	updated_at?: string[];
	user_ids?: number[];
}
