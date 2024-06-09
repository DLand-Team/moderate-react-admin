/* Core */
import { createSliceE, PayloadAction } from "redux-eazy";
import { Category, PageData, StoreState } from "./model";
import names from "src/service/stores/names";

const initialState = (): StoreState => {
	return {
		pageData: {
			dataList: [],
			pageSize: 12,
			pageNum: 1,
			total: 0,
		},
		isShowAddModal: false,
		isUpdate: false,
		currentData: null,
		loading: false,
		isDetail: false,
		formVersion: "",
	};
};

const slice = createSliceE({
	name: names.enquiryStore,
	stateInit: initialState,
	reducers: {
		setIsDetailAct(state, { payload }: PayloadAction<boolean>) {
			state.isDetail = payload;
		},
		setIsShowModal(state, { payload }: PayloadAction<boolean>) {
			state.isShowAddModal = payload;
		},
		setCurrentData(state, { payload }: PayloadAction<Category>) {
			state.currentData = payload;
		},
		setCategoryList(
			state,
			{ payload }: PayloadAction<{ list: Category[]; total: number }>,
		) {
			state.pageData = {
				...state.pageData,
				total: payload.total,
				dataList: payload.list,
			};
		},
		setPageData(state, { payload }: PayloadAction<Partial<PageData>>) {
			state.pageData = { ...state.pageData, ...payload };
		},
	},
});

export default slice;
