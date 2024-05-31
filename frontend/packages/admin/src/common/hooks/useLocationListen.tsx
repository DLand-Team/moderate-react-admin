import { useEffect, useLayoutEffect } from "react";
import { Location, useLocation } from "react-router-dom";

const useLocationListen = (
	listener: (location: Location) => void,
	depArr: any[] = [],
) => {
	let location = useLocation();
	useEffect(() => {
		// 默认执行一下
		listener(location);
	}, []);
	useLayoutEffect(() => {
		const handler = () => {
			listener({
				pathname: window.location.pathname,
				search: window.location.search,
				hash: window.location.hash,
			} as any);
		};

		window.addEventListener("pushState", handler);
		window.addEventListener("replaceState", handler);

		return () => {
			window.removeEventListener("pushState", handler);
			window.removeEventListener("replaceState", handler);
		};
	}, [location, ...depArr]);
};

export default useLocationListen;
