import { useLayoutEffect } from "react";
import { Location, useLocation } from "react-router-dom";

const useLocationListen = (
	listener: (location: Location) => void,
	depArr: any[] = [],
) => {
	let location = useLocation();
	useLayoutEffect(() => {
		const handler = () => {
			listener(location);
		};
		window.addEventListener("pushState", handler);
		return () => {
			return window.addEventListener("pushState", handler);
		};
	}, [location, ...depArr]);
};

export default useLocationListen;
