import { ROUTE_ID_KEY, RouteItem } from "@/router";

export type RoutesConfigMap = { [key in ROUTE_ID_KEY]: RouteItem };
export interface StoreState {
    activeKey: ROUTE_ID_KEY | "";
}
