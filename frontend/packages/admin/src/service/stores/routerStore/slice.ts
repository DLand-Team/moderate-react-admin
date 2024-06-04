/* Core */
import { cloneDeep } from "lodash-es";
import { PayloadAction, createSliceCustom } from "redux-eazy";
import { ROUTE_CONFIG_MAP } from "src/router/routesConfig";
import { RouteItem } from "src/router/types";
import { RouterHelper } from "src/service/helper";
import names from "../names";
import { RoutesConfigMap, StoreState } from "./model";

const initialState = (): StoreState => {
    const { routesMapData, routesTreeData } =
        RouterHelper.createRoutesConfigByPermissions({
            routesPermissions: [],
            routesConfigMap: cloneDeep(ROUTE_CONFIG_MAP),
        });
    return {
        routesMap: routesMapData,
        routesTree: routesTreeData,
    };
};

const slice = createSliceCustom({
    name: names.routerStore,
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
