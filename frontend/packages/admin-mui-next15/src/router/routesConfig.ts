import { ROUTE_ID_KEY, RouteItem } from "./types";

export const ROUTE_CONFIG_MAP: {
    [key in ROUTE_ID_KEY]: RouteItem;
} = {
    HomePage: {
        id: "HomePage",
        meta: { title: "common:HomePageTile" },
        component: "HomePage",
        isNoAuth: true,
        keepAlive: true,
        isTab: false,
    },
    LoginPage: {
        id: "LoginPage",
        component: "LoginPage",
        isNoAuth: true,
    },
    HelloPage: {
        id: "HelloPage",
        meta: {
            title: "common:HelloPageTile",
            icon: "FundProjectionScreenOutlined",
        },
        component: "HelloPage",
        keepAlive: true,
        isNoAuth: true,
        index: true,
    },
    NotFundPage: {
        id: "NotFundPage",
        meta: { title: "common:NotFundPageTitle" },
        component: "NotFundPage",
        isNoAuth: true,
        isMenu: false,
        isTab: false,
    },
    ErrorPage: {
        id: "ErrorPage",
        meta: { title: "common:ErrorPageTitle" },
        component: "ErrorPage",
        isNoAuth: true,
        isMenu: false,
        isTab: false,
    },
    LoadingPage: {
        id: "LoadingPage",
        component: "LoadingPage",
        meta: {
            title: "LoadingPage",
        },
        isMenu: false,
        isNoAuth: true,
        isTab: false,
    },
    MarketPage: {
        index: true,
        id: "MarketPage",
        meta: {
            title: "common:marketPage",
        },
        component: "MarketPage",
        isNoAuth: true,
    },
    MarketDetailPage: {
        id: "MarketDetailPage",
        meta: {
            title: "common:marketDetailPage",
        },
        component: "MarketDetailPage",
        depends: ["MarketPage"],
        isMenu: false,
        isNoAuth: true,
    },
    MarketListPage: {
        id: "MarketListPage",

        component: "MarketListPage",
        index: true,
        depends: ["MarketPage"],
        isMenu: false,
        isNoAuth: true,
    },
    MarketEditPage: {
        id: "MarketEditPage",
        meta: {
            title: "common:marketEditPage",
        },
        component: "MarketEditPage",
        depends: ["MarketPage"],
        isMenu: false,
        isNoAuth: true,
    },
    MarketAddPage: {
        id: "MarketAddPage",
        meta: {
            title: "common:marketAddPage",
        },
        component: "MarketAddPage",
        isMenu: false,
        depends: ["MarketPage"],
        isNoAuth: true,
    },
};
