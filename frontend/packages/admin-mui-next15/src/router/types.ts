import React, { type JSX } from "react";
import { NAME } from "./name";

export interface ExtendRouteConfig {
    id?: ROUTE_ID_KEY; // 节点id
    parentId?: ROUTE_ID_KEY; // 父节点id
    isMenu?: boolean; // 是否是菜单
    isTab?: boolean;
    isPublish?: boolean;
    isNoAuth?: boolean; // 无权限
    depends?: ROUTE_ID_KEY[];
    meta?: {
        title?: string;
        icon?: any;
    };
    children?: RouteItem[];
    component?: string;
    page?: React.LazyExoticComponent<(props: unknown) => JSX.Element>;
    // actionPermissions?: (keyof typeof ACTION_DICT)[];
    keepAlive?: boolean;
    segment?: string;
    index?: boolean;
    path?: string;
}

// 详情数据
export type RouteItem = ExtendRouteConfig;

export type ROUTE_ID_KEY = keyof typeof NAME;

// 结构数据
export interface RoutesStructDataItem {
    id: ROUTE_ID_KEY;
    children?: RoutesStructDataItem[];
}
