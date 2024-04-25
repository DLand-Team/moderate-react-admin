import { MenuItemType } from "antd/es/menu/hooks/useItems";
import type { RouteProps } from "react-router-dom";
import { pageList } from "src/pages";
import { MenuIconType } from "src/static/iconMap";
import { ACTION_DICT } from "src/static/actionPermission";
import { PLUGIN_ROUTE_NAME } from "./name";

export interface PluginExtendRouteConfig {
  id?: PLUGIN_ROUTE_ID_KEY; // 节点id
  parentId?: string; // 父节点id
  isMenu?: boolean; // 是否是菜单
  isNoAuth?: boolean; // 无权限
  depands?: PLUGIN_ROUTE_ID_KEY[];
  meta?: {
    title?: string;
    icon?: MenuIconType;
  } & Partial<MenuItemType>;
  children?: PluginRouteItem[];
  component?: keyof typeof pageList; // 路由组件
  page?: React.LazyExoticComponent<(props: unknown) => JSX.Element>;
  actionPermissions?: (keyof typeof ACTION_DICT)[];
  keepAlive?: boolean;
}
// 详情数据
export type PluginRouteItem = RouteProps & PluginExtendRouteConfig;

export type PLUGIN_ROUTE_ID_KEY = keyof typeof PLUGIN_ROUTE_NAME;

// 结构数据
export interface PluginRoutesStructDataItem {
  id: PLUGIN_ROUTE_ID_KEY;
  children?: PluginRoutesStructDataItem[];
}
