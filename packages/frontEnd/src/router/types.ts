import type { RouteProps } from "react-router-dom";
export type RouteItem = RouteProps & {
  meta?: {
    title?: string;
  };
  children?: RouteItem[];
  name?: string;
  element?: any;
};

export interface RoutesStructDataItem {
  id: string;
  children?: RoutesStructDataItem[];
  meta?: {
    title?: string;
  };
}
export interface RouteInfoConfigItem {
  id?: string; // 节点id
  parentId?: string; // 父节点id
  path?: string; // 路由地址
  meta?: {
    title?: string;
  }; // 路由元信息
  component?: any; // 路由组件
  state?: any; // 路由状态
}
