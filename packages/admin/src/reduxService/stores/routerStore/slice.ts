/* Core */
import { ROUTE_INFO_CONFIG } from "src/config/routerConfig";
import { RouteItem } from "src/config/types";
import { RouterHelper } from "src/reduxService/helper/routerHelper";
import { cloneDeep } from "lodash-es";
import { PayloadAction, createSliceCustom } from "redux-eazy";
import names from "../names";
import { RoutesConfigMap, StoreState } from "./model";

const initialState = (): StoreState => {
	const { routesConfig, routesConfigMap } =
		RouterHelper.createRoutesConfigByUserInfo({
			routesPermissions: [],
			routesConfigMap: cloneDeep(ROUTE_INFO_CONFIG),
		});
	return {
		routesConfig,
		routesConfigMap,
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
});

export default slice;
