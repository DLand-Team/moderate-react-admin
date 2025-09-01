import { getActionType } from "src/service";
import { createSlice } from "src/service/setup";
import { PayloadAction } from "redux-eazy";
import { StoreState } from "./model";

const initialState = (): StoreState => {
	return {
		isLoading: false,
	};
};

const slice = createSlice({
	name: "appStore",
	stateInit: initialState,
	reducers: {
		setIsLoading(state, { payload }: PayloadAction<boolean>) {
			state.isLoading = payload;
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
