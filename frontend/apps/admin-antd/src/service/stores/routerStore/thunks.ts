import { cloneDeep } from "src/common/utils";
import { ROUTE_CONFIG_MAP } from "src/router";
import { createThunks, dpChain } from "src/service";
import { routerHelper } from "src/service";

const thunks = createThunks("routerStore", {
  createRoutesDataAct: async (_, api) => {
    const { routesPermissions } = api.getState().authStore;
    const { routesMapData, routesTreeData } =
      routerHelper.createRoutesConfigByPermissions({
        routesPermissions: routesPermissions,
        routesConfigMap: cloneDeep(ROUTE_CONFIG_MAP),
      });
    dpChain("routerStore").setRoutesConfigMap(routesMapData);
    dpChain("routerStore").setRoutesTree(routesTreeData);
  },
});
export default thunks;
