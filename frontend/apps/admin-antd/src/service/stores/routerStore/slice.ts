import { PayloadAction } from "redux-eazy";
import { cloneDeep } from "src/common/utils";
import { ROUTE_CONFIG_MAP, ROUTE_ID_KEY, RouteItem } from "src/router";
import { createSlice, routerHelper } from "src/service/setup";
import { RoutesConfigMap, StoreState } from "./model";

const initialState = (): StoreState => {
  const { routesMapData, routesTreeData } =
    routerHelper.createRoutesConfigByPermissions({
      routesPermissions: null,
      routesConfigMap: cloneDeep(ROUTE_CONFIG_MAP),
    });
  return {
    routesMap: routesMapData,
    routesTree: routesTreeData,
    activeKey: "",
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
    setRouterActiveKey(state, { payload }: PayloadAction<ROUTE_ID_KEY>) {
      state.activeKey = payload;
    },
  },
});

export default slice;
