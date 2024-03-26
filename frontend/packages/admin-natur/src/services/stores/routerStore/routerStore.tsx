// 权限仓库，一切与权限相关联的数据都放在这里
// 路由数据，权限数据，token，是否是管理员，tabs历史记录
import { ROUTE_ID, ROUTE_INFO_CONFIG } from "@/config/routerConfig";
import { routerHelper } from "@/services";
import { cloneDeep } from "lodash-es";
import actions from "./routerStore.action";
import type { RouterStoreState } from "./routerStore.model";
import watch from "./routerStore.watch";
// 状态

const initState = (): RouterStoreState => {
	let defaultRouteKeys = [ROUTE_ID.loginPage, ROUTE_ID.homePage];
	let defaultRoutesData =
		routerHelper.createDefaultRoutesConfig(defaultRouteKeys);
	return {
		defaultRouteKeys,
		defaultRoutesData,
		routesData: defaultRoutesData || [],
		routesConfigMap: cloneDeep(ROUTE_INFO_CONFIG),
		defaultPermissions: Object.values(cloneDeep(ROUTE_INFO_CONFIG))
			.filter((item) => {
				return item.isMustShow;
			})
			.map((item) => {
				return item.id;
			}),
	};
};

const routerStore = {
	state: initState(),
	actions: {
		...actions,
		init: initState,
	},
	watch,
};
export default routerStore;
