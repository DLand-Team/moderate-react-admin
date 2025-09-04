"use client";
// 顶部加载进度条
import "@bprogress/core/css";
import {
	AppProgressProvider as ProgressProvider,
	useRouter,
} from "@bprogress/next";
// 状态管理 redux-eazy
import ServiceProvider from "src/service/serviceProvider";
// 鉴权
import AuthGuard from "./authGuard";
// 全局 loading 和 全局提示
import { useEffect } from "react";
import { Toaster } from "sonner";
import { RouteItem } from "src/router";
import { emit, useFlat } from "src/service";
import RiveLoading from "./login/riveLoading";

// 其他全局补充
const OtherProvider = ({
	children,
	routerData,
}: React.PropsWithChildren<{
	routerData: { tree: RouteItem; list: RouteItem[] };
}>) => {
	const { isLoading, currentRoute, setCurrentRoute } = useFlat("appStore");
	useEffect(() => {
		emit("appStore").setRouteList(routerData.list);
		emit("appStore").setRouteTree(routerData.tree);
	}, []);
	const router = useRouter();
	useEffect(() => {
		currentRoute?.path && router.push(currentRoute?.path);
		setCurrentRoute(null);
	}, [currentRoute]);

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
	ServiceProvider,
	ProgressProvider,
	AuthGuard,
	OtherProvider,
];

const Providers = (
	props: React.PropsWithChildren<{
		routerData: { tree: RouteItem; list: RouteItem[] };
	}>
) => {
	return providerArr.reduceRight((children, Provider) => {
		return <Provider {...props}>{children}</Provider>;
	}, props.children);
};

export default Providers;
