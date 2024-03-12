import { ListenerMiddleware } from "redux-eazy";
import { startAppListening } from "../../setup";
import { dp, getActionType, routerHelper } from "@/reduxService";
import { ROUTE_ID } from "@/config/routerConfig";

const watch = (listenerMiddleware: ListenerMiddleware) => {
	startAppListening({
		type: getActionType("routerStore").setRouterConfig,
		effect: async (action, listenerApi) => {
			const { routesConfig } = listenerApi.getState().routerStore;
			if (routesConfig.length) {
				const temp = routesConfig.find((item) => {
					return item.id === ROUTE_ID.homePage;
				}).children;
				if (temp?.length) {
					const memuDataTemp = routerHelper.generateMenuDataLoop(
						temp,
						[],
					);
					dp("appStore", "setMenuDataAct", memuDataTemp);
				}
			}
		},
	});
};

export default watch;
