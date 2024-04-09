/* Core */
import { createSliceCustom, PayloadAction } from "redux-eazy";
import names from "src/reduxService/stores/names";
import { FilterData, Rule, RuleCarrier, StoreState } from "./model";

const initialState = (): StoreState => {
  return {
    ruleList: [], // rule列表，s
    ruleItemList: [],
    id: "", // 编辑页面查看的当前rule的id
    currentData: null, // 当前rule的数据
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
  };
};

const slice = createSliceCustom({
  name: names.ruleStore,
  stateInit: initialState,
  reducers: {
    // 设置当前的data
    setCurrentRuleData(state, { payload }: PayloadAction<Rule | null>) {
      state.currentData = payload;
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
      }>
    ) {
      state.ruleTablePagedata = {
        ...state.ruleTablePagedata,
        ...data.payload,
      };
    },
  },
});

export default slice;
