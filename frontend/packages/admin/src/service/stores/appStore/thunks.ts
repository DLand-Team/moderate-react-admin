/* Instruments */
import { AppHelper } from "src/service/helper";
import { dp } from "../..";
import { createThunks } from "../../setup";
import names from "../names";

const thunks = createThunks(names.appStore, {
	deleteTabHistoryAct: async ({ pathName }: { pathName: string }, api) => {
		debugger;
		const { tabItems } = api.getState().appStore;
		const tabsHistoryCopy = [...tabItems];
		const index = tabsHistoryCopy.findIndex((item) => {
			return item.key === pathName;
		});
		tabsHistoryCopy.splice(index, 1);
		dp("appStore", "setTabItems", tabsHistoryCopy);
	},
	createMenuDataAct: async (_, api) => {
		const { menuPermissions, routesPermissions } = api.getState().authStore;
		const { children = [] } = menuPermissions || {};
		const menuData = AppHelper.createMenuData(children, routesPermissions);
		dp("appStore", "setMenuDataAct", menuData);
	},
});
export default thunks;
