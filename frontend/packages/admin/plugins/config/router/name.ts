import { enumToObject } from "src/common/utils";

export enum PLUGIN_ROUTE_NAME {
  Winbox = 10000,
  Rive,
  PdfPage,
  HomePage,
  CmsPage,
  PdfPage,
}

export const PLUGIN_ROUTE_ID = enumToObject(PLUGIN_ROUTE_NAME);
