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
	formVersion:string;
    pageSum:number;
}

export interface PageType {
	address?: { [key: string]: any };
    companies?: { [key: string]: any }[];
    company_id?: number;
    created_at: Date;
    deleted_at: Date;
    email: string;
    first_name: string;
    hubspotId?: string;
    id: number;
    last_name: string;
    metadata?: { [key: string]: any };
    mobile?: string;
    nick_name: string;
    password: string;
    postcode?: string;
    role: Role;
    stripe_customer_id?: string;
    stripe_session_id?: string;
    stripe_subscription_id?: string;
    updated_at: Date;
    wishlist?: number[];
}

export enum Role {
    Admin = "admin",
    Member = "member",
    Partner = "partner",
}


export interface QueryActParams {
	company_id?: number;
    created_at?: string[];
    deleted_at?: string[];
    email?: string;
    ids?: number[];
    include_deleted?: boolean;
    order?: { [key: string]: any };
    page?: number;
    page_size?: number;
    postcode?: string;
    role?: Role;
    updated_at?: string[];
}
