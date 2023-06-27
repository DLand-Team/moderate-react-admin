import {  store } from "@/stores";
import { Suspense } from "react";
import { Route } from "react-router-dom";
import { Center, Login } from "../pages";
import { ROUTE_ID, ROUTE_INFO_CONFIG, ROUTE_STRUCT_CONFIG } from "./config";
import type {
  RouteInfoConfigItem,
  RouteItem,
  RoutesStructDataItem,
} from "./types";
const routesDefalutData = [
  {
    id: ROUTE_ID.hello,
    name: "登陆页",
    path: "/",
    element: <Suspense><Login></Login></Suspense>,
  },
  {
    id: ROUTE_ID.hello,
    name: "中心",
    path: "/center",
    element: (
      <Suspense>
        <Center></Center>
      </Suspense>
    ),
    children: [],
  },
];
class RouterManager {
  permissions: string[] = []; // 权限数据
  routesData: RouteItem[] = []; // 直接用来渲染的路由数据
  routesConfigMap: { [key: string]: RouteInfoConfigItem } = {}; // 配置数据字典，直接通过id获取配置数据
  constructor() {
    this.routesData = routesDefalutData;
    this.routesConfigMap = ROUTE_INFO_CONFIG;
  }

  // 递归创建Route组件
  createRoute = (item: RouteItem) => {
    const { children } = item;
    let arr = [];
    if (children) {
      arr = children.map((item) => {
        return this.createRoute(item);
      });
    }
    return (
      <Route
        children={arr}
        key={item.path}
        path={item.path}
        element={item.element}
      ></Route>
    );
  };

  // 生成路由配置
  createRouteConfigLoop = (
    children: any[],
    routesStuctData: RoutesStructDataItem[],
    prefix: string
  ) => {
    routesStuctData.forEach((routeStructItem) => {
      const { id, isMustShow } = routeStructItem;
      // 如果有权限或者是必须显示的，或者是管理员
      if (
        this.permissions.includes(id) ||
        isMustShow ||
        store.getModule("permissions").state.isAdmin
      ) {
        const { component: Component, meta } = this.routesConfigMap[id];
        const path = prefix + "/" + id;
        this.routesConfigMap[id].id = id;
        this.routesConfigMap[id].path = path;
        let routeData: RouteItem = {
          path,
          id,
          meta,
        };
        // 沿途记录，然后拼接成path
        if (Component) {
          routeData.element = (
            <Suspense>
              <Component></Component>
            </Suspense>
          );
        }
        children!.push(routeData);
        if (routeStructItem.children!?.length > 0) {
          routeData.children = this.createRouteConfigLoop(
            [],
            routeStructItem.children!,
            routeData.path
          );
        }
      }
    });
    return children;
  };

  // 生成路由配置根据权限
  createRoutesConfigByPermissions = (permissions: string[]) => {
    this.permissions = permissions;
    this.routesData[1].children = this.createRouteConfigLoop(
      [],
      ROUTE_STRUCT_CONFIG,
      "/center"
    );
    return this.routesData;
  };
  getRoutesConfig = () => {
    return this.routesData;
  };
  getRoutePathByKey(key: string) {
    return this.routesConfigMap[key]?.path;
  }
  getRouteTitleByKey(key: string) {
    return this.routesConfigMap[key]?.meta?.title;
  }
  getRouteIdByPath(path: string) {
    return this.routesConfigMap[path]?.id;
  }
  getRoutesDefalutData() {
    return routesDefalutData;
  }
}

export default new RouterManager();
