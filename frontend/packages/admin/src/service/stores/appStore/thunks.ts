import { dpChain } from "src/service";
import { AppHelper } from "src/service/helper";
import { createThunks } from "src/service/setup";

const thunks = createThunks("appStore", {
	deleteTabHistoryAct: async ({ pathName }: { pathName: string }, api) => {
		const { tabItems } = api.getState().appStore;
		const tabsHistoryCopy = [...tabItems];
		const index = tabsHistoryCopy.findIndex((item) => {
			return item.key === pathName;
		});
		tabsHistoryCopy.splice(index, 1);
		dpChain("appStore").setTabItems(tabsHistoryCopy);
	},
	createMenuDataAct: async (_: null, api) => {
		const { menuPermissions, routesPermissions } = api.getState().authStore;
		const { children = [] } = menuPermissions || {};
		const menuData = AppHelper.createMenuData(children, routesPermissions);
		dpChain("appStore").setMenuDataAct(menuData);
	},
});
export default thunks;
