import { enumToObject } from "src/common/utils";

export enum PLUGIN_ROUTE_NAME {
  testPage = 10000,
}

export const PLUGIN_ROUTE_ID = enumToObject(PLUGIN_ROUTE_NAME);
