export interface IBaseModel {
	id: number;

	created_at: string;

	updated_at: string;

	deleted_at: string;
}
export enum DealStatus {
	PENDING = "pending",
	REJECTED = "rejected",
	// status of business logic
	ACTIVE = "active",
	DEACTIVATED = "deactivated",
	FULLFILLED = "fullfilled",
	FULLY_FUNDED = "fully_funded",
	SOLD_OUT = "sold_out",
	SOLD = "sold",
	// status of suspension
	SUSPENDED = "suspended",
}

export enum DealType {
	CAPITAL_RAISING = "capital_raising",
	EQUITY = "equity",
	STARTUP_PITCH = "startup_pitch",
	PARTNERSHIPS = "partnerships",
	SELL_A_BUSINESS = "sell_a_business",
}

export interface IDealTeamMember {
	name: string;
	title: string;
	description: string;
	image: string;
	level: number; // member of different level will be presented differently on frontend, 0 is the highest level and will be on top of everyone else --- most likely the founder.
}

export interface IDealGeneralComponent {
	title: string;
	sub_title?: string;
	description?: string;
	image?: string[];
	video?: string;
	content?: string;
	name?: string;
}

export interface IDealMedia {
	linkedin: string;
	facebook: string;
	instagram: string;
	related_pages: Array<string>;
}

export interface IDealComponentList {
	pics: Array<string>; // main pics
	video?: Array<string>; // main video

	// general components
	highlights?: string[];
	executive_summary?: IDealGeneralComponent;
	problem_to_be_solved?: IDealGeneralComponent;
	vision?: IDealGeneralComponent;
	product?: IDealGeneralComponent;
	traction?: IDealGeneralComponent;
	business_model?: IDealGeneralComponent;
	funding?: IDealGeneralComponent;
	team?: IDealTeamMember[];

	custormers: IDealGeneralComponent;
	market: IDealGeneralComponent;
	competition: IDealGeneralComponent;
	customers: IDealGeneralComponent;
	media: IDealMedia;
	faq: {
		question: string;
		answer: string;
	}[];
}

export interface IDealUpdateItem {
	event_name: string;
	event_description: string;
	event_date: Date;
	pic_url: string;
}

export interface DealEntity extends IBaseModel {
	type: DealType; // 交易类型 必选

	title: string; // 标题 / 名字 必填

	sub_title: string; // 副标题 / 简介 必填

	logo: string | null; // logo

	vendor_financing: boolean; // 是否提供卖家融资  default: false

	amount: number | null; // 交易金额 必填

	ask_desc: string | null; // 交易描述 必填

	created_at: string;

	expire_at: Date; // 不需要填写 会自动生成

	rating: number; // 评分 0-5 不需要填写 会自动生成

	status: DealStatus; // 状态 不需要填写 会自动生成， 如果被拒绝了 就是rejected， 需要显示 reject_reason， 弄个红色的框体来装内容

	reject_reason: string; // 拒绝理由 这个是审核的时候 如果拒绝了 填写的

	tags?: Array<string> | null; // 标签 暂时不管

	components: IDealComponentList; // 交易的组件列表

	events: Array<IDealUpdateItem>; // 交易的历史信息记录

	attachments: Array<string>; // 交易的附件列表

	reasons: string; // 交易关闭的理由 暂时不管这个字段

	user_id: number; // 交易的创建者 必填

	category_id: number; // 交易所属的分类 必填

	prime_category_name: string; // 交易所属的主分类名称 后端生成 不需要填写

	parent_category_name: string; //  交易所属的父分类名称 后端生成 不需要填写

	sub_category_name: string; // 交易所属的子分类名称 后端生成 不需要填写

	liked: boolean; // 动态字段 用来判断当前用户是否已经把这个交易加入了收藏夹

	last_business_for_sale_reminder_sent_at: Date;

	official_deal_id: number;
}
