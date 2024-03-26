export interface StoreState {
	isShowModal: boolean;
	posList: Pos[];
	posItemList: PosItem[];
	posTablePagedata: {
		total: number;
		pageSize: number;
		pageNum: number;
	};
	posItemTablePagedata: {
		total: number;
		pageSize: number;
		pageNum: number;
	};
	loading: boolean;
	posCarrierList: PosCarrier[];
	id: string | number;
	posData: Pos | null; // 添加的posData
	locationList: Record<PropertyKey, any[]>;
}

export interface PageType {
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

export interface PosCarrier {
	id: number;
	carrier: string;
	type: number;
	deleted: boolean;
}

export interface GetAgencyDataApiParams {
	posType: string;
	posInfo: string;
	officeOwner: string;
	agentOrAirline: string;
}
export interface PosItem {
	createTime: string;
	updateTime: string;
	creator: string;
	updater: string;
	deleted: true;
	id: number;
	posInfo: string;
	posType: string;
	agentOrAirline: string;
	officeOwner: string;
	exclude: string;
	weight: number;
	posId: number;
	key?: string;
}
export interface Pos {
	id: number;
	posName: string;
	ownerId: string;
	comment: string;
	cpdPosItems: PosItem[];
}

export interface GetPosListApiParams {
	pageNo: string | number;
	pageSize: string | number;
	posName?: string | number;
}
