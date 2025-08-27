import { PayloadAction } from "redux-eazy";
import { createSlice } from "src/service";
import { PageBaseData } from "src/types/common";
import { Dept, FilterType, ModalType, Pos, StoreState, User } from "./model";

const initialState = (): StoreState => {
	return {
		filterType: FilterType.ALL,
		userList: [],
		userPagination: {
			total: 0,
			pageNo: 1,
			pageSize: 10,
		},
		deptList: [],
		currentDeptId: null,
		userModalType: ModalType.NONE,
		currentUser: null,
		postList: [],
	};
};

const slice = createSlice({
	name: "sysStore",
	stateInit: initialState,
	reducers: {
		setFilterType(state, data: PayloadAction<FilterType>) {
			state.filterType = data.payload;
		},
		setUserList(
			state,
			{ payload }: PayloadAction<{ list: User[]; total: number }>,
		) {
			state.userList = payload.list;
			state.userPagination = {
				...state.userPagination,
				total: payload.total,
			};
		},
		setUserPagination(state, data: PayloadAction<PageBaseData>) {
			state.userPagination = { ...state.userPagination, ...data.payload };
		},
		setDeptList(state, { payload }: PayloadAction<Dept[]>) {
			state.deptList = payload;
		},
		setCurrentDeptId(state, { payload }: PayloadAction<number | null>) {
			state.currentDeptId = payload;
		},
		setUserModalType(state, { payload }: PayloadAction<ModalType>) {
			state.userModalType = payload;
		},
		setCurrentUser(state, { payload }: PayloadAction<User | null>) {
			state.currentUser = payload;
		},
		setPostList(state, { payload }: PayloadAction<Pos[]>) {
			state.postList = payload;
		},
	},
});

export default slice;
