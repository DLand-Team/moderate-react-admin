import { useEffect } from "react";
import { RouteItem } from "./types";
import { emit, useFlat } from "src/service";
import { useRouter } from "@bprogress/next";

export const RouterEazyProvider = ({
	children,
	routerData,
}: React.PropsWithChildren<{
	routerData: { tree: RouteItem; list: RouteItem[] };
}>) => {
	const { currentRoute, setCurrentRoute } = useFlat("appStore");

	// 存储的路由数据
	useEffect(() => {
		emit("appStore").setRouteList(routerData.list);
		emit("appStore").setRouteTree(routerData.tree);
	}, []);

	// 路由跳转
	const router = useRouter();
	useEffect(() => {
		currentRoute?.path && router.push(currentRoute?.path);
		setCurrentRoute(null);
	}, [currentRoute]);

	return <>{children}</>;
};
