import { PLUGIN_ROUTE_ID_KEY, PluginRouteItem } from "./types";

export const ROUTE_INFO_CONFIG: {
  [key in PLUGIN_ROUTE_ID_KEY]: PluginRouteItem;
} = {
  PdfPage: {
    id: "PdfPage",
    meta: { title: "PdfPage" },
    isNoAuth: true,
    component: "PdfPage",
  },
  WinboxPage: {
    id: "WinboxPage",
    meta: { title: "WinboxPage" },
    isNoAuth: true,
    component: "WinboxPage",
  },
};
