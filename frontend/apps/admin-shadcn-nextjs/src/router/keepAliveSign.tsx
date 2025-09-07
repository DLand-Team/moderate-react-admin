"use client";

import { ROUTE_ID_KEY } from "@/src/router";
import { routerHelper } from "@/src/service";
import { PropsWithChildren, useEffect } from "react";

const KeepAliveSign = ({
	routeId,
	children,
	...rest
}: PropsWithChildren<{
	routeId: ROUTE_ID_KEY;
}>) => {
	useEffect(() => {
		routerHelper.registerPage(routeId, children);
	}, [children]);

	return (
		<div {...rest} id={routeId}>
			{children}
		</div>
	);
};

export default KeepAliveSign;
