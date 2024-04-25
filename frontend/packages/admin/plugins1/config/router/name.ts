import { enumToObject } from "src/common/utils";

export enum PLUGIN_ROUTE_NAME {
  PdfPage = 10000,
  WinboxPage
}

export const PLUGIN_ROUTE_ID = enumToObject(PLUGIN_ROUTE_NAME);
