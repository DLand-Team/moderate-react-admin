export interface IBaseModel {
	id: number;

	created_at: string;

	updated_at: string;

	deleted_at: string;
}

export enum DealStatus {
	PENDING = "pending",
	DRAFTING = "drafting",
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
	ALL = "",
	PARTNERSHIPS = "partnerships",
	CAPITAL_RAISING = "capital_raising",
	STARTUP_PITCH = "startup_pitch",
	EQUITY = "equity",
	SELL_A_BUSINESS = "sell_a_business",
}

export interface IAskInfo {
	partnerships: {
		partners: Array<string>;
	};

	sell_a_business: {
		amount: number;
		vendor_finance: boolean;
	};

	capital_raising: {
		amount: number;
	};

	startup_pitch: {
		amount: number;
		usage: string;
		partners: Array<string>;
	};

	equity: {
		amount: number;
		usage: string;
		partners: Array<string>;
	};
}

export interface IDealMedia {
	linkedin: string;
	facebook: string;
	instagram: string;
	file: Array<string>;
}

export interface IDealTeamMember {
	name: string;
	title: string;
	image: string;
}

export interface IDealComponentList {
	// general components
	business_name: string;
	business_website: string;

	problem_to_be_solved?: string;
	solution?: string;
	achivement?: string;
	business_model?: string;
	funding?: string;
}

export interface IDealUpdateItem {
	event_name: string;
	event_description: string;
	event_date: Date;
	pic_url: string;
}

export interface IDealFaqComponent {
	question: string;
	answer: string;
}

export interface IDealTeamMemberList {
	team: Array<IDealTeamMember>;
}

export interface IDealFaqComponentList {
	faq: Array<IDealFaqComponent>;
}

export interface DealEntity extends IBaseModel {
	// used for search
	priority: number;

	// flags
	is_draft: boolean;

	is_submitted: boolean;

	is_approved: boolean;
	// end of flags

	// core fields (step 1 - step 7)
	type: DealType;

	title: string;

	industry: string;

	overview: string;

	address: string;

	ask: IAskInfo;

	highlights: Array<string>;

	// step 7 pics and logo(logo is optional)
	pics: Array<string>; // main pics

	logo: string;
	// end of core fields

	// optional fields (step 9)
	components: IDealComponentList;

	teams: Array<IDealTeamMember>;

	documents_social: IDealMedia;

	faq: Array<IDealFaqComponent>;
	// all steps finished

	// additional fields
	expire_at: Date;

	// search related
	rating: number;

	status: DealStatus;

	reject_reason: string;

	tags?: Array<string>;

	reasons: string;

	last_business_for_sale_reminder_sent_at: Date;

	// relations, loose coupled, avoid strong relations
	user_id: number;

	category_id: number;

	official_deal_id: number;

	// additional fields used for fast loading instead of has to do multiple joins, trade off is data duplication
	prime_category_name: string;

	parent_category_name: string;

	sub_category_name: string;

	// liked field is used to indicate if the deal is in user's likelist, the value will be determined dynamically after query in marketplace / detail page
	liked: boolean;

	// draft_step is used to indicate the current step of the deal, the value will be determined dynamically after query in marketplace / detail page
	draft_step: number;
}

export interface IDealCreationModel {
	type: DealType;

	title: string;

	industry: string;
}

export interface IDealUpdateModel {
	id?: number;

	type: DealType;

	title: string;

	industry: string;

	overview?: string;

	address?: string;

	ask?: IAskInfo;

	highlights?: Array<string>;

	pics?: Array<string>;

	logo?: string;

	components?: IDealComponentList;

	teams?: IDealTeamMemberList;

	faq?: IDealFaqComponentList;

	documents_social?: IDealMedia;

	prime_category_name: string;
}
