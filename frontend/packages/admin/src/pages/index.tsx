import { lazy } from "react";

// MODERATE_AUTO_PAGE_LAZY_IMPORT:START
const HomePage = lazy(() => import("./homePage/homePage"));
const LoginPage = lazy(() => import("./loginPage/loginPage"));
const HelloPage = lazy(() => import("./homePage/helloPage/helloPage"));
// 系统管理 sysPage
// 用户管理
const UserPage = lazy(() => import("./homePage/sysPage/userPage/userPage"));
// 角色管理
const RolePage = lazy(() => import("./homePage/sysPage/rolePage/rolePage"));
// 内容管理 cmsPage
// 图片管理
// 页面管理
const PageDevPage = lazy(() => import("./homePage/devPage/pageDevPage"));
//permissionPage
const PermissionPage = lazy(
  () => import("./homePage/permissionPage/permissionPage")
);
//storeDevPage
const StoreDevPage = lazy(() => import("./homePage/devPage/storeDevPage"));
//apiDevPage
const ApiDevPage = lazy(() => import("./homePage/devPage/apiDevPage"));
////categoryPage
const CategoryPage = lazy(() => import("./homePage/cmsPage/categoryPage"));

////posPage
const PosPage = lazy(() => import("./homePage/cpdPage/posPage"));

////posEditPage
const PosEditPage = lazy(
  () => import("./homePage/cpdPage/posPage/posEditPage")
);
////rulePage
const RulePage = lazy(() => import("./homePage/cpdPage/rulePage/rulePage"));
////rulePage
const RuleListPage = lazy(
  () => import("./homePage/cpdPage/rulePage/ruleListPage")
);
////ruleEditPage
const RuleEditPage = lazy(
  () => import("./homePage/cpdPage/rulePage/ruleEditPage")
);
////notFundPage
const NotFundPage = lazy(() => import("./homePage/notFundPage/notFundPage"));
////posListPage
const PosListPage = lazy(
  () => import("./homePage/cpdPage/posPage/posListPage")
);
////filterPage
const FilterPage = lazy(() => import("./homePage/cpdPage/filterPage"));
////filterListPage
const FilterListPage = lazy(
  () => import("./homePage/cpdPage/filterPage/filterListPage/filterListPage")
);
////sortPage
const SortPage = lazy(() => import("./homePage/cpdPage/sortPage/sortPage"));
////sortListPage
const SortListPage = lazy(
  () => import("./homePage/cpdPage/sortPage/sortListPage/sortListPage")
);

////marketPage
const MarketPage = lazy(
  () => import("./homePage/cpdPage/marketPage/marketPage")
);
////marketListPage
const MarketListPage = lazy(
  () => import("./homePage/cpdPage/marketPage/marketListPage")
);
////marketEditPage
const MarketEditPage = lazy(
  () => import("./homePage/cpdPage/marketPage/marketEditPage")
);
////carrierPage
const CarrierPage = lazy(
  () => import("./homePage/cpdPage/carrierPage/carrierPage")
);
////carrierListPage
const CarrierListPage = lazy(
  () => import("./homePage/cpdPage/carrierPage/carrierListPage/carrierListPage")
);
////menuPage
const MenuPage = lazy(() => import("./homePage/sysPage/menuPage/menuPage"));
const DealPage = lazy(() => import("./homePage/cmsPage/dealPage/dealPage"));
//MODERATE_AUTO_PAGE_LAZY_IMPORT:END
export const pageList = {
  HomePage,
  LoginPage,
  HelloPage,
  UserPage,
  RolePage,
  PageDevPage,
  PermissionPage,
  StoreDevPage,
  ApiDevPage,
  CategoryPage,
  PosPage,
  PosEditPage,
  RulePage,
  RuleListPage,
  RuleEditPage,
  NotFundPage,
  PosListPage,
  FilterPage,
  FilterListPage,
  SortPage,
  SortListPage,
  MarketPage,
  MarketListPage,
  MarketEditPage,
  CarrierPage,
  CarrierListPage,
  MenuPage,
  DealPage,
};
