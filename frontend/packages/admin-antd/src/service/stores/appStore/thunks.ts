import { appHelper, dpChain, reduxStore } from "src/service";
import { createThunks } from "src/service";
import httpApi from "./api";
import { GetPswInfoParams } from "./model";

const thunks = createThunks("appStore", {
	deleteTabHistoryAct: async ({ pathName }: { pathName: string }, api) => {
		const { tabItems } = api.getState().appStore;
		const tabsHistoryCopy = [...tabItems];
		;
		const index = tabsHistoryCopy.findIndex((item) => {
			return item.key === pathName;
		});
		if (index != -1) {
			tabsHistoryCopy.splice(index, 1);
			dpChain("appStore").setTabItems(tabsHistoryCopy);
		}
	},
	createMenuDataAct: async (_: null, api) => {
		const { menuPermissions, routesPermissions } = api.getState().authStore;
		const { children = [] } = menuPermissions || {};
		const { routesMap, routesTree } = reduxStore.getState().routerStore;
		const menuData = appHelper.createMenuData(
			children,
			routesPermissions,
			routesMap,
			routesTree,
		);
		dpChain("appStore").setMenuDataAct(menuData);
	},
	async changePswAct(arg: GetPswInfoParams) {
		return await httpApi.changePswApi(arg);
	},
});
export default thunks;
