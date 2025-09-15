import React, { type JSX } from "react";
import { ROUTE_NAME } from "./router-name";

export interface RouteItem {
  id: ROUTE_ID_KEY; // 节点id
  parentId?: ROUTE_ID_KEY | null; // 父节点id
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
  page?: React.LazyExoticComponent<(props: unknown) => JSX.Element>;
  actionPermissions?: any[];
  keepAlive?: boolean;
  segment?: string;
  path?: string;
  index?: boolean;
  url?: string; // 完整的
}

// 详情数据

export type ROUTE_ID_KEY = keyof typeof ROUTE_NAME;

// 结构数据
export interface RoutesStructDataItem {
  id: ROUTE_ID_KEY;
  children?: RoutesStructDataItem[];
}
