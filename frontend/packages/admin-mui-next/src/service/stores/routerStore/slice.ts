import { ROUTE_ID_KEY } from "@/router";
import { createSlice } from "@/service/setup";
import { PayloadAction } from "redux-eazy";
import { StoreState } from "./model";

const initialState = (): StoreState => {
    return {
        activeKey: "",
    };
};

const slice = createSlice({
    name: "routerStore",
    stateInit: initialState,
    reducers: {
        setRouterActiveKey(state, { payload }: PayloadAction<ROUTE_ID_KEY>) {
            state.activeKey = payload;
        },
    },
});

export default slice;
