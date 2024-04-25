import { lazy } from "react";
import { pageList as pluginsPages } from "plugins/config/pages";

const isProd = process.env.NODE_ENV == "production";

// MODERATE_AUTO_PAGE_LAZY_IMPORT:START
const HomePage = lazy(() => import("./HomePage/homePage"));
const LoginPage = lazy(() => import("./LoginPage/loginPage"));
const HelloPage = lazy(() => import("./HomePage/HelloPage/helloPage"));
// 用户管理
const UserPage = lazy(() => import("./HomePage/SysPage/UserPage/userPage"));
// 角色管理
const RolePage = lazy(() => import("./HomePage/SysPage/RolePage/rolePage"));
//permissionPage
const PermissionPage = lazy(
	() => import("./HomePage/PermissionPage/permissionPage"),
);
//storeDevPage
const StoreDevPage = isProd
	? null
	: lazy(() => import("./HomePage/DevPage/StoreDevPage"));
//apiDevPage
const ApiDevPage = isProd
	? null
	: lazy(() => import("./HomePage/DevPage/ApiDevPage"));
// 页面管理
const PageDevPage = isProd
	? null
	: lazy(() => import("./HomePage/DevPage/PageDevPage"));
////notFundPage
const NotFundPage = lazy(() => import("./HomePage/NotFundPage/notFundPage"));

//menuPage
const MenuPage = lazy(() => import("./HomePage/SysPage/MenuPage/menuPage"));

//PluginsPage
const PluginsPage = isProd
	? null
	: lazy(() => import("./HomePage/PluginsPage"));

//PluginListPage
const PluginListPage = isProd
	? null
	: lazy(() => import("./HomePage/PluginsPage/PluginListPage"));

//MODERATE_AUTO_PAGE_LAZY_IMPORT:END
export const pageList = {
	...pluginsPages,
	HomePage,
	LoginPage,
	HelloPage,
	UserPage,
	RolePage,
	PageDevPage,
	PermissionPage,
	StoreDevPage,
	ApiDevPage,
	NotFundPage,
	MenuPage,
	PluginsPage,
	PluginListPage,
};
