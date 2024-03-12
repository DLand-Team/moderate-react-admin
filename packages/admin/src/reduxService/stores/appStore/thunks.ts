/* Instruments */
import { type Location } from "react-router-dom";
import { dp } from "../..";
import { createThunks } from "../../setup";
import names from "../names";

const thunks = createThunks(names.appStore, {
	testAct: async (arg: { id: string }, api) => {},
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
		;
	},
});
export default thunks;
