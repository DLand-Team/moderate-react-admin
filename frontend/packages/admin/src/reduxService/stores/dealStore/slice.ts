/* Core */
import { createSliceCustom } from "redux-eazy";
import { PayloadAction } from "redux-eazy";
import names from "../names";
import { StoreState } from "./model";

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
		formVersion: "0",
	};
};

const slice = createSliceCustom({
	name: names.dealStore,
	stateInit: initialState,
	reducers: {
		// 设置loading
		setLoading(state, { payload }: PayloadAction<boolean>) {
			state.loading = payload;
		},

		setPageList(state, { payload }: PayloadAction<any>) {
			state.dataList = payload.pageList;
			state.total = payload.total;
		},
		setIsAddModalShow: (
			state,
			{
				payload: { isShowAddModal, recordData },
			}: PayloadAction<{ isShowAddModal: boolean; recordData?: any }>,
		) => {
			state.recordData = recordData;
			state.isShowAddModal = isShowAddModal;
			!isShowAddModal && (state.isDetail = false);
		},
	},
});

export default slice;
