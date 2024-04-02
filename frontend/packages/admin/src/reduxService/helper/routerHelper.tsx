import { ItemType } from "antd/es/menu/hooks/useItems";
import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import historyInstanse from "src/common/components/customRouter/historyInstance";
import { includeOne } from "src/common/utils";
import {
  ROUTE_ID,
  ROUTE_INFO_CONFIG,
  ROUTE_STRUCT_CONFIG,
} from "src/config/routerConfig";
import type {
  ROUTE_ID_KEY,
  RouteItem,
  RoutesStructDataItem,
} from "src/config/types";
import { pageList } from "src/pages";
import { reduxStore as store } from "..";

export type MenuItem = Partial<ItemType> & {
  key: ROUTE_ID_KEY;
  children?: MenuItem[];
  icon?: React.ReactNode;
};

export class RouterHelper {
  static createClientRoutesConfig() {
    return Object.values(ROUTE_INFO_CONFIG)
      .filter((item) => {
        return item.isNoAuth;
      })
      .map((routeItem) => {
        return {
          ...routeItem,
        };
      });
  }

  // 生成路由配置
  static createRouteConfigLoop = ({
    children,
    routesStuctData,
    prefix,
    routesConfigMap,
    routesPermissions,
    parentId,
  }: {
    children: any[];
    routesStuctData: RoutesStructDataItem[];
    prefix: string;
    routesConfigMap: {
      [key in ROUTE_ID_KEY]: RouteItem;
    };
    routesPermissions: string[];
    parentId: string;
  }) => {
    routesStuctData.forEach((routeStructItem) => {
      const { id } = routeStructItem;
      const { depands, path: pathE } = routesConfigMap[id];
      // 如果有权限或者是必须显示的，或者是管理员
      if (
        routesPermissions?.includes(id) ||
        (depands && includeOne(routesPermissions, depands)) ||
        routesConfigMap[id].isNoAuth
      ) {
        const { component, ...rest } = routesConfigMap[id];
        const path = prefix + "/" + id;
        routesConfigMap[id].parentId = parentId as ROUTE_ID_KEY;
        routesConfigMap[id].id = id as ROUTE_ID_KEY;
        routesConfigMap[id].path = pathE || path;
        let routesConfig: RouteItem = {
          ...rest,
          path: pathE || path,
          id,
          component,
        };
        // 沿途记录，然后拼接成path
        children!.push(routesConfig);
        if (routeStructItem.children!?.length > 0) {
          routesConfig.children = this.createRouteConfigLoop({
            children: [],
            routesStuctData: routeStructItem.children!,
            prefix: routesConfig.path || "",
            routesPermissions,
            routesConfigMap,
            parentId: id,
          });
        }
      }
    });
    return children;
  };

  /**
   * @description: 创建路由配置数据（根据路由权限）
   * @param {MenuPermissionItem} data 若依后台的菜单权限数组
   * @return {*} 适用于antd的菜单组件数据
   */
  static createRoutesConfigByPermissions = ({
    routesPermissions,
    routesConfigMap,
  }: {
    routesPermissions: string[];
    routesConfigMap: {
      [key in ROUTE_ID_KEY]: RouteItem;
    };
  }): {
    routesConfig: RouteItem[];
    routesConfigMap: {
      [key in ROUTE_ID_KEY]: RouteItem;
    };
  } => {
    let homeChildren = ROUTE_STRUCT_CONFIG.find(
      (item) => item.id === ROUTE_ID.homePage
    )!.children!;

    // 获取客户端显示的路由作为基础，再去融合后端动态配置权限菜单关联的路由
    let routesConfig = [...RouterHelper.createClientRoutesConfig()];
    let targetId = routesConfig.findIndex((item) => {
      return item.id === ROUTE_ID.homePage;
    });
    routesConfig[targetId] = Object.assign({}, routesConfig[targetId], {
      children: RouterHelper.createRouteConfigLoop({
        children: [],
        routesStuctData: homeChildren,
        prefix: "/" + ROUTE_ID[ROUTE_ID.homePage],
        routesConfigMap,
        routesPermissions,
        parentId: ROUTE_ID.homePage,
      }),
    });
    return {
      routesConfig: [...routesConfig],
      routesConfigMap: routesConfigMap,
    };
  };

  // 递归创建路由
  static toRenderRouteLoop = (item: RouteItem) => {
    const { children, component, path, index, ...rest } = item;
    let routeChildren: JSX.Element[] = [];
    if (children) {
      routeChildren = children.map((item) => {
        return RouterHelper.toRenderRouteLoop(item);
      });
    }
    let element;
    if (!item.element) {
      if (component && component in pageList) {
        const Comp = pageList[component];
        element = (
          <Suspense>
            <Comp />
          </Suspense>
        );
      }
    }
    return (
      <Route
        children={routeChildren}
        key={item.id}
        // index是官方的配置项https://reactrouter.com/en/main/route/route#index
        // 这句话很神奇的，当配置了index了之后，那么他便没有了path，父组件路由是啥就会路由到这个子组件
        path={index ? "" : path}
        element={item.element || element}
        {...(rest as any)}></Route>
    );
  };

  // 生成路由配置根据权限
  // 每次登陆只会触发一次

  static getRoutePathByKey(key: ROUTE_ID_KEY) {
    const routerStore = store.getState().routerStore;
    return routerStore.routesConfigMap[key]?.path;
  }

  static getRouteTitleByKey(key: ROUTE_ID_KEY) {
    const routerStore = store.getState().routerStore;
    return routerStore.routesConfigMap[key]?.meta?.title;
  }

  static getKeepAliveRoutePath() {
    return Object.values(ROUTE_INFO_CONFIG)
      .filter((item) => {
        return item.keepAlive;
      })
      .map((item) => {
        return item.id;
      });
  }

  static getRoutItemConfigById(key: ROUTE_ID_KEY) {
    const routerStore = store.getState().routerStore;
    return routerStore.routesConfigMap[key];
  }

  static getHistory() {
    return historyInstanse;
  }
  static goBack() {
    historyInstanse.back();
  }
  static jumpTo(
    id: ROUTE_ID_KEY,
    options?: {
      type?: "replace" | "push";
      state?: any;
      search?: Record<PropertyKey, any>;
    }
  ) {
    const { type = "push", state, search } = options || {};
    const path = this.getRoutePathByKey(id);
    if (!path) {
      historyInstanse!?.push("notFund", state);
      throw new Error("路由不存在");
    }
    let searchStr = "";
    if (search) {
      let arr = [];
      for (let i in search) {
        arr.push(`${i}=${search[i]}`);
      }
      searchStr = "?" + arr.join("&");
    }
    let targetPath = `${path}${searchStr}`;
    if (type === "push") {
      historyInstanse!?.push(targetPath, state);
    } else {
      historyInstanse!?.replace(targetPath, state);
    }
  }

  static getRouteIdByPath(path: string) {
    return path.split("/").slice(-1)[0];
  }

  static jumpToByPath(
    path: string,
    options?: {
      type: "replace" | "push";
      state?: any;
    }
  ) {
    const { type = "push", state } = options || {};
    if (type === "push") {
      historyInstanse!?.push(path, state);
    } else {
      historyInstanse!?.replace(path, state);
    }
  }
}

const routerHelper = new RouterHelper();
export default routerHelper;
