import { DealEntity } from "@/types/deal";

export interface StoreState {
	dataList: PageType[];
	total: number;
	pageSize: number;
	pageNum: number;
	isShowAddModal: boolean;
	isUpdate: boolean;
	recordData: DealEntity;
	loading: boolean;
	isDetail: boolean;
	formVersion: string;
}

export interface PageType extends DealEntity {
	id: number;
	is_draft: boolean;
	priority: number;
	is_submitted: boolean;
	is_approved: boolean;
	liked: boolean;
}

export interface QueryActParams {
	created_at?: string[];
	deleted_at?: string[];
	expire_at?: string[];
	ids?: number[];
	is_approved?: boolean;
	is_draft?: boolean;
	is_submitted?: boolean;
	official_deal_id?: number;
	page?: number;
	page_size?: number;
	status?: Status;
	title?: string;
	type?: TypeEnum;
	updated_at?: string[];
	user_id?: number;
	with_deleted?: boolean;
}

export enum Status {
	Active = "active",
	Deactivated = "deactivated",
	Fullfilled = "fullfilled",
	FullyFunded = "fully_funded",
	Pending = "pending",
	Rejected = "rejected",
	Sold = "sold",
	SoldOut = "sold_out",
	Suspended = "suspended",
}

export enum TypeEnum {
	CapitalRaising = "capital_raising",
	Equity = "equity",
	Partnerships = "partnerships",
	SellABusiness = "sell_a_business",
	StartupPitch = "startup_pitch",
}
