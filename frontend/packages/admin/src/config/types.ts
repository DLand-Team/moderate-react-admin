import { MenuItemType } from "antd/es/menu/hooks/useItems";
import type { RouteProps } from "react-router-dom";
import { pageList } from "src/pages";
import { MenuIconType } from "src/static/iconMap";
import { ACTION_DICT } from "./permissionConfig";
import { ROUTE_NAME } from "./routerConfig";

export interface ExtendRouteConfig {
	id?: ROUTE_ID_KEY; // 节点id
	parentId?: string; // 父节点id
	isMenu?: boolean; // 是否是菜单
	isNoAuth?: boolean; // 无权限
	depands?: ROUTE_ID_KEY[];
	meta?: {
		title?: string;
		icon?: MenuIconType;
	} & Partial<MenuItemType>;
	children?: RouteItem[];
	component?: keyof typeof pageList; // 路由组件
	page?: React.LazyExoticComponent<(props: unknown) => JSX.Element>;
	actionPermissions?: (keyof typeof ACTION_DICT)[];
	keepAlive?: boolean;
}
// 详情数据
export type RouteItem = RouteProps & ExtendRouteConfig;

export type ROUTE_ID_KEY = keyof typeof ROUTE_NAME;

// 结构数据
export interface RoutesStructDataItem {
	id: ROUTE_ID_KEY;
	children?: RoutesStructDataItem[];
}
