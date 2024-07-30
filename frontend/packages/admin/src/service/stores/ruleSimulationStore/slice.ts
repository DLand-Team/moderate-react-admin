/* Core */
import { PayloadAction } from "redux-eazy";
import { StoreState } from "./model";
import { createSlice } from "src/service";

const initialState = (): StoreState => {
    return {
        ruleSimulationArr: [], //列表数据
        uuid: "",
        errorText: "",
        btnDisabled: false,
        tableLoading: false, //表格加载
        locationList: [],
    };
};

const slice = createSlice({
    name: "ruleStore",
    stateInit: initialState,
    reducers: {
        setinitialAllState(state) {
            state.tableLoading = false;
            state.btnDisabled = false;
            state.ruleSimulationArr = [];
            state.uuid = "";
            state.errorText = "";
            state.locationList = [];
        },
        setRuleSimulationArr(state, data: PayloadAction<any>) {
            state.ruleSimulationArr = data.payload;
        },
        setUuid(state, data: PayloadAction<string>) {
            state.uuid = data.payload;
        },
        setErrorText(state, data: PayloadAction<string>) {
            state.errorText = data.payload;
        },
        setLocationList(state, data: PayloadAction<any>) {
            state.locationList = data.payload;
        },
    },
});

export default slice;
