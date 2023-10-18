export interface sectsPageStoreState {
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
	abn: string;
	created_at: Date;
	deleted_at: Date;
	employee_count: EmployeeCount;
	id: number;
	metadata?: ICompanyMetadata;
	name: string;
	organization_type: OrganizationType;
	plan?: ICompanyPlan;
	primary_user_id: number;
	slug: string;
	status: Status;
	type: Type;
	updated_at: Date;
}

export enum EmployeeCount {
	The1000 = "1000+",
	The101500 = "101-500",
	The110 = "1-10",
	The1150 = "11-50",
	The5011000 = "501-1000",
	The51100 = "51-100",
}

/**
 * ICompanyMetadata
 */
export interface ICompanyMetadata {
	address: { [key: string]: any };
	banner: string;
	description: string;
	logo: string;
	website: string;
}

export enum OrganizationType {
	Company = "COMPANY",
	Government = "GOVERNMENT",
	NaturalEntity = "NATURAL_ENTITY",
	Nonprofit = "NONPROFIT",
	Other = "OTHER",
	Researcher = "RESEARCHER",
	SoleTrader = "SOLE_TRADER",
}

/**
 * ICompanyPlan
 */
export interface ICompanyPlan {
	category_id: number;
	geo_scope: GeoScope;
	geo_scope_detail: string;
	sub_category_id: number;
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
	Suspended = "suspended",
}

export enum Type {
	Member = "member",
	MemberDefault = "member_default",
	Partner = "partner",
}

export interface QueryActParams {
	abn?: string;
	created_at?: string[];
	deleted_at?: string[];
	employee_count?: EmployeeCount;
	ids?: number[];
	order?: { [key: string]: any };
	organization_type?: OrganizationType;
	page?: number;
	page_size?: number;
	type?: Type;
	updated_at?: string[];
}
