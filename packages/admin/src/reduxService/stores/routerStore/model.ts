import { RouteItem } from "@/config/types";
export type RoutesConfigMap = { [key: string]: RouteItem };
export interface StoreState {
	routesConfig: RouteItem[];
	routesConfigMap: RoutesConfigMap; // 配置数据字典，直接通过id获取配置数据
}
