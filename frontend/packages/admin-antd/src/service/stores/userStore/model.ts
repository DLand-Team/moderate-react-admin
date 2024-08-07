import { PageBaseData } from "src/types/common";

export interface StoreState {
	pageData: PageData;
	loading: boolean;
	isShowDeatilModal: boolean;
	currentData: UserEntity | null;
}
export interface PageData extends PageBaseData {
	dataList: UserEntity[];
}
export interface UserEntity {
	email: string;
	email_verified: true;
	email_verification_token: string;
	last_login: number;
	tutorial_completed: true;
	first_name: string;
	last_name: string;
	nick_name: string;
	password: string;
	postcode: string;
	mobile: string;
	title: string;
	role: number;
	company_name: string;
	stripe_customer_id: string;
	stripe_session_id: string;
	stripe_subscription_id: string;
	hubspotId: string;
	talkjs_token: string;
	metadata: Record<PropertyKey, any>;
	address: Record<PropertyKey, any>;
	wishlist: number[];
	wishlist_deal: number[];
	preferences: number[];
	companies: Record<PropertyKey, any>[];
	company_id: number;
	tags: number[];
	id: number;
	created_at: string;
	updated_at: string;
	deleted_at: string;
}
export type QueryListParams = Partial<{
	ids: number[];
	tags: string[];
	email: string;
	email_verification_token: string;
	company_id: number;
	postcode: string;
	include_deleted: boolean;
	role: number;
	order: {};
	page: number;
	page_size: number;
	with_deleted: true;
	created_at: string[];
	updated_at: string[];
	deleted_at: string[];
}>;
