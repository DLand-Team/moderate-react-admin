import { enumToObject } from "src/common/utils";
import type { ROUTE_ID_KEY, RouteItem, RoutesStructDataItem } from "./types";

// =============== 路由name和id ===============
// MODERATE_AUTO_2:START
export enum ROUTE_NAME {
  homePage,
  loginPage,
  helloPage,
  cmsPage,
  sysPage,
  rolePage,
  userPage,
  devPage,
  pageDevPage,
  permissionPage,
  storeDevPage,
  apiDevPage,
  categoryPage,
  testPage,
  test1Page,
  posPage,
  marketPage,
}
// MODERATE_AUTO_2:END

export const ROUTE_ID = enumToObject(ROUTE_NAME);
// =============== 路由信息数组和路由信息对象 ===============
// ROUTE_INFO_CONFIG，路由信息字典
// MODERATE_AUTO_3:START
export const ROUTE_INFO_CONFIG: {
  [key in ROUTE_ID_KEY]: RouteItem;
} = {
  loginPage: {
    id: "loginPage",
    meta: {
      title: "Login",
    },
    component: "LoginPage",
    path: "/login",
    isNoAuth: true,
  },
  homePage: {
    id: "homePage",
    meta: {
      title: "Home",
    },
    path: "/",
    component: "HomePage",
    actionPermissions: ["ADD", "EDIT"],
    isNoAuth: true,
  },
  helloPage: {
    id: "helloPage",
    meta: {
      title: "Statistics Dashboard",
    },
    index: true,
    component: "HelloPage",
    actionPermissions: ["ADD", "EDIT"],
    isNoAuth: true,
  },
  sysPage: {
    id: "sysPage",
    meta: {
      title: "System Management",
    },
    actionPermissions: ["ADD", "EDIT"],
    isNoAuth: true,
  },
  cmsPage: {
    id: "cmsPage",
    meta: {
      title: "Content Management",
    },
    actionPermissions: ["ADD", "EDIT"],
    isNoAuth: true,
  },
  userPage: {
    id: "userPage",
    meta: {
      title: "User Management",
    },
    actionPermissions: ["ADD", "EDIT"],
    component: "UserPage",
    isNoAuth: true,
  },
  rolePage: {
    id: "rolePage",
    meta: {
      title: "Role Management",
    },
    component: "RolePage",
    actionPermissions: ["ADD", "EDIT"],
    isNoAuth: true,
  },
  devPage: {
    id: "devPage",
    meta: {
      title: "Dev Page",
    },
    actionPermissions: ["ADD", "EDIT"],
    isNoAuth: true,
  },
  pageDevPage: {
    id: "pageDevPage",
    meta: {
      title: "Router Management",
    },
    component: "PageDevPage",
    actionPermissions: ["ADD", "EDIT"],
    isNoAuth: true,
  },
  permissionPage: {
    id: "permissionPage",
    meta: {
      title: "Permission Management",
    },
    component: "PermissionPage",
    isMenu: false,
    actionPermissions: ["ADD", "EDIT"],
    isNoAuth: true,
  },
  storeDevPage: {
    id: "storeDevPage",
    meta: {
      title: "Store Management",
    },
    component: "StoreDevPage",
    actionPermissions: ["ADD", "EDIT"],
    isNoAuth: true,
  },
  apiDevPage: {
    id: "apiDevPage",
    meta: {
      title: "API Management",
    },
    component: "ApiDevPage",
    isNoAuth: true,
    actionPermissions: ["ADD", "EDIT"],
  },
  categoryPage: {
    id: "categoryPage",
    meta: {
      title: "Category Management",
    },
    component: "CategoryPage",
    isNoAuth: true,
  },
  testPage: {
    id: "testPage",
    meta: {
      title: "testPage",
    },
    component: "TestPage",
    isNoAuth: true,
  },
  test1Page: {
    id: "test1Page",
    meta: {
      title: "test1Page",
    },
    component: "Test1Page",
    isNoAuth: true,
  },
  posPage: {
    id: "posPage",
    meta: {
      title: "posPage",
    },
    component: "PosPage",
  },
  marketPage: {
    id: "marketPage",
    meta: {
      title: "marketPage",
    },
    component: "MarketPage",
  },
}; //MODERATE_AUTO_3:END
// =============== 路由结构数据 ===============
// MODERATE_AUTO:START
export const ROUTE_STRUCT_CONFIG: RoutesStructDataItem[] = [
  {
    id: ROUTE_ID.homePage,
    children: [
      {
        id: ROUTE_ID.cmsPage,
        children: [
          {
            id: ROUTE_ID.categoryPage,
          },
          {
            id: ROUTE_ID.test1Page,
          },
          {
            id: ROUTE_ID.testPage,
          },
        ],
      },
      {
        id: ROUTE_ID.devPage,
        children: [
          {
            id: ROUTE_ID.apiDevPage,
          },
          {
            id: ROUTE_ID.pageDevPage,
          },
          {
            id: ROUTE_ID.storeDevPage,
          },
        ],
      },
      {
        id: ROUTE_ID.helloPage,
      },
      {
        id: ROUTE_ID.marketPage,
      },
      {
        id: ROUTE_ID.permissionPage,
      },
      {
        id: ROUTE_ID.posPage,
      },
      {
        id: ROUTE_ID.sysPage,
        children: [
          {
            id: ROUTE_ID.rolePage,
          },
          {
            id: ROUTE_ID.userPage,
          },
        ],
      },
    ],
  },
  {
    id: ROUTE_ID.loginPage,
  },
];
// MODERATE_AUTO:END
