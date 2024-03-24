/* Core */
import { createSliceCustom } from "redux-eazy";
import { PayloadAction } from "redux-eazy";
import names from "../names";
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
	};
};

const slice = createSliceCustom({
	name: names.appStore,
	stateInit: initialState,
	reducers: {
		setPageList(state, { payload }: PayloadAction<any>) {
			state.pageList = payload.pageList;
			state.total = payload.total;
		},
	},
});

export default slice;
