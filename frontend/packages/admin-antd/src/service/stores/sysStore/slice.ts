import { PayloadAction } from "redux-eazy";
import { createSlice } from "src/service";
import { FilterType, StoreState } from "./model";

const initialState = (): StoreState => {
	return {
		filterType: FilterType.ALL,
	};
};

const slice = createSlice({
	name: "sysStore",
	stateInit: initialState,
	reducers: {
		setFilterType(state, data: PayloadAction<FilterType>) {
			state.filterType = data.payload;
		},
	},
});

export default slice;
