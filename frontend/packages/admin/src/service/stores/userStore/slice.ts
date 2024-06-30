import { PayloadAction } from "redux-eazy";
import { PageData, StoreState, UserEntity } from "./model";
import thunks from "./thunks";
import { createSlice } from "src/service/setup";

const initialState = (): StoreState => {
	return {
		loading: false,
		isShowDeatilModal: false,
		currentData: null,
		pageData: {
			dataList: [],
			pageSize: 16,
			pageNum: 1,
			total: 0,
		},
	};
};

const slice = createSlice({
	name: "userStore",
	stateInit: initialState,
	reducers: {
		setIsShowDeatilModal(state, { payload }: PayloadAction<boolean>) {
			state.isShowDeatilModal = payload;
		},
		setCurrentData(state, { payload }: PayloadAction<UserEntity>) {
			state.currentData = payload;
		},
		setUserList(
			state,
			{ payload }: PayloadAction<{ list: UserEntity[]; total: number }>,
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
	extraReducers(builder) {
		builder
			.addCase(thunks.queryListAct.pending, (state) => {
				state.loading = true;
			})
			.addCase(thunks.queryListAct.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(thunks.queryListAct.rejected, (state) => {
				state.loading = false;
			});
	},
});

export default slice;
