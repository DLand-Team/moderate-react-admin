/* Core */
import { ROUTE_INFO_CONFIG } from "@/config/routerConfig";
import { RouteItem } from "@/config/types";
import { RouterHelper } from "@/reduxService/helper/routerHelper";
import { cloneDeep } from "lodash-es";
import { PayloadAction, createSliceCustom } from "redux-eazy";
import names from "../names";
import { RoutesConfigMap, StoreState } from "./model";

const initialState = (): StoreState => {
	return {
		routesConfig: RouterHelper.createDefaultRoutesConfig(),
		routesConfigMap: cloneDeep(ROUTE_INFO_CONFIG),
	};
};

const slice = createSliceCustom({
	name: names.routerStore,
	stateInit: initialState,
	reducers: {
		setRoutesConfigMap(state, { payload }: PayloadAction<RoutesConfigMap>) {
			state.routesConfigMap = payload;
		},
		setRouterConfig: (state, { payload }: PayloadAction<RouteItem[]>) => {
			state.routesConfig = payload;
		},
	},
	extraReducers: (builder) => {},
});

export default slice;
