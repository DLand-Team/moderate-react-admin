"use client";

import { ROUTE_ID_KEY } from "@/src/router";
import { routerHelper } from "@/src/service";
import { useEffect } from "react";

const KeepAliveSign = ({
	routeId,
	render,
}: {
	routeId: ROUTE_ID_KEY;
	render?: React.ComponentType<any>;
}) => {
	useEffect(() => {
		routerHelper.registerPage(routeId, render);
	}, []);

	return <div id={routeId}></div>;
};

export default KeepAliveSign;
