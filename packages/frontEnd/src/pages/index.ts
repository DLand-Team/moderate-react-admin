import { lazy } from "react";
// sys和cms是两个模块，分别对应系统管理和内容管理
// 没添加一个页面，都要export导出
const Center = lazy(() => import("./center/center"));
const Login = lazy(() => import("./login/login"));
const Hello = lazy(() => import("./hello/hello"));
// 系统管理 sys
// 用户管理
const UserPage = lazy(() => import("./sys/user/user"));
// 角色管理
const RolePage = lazy(() => import("./sys/role/role"));
// 菜单管理
const Menu = lazy(() => import("./sys/menu/menu"));
// 内容管理 cms
// 文章页面
const ArticleCtr = lazy(() => import("./cms/article/article"));
// 图片管理
const ImageCtr = lazy(() => import("./cms/picture/picture"));

export {
  Center,
  Login,
  Hello,
  UserPage,
  RolePage,
  ArticleCtr,
  ImageCtr,
  Menu,
};
