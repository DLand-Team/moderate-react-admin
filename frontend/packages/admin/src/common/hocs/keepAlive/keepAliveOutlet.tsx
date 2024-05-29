import {
	memo,
	PropsWithChildren,
	useEffect,
	useLayoutEffect,
	useMemo,
	useReducer,
	useRef,
} from "react";
import {
	Outlet,
	useLocation,
	useNavigationType,
	useOutlet,
} from "react-router-dom";
import { AppHelper, RouterHelper, useFlat } from "src/service";
import KeepAliveRoute from "./keepAliveRoute";

import { motion, Variants } from "framer-motion";
import { getRouteTransition, getTransition } from "./FramerVariants";

export const AnimationWrapper = ({ children }: PropsWithChildren) => {
	const action: ReturnType<typeof useNavigationType> = useNavigationType();
	const { PushVariants, PopVariants } = getTransition("fade");
	const RouteTransition = getRouteTransition("fade");

	return (
		<motion.div
			animate="in"
			exit="out"
			initial="initial"
			key={location.pathname}
			transition={RouteTransition}
			style={{
				height: "100%",
			}}
			variants={
				action === "PUSH"
					? (PushVariants as Variants)
					: (PopVariants as Variants)
			}
		>
			{children}
		</motion.div>
	);
};
const KeepAlive = () => {
	const { tabItems, refreshKey } = useFlat("appStore");
	const outlet = useOutlet();
	const { pathname } = useLocation();
	const isKeepAlive = RouterHelper.judeKeepAliveByPath(pathname);
	const componentList = useRef(new Map());
	useEffect(() => {
		if (refreshKey.length) {
			refreshKey.map((key) => {
				componentList.current.delete(key);
			});
			forceUpdate();
		}
	}, [refreshKey]);
	useEffect(() => {
		if (!tabItems.length) return;
		const pathArr = tabItems.map((item) => {
			return item.location?.pathname?.split("/").slice(-1)[0];
		});
		let aliveKeys = Array.from(componentList.current);
		aliveKeys.forEach(([key]) => {
			if (!pathArr.includes(key)) {
				componentList.current.delete(key);
			}
		});
	}, [tabItems]);
	const forceUpdate = useReducer((bool: any) => !bool, true)[1]; // 强制渲染
	const cacheKey = useMemo(
		() => pathname.split("/").slice(-1)[0],
		[pathname],
	);
	const activeKey = useRef<string>(cacheKey);
	useLayoutEffect(() => {
		activeKey.current = cacheKey;
		AppHelper.saveKeepAliveComponent({
			id: cacheKey,
			comp: outlet,
		});
		if (isKeepAlive && !componentList.current.has(activeKey.current)) {
			componentList.current.set(activeKey.current, outlet);
		}
		forceUpdate();
	}, [cacheKey]);
	const aliveParentRef = useRef(null);
	return (
		<>
			<AnimationWrapper>
				<div ref={aliveParentRef}></div>
				{!isKeepAlive && <Outlet />}
			</AnimationWrapper>

			{Array.from(componentList.current).map(([key, component]) => (
				<KeepAliveRoute
					parentDomRef={aliveParentRef}
					key={key as string}
					activeKey={activeKey.current}
					pageKey={key as string}
				>
					<div key={key as string}>{component}</div>
				</KeepAliveRoute>
			))}
		</>
	);
};

export default memo(KeepAlive);
