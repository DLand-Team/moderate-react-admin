import { PayloadAction } from "redux-eazy";
import { RouteItem } from "src/router";
import { getActionType } from "src/service";
import { createSlice } from "src/service/setup";
import { StoreState } from "./model";

const initialState = (): StoreState => {
	return {
		isLoading: false,
		routeList: [],
		routeListEx: [],
		routeTree: null,
		currentRoute: null,
	};
};

const slice = createSlice({
	name: "appStore",
	stateInit: initialState,
	reducers: {
		setIsLoading(state, { payload }: PayloadAction<boolean>) {
			state.isLoading = payload;
		},
		setRouteList(state, { payload }: PayloadAction<RouteItem[]>) {
			state.routeList = payload;
		},
		setRouteListEx(state, { payload }: PayloadAction<any[]>) {
			state.routeListEx = payload;
		},
		setRouteTree(state, { payload }: PayloadAction<RouteItem | null>) {
			state.routeTree = payload;
		},
		setCurrentRoute(state, { payload }: PayloadAction<RouteItem | null>) {
			state.currentRoute = payload;
		},
	},
	extraReducers: (builder) => {
		const { getUserPermissionsAct } = getActionType("authStore");
		const loadingActionList = [getUserPermissionsAct];
		loadingActionList.filter(Boolean).forEach((actionItem) => {
			builder
				.addCase(actionItem.pending, (state) => {
					state.isLoading = true;
				})
				.addCase(actionItem.rejected, (state) => {
					state.isLoading = false;
				})
				.addCase(actionItem.fulfilled, (state) => {
					state.isLoading = false;
				});
		});
	},
});

export default slice;
