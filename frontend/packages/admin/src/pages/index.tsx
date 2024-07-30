import { pageList as pluginsPages } from "plugins/config/pages";
import { lazy } from "react";

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
    () => import("./HomePage/PluginsPage/PluginListPage")
);
const LoadingPage = lazy(() => import("./HomePage/LoadingPage"));

// rule页面
const RulePage = lazy(() => import("./HomePage/CpdPage/RulePage"));
const RuleDetailPage = lazy(
    () => import("./HomePage/CpdPage/RulePage/RuleDetailPage")
);
const RuleListPage = lazy(
    () => import("./HomePage/CpdPage/RulePage/RuleListPage")
);
const RuleEditPage = lazy(
    () => import("./HomePage/CpdPage/RulePage/RuleEditPage")
);
const RuleAddPage = lazy(
    () => import("./HomePage/CpdPage/RulePage/RuleAddPage")
);
////posPage
const PosPage = lazy(() => import("./HomePage/CpdPage/PosPage"));
const PosDetailPage = lazy(
    () => import("./HomePage/CpdPage/PosPage/PosDetailPage")
);
const PosAddPage = lazy(() => import("./HomePage/CpdPage/PosPage/PosAddPage"));
const PosEditPage = lazy(
    () => import("./HomePage/CpdPage/PosPage/PosEditPage")
);
const PosListPage = lazy(
    () => import("./HomePage/CpdPage/PosPage/PosListPage")
);
//market
////marketPage
const MarketPage = lazy(() => import("./HomePage/CpdPage/MarketPage"));
const MarketDetailPage = lazy(
    () => import("./HomePage/CpdPage/MarketPage/MarketDetailPage")
);
////marketListPage
const MarketListPage = lazy(
    () => import("./HomePage/CpdPage/MarketPage/MarketListPage")
);
////marketEditPage
const MarketEditPage = lazy(
    () => import("./HomePage/CpdPage/MarketPage/MarketEditPage")
);
////marketAddPage
const MarketAddPage = lazy(
    () => import("./HomePage/CpdPage/MarketPage/MarketAddPage")
);
// sortPage
const SortPage = lazy(() => import("./HomePage/CpdPage/SortPage"));
////filterListPage
const SortListPage = lazy(
    () => import("./HomePage/CpdPage/SortPage/SortListPage")
);

//MODERATE_AUTO_PAGE_LAZY_IMPORT:END
export type PageKey = keyof typeof pageList;
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
    LoadingPage,
    //market
    MarketPage,
    MarketDetailPage,
    MarketListPage,
    MarketEditPage,
    MarketAddPage,
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
    // sort
    SortPage,
    SortListPage,
};
