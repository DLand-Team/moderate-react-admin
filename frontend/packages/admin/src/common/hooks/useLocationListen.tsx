import { useLayoutEffect } from "react";
import { Location, useLocation } from "react-router-dom";

const useLocationListen = (
	listener: (location: Location) => void,
	depArr: any[] = [],
) => {
	let location = useLocation();
	useLayoutEffect(() => {
		// 默认执行一下
		listener(location);
	}, [...depArr]);
	useLayoutEffect(() => {
		const handler = () => {
			debugger;
			listener({
				pathname: window.location.pathname,
				search: window.location.search,
				hash: window.location.hash,
			} as any);
		};
		window.addEventListener("popstate", handler);
		window.addEventListener("pushState", handler);
		window.addEventListener("replaceState", handler);

		return () => {
			window.removeEventListener("popstate", handler);
			window.removeEventListener("pushState", handler);
			window.removeEventListener("replaceState", handler);
		};
	}, []);
};

export default useLocationListen;
