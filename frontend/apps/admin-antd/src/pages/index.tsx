import { pageList as pluginsPages } from "plugins/config/pages";
import { lazy } from "react";
import CodeGeneratePage from "./HomePage/DevPage/CodeGeneratePage";
import UserPage from "./HomePage/SysPage/UserPage";

const isProd = process.env.NODE_ENV == "production";
// MODERATE_AUTO_PAGE_LAZY_IMPORT:START
const HomePage = lazy(() => import("./HomePage"));
const LoginPage = lazy(() => import("./LoginPage"));
const HelloPage = lazy(() => import("./HomePage/HelloPage"));
// 角色管理
export const RolePage = lazy(() => import("./HomePage/SysPage/RolePage"));
//storeDevPage
const StoreDevPage = isProd
  ? null
  : lazy(() => import("./HomePage/DevPage/StoreDevPage"));
// 页面管理
const PageDevPage = isProd
  ? null
  : lazy(() => import("./HomePage/DevPage/PageDevPage"));
////notFundPage
const NotFundPage = lazy(() => import("./HomePage/NotFundPage"));
const ErrorPage = lazy(() => import("./HomePage/NotFundPage"));

//menuPage
const MenuPage = lazy(() => import("./HomePage/SysPage/MenuPage"));

//PluginsPage
const PluginsPage = lazy(() => import("./HomePage/PluginsPage"));

//PluginListPage
const PluginListPage = lazy(
  () => import("./HomePage/PluginsPage/PluginListPage"),
);
const LoadingPage = lazy(() => import("./HomePage/LoadingPage"));

//MODERATE_AUTO_PAGE_LAZY_IMPORT:END
export type PageKey = keyof typeof pageList;
export const pageList = {
  ...pluginsPages,
  HomePage,
  LoginPage,
  HelloPage,
  RolePage,
  PageDevPage,
  CodeGeneratePage,
  StoreDevPage,
  NotFundPage,
  MenuPage,
  PluginsPage,
  PluginListPage,
  ErrorPage,
  LoadingPage,
  UserPage,
};
