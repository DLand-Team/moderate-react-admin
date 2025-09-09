import arrayInclude from "@/src/common/utils/arrayInclude";
import { createThunks, emit, routerHelper } from "src/service";

const thunks = createThunks("appStore", {
  // 添加历史记录的路由
  addHistoryRouteAct(
    { pathname, url }: { pathname: string; url: string },
    store,
  ) {
    const { historyRoutes } = store.getState().appStore;
    const routeConfig = routerHelper.getRouteConfigByPath(pathname);
    if (
      routeConfig &&
      routerHelper.isDashboardPath(pathname) &&
      !arrayInclude(historyRoutes, url, "url")
    ) {
      emit("appStore").setHistoryRoutes([
        ...historyRoutes,
        { ...routeConfig, url },
      ]);
    }
  },
  // 删除历史记录的路由
  deleteHistoryRouteAct({ url }: { url: string }, store) {
    const { historyRoutes } = store.getState().appStore;
    // 至少为1
    if (arrayInclude(historyRoutes, url, "url") && historyRoutes.length > 1) {
      const newHistoryRoutes = [...historyRoutes];
      newHistoryRoutes.splice(
        newHistoryRoutes.findIndex((item) => item.url === url),
        1,
      );
      emit("appStore").setHistoryRoutes(newHistoryRoutes);
      // 如果删除的是当前路由，则跳转到最后一个
      if (url === store.getState().appStore.currentRouteUrl) {
        const lastRoute = newHistoryRoutes[newHistoryRoutes.length - 1];
        lastRoute.url && routerHelper.push(lastRoute.url);
      }
    }
  },
});
export default thunks;
