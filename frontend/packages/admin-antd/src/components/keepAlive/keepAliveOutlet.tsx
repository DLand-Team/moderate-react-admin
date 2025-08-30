import {
	JSXElementConstructor,
	memo,
	ReactElement,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { Outlet, useLocation, useOutlet } from "react-router-dom";
import { appHelper, dpChain, routerHelper, useFlat } from "src/service";
import KeepAliveRoute from "./keepAliveRoute";

import { useForceUpdate } from "src/common/hooks";
import { UUID } from "src/common/utils";
import { ROUTE_ID_KEY } from "src/router";
import AnimationWrapper from "../animationWrapper";

const KeepAliveOutlet = memo(() => {
	const { tabItems, refreshKey, setRefreshKey } = useFlat("appStore");
	const outlet = useOutlet();
	const { pathname } = useLocation();
	const currentRouteConfig = routerHelper.getRoutItemConfigByPath(pathname);
	const isKeepAlive = routerHelper.judeKeepAliveByPath(pathname);
	const componentList = useRef(new Map());
	const outletRef = useRef<ReactElement<
		any,
		string | JSXElementConstructor<any>
	> | null>(null);
	outletRef.current = outlet;
	const cacheSig = useState(UUID());
	useEffect(() => {
		if (refreshKey.length) {
			refreshKey.map((key) => {
				componentList.current.delete(key);
			});
			cacheSig[1](UUID());
			forceUpdate();
			setRefreshKey([]);
		}
	}, [refreshKey]);
	useEffect(() => {
		if (!tabItems.length) return;
		const pathArr = tabItems.map((item) => {
			const configItem = routerHelper.getRoutItemConfigByPath(
				item.location?.pathname!
			);
			if (configItem?.segment) {
				return item.location?.pathname?.split("/").slice(-2).join("/");
			}
			return item.location?.pathname?.split("/").slice(-1)[0];
		});
		let allRouteKeys = [...pathArr];

		pathArr.forEach((item) => {
			const routeItem = routerHelper.getRoutItemConfigById(
				item as ROUTE_ID_KEY
			);
			if (!routeItem) return;
			const { isTab, depends } = routeItem;
			if (!isTab && depends?.[0]) {
				const parentIndexRouteId =
					routerHelper.getIndexRoute(depends?.[0])?.id ||
					depends?.[0];
				allRouteKeys.push(parentIndexRouteId);
			}
		});
		let aliveKeys = Array.from(componentList.current);
		aliveKeys.forEach(([key]) => {
			// 排除一个情况，就是子路由服用了父路由的tab的情况
			if (!allRouteKeys.includes(key)) {
				const { depends, isTab } =
					routerHelper.getRoutItemConfigById(key) || {};
				if (!isTab && depends?.[0]) {
					const parentIndexRouteId =
						routerHelper.getIndexRoute(depends?.[0])?.id ||
						depends?.[0];
					if (allRouteKeys.includes(parentIndexRouteId)) {
						return;
					}
				}
				componentList.current.delete(key);
			}
		});
	}, [tabItems]);
	const forceUpdate = useForceUpdate();
	const cacheKey = useMemo(() => {
		if (routerHelper.getRoutItemConfigByPath(pathname)?.segment) {
			return pathname.split("/").slice(-2)[0];
		}
		return pathname.split("/").slice(-1)[0];
	}, [pathname]);
	const activeKey = useRef<ROUTE_ID_KEY>(cacheKey as ROUTE_ID_KEY);
	useLayoutEffect(() => {
		activeKey.current = cacheKey as ROUTE_ID_KEY;
		dpChain("routerStore").setRouterActiveKey(activeKey.current);
		appHelper.saveKeepAliveComponent({
			id: cacheKey,
			comp: outlet,
		});
		let key = activeKey.current;
		if (currentRouteConfig?.segment) {
			key = (activeKey.current +
				"/" +
				pathname.split("/").slice(-1)[0]) as any;
		}
		if (isKeepAlive && !componentList.current.has(key)) {
			componentList.current.set(key, outletRef.current);
		}
		forceUpdate();
	}, [cacheKey, cacheSig[0]]);
	const aliveParentRef = useRef(null);
	return (
		<>
			<AnimationWrapper>
				<div
					style={{
						height: "100%",
					}}
					ref={aliveParentRef}
				>
					{!isKeepAlive && <Outlet />}
				</div>
			</AnimationWrapper>

			{Array.from(componentList.current).map(([key, component]) => {
				return (
					<KeepAliveRoute
						parentDomRef={aliveParentRef}
						key={key as ROUTE_ID_KEY}
						//@ts-ignore
						activeKey={
							currentRouteConfig?.segment
								? activeKey.current +
								  "/" +
								  pathname.split("/").slice(-1)[0]
								: activeKey.current
						}
						segm
						pageKey={key as ROUTE_ID_KEY}
					>
						{component}
					</KeepAliveRoute>
				);
			})}
		</>
	);
});

export default KeepAliveOutlet;
