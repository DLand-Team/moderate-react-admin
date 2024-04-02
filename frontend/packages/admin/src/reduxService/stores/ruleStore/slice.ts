/* Core */
import { createSliceCustom, PayloadAction } from "redux-eazy";
import {
  Rule,
  RuleCarrier,
  RuleItem,
  StoreState,
  PageData,
  FilterData,
} from "./model";
import names from "src/reduxService/stores/names";

const initialState = (): StoreState => {
  return {
    ruleList: [], // rule列表，
    ruleItemList: [],
    id: "", // 编辑页面查看的当前rule的id
    ruleData: null, // 当前rule的数据
    filterData: {}, //查询数据的对象
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
  };
};

const slice = createSliceCustom({
  name: names.ruleStore,
  stateInit: initialState,
  reducers: {
    setPageData(state, data: PayloadAction<Partial<PageData>>) {
      state.ruleTablePagedata = {
        ...state.ruleTablePagedata,
        ...data.payload,
      };
    },
    // 设置查询数据
    setFilterData(state, data: PayloadAction<FilterData>) {
      state.filterData = {
        ...state.filterData,
        ...data.payload,
      };
    },
    // 添加ruletItem
    addRuletItem(state, data: PayloadAction<RuleItem>) {
      state.ruleItemList = [...state.ruleItemList, data.payload];
    },
    setRuletItemList(state, data: PayloadAction<RuleItem[]>) {
      state.ruleItemList = data.payload;
    },
    setRuletList(state, data: PayloadAction<Rule[]>) {
      state.ruleList = data.payload;
    },
    setRuleCarrier(state, data: PayloadAction<RuleCarrier[]>) {
      state.ruleCarrierList = data.payload;
    },
    setLocaionList(state, data: PayloadAction<any>) {
      state.locationList = data.payload;
    },
  },
});

export default slice;
