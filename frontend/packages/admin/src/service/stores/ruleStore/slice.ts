import { PayloadAction } from "redux-eazy";
import { RuleHelper } from "src/service";
import { createSlice } from "src/service/setup";
import {
	AddItemDrawerType,
	Connection,
	FilterData,
	Rule,
	RuleCarrier,
	RuleItineraryItem,
	Segment,
	StoreState,
} from "./model";
import { ROUTE_ID } from "src/router/name";

const initialState = (): StoreState => {
	return {
		isDetail: false,
		ruleList: [], // rule列表
		ruleItemList: [],
		id: "", // 编辑页面查看的当前rule的id
		currentData: null, // 当前rule的数据 编辑专用
		currentNewData: null, // 当前rule的数据 添加专用
		currentDetailData: null, // 当前rule的数据 详情专用
		filterData: {}, // 查询数据
		ruleTablePagedata: {
			total: 0,
			pageNum: 1,
			pageSize: 10,
		},
		ruleItemTablePagedata: {
			total: 0,
			pageNum: 1,
			pageSize: 10,
		},
		loading: false,
		ruleCarrierList: [],
		locationList: {}, // 添加ruleItem的ruleInfo属性枚举值
		targetRankId: 0,
		targetItineraryId: 0,
		ruleDataPart1: {},
		itineraryList: [],
		itByRankList: [],
		conByPosList: [],
		segByPosList: [],
		isEditing: false,
		isAddItemDrawerFlag: false,
		addItemType: "",
	};
};

const slice = createSlice({
	name: "ruleStore",
	stateInit: initialState,
	branch: [
		ROUTE_ID.RuleAddPage,
		ROUTE_ID.RuleDetailPage,
		ROUTE_ID.RuleEditPage,
	],
	reducers: {
		setIsDetail(state, { payload }: PayloadAction<boolean>) {
			state.isDetail = payload;
		},
		// 设置当前的data
		setCurrentRuleData(state, { payload }: PayloadAction<Rule | null>) {
			state.currentData = payload;
		},
		setCurrentRuleNewData(state, { payload }: PayloadAction<Rule | null>) {
			state.currentNewData = payload;
		},
		setCurrentRuleDetailData(
			state,
			{ payload }: PayloadAction<Rule | null>,
		) {
			state.currentDetailData = payload;
		},
		// 设置rule列表
		setRuletList(state, data: PayloadAction<Rule[]>) {
			state.ruleList = data.payload;
		},
		setRuleCarrier(state, data: PayloadAction<RuleCarrier[]>) {
			state.ruleCarrierList = data.payload;
		},
		setFilterData(state, data: PayloadAction<FilterData>) {
			state.filterData = data.payload;
		},
		setRuleTablePageData(
			state,
			data: PayloadAction<{
				pageNum?: string | number;
				pageSize?: string | number;
			}>,
		) {
			state.ruleTablePagedata = {
				...state.ruleTablePagedata,
				...data.payload,
			};
		},
		setIsEditing(state, data: PayloadAction<boolean>) {
			state.isEditing = data.payload;
		},
		setTargetRankId(state, data: PayloadAction<number>) {
			state.targetRankId = data.payload;
		},
		setTargetItineraryId(state, data: PayloadAction<number>) {
			state.targetItineraryId = data.payload;
		},
		setConByPosList(state, data: PayloadAction<Connection[][]>) {
			state.conByPosList = data.payload;
		},
		setSegByPosList(state, data: PayloadAction<Segment[][]>) {
			state.segByPosList = data.payload;
		},
		setItByRankList(state, data: PayloadAction<RuleItineraryItem[][]>) {
			state.itByRankList = data.payload;
		},
		setItineraryList(state, data: PayloadAction<RuleItineraryItem[]>) {
			state.itineraryList = data.payload;
		},
		setIsAddItemDrawerFlag(
			state,
			data: PayloadAction<{
				flag: boolean;
				type: AddItemDrawerType | "";
			}>,
		) {
			state.isAddItemDrawerFlag = data.payload.flag;
			state.addItemType = data.payload.type;
		},
	},
	selectors: {
		getTargetItinerary(state) {
			return RuleHelper.getTargetItinerary(state);
		},
	},
});

export default slice;
