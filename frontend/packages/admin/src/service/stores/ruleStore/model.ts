export interface StoreState {
	ruleList: Rule[];
	ruleItemList: RuleItem[];
	filterData: FilterData;
	ruleTablePagedata: {
		total: number | string;
		pageSize: number | string;
		pageNum: number | string;
	};
	ruleItemTablePagedata: {
		total: number;
		pageSize: number;
		pageNum: number;
	};
	loading: boolean;
	ruleCarrierList: RuleCarrier[];
	id: string | number;
	currentData: Rule | null; // 添加的ruleData
	currentNewData: Rule | null; // 添加的ruleData
	currentDetailData: Rule | null; // 添加的ruleData
	locationList: Record<PropertyKey, any[]>;
	targetRankId: number;
	targetItineraryId: number;
	ruleDataPart1: any;
	itineraryList: RuleItineraryItem[];
	itByRankList: RuleItineraryItem[][];
	conByPosList: Connection[][];
	segByPosList: Segment[][];
	isEditing: boolean;
	isAddItemDrawerFlag: boolean;
	addItemType: AddItemDrawerType | "";
	isDetail?: boolean;
}
export enum AddItemDrawerType {
	market,
	pos,
	sort,
	filter,
}
export type FilterData = Partial<
	Omit<GetRuleListApiParams, "pageNo" | "pageSize">
>;

export interface FilterData1 {
	ruleName: string;
	applyProduct: string;
	status: string;
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

export interface RuleCarrier {
	id: number;
	carrier: string;
	type: number;
	deleted: boolean;
}

export interface GetAgencyDataApiParams {
	ruleType: string;
	ruleInfo: string;
	officeOwner: string;
	agentOrAirline: string;
}
export interface RuleItem {
	createTime: string;
	updateTime: string;
	creator: string;
	updater: string;
	deleted: true;
	id: number;
	ruleInfo: string;
	ruleType: string;
	agentOrAirline: string;
	officeOwner: string;
	exclude: string;
	weight: number;
	ruleId: number;
	key?: string;
}
export interface Rule {
	id: number;
	ruleName: string;
	ownerId: string;
	comment: string;
	status: number;
	sequenceNo: number;
	fareAllowedCarriers: string;
	oriMarketId: number;
	desMarketId: number;
	posId: number;
	effectStartDate: string;
	effectEndDate: string;
	applyProduct: number;
	sortItemId: number;
	filterItemId: number;
	backupResult: number;
	cpdRuleItinerarys: RuleItineraryItem[];
}

export interface RuleItineraryItem {
	id: number;
	rankId: number;
	flightCategory: number;
	carrier: string;
	operateCarriers: string;
	notOperateCarriers: string;
	allowCodeShare: number;
	segmentNum: number;
	ruleId: number;
	noInterline: boolean;
	noOverNight: boolean;
	cpdConnectionList: Partial<Connection>[];
	cpdSegmentList: Partial<Segment>[];
	uid?: string;
}

export interface DeleteConnectionByPosActPayload {
	id?: string | number;
	position?: number;
}
export interface ParamsById {
	id: string | number;
}
export interface Connection {
	createTime: string;
	updateTime: string;
	creator: string;
	updater: string;
	deleted: boolean;
	id: number | string;
	exclude: boolean;
	position: number;
	mct: number;
	maxConxTime: number;
	itineraryId: number;
	ruleId: number;
	key?: string;
	uid?: string;
}
export interface Segment {
	createTime: string;
	updateTime: string;
	creator: string;
	updater: string;
	deleted: boolean;
	id: number;
	exclude: boolean;
	position: number;
	carrier: string;
	operateCarriers: string;
	notOperateCarriers: string;
	allowCodeShare: number;
	flightNoStart: number;
	flightNoEnd: number;
	itineraryId: number;
	onlyNonStopFlight: number;
	key?: string;
	uid?: string;
}

// 删除api的参数
export interface DeleteApiParams {
	ids: number[];
}

// 查api的参数
export interface GetRuleListApiParams {
	pageNo: string | number;
	pageSize: string | number;
	ruleName?: string | number;
	ownerId?: string;
	sequenceNo?: string;
	fareAllowedCarriers?: string;
	oriRuleId?: string;
	desRuleId?: string;
	posId?: string;
	effectStartDate?: string;
	effectEndDate?: string;
	applyProduct?: string;
	status?: string;
	comment?: string;
	sortItemId?: string;
	filterItemId?: string;
	backupResult?: string;
}
// 查rule详情的参数
export interface GetRuleDetailApiParams {
	id?: number | string | null;
}
