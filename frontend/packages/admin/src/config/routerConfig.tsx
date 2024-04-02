import { enumToObject } from "src/common/utils";
import type { ROUTE_ID_KEY, RouteItem, RoutesStructDataItem } from "./types";
import i18n from "src/i18n";

// =============== 路由name和id ===============
// MODERATE_AUTO_2:START
export enum ROUTE_NAME {
  homePage,
  loginPage,
  helloPage,
  sysPage,
  cpdPage,
  cmsPage,
  rolePage,
  userPage,
  devPage,
  pageDevPage,
  permissionPage,
  storeDevPage,
  apiDevPage,
  categoryPage,
  posPage,
  posEditPage,
  rulePage,
  ruleListPage,
  ruleEditPage,
  notFundPage,
  posListPage,
  filterPage,
  filterListPage,
  sortPage,
  sortListPage,
  marketPage,
  marketListPage,
  marketEditPage,
  carrierPage,
  carrierListPage,
  menuPage,
  dealPage,
}
// MODERATE_AUTO_2:END

export const ROUTE_ID = enumToObject(ROUTE_NAME);
// =============== 路由信息对象 ===============
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
      title: i18n.t("dev:dev.Dashboard"),
      icon: "FundProjectionScreenOutlined",
    },
    component: "HelloPage",
    actionPermissions: ["ADD", "EDIT"],
    isNoAuth: true,
  },
  sysPage: {
    id: "sysPage",
    meta: {
      title: i18n.t("dev:dev.sys"),
      icon: "ApartmentOutlined",
    },
    actionPermissions: ["ADD", "EDIT"],
    isNoAuth: true,
  },
  cmsPage: {
    id: "cmsPage",
    meta: {
      title: i18n.t("dev:dev.cms"),
      icon: "CoffeeOutlined",
    },
    actionPermissions: ["ADD", "EDIT"],
    isNoAuth: true,
  },
  cpdPage: {
    id: "cpdPage",
    meta: {
      title: i18n.t("dev:dev.cpdPage"),
      icon: "FireOutlined",
    },
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
      title: i18n.t("dev:dev.name"),
      icon: "LaptopOutlined",
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
  posPage: {
    id: "posPage",
    meta: {
      title: "posPage",
    },
    component: "PosPage",
    isNoAuth: true,
  },
  posEditPage: {
    id: "posEditPage",
    meta: {
      title: "posEditPage",
    },
    component: "PosEditPage",
    // depands: ["posPage"],
    isNoAuth: true,
  },
  rulePage: {
    id: "rulePage",
    meta: {
      title: "rulePage",
    },
    component: "RulePage",
  },
  ruleListPage: {
    id: "ruleListPage",
    index: true,
    meta: {
      title: "ruleListPage",
    },
    component: "RuleListPage",
    depands: ["rulePage"],
  },
  ruleEditPage: {
    id: "ruleEditPage",
    meta: {
      title: "ruleEditPage",
    },
    component: "RuleEditPage",
    depands: ["rulePage"],
  },
  notFundPage: {
    id: "notFundPage",
    meta: {
      title: "notFundPage",
    },
    component: "NotFundPage",
    isNoAuth: true,
    isMenu: false,
    path: "*",
  },
  posListPage: {
    id: "posListPage",
    meta: {
      title: "posListPage",
    },
    index: true,
    component: "PosListPage",
    depands: ["posPage"],
  },
  filterPage: {
    id: "filterPage",
    meta: {
      title: "filterPage",
    },
    component: "FilterPage",
    isNoAuth: true,
  },
  filterListPage: {
    id: "filterListPage",
    meta: {
      title: "filterListPage",
    },
    component: "FilterListPage",
    depands: ["filterPage"],
    isNoAuth: true,
    index: true,
  },
  sortPage: {
    id: "sortPage",
    meta: {
      title: "sortPage",
    },
    component: "SortPage",
    isNoAuth: true,
  },
  sortListPage: {
    id: "sortListPage",
    meta: {
      title: "sortListPage",
    },
    component: "SortListPage",
    isNoAuth: true,
    index: true,
    depands: ["sortPage"],
  },
  marketPage: {
    id: "marketPage",
    meta: {
      title: "marketPage",
    },
    component: "MarketPage",
    index: false,
  },
  marketListPage: {
    id: "marketListPage",
    meta: {
      title: "marketListPage",
    },
    component: "MarketListPage",
    index: true,
    depands: ["marketPage"],
  },
  marketEditPage: {
    id: "marketEditPage",
    meta: {
      title: "marketEditPage",
    },
    component: "MarketEditPage",
    index: false,
    depands: ["marketPage"],
  },
  carrierPage: {
    id: "carrierPage",
    meta: {
      title: "carrierPage",
    },
    component: "CarrierPage",
    index: false,
  },
  carrierListPage: {
    id: "carrierListPage",
    meta: {
      title: "carrierListPage",
    },
    component: "CarrierListPage",
    index: true,
    depands: ["carrierPage"],
  },
  menuPage: {
    id: "menuPage",
    meta: {
      title: "menuPage",
    },
    component: "MenuPage",
    isNoAuth: true,
    index: false,
  },
  dealPage: {
    id: "dealPage",
    meta: {
      title: "dealPage",
    },
    component: "DealPage",
    isNoAuth: true,
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
            id: ROUTE_ID.dealPage,
          },
        ],
      },
      {
        id: ROUTE_ID.cpdPage,
        children: [
          {
            id: ROUTE_ID.carrierPage,
            children: [
              {
                id: ROUTE_ID.carrierListPage,
              },
            ],
          },
          {
            id: ROUTE_ID.filterPage,
            children: [
              {
                id: ROUTE_ID.filterListPage,
              },
            ],
          },
          {
            id: ROUTE_ID.marketPage,
            children: [
              {
                id: ROUTE_ID.marketEditPage,
              },
              {
                id: ROUTE_ID.marketListPage,
              },
            ],
          },
          {
            id: ROUTE_ID.posPage,
            children: [
              {
                id: ROUTE_ID.posEditPage,
              },
              {
                id: ROUTE_ID.posListPage,
              },
            ],
          },
          {
            id: ROUTE_ID.rulePage,
            children: [
              {
                id: ROUTE_ID.ruleListPage,
              },
              {
                id: ROUTE_ID.ruleEditPage,
              },
            ],
          },
          {
            id: ROUTE_ID.sortPage,
            children: [
              {
                id: ROUTE_ID.sortListPage,
              },
            ],
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
        id: ROUTE_ID.notFundPage,
      },
      {
        id: ROUTE_ID.permissionPage,
      },
      {
        id: ROUTE_ID.sysPage,
        children: [
          {
            id: ROUTE_ID.menuPage,
          },
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
