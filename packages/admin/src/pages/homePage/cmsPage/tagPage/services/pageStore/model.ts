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
    currentTypeId:number|string
}

export interface PageType {
	created_at: Date;
    deleted_at: Date;
    description?: string;
    id: number;
    name: string;
    target_id: number;
    type: Type;
    updated_at: Date;
}
export enum Type {
    Category = "category",
    Company = "company",
    Empty = "empty",
    Opportunity = "opportunity",
    User = "user",
}

export interface QueryActParams {
	created_at?: string[];
    deleted_at?: string[];
    description?: string;
    ids?: number[];
    names?: string[];
    order?: { [key: string]: any };
    page?: number;
    page_size?: number;
    target_id?: number;
    type?: Type;
    updated_at?: string[];
}
