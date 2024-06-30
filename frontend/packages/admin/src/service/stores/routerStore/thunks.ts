import { cloneDeep } from "lodash-es";
import { ROUTE_CONFIG_MAP } from "src/router/routesConfig";
import { dpChain } from "src/service";
import { RouterHelper } from "src/service/helper";
import { createThunks } from "src/service/setup";

const thunks = createThunks("routerStore", {
	createRoutesDataAct: async (_, api) => {
		const { routesPermissions } = api.getState().authStore;
		const { routesMapData, routesTreeData } =
			RouterHelper.createRoutesConfigByPermissions({
				routesPermissions: routesPermissions,
				routesConfigMap: cloneDeep(ROUTE_CONFIG_MAP),
			});
		dpChain("routerStore").setRoutesConfigMap(routesMapData);
		dpChain("routerStore").setRoutesTree(routesTreeData);
	},
});
export default thunks;
