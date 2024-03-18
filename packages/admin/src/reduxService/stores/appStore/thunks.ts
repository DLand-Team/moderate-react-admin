/* Instruments */
import { type Location } from "react-router-dom";
import { ROUTE_ID } from "src/config/routerConfig";
import { RouterHelper } from "src/reduxService/helper/routerHelper";
import { dp } from "../..";
import { createThunks } from "../../setup";
import names from "../names";

const thunks = createThunks(names.appStore, {
	deleteTabHistoryAct: async ({ pathName }: { pathName: string }, api) => {
		const { tabsHistory } = api.getState().appStore;
		if (Object.values(tabsHistory).length > 1) {
			const tabsHistoryCopy = { ...tabsHistory };
			Reflect.deleteProperty(tabsHistoryCopy, pathName);
			dp("appStore", "setTabsHistory", tabsHistoryCopy);
		}
	},
	addTabHistoryActionAct: async ({ newItem }: { newItem: Location }, api) => {
		const { tabsHistory } = api.getState().appStore;
		const tabsHistoryCopy = { ...tabsHistory };
		tabsHistoryCopy[newItem.pathname] = newItem;
		dp("appStore", "setTabsHistory", tabsHistoryCopy);
	},
	createMenuDataAct: async (_, api) => {
		const { menuPermissions } = api.getState().authStore;
		const { children } = menuPermissions || {};
		const { menuData = [] } = children
			? RouterHelper.createMenuDataLoopByPermissions(children, [], [])
			: {};
		const { routesConfig } = api.getState().routerStore;
		if (routesConfig.length) {
			const temp = routesConfig.find((item) => {
				return item.id === ROUTE_ID.homePage;
			})?.children;
			if (temp?.length) {
				const memuDataTemp = RouterHelper.createMenuDataLoop(temp, []);
				dp("appStore", "setMenuDataAct", [
					...menuData,
					...memuDataTemp,
				]);
			}
		}
	},
});
export default thunks;
