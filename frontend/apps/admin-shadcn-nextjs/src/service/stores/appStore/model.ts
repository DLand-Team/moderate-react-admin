import { RouteItem } from "@/src/router";

export interface StoreState {
	isLoading: boolean;
	routeList: RouteItem[];
	routeTree: RouteItem | null;
	currentRoute: RouteItem | null;
	routeListEx: any[];
}
