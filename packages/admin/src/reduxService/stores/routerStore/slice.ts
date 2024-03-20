/* Core */
import { ROUTE_INFO_CONFIG } from "src/config/routerConfig";
import { RouteItem } from "src/config/types";
import { RouterHelper } from "src/reduxService/helper";
import { cloneDeep } from "lodash-es";
import { PayloadAction, createSliceCustom } from "redux-eazy";
import names from "../names";
import { RoutesConfigMap, StoreState } from "./model";
import storageHelper from "src/common/utils/storageHelper";

const initialState = (): StoreState => {
	let ROUTES_CONFIG_MAP = storageHelper.getItem("ROUTES_CONFIG_MAP");
	let ROUTES_CONFIG = storageHelper.getItem("ROUTES_CONFIG");
	const { routesConfig, routesConfigMap } = !ROUTES_CONFIG_MAP
		? RouterHelper.createRoutesConfigByPermissions({
				routesPermissions: [],
				routesConfigMap: cloneDeep(ROUTE_INFO_CONFIG),
			})
		: {
				routesConfig: ROUTES_CONFIG,
				routesConfigMap: ROUTES_CONFIG_MAP,
			};
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
			storageHelper.setItem("ROUTES_CONFIG_MAP", payload);
		},
		setRouterConfig: (state, { payload }: PayloadAction<RouteItem[]>) => {
			state.routesConfig = payload;
			storageHelper.setItem("ROUTES_CONFIG", payload);
		},
	},
});

export default slice;
