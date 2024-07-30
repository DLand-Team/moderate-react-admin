import { useEffect, useLayoutEffect, useState } from "react";
import { Router, type RouterProps } from "react-router-dom";
import { ROUTE_ID_KEY } from "src/router";
import { routerHelper, useFlat } from "src/service";
import { historyInstance } from "./historyIns";

const RouterProvider = (
	props: Omit<RouterProps, "location" | "navigationType" | "navigator">,
) => {
	const { language } = useFlat("appStore");
	const [state, setState] = useState({
		action: historyInstance.action,
		location: historyInstance.location,
	});

	useLayoutEffect(() => historyInstance.listen(setState), [history]);

	useEffect(() => {
		const { location } = state;
		const { pathname } = location;
		const currentRoute = routerHelper.getRoutItemConfigByPath(pathname);

		if (!currentRoute) return;

		const { id } = currentRoute;
		const indexRoute = routerHelper.getIndexRoute(id as ROUTE_ID_KEY);

		if (indexRoute) {
			routerHelper.jumpTo(indexRoute.id!);
		}
	}, [state, language]);

	return (
		<Router
			{...props}
			location={state.location}
			navigationType={state.action}
			navigator={historyInstance}
		/>
	);
};

export default RouterProvider;
