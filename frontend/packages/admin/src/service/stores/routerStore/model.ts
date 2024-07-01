import { ROUTE_ID_KEY, RouteItem } from "src/router/types";

export type RoutesConfigMap = { [key in ROUTE_ID_KEY]: RouteItem };
export interface StoreState {
	routesTree: RouteItem[];
	routesMap: RoutesConfigMap; // 配置数据字典，直接通过id获取配置数据
	activeKey: ROUTE_ID_KEY | "";
}
