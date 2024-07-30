
import { PayloadAction } from "redux-eazy";
import { createSlice } from "src/service";
import { DealEntity, PageData, StoreState } from "./model";

const initialState = (): StoreState => {
	return {
		searchList: [],
		isShowAddModal: false,
		isUpdate: false,
		recordData: null,
		loading: false,
		isDetail: false,
		formVersion: "0",
		approvalPageData: {
			dataList: [],
			pageSize: 16,
			pageNum: 1,
			total: 0,
		},
		rankPageData: {
			dataList: [],
			pageSize: 16,
			pageNum: 1,
			total: 0,
		},
		pageData: {
			dataList: [],
			pageSize: 16,
			pageNum: 1,
			total: 0,
		},
	};
};

const slice = createSlice({
	name: "dealStore",
	stateInit: initialState,
	reducers: {
		// 设置loading
		setLoading(state, { payload }: PayloadAction<boolean>) {
			state.loading = payload;
		},
		setApprovalDealList(
			state,
			{ payload }: PayloadAction<{ list: DealEntity[]; total: number }>,
		) {
			state.approvalPageData = {
				...state.approvalPageData,
				total: payload.total,
				dataList: payload.list,
			};
		},
		setRankList(
			state,
			{ payload }: PayloadAction<{ list: DealEntity[]; total: number }>,
		) {
			state.rankPageData = {
				...state.rankPageData,
				total: payload.total,
				dataList: payload.list,
			};
		},
		setDealList(
			state,
			{ payload }: PayloadAction<{ list: DealEntity[]; total: number }>,
		) {
			state.pageData = {
				...state.pageData,
				total: payload.total,
				dataList: payload.list,
			};
		},
		setIsAddModalShow: (
			state,
			{
				payload: { isShowAddModal, recordData, isDetail },
			}: PayloadAction<{
				isShowAddModal: boolean;
				recordData?: any;
				isDetail?: boolean;
			}>,
		) => {
			state.recordData = recordData;
			state.isShowAddModal = isShowAddModal;
			!isShowAddModal
				? (state.isDetail = false)
				: (state.isDetail = !!isDetail);
		},
		setApprovalPageData(
			state,
			{ payload }: PayloadAction<Partial<PageData>>,
		) {
			state.approvalPageData = { ...state.approvalPageData, ...payload };
		},
		setRankPageData(state, { payload }: PayloadAction<Partial<PageData>>) {
			state.rankPageData = { ...state.rankPageData, ...payload };
		},
		setPageData(state, { payload }: PayloadAction<Partial<PageData>>) {
			state.pageData = { ...state.pageData, ...payload };
		},
		setSearchList(state, { payload }: PayloadAction<DealEntity[]>) {
			state.searchList = payload;
		},
	},
});

export default slice;
