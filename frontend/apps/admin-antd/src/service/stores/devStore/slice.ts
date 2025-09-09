import { PayloadAction } from "redux-eazy";
import { createSlice } from "src/service/setup";
import { StoreState } from "./model";

const initialState = (): StoreState => {
  return {
    routePageList: null,
    pageList: null,
    pageNum: 1,
    pageSize: 10,
    total: 0,
    storeList: null,
    apiList: null,
    pluginList: [],
  };
};

const slice = createSlice({
  name: "devStore",
  stateInit: initialState,
  reducers: {
    setPageList(state, { payload }: PayloadAction<any>) {
      state.pageList = payload.pageList;
      state.total = payload.total;
    },
  },
});

export default slice;
