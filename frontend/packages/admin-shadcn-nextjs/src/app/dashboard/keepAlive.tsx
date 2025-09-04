"use client";
import { useForceUpdate } from "@/src/common/hooks/useForceUpdate";
import { ROUTE_ID_KEY } from "@/src/router";
import { routerHelper, useFlat } from "@/src/service";
import { usePathname } from "next/navigation"; // 如果用的是 next/router
import React, { PropsWithChildren, useEffect, useMemo, useRef } from "react";
import KeepAliveRoute from "./keepAliveRoute";

const KeepAlive = ({ children }: PropsWithChildren) => {
	const { routeListEx } = useFlat("appStore");
	const pathname = usePathname();
	const cache = useRef<Map<string, React.ReactNode>>(new Map());
	const forceUpdate = useForceUpdate();
	const cacheKey = useMemo(() => {
		return pathname.split("/").slice(-1)[0];
	}, [pathname]);
	const activeKey = useRef<ROUTE_ID_KEY>(cacheKey as ROUTE_ID_KEY);
	// 判断是否需要缓存
	const routeItemId = routerHelper.getRouteIdByPath(pathname);
	const isKeepAlive = routeItemId && routerHelper.isKeepAlive(routeItemId);
	const aliveParentRef = useRef<HTMLElement>(null);
	useEffect(() => {
		activeKey.current = cacheKey as ROUTE_ID_KEY;
		if (isKeepAlive) {
			const View = routerHelper.getKeepAliveComponent(pathname);
			if (View && !cache.current.has(pathname)) {
				cache.current.set(pathname, <View />);
				forceUpdate();
			}
		}
		const domId = pathname.split("/").pop();
		aliveParentRef.current = document.getElementById(domId!)!;
	}, [routeListEx, pathname]);

	return (
		<div
			style={{
				height: "100%",
			}}
		>
			{children}
			{[...cache.current.entries()].map(([key, node]) => (
				<KeepAliveRoute
					parentDomRef={aliveParentRef}
					key={key as ROUTE_ID_KEY}
					activeKey={activeKey.current}
					pageKey={key.split("/").pop() as ROUTE_ID_KEY}
				>
					{node}
				</KeepAliveRoute>
			))}
		</div>
	);
};

export default KeepAlive;
