import { useEffect } from "react";
import { useLocation, Location } from "react-router-dom";

const useLocationListen = (listener: (location: Location) => void) => {
	let location = useLocation();
	useEffect(() => {
		listener(location);
	}, [location]);
};

export default useLocationListen;
