"use client";
// 顶部加载进度条
import "@bprogress/core/css";
import { AppProgressProvider as ProgressProvider } from "@bprogress/next";
// 状态管理 redux-eazy
import ServiceProvider from "src/service/serviceProvider";
// 鉴权
import AuthGuard from "./authGuard";
// 全局 loading 和 全局提示
import { Toaster } from "sonner";
import { RouteItem } from "src/router";
import { useFlat } from "src/service";
import { RouterEazyProvider } from "../router/router-provider";
import RiveLoading from "./login/riveLoading";
import "src/i18n";
import { Suspense } from "react";

// 其他全局补充
const OtherProvider = ({ children }: React.PropsWithChildren) => {
  const { isLoading } = useFlat("appStore");

  return (
    <>
      {children}
      <Toaster />
      {isLoading && (
        <div className="loading g-glossy">
          <RiveLoading />
        </div>
      )}
    </>
  );
};

const providerArr = [
  Suspense,
  ServiceProvider,
  ProgressProvider,
  AuthGuard,
  OtherProvider,
  RouterEazyProvider,
];

const Providers = (
  props: React.PropsWithChildren<{
    routerData: { tree: RouteItem; list: RouteItem[] };
  }>,
) => {
  return providerArr.reduceRight((children, Provider) => {
    return <Provider {...props}>{children}</Provider>;
  }, props.children);
};

export default Providers;
