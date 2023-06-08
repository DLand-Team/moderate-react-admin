import { Hello, RolePage, UserPage } from "../pages";
import type { RouteInfoConfigItem, RoutesStructDataItem } from './types';

// 路由id
export const ROUTE_ID = {
  center: 'center',
  login: 'login',
  hello: "hello",
  sys: "sys",
  role: "role",
  user: "user",
};

export const ROUTE_INFO_CONFIG: { [key: PropertyKey]: RouteInfoConfigItem } = {
  center: {
    meta: {
      title: "中心",
    },
  },
  hello: {
    meta: {
      title: "首页",
    },
    component: Hello,
    parentId: ROUTE_ID.center,
  },
  sys: {
    meta: {
      title: "系统管理",
    },
    parentId: ROUTE_ID.center,
  },
  user: {
    meta: {
      title: "用户管理",
    },
    component: UserPage,
    parentId: ROUTE_ID.sys,
  },
  role: {
    meta: {
      title: "角色管理",
    },
    component: RolePage,
    parentId: ROUTE_ID.sys,
  },
};

// 结构数据
export const ROUTE_STRUCT_CONFIG: RoutesStructDataItem[] = [
  {
    id: ROUTE_ID.hello,
    meta: {
      title: "首页",
    },
  },
  {
    id: ROUTE_ID.sys,
    meta: {
      title: "首页",
    },
    children: [{
      id: ROUTE_ID.role,
      meta: {
        title: "角色管理",
      },
    }, {
      id: ROUTE_ID.user,
      meta: {
        title: "用户管理",
      },
    }],
  },
];

