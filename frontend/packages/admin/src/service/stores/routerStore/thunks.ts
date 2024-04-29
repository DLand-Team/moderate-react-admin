import { dp } from "src/service";
import { RouterHelper } from "src/service/helper";
import { cloneDeep } from "lodash-es";
import { createThunks } from "../../setup";
import names from "../names";
import { ROUTE_CONFIG_MAP } from "src/router/routesConfig";

const thunks = createThunks(names.routerStore, {
	createRoutesDataAct: async (_, api) => {
		const { routesPermissions } = api.getState().authStore;
		const { routesMapData, routesTreeData } =
			RouterHelper.createRoutesConfigByPermissions({
				routesPermissions: routesPermissions,
				routesConfigMap: cloneDeep(ROUTE_CONFIG_MAP),
			});
		dp("routerStore", "setRoutesConfigMap", routesMapData);
		dp("routerStore", "setRoutesTree", routesTreeData);
	},
});
export default thunks;
