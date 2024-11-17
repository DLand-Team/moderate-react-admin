import { enumToObject } from "@/common/utils";

export enum NAME {
    HomePage,
    LoginPage,
    HelloPage,
    NotFundPage,
    ErrorPage,
    LoadingPage,
    // market
    MarketPage,
    MarketDetailPage,
    MarketListPage,
    MarketAddPage,
    MarketEditPage,
}

export const ROUTE_NAME = { ...NAME };
export const ROUTE_ID = enumToObject(ROUTE_NAME);
