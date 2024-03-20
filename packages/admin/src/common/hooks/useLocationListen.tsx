import { useEffect } from "react";
import { useLocation, Location } from "react-router-dom";

const useLocationListen = (
	listener: (location: Location) => void,
	depArr: any[] = [],
) => {
	let location = useLocation();
	useEffect(() => {
		listener(location);
	}, [location, ...depArr]);
};

export default useLocationListen;
