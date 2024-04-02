/* Core */
import { createSliceCustom, PayloadAction } from "redux-eazy";
import { Market, MarketItem, StoreState } from "./model";
import names from "src/reduxService/stores/names";

const initialState = (): StoreState => {
  return {
    marketList: [], // marketList列表，
    marketItemList: [],
    id: "", // 编辑页面查看的当前market的id
    marketData: null, // 当前market的数据
    marketTablePagedata: {
      total: 0,
      pageNum: 1,
      pageSize: 10,
    },
    marketItemTablePagedata: {
      total: 0,
      pageNum: 1,
      pageSize: 10,
    },
    loading: false,
    locationList: {}, // 添加marketItem的marketInfo属性枚举值
  };
};

const slice = createSliceCustom({
  name: names.marketStore,
  stateInit: initialState,
  reducers: {
    addMarketItem(state, data: PayloadAction<MarketItem>) {
      state.marketItemList = [...state.marketItemList, data.payload];
    },
    setMarketItemList(state, data: PayloadAction<MarketItem[]>) {
      state.marketItemList = data.payload;
    },
    setMarketList(state, data: PayloadAction<Market[]>) {
      state.marketList = data.payload;
    },
    setLocaionList(state, data: PayloadAction<any>) {
      state.locationList = data.payload;
    },
  },
});

export default slice;
