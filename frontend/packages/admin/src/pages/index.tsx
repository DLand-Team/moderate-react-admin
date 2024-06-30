import { pageList as pluginsPages } from "plugins/config/pages";
import { lazy } from "react";

const isProd = process.env.NODE_ENV == "production";
// MODERATE_AUTO_PAGE_LAZY_IMPORT:START
const HomePage = lazy(() => import("./HomePage/homePage"));
const LoginPage = lazy(() => import("./LoginPage/loginPage"));
const HelloPage = lazy(() => import("./HomePage/HelloPage/helloPage"));
// 角色管理
export const RolePage = lazy(
	() => import("./HomePage/SysPage/RolePage/rolePage"),
);
//storeDevPage
const StoreDevPage = isProd
	? null
	: lazy(() => import("./HomePage/DevPage/StoreDevPage"));
// 页面管理
const PageDevPage = isProd
	? null
	: lazy(() => import("./HomePage/DevPage/PageDevPage"));
////notFundPage
const NotFundPage = lazy(() => import("./HomePage/NotFundPage/notFundPage"));
const ErrorPage = lazy(() => import("./HomePage/NotFundPage/notFundPage"));

//menuPage
const MenuPage = lazy(() => import("./HomePage/SysPage/MenuPage/menuPage"));

//PluginsPage
const PluginsPage = lazy(() => import("./HomePage/PluginsPage"));

//PluginListPage
const PluginListPage = lazy(
	() => import("./HomePage/PluginsPage/PluginListPage"),
);
const DealPage = lazy(() => import("./HomePage/TemplatePage/DealPage"));
const DealListPage = lazy(
	() => import("./HomePage/TemplatePage/DealPage/DealListPage"),
);
const LoadingPage = lazy(() => import("./HomePage/LoadingPage"));

// rule页面
const RulePage = lazy(() => import("./HomePage/TemplatePage/RulePage"));
const RuleDetailPage = lazy(
	() => import("./HomePage/TemplatePage/RulePage/RuleDetailPage"),
);
const RuleListPage = lazy(
	() => import("./HomePage/TemplatePage/RulePage/RuleListPage"),
);
const RuleEditPage = lazy(
	() => import("./HomePage/TemplatePage/RulePage/RuleEditPage"),
);
const RuleAddPage = lazy(
	() => import("./HomePage/TemplatePage/RulePage/RuleAddPage"),
);
////posPage
const PosPage = lazy(() => import("./HomePage/TemplatePage/PosPage"));
const PosDetailPage = lazy(
	() => import("./HomePage/TemplatePage/PosPage/PosDetailPage"),
);
const PosAddPage = lazy(
	() => import("./HomePage/TemplatePage/PosPage/PosAddPage"),
);
const PosEditPage = lazy(
	() => import("./HomePage/TemplatePage/PosPage/PosEditPage"),
);
const PosListPage = lazy(
	() => import("./HomePage/TemplatePage/PosPage/PosListPage"),
);

// filterPage
const FilterPage = lazy(() => import("./HomePage/TemplatePage/FilterPage"));
////filterListPage
const FilterListPage = lazy(
	() => import("./HomePage/TemplatePage/FilterPage/FilterListPage"),
);

//MODERATE_AUTO_PAGE_LAZY_IMPORT:END
export const pageList = {
	...pluginsPages,
	HomePage,
	LoginPage,
	HelloPage,
	RolePage,
	PageDevPage,
	StoreDevPage,
	NotFundPage,
	MenuPage,
	PluginsPage,
	PluginListPage,
	ErrorPage,
	DealPage,
	DealListPage,
	LoadingPage,
	// pos
	PosPage,
	PosListPage,
	PosDetailPage,
	PosEditPage,
	PosAddPage,
	// rule
	RulePage,
	RuleDetailPage,
	RuleListPage,
	RuleAddPage,
	RuleEditPage,
	// filter
	FilterPage,
	FilterListPage,
};
