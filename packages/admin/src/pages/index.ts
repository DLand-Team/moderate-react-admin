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
const PageDevPage = lazy(
  () => import("./homePage/devPage/pageDevPage/pageDevPage"),
);
//permissionPage
const PermissionPage = lazy(
  () => import("./homePage/permissionPage/permissionPage"),
);
//storeDevPage
const StoreDevPage = lazy(
  () => import("./homePage/devPage/storeDevPage/storeDevPage"),
);
//apiDevPage
const ApiDevPage = lazy(
  () => import("./homePage/devPage/apiDevPage/apiDevPage"),
);

////categoryPage
const CategoryPage = lazy(
  () => import("./homePage/cmsPage/categoryPage/categoryPage"),
);

////testPage 
const TestPage = lazy(() => import("./homePage/cmsPage/testPage/testPage"));
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
  TestPage
};