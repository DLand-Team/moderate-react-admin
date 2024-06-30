import { cloneDeep } from "lodash-es";
import { PayloadAction } from "redux-eazy";
import { ROUTE_CONFIG_MAP } from "src/router/routesConfig";
import { RouteItem } from "src/router/types";
import { RouterHelper } from "src/service/helper";
import { RoutesConfigMap, StoreState } from "./model";
import { createSlice } from "src/service/setup";

const initialState = (): StoreState => {
	const { routesMapData, routesTreeData } =
		RouterHelper.createRoutesConfigByPermissions({
			routesPermissions: null,
			routesConfigMap: cloneDeep(ROUTE_CONFIG_MAP),
		});
	debugger;
	return {
		routesMap: routesMapData,
		routesTree: routesTreeData,
	};
};

const slice = createSlice({
	name: "routerStore",
	stateInit: initialState,
	reducers: {
		setRoutesConfigMap(state, { payload }: PayloadAction<RoutesConfigMap>) {
			state.routesMap = payload;
		},
		setRoutesTree(state, { payload }: PayloadAction<RouteItem[]>) {
			state.routesTree = payload as RouteItem[];
		},
	},
});

export default slice;
