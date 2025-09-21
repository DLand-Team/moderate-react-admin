import { ROUTE_ID_KEY, RouteItem } from "@/src/router";

export interface StoreState {
  isLoading: boolean;
  routeList: RouteItem[];
  routeTree: RouteItem | null;
  keepAliveRouteIds: any[];
  // 记录router历史记录的
  historyRoutes: RouteItem[];
  currentRouteUrl: string;
  jumpingSignal: string;
  isShowModal?: boolean;
  modalContentId?: string;
}
