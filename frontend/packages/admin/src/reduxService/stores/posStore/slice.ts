/* Core */
import { createSliceCustom, PayloadAction } from "redux-eazy";
import names from "src/reduxService/stores/names";
import { Pos, PosCarrier, StoreState } from "./model";

const initialState = (): StoreState => {
  return {
    posList: [], // pos列表，
    posItemList: [],
    id: "", // 编辑页面查看的当前pos的id
    currentData: null, // 当前pos的数据
    posTablePagedata: {
      total: 0,
      pageNum: 1,
      pageSize: 10,
    },
    posItemTablePagedata: {
      total: 0,
      pageNum: 1,
      pageSize: 10,
    },
    loading: false,
    posCarrierList: [],
    locationList: {}, // 添加posItem的posInfo属性枚举值
  };
};

const slice = createSliceCustom({
  name: names.posStore,
  stateInit: initialState,
  reducers: {
    // 设置当前的data
    setCurrentPosData(state, { payload }: PayloadAction<Pos | null>) {
      state.currentData = payload;
    },
    setPostList(state, data: PayloadAction<Pos[]>) {
      state.posList = data.payload;
    },
    setPosCarrier(state, data: PayloadAction<PosCarrier[]>) {
      state.posCarrierList = data.payload;
    },
  },
});

export default slice;
