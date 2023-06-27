import type { RouteProps } from "react-router-dom";

// 详情数据
export type RouteItem = RouteProps & {
  meta?: {
    title?: string;
  };
  children?: RouteItem[];
  name?: string;
  element?: any;
};

// 结构数据
export interface RoutesStructDataItem {
  id: string;
  children?: RoutesStructDataItem[];
  isMustShow?: boolean; // 是否必须显示，不通过权限控制
}

// 根据结构-RoutesStructDataItem和详情-RouteItem生成完整的路由信息
// 提供给外部进行访问的主要数据
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
