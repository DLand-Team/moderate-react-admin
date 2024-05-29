import { useLayoutEffect } from "react";
import { Location, useLocation } from "react-router-dom";

const useLocationListen = (
	listener: (location: Location) => void,
	depArr: any[] = [],
) => {
	let location = useLocation();
	useLayoutEffect(() => {
		listener(location);
	}, [location, ...depArr]);
};

export default useLocationListen;
