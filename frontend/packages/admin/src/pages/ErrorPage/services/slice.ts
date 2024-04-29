/* Core */
import { createSliceCustom } from "redux-eazy";
import { StoreState } from "./model";
import names from "src/service/stores/names";

const initialState = (): StoreState => {
	return {
		pageNum: 1,
		pageSize: 10,
		dataList: [],
		total: 0,
		isShowAddModal: false,
		isUpdate: false,
		recordData: null,
		loading: false,
		isDetail: false,
		formVersion: "",
	};
};

const slice = createSliceCustom({
	name: names.categoryStore,
	stateInit: initialState,
	reducers: {},
});

export default slice;
