import {
  lazy
} from "react";

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
  () => import("./homePage/permissionPage/permissionPage"),
);
//storeDevPage
const StoreDevPage = lazy(() => import("./homePage/devPage/storeDevPage"));
//apiDevPage
const ApiDevPage = lazy(() => import("./homePage/devPage/apiDevPage"));
////categoryPage
const CategoryPage = lazy(() => import("./homePage/cmsPage/categoryPage"));

////testPage
const TestPage = lazy(() => import("./homePage/cmsPage/testPage/testPage"));
////test1Page
const Test1Page = lazy(() => import("./homePage/cmsPage/test1Page/test1Page"));
////posPage
const PosPage = lazy(() => import("./homePage/cpdPage/posPage"));

////posEditPage
const PosEditPage = lazy(
  () => import("./homePage/cpdPage/posPage/posEditPage"),
);
////rulePage
const RulePage = lazy(() => import("./homePage/cpdPage/rulePage/rulePage"));
////ruleEditPage
const RuleEditPage = lazy(
  () => import("./homePage/cpdPage/rulePage/ruleEditPage/ruleEditPage"),
);
////notFundPage
const NotFundPage = lazy(() => import("./homePage/notFundPage/notFundPage"));
////posListPage
const PosListPage = lazy(
  () => import("./homePage/cpdPage/posPage/posListPage"),
);
////filterPage
const FilterPage = lazy(() => import("./homePage/cpdPage/filterPage"));
////filterEditPage
const FilterEditPage = lazy(
  () => import("./homePage/cpdPage/filterPage/filterEditPage/filterEditPage"),
);
////filterListPage
const FilterListPage = lazy(
  () => import("./homePage/cpdPage/filterPage/filterListPage/filterListPage"),
);
////sortPage
const SortPage = lazy(() => import("./homePage/cpdPage/sortPage/sortPage"));
////sortListPage
const SortListPage = lazy(
  () => import("./homePage/cpdPage/sortPage/sortListPage/sortListPage"),
);
////sortEditPage
const SortEditPage = lazy(
  () => import("./homePage/cpdPage/sortPage/sortEditPage/sortEditPage"),
);

////marketPage
const MarketPage = lazy(
  () => import("./homePage/cpdPage/marketPage/marketPage"),
);
////marketListPage
const MarketListPage = lazy(
  () => import("./homePage/cpdPage/marketPage/marketListPage"),
);
////marketEditPage
const MarketEditPage = lazy(
  () => import("./homePage/cpdPage/marketPage/marketEditPage"),
);
////carrierPage 
const CarrierPage = lazy(() => import("./homePage/cpdPage/carrierPage/carrierPage"));
////carrierListPage 
const CarrierListPage = lazy(() => import("./homePage/cpdPage/carrierPage/carrierListPage/carrierListPage"));
////carrierEditPage 
const CarrierEditPage = lazy(() => import("./homePage/cpdPage/carrierPage/carrierEditPage/carrierEditPage"));
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
  TestPage,
  Test1Page,
  PosPage,
  PosEditPage,
  RulePage,
  RuleEditPage,
  NotFundPage,
  PosListPage,
  FilterPage,
  FilterEditPage,
  FilterListPage,
  SortPage,
  SortListPage,
  SortEditPage,
  MarketPage,
  MarketListPage,
  MarketEditPage,
  CarrierPage,
  CarrierListPage,
  CarrierEditPage
};