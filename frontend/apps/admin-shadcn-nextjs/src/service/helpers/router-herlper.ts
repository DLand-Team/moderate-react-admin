import { cloneDeep } from "@/src/common/utils";
import {
  ROUTE_CONFIG_MAP,
  ROUTE_ID_KEY,
  ROUTE_NAME,
  RouteItem,
} from "@/src/router";
import { emit } from "../setup";
import HelperBase from "./_helperBase";
import { toast } from "sonner";

export interface RouteTreeItem {
  parentId: ROUTE_NAME;
  id: ROUTE_NAME;
}

class RouterHelper extends HelperBase {
  // 存储组件View组件的Map，组件View是一个函数组件，不是节点
  keepAliveMap = new Map<
    string,
    {
      ClientView: React.ComponentType<any>;
      component: React.ReactNode;
    }
  >();
  routeList: any[] = [];
  // 注册页面，keepAlive
  registerPage(
    routeId: ROUTE_ID_KEY,
    component?: {
      ClientView: React.ComponentType<any>;
      component: React.ReactNode;
    },
  ) {
    if (component) {
      this.keepAliveMap.set(routeId, component);
      this.routeList.push(routeId);
    }
    emit("appStore").setKeepAliveList(cloneDeep(this.routeList));
  }
  isRouteRegistered(routeId: ROUTE_ID_KEY) {
    return this.keepAliveMap.has(routeId);
  }
  // 获取组件View
  getKeepAliveComponent(pathname: string) {
    return this.keepAliveMap.get(this.getRouteIdByPath(pathname));
  }
  // 通过路径获取路由ID
  getRouteIdByPath(pathname: string): ROUTE_ID_KEY {
    return pathname.split("/").pop() as ROUTE_ID_KEY;
  }
  // 通过路由ID获取路由配置
  getRouteConfigById(routeId: ROUTE_ID_KEY): RouteItem {
    const { routeList } = this.getStore("appStore");
    const extraData = routeList.find((item) => item.id === routeId) || {};
    return { ...ROUTE_CONFIG_MAP[routeId], ...extraData };
  }
  // 通过路径获取路由配置
  getRouteConfigByPath(pathname: string): RouteItem {
    const routeId = this.getRouteIdByPath(pathname);
    return this.getRouteConfigById(routeId);
  }
  // 判断是否需要缓存
  isKeepAlive(pathname: ROUTE_ID_KEY) {
    return ROUTE_CONFIG_MAP[pathname]?.keepAlive;
  }
  // 判断是否是/dashboard开始的path
  isDashboardPath(pathname: string) {
    return pathname.startsWith("/dashboard");
  }
  // 通过路由ID跳转
  junpTo(
    id: ROUTE_ID_KEY,
    {
      searchParams,
      hash,
    }: {
      searchParams?: Record<string, string>;
      hash?: Record<string, string>;
    } = {},
  ) {
    const { routeList } = this.getStore("appStore");
    const targetRoutItem = routeList.find((item) => item.id === id);

    if (targetRoutItem) {
      // 不直接修改 path，防止副作用
      let url = targetRoutItem.path;

      // 拼接 searchParams
      if (searchParams && Object.keys(searchParams).length > 0) {
        const searchStr = new URLSearchParams(searchParams).toString();
        url += `?${searchStr}`;
      }

      // 拼接 hash
      if (hash && Object.keys(hash).length > 0) {
        const hashStr = new URLSearchParams(hash).toString();
        url += `#${hashStr}`;
      }

      url && this.push(url);
    } else {
      toast.warning("无法跳转，路由不存在");
    }
  }

  push(url: string) {
    const routeConfig = this.getRouteConfigByUrl(url);
    if (routeConfig?.path) {
      emit("appStore").setCurrentRouteUrl(url);
      emit("appStore").setJumping(null);
    }
  }

  getCurrentUrl() {
    return (
      window.location.pathname + window.location.search + window.location.hash
    );
  }

  getRouteConfigByUrl(url: string): RouteItem | null {
    const pathname = url.split("?")[0].split("#")[0];
    return this.getRouteConfigByPath(pathname);
  }
}

export default RouterHelper;
