import { useRef, useEffect, useReducer, useMemo, memo } from "react";
import { useLocation, useOutlet } from "react-router-dom";

const KeepAlive = (props: { include: string[] }) => {
	const outlet = useOutlet();
	const { include } = props;
	const { pathname } = useLocation();
  
	const componentList = useRef(new Map());
	const forceUpdate = useReducer((bool: any) => !bool, true)[1]; // 强制渲染
	const cacheKey = useMemo(() => pathname.split('/').slice(-1)[0], [pathname]);
	const activeKey = useRef<string>("");
	useEffect(() => {
		componentList.current.forEach(function (value, key) {
			if (!include.includes(key) || key === pathname) {
				this.delete(key);
			}
		}, componentList.current);

		activeKey.current = cacheKey;
		if (!componentList.current.has(activeKey.current)) {
			componentList.current.set(activeKey.current, outlet);
		}
		forceUpdate();
	}, [cacheKey, include]);

	return (
		<div>
			{Array.from(componentList.current).map(([key, component]) => (
				<div key={key}>
					{key === activeKey.current ? (
						<div>{component}</div>
					) : (
						<div style={{ display: "none" }}>{component}</div>
					)}
				</div>
			))}
		</div>
	);
};

export default memo(KeepAlive);
