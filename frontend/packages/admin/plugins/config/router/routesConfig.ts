import { PLUGIN_ROUTE_ID_KEY, PluginRouteItem } from "./types";

export const ROUTE_INFO_CONFIG: {
  [key in PLUGIN_ROUTE_ID_KEY]: PluginRouteItem;
} = {
  testPage: {
    id: "testPage",
    meta: { title: "testPage" },
    component: "TestPage",
    isNoAuth: true,
  },
};
