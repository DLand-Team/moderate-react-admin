"use client";
import { useRouter } from "@bprogress/next";
import { useEffect, useRef } from "react";
import { emit, useFlat } from "src/service";
import { useAppRouterListener } from "../common/hooks/useRouerListen";
import { RouteItem } from "./types";

export const RouterEazyProvider = ({
  children,
  routerData,
}: React.PropsWithChildren<{
  routerData: { tree: RouteItem; list: RouteItem[] };
}>) => {
  const {
    addHistoryRouteAct,
    setCurrentRouteUrl,
    currentRouteUrl,
    jumpingSignal,
  } = useFlat("appStore");
  const router = useRouter();

  // 存储的路由数据
  useEffect(() => {
    emit("appStore").setRouteList(routerData.list);
    emit("appStore").setRouteTree(routerData.tree);
  }, []);

  // 路由跳转
  useEffect(() => {
    router.push(currentRouteUrl);
  }, [jumpingSignal]);

  // 路由监听
  useAppRouterListener(({ pathname, url }) => {
    addHistoryRouteAct({ pathname, url });
    setCurrentRouteUrl(url);
  });

  return <>{children}</>;
};
