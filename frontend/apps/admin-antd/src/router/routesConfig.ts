import { ROUTE_CONFIG_MAP as PLUGIN_ROUTE_CONFIG_MAP } from "plugins/config/router/routesConfig";
import { ROUTE_ID_KEY, RouteItem } from "./types";

export const ROUTE_CONFIG_MAP: {
  [key in ROUTE_ID_KEY]: RouteItem;
} = {
  HomePage: {
    id: "HomePage",
    meta: { title: "common:HomePageTile" },
    component: "HomePage",
    actionPermissions: ["ADD", "EDIT"],
    isNoAuth: true,
    keepAlive: true,
    isTab: false,
  },
  LoginPage: {
    id: "LoginPage",
    component: "LoginPage",
    isNoAuth: true,
    path: "/",
  },
  HelloPage: {
    id: "HelloPage",
    meta: {
      title: "common:HelloPageTile",
      icon: "FundProjectionScreenOutlined",
    },
    component: "HelloPage",
    actionPermissions: ["ADD", "EDIT"],
    index: true,
    isNoAuth: true,
  },
  SysPage: {
    id: "SysPage",
    meta: {
      title: "common:SysPageTitle",
      icon: "ApartmentOutlined",
    },
    actionPermissions: ["ADD", "EDIT"],
    isNoAuth: true,
  },
  CmsPage: {
    id: "CmsPage",
    meta: {
      title: "common:CmsPageTitle",
      icon: "CoffeeOutlined",
    },
    actionPermissions: ["ADD", "EDIT"],
    isNoAuth: true,
  },
  TemplatePage: {
    id: "TemplatePage",
    meta: {
      title: "common:TemplatePage",
      icon: "StarOutlined",
    },
  },
  UserPage: {
    id: "UserPage",
    meta: { title: "common:UserPageTitle" },
    component: "UserPage",
    isNoAuth: true,
    keepAlive: true,
  },
  RolePage: {
    id: "RolePage",
    meta: { title: "common:RolePageTitle" },
    component: "RolePage",
    actionPermissions: ["ADD", "EDIT"],
  },
  DevPage: {
    id: "DevPage",
    meta: {
      title: "common:DevPageTitle",
      icon: "LaptopOutlined",
    },
    actionPermissions: ["ADD", "EDIT"],
    isPublish: false,
    // isNoAuth: true,
  },
  PageDevPage: {
    id: "PageDevPage",
    meta: { title: "common:PageDevPageTitle" },
    component: "PageDevPage",
    actionPermissions: ["ADD", "EDIT"],
    isNoAuth: true,
  },
  StoreDevPage: {
    id: "StoreDevPage",
    meta: { title: "common:StoreDevPageTitle" },
    component: "StoreDevPage",
    actionPermissions: ["ADD", "EDIT"],
    isNoAuth: false,
  },
  CodeGeneratePage: {
    id: "CodeGeneratePage",
    meta: { title: "common:CodeGeneratePageTitle" },
    component: "CodeGeneratePage",
    isNoAuth: true,
    isPublish: false,
    keepAlive: true,
  },
  NotFundPage: {
    id: "NotFundPage",
    meta: { title: "common:NotFundPageTitle" },
    component: "NotFundPage",
    isNoAuth: true,
    isMenu: false,
    path: "*",
    isTab: false,
  },
  ErrorPage: {
    id: "ErrorPage",
    meta: { title: "common:ErrorPageTitle" },
    component: "ErrorPage",
    isNoAuth: true,
    isMenu: false,
    path: "*",
    isTab: false,
  },
  MenuPage: {
    id: "MenuPage",
    meta: { title: "common:MenuPageTitle" },
    component: "MenuPage",
    isNoAuth: true,
    keepAlive: true,
  },
  PluginsPage: {
    id: "PluginsPage",
    meta: {
      title: "common:PluginsPageTitle",
      icon: "ProductOutlined",
    },
    component: "PluginsPage",
    isNoAuth: true,
  },
  PluginListPage: {
    id: "PluginListPage",
    component: "PluginListPage",
    isNoAuth: true,
    isMenu: false,
    index: true,
  },
  LoadingPage: {
    id: "LoadingPage",
    component: "LoadingPage",
    meta: {
      title: "LoadingPage",
    },
    isMenu: false,
    isNoAuth: true,
    isTab: false,
  },
  ...PLUGIN_ROUTE_CONFIG_MAP,
};
