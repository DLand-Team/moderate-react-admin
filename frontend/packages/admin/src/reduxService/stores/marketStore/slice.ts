/* Core */
import { createSliceCustom, PayloadAction } from "redux-eazy";
import names from "src/reduxService/stores/names";
import {
  GetMarketListApiRes,
  Market,
  MarketCarrier,
  MarketFilterData,
  MarketTablePagedata,
  StoreState,
} from "./model";

const initialState = (): StoreState => {
  return {
    marketList: [], // market列表，s
    marketItemList: [],
    id: "", // 编辑页面查看的当前market的id
    currentData: null, // 当前market的数据
    marketFilterData: {},
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
    marketCarrierList: [],
    locationList: {}, // 添加marketItem的marketInfo属性枚举值
  };
};

const slice = createSliceCustom({
  name: names.marketStore,
  stateInit: initialState,
  reducers: {
    // 设置当前的data
    setCurrentMarketData(state, { payload }: PayloadAction<Market | null>) {
      state.currentData = payload;
    },
    setMarketList(state, { payload }: PayloadAction<GetMarketListApiRes>) {
      state.marketList = payload.list;
      state.marketTablePagedata.total = payload.total;
    },
    setMarketCarrier(state, data: PayloadAction<MarketCarrier[]>) {
      state.marketCarrierList = data.payload;
    },
    setLocaionList(state, data: PayloadAction<any>) {
      state.locationList = data.payload;
    },
    setMarketFilterData(state, data: PayloadAction<MarketFilterData>) {
      state.marketFilterData = data.payload;
    },
    // 设置market table的翻页数据
    setMarketTablePageData(
      state,
      data: PayloadAction<Partial<MarketTablePagedata>>
    ) {
      state.marketTablePagedata = {
        ...state.marketTablePagedata,
        ...data.payload,
      };
    },
  },
});

export default slice;
