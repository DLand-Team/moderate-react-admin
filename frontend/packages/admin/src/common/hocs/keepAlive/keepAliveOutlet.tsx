import {
	JSXElementConstructor,
	memo,
	PropsWithChildren,
	ReactElement,
	useEffect,
	useMemo,
	useReducer,
	useRef,
	useState,
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
import { UUID } from "src/common/utils";

export const AnimationWrapper = ({ children }: PropsWithChildren) => {
	const action: ReturnType<typeof useNavigationType> = useNavigationType();
	const { settingData } = useFlat("appStore");
	const { routerAni } = settingData;
	const { PushVariants, PopVariants } = getTransition(routerAni);
	const RouteTransition = getRouteTransition(routerAni);

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
	useEffect(() => {
		activeKey.current = cacheKey;
		AppHelper.saveKeepAliveComponent({
			id: cacheKey,
			comp: outlet,
		});
		if (isKeepAlive && !componentList.current.has(activeKey.current)) {
			componentList.current.set(activeKey.current, outletRef.current);
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

			{Array.from(componentList.current).map(([key, component]) => (
				<KeepAliveRoute
					parentDomRef={aliveParentRef}
					key={key as string}
					activeKey={activeKey.current}
					pageKey={key as string}
				>
					{component}
				</KeepAliveRoute>
			))}
		</>
	);
};

export default memo(KeepAlive);
