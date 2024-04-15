/* Core */
import { RouterHelper } from "src/reduxService/helper";
import { cloneDeep } from "lodash-es";
import { PayloadAction, createSliceCustom } from "redux-eazy";
import names from "../names";
import { RoutesConfigMap, StoreState } from "./model";
import storageHelper from "src/common/utils/storageHelper";
import { ROUTE_INFO_CONFIG } from "src/router/routesConfig";
import { RouteItem } from "src/router/types";

const initialState = (): StoreState => {
	const { routesConfig, routesConfigMap } =
		RouterHelper.createRoutesConfigByPermissions({
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
			storageHelper.setItem("ROUTES_CONFIG_MAP", payload);
		},
		setRouterConfig: (state, { payload }: PayloadAction<RouteItem[]>) => {
			state.routesConfig = payload;
			storageHelper.setItem("ROUTES_CONFIG", payload);
		},
	},
});

export default slice;
