import { PayloadAction } from "redux-eazy";
import { createSlice } from "src/service/setup";
import { StoreState } from "./model";

const initialState = (): StoreState => {
	return {
		locationList: {}, // 添加marketItem的marketInfo属性枚举值
		agencyData: null,
	};
};

const slice = createSlice({
	name: "commonStore",
	stateInit: initialState,
	reducers: {
		setLocaionList(state, data: PayloadAction<any>) {
			state.locationList = data.payload;
		},
		setAgencyData(state, data: PayloadAction<any>) {
			state.agencyData = data.payload;
		},
	},
});

export default slice;
