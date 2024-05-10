import {
	memo,
	useEffect,
	useLayoutEffect,
	useMemo,
	useReducer,
	useRef,
} from "react";
import { useLocation, useOutlet } from "react-router-dom";
import KeepAliveRoute from "./keepAliveRoute";

const KeepAlive = () => {
	const outlet = useOutlet();
	const { pathname } = useLocation();
	const componentList = useRef(new Map());
	const forceUpdate = useReducer((bool: any) => !bool, true)[1]; // 强制渲染
	const cacheKey = useMemo(
		() => pathname.split("/").slice(-1)[0],
		[pathname],
	);
	const activeKey = useRef<string>("");
	useLayoutEffect(() => {}, []);
	useEffect(() => {
		activeKey.current = cacheKey;
		if (!componentList.current.has(activeKey.current)) {
			componentList.current.set(activeKey.current, outlet);
		}
		forceUpdate();
	}, [cacheKey]);
	const aliveParentRef = useRef(null);
	return (
		<>
			<div
				style={{
					height: "100%",
				}}
				ref={aliveParentRef}
			></div>
			{Array.from(componentList.current).map(([key, component]) => (
				<KeepAliveRoute
					parentDomRef={aliveParentRef}
					key={key}
					activeKey={activeKey.current}
					pageKey={key}
				>
					{component}
				</KeepAliveRoute>
			))}
		</>
	);
};

export default memo(KeepAlive);
