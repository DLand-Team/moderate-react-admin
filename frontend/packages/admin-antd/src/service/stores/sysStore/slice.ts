import { PayloadAction } from "redux-eazy";
import { createSlice } from "src/service";
import { PageBaseData } from "src/types/common";
import {
	Dept,
	FilterType,
	MenuItem,
	ModalType,
	Pos,
	Role,
	RoleModalType,
	StoreState,
	User,
} from "./model";

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
		roleList: [],
		rolePagination: {
			total: 0,
			pageNo: 1,
			pageSize: 10,
		},
		roleModalType: RoleModalType.NONE,
		currentRoleId: null,
		currentRole: null,
		activedMenuList: [],
		roleMenuPermissions: [],
		activedMenuTree: [],
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
		setRoleList(
			state,
			{
				payload: { list, total },
			}: PayloadAction<{ list: Role[]; total: number }>,
		) {
			state.roleList = list;
			state.rolePagination = {
				...state.rolePagination,
				total: total,
			};
		},
		setUserPagination(state, data: PayloadAction<PageBaseData>) {
			state.userPagination = { ...state.userPagination, ...data.payload };
		},

		setCurrentDeptId(state, { payload }: PayloadAction<number | null>) {
			state.currentDeptId = payload;
		},
		setUserModalType(state, { payload }: PayloadAction<ModalType>) {
			state.userModalType = payload;
		},
		setRoleModalType(state, { payload }: PayloadAction<RoleModalType>) {
			state.roleModalType = payload;
		},
		setCurrentUser(state, { payload }: PayloadAction<User | null>) {
			state.currentUser = payload;
		},
		setCurrentRole(state, { payload }: PayloadAction<Role | null>) {
			state.currentRole = payload;
		},
		setPostList(state, { payload }: PayloadAction<Pos[]>) {
			state.postList = payload;
		},
		setDeptList(state, { payload }: PayloadAction<Dept[]>) {
			state.deptList = payload;
		},
		setCurrentRoleId(state, { payload }: PayloadAction<number | null>) {
			state.currentRoleId = payload;
		},
		setActivedMenuList(state, { payload }: PayloadAction<MenuItem[]>) {
			state.activedMenuList = payload;
		},
		setActivedMenuTree(state, { payload }: PayloadAction<MenuItem[]>) {
			state.activedMenuTree = payload;
		},
		setRoleMenuPermissions(state, { payload }: PayloadAction<Number[]>) {
			state.roleMenuPermissions = payload;
		},
	},
});

export default slice;
