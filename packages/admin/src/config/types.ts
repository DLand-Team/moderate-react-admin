import type { RouteProps } from "react-router-dom";
import { ACTION_DICT } from "./permissionConfig";
import { ROUTE_NAME } from "./routerConfig";
import { pageList } from "src/pages";
// 详情数据
export type RouteItem = RouteProps & {
	id?: ROUTE_ID_KEY; // 节点id
	parentId?: string; // 父节点id
	isMenu?: boolean; // 是否是菜单
	isNoAuth?: boolean; // 无权限
	meta?: {
		title?: string;
	};
	children?: RouteItem[];
	component?: keyof typeof pageList; // 路由组件
	page?: React.LazyExoticComponent<(props: unknown) => JSX.Element>;
	actionPermissions?: (keyof typeof ACTION_DICT)[];
	keepAlive?: boolean;
};

export type ROUTE_ID_KEY = keyof typeof ROUTE_NAME;

// 结构数据
export interface RoutesStructDataItem {
	id: ROUTE_ID_KEY;
	children?: RoutesStructDataItem[];
}
