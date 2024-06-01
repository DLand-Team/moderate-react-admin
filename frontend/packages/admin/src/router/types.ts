import type { RouteProps } from "react-router-dom";
import { pageList } from "src/pages";
import { ACTION_DICT } from "src/static/actionPermission";
import { MenuIconType } from "src/static/iconMap";
import { NAME } from "./name";
import React from "react";

export interface ExtendRouteConfig {
	id?: ROUTE_ID_KEY; // 节点id
	parentId?: ROUTE_ID_KEY; // 父节点id
	isMenu?: boolean; // 是否是菜单
	isPublish?: boolean;
	isNotRoute?: boolean;
	isNoAuth?: boolean; // 无权限
	depends?: ROUTE_ID_KEY[];
	meta?: {
		title?: string;
		icon?: MenuIconType;
	};
	children?: RouteItem[];
	component?: keyof typeof pageList; // 路由组件
	page?: React.LazyExoticComponent<(props: unknown) => JSX.Element>;
	actionPermissions?: (keyof typeof ACTION_DICT)[];
	keepAlive?: boolean;
}

// 详情数据
export type RouteItem = RouteProps & ExtendRouteConfig;

export type ROUTE_ID_KEY = keyof typeof NAME;

// 结构数据
export interface RoutesStructDataItem {
	id: ROUTE_ID_KEY;
	children?: RoutesStructDataItem[];
}
