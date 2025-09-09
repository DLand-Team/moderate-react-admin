import { ROUTE_ID_KEY, RouteItem } from "./types";

export const ROUTE_CONFIG_MAP: {
  [key in ROUTE_ID_KEY]: RouteItem;
} = {
  dashboard: {
    id: "dashboard",
    meta: { title: "common:HomePageTitle" },
    actionPermissions: ["ADD", "EDIT"],
    isNoAuth: true,
    keepAlive: true,
    isTab: false,
  },
  login: {
    id: "login",
    isNoAuth: true,
    path: "/",
  },
  hello: {
    id: "hello",
    meta: {
      title: "common:HelloPageTitle",
      icon: "FundProjectionScreenOutlined",
    },
    index: true,
    isNoAuth: true,
    keepAlive: true,
  },
  test: {
    id: "test",
    meta: {
      title: "common:HelloPageTitle",
      icon: "FundProjectionScreenOutlined",
    },
    index: true,
    isNoAuth: true,
    keepAlive: true,
  },
  sys: {
    id: "sys",
    meta: {
      title: "common:SysPageTitle",
      icon: "FundProjectionScreenOutlined",
    },
    isNoAuth: true,
    keepAlive: true,
  },
  menu: {
    id: "menu",
    meta: {
      title: "common:MenuPageTitle",
      icon: "FundProjectionScreenOutlined",
    },
    keepAlive: true,
  },
  user: {
    id: "user",
    meta: {
      title: "common:UserPageTitle",
      icon: "FundProjectionScreenOutlined",
    },
    keepAlive: true,
  },
  role: {
    id: "role",
    meta: {
      title: "common:RolePageTitle",
      icon: "FundProjectionScreenOutlined",
    },
    keepAlive: true,
  },
};
