import { ArticleCtr, Hello, RolePage, UserPage, Menu } from "../pages";
import type { RouteInfoConfigItem, RoutesStructDataItem } from "./types";

// 配置步骤
// 1，配置路由id
// 2，配置路由内容
// 3，配置路由结构

// 为啥不配置成一个完成的数据？
// 将路由信息分成‘结构’和‘内容’两部分，这样方便关注点分离。
// 结构关注点在组织关系。
// 路由信息关注点在路由具体内容是什么。

// 最终会生成一个树状的信息，一个结合了结构和内容的完整信息。

// 路由id
export const ROUTE_ID = {
  center: "center",
  login: "login",
  hello: "hello",
  cms: "cms", // 内容管理
  sys: "sys", //系统管理
  role: "role",
  user: "user",
  menu: "menu",
  article: "article",
};

// 路由信息
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
  },
  sys: {
    meta: {
      title: "系统管理",
    },
  },
  cms: {
    meta: {
      title: "内容管理",
    },
  },
  user: {
    meta: {
      title: "用户管理",
    },
    component: UserPage,
  },
  role: {
    meta: {
      title: "角色管理",
    },
    component: RolePage,
  },
  menu: {
    meta: {
      title: "菜单管理",
    },
    component: Menu,
  },
  article: {
    meta: {
      title: "文章管理",
    },
    component: ArticleCtr,
  },
};

// 结构数据
export const ROUTE_STRUCT_CONFIG: RoutesStructDataItem[] = [
  {
    id: ROUTE_ID.hello,
  },
  {
    id: ROUTE_ID.sys,
    children: [
      {
        id: ROUTE_ID.role,
      },
      {
        id: ROUTE_ID.user,
      },
      {
        id: ROUTE_ID.menu,
      },
    ],
  },
  {
    id: ROUTE_ID.cms,
    children: [
      {
        id: ROUTE_ID.article,
      },
    ],
  },
];
