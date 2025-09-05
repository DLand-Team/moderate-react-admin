import { PayloadAction } from "redux-eazy";
import { createSlice } from "src/service/setup";
import { StoreState } from "./model";

const initialState = (): StoreState => {
    return {
        locationList: {}, // 添加marketItem的marketInfo属性枚举值
        agencyData: null,
        redisData: null,
        isAudit:false,
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
        setRedisData(state, data: PayloadAction<any>) {
            state.redisData = data.payload;
        },
        setIsAudit(state, data: PayloadAction<any>) {
            state.isAudit = data.payload;
        },
    },
});

export default slice;
