import { useFlatInject } from "@/common/hooks";
import { routerHelper } from "@/services";
import { useEffect } from "react";
import { Routes, useLocation } from "react-router-dom";
import { ROUTE_ID } from "./config/routerConfig";

const App = () => {
	const { routesData, createRoutesAction } = useFlatInject("routerStore")[0];
	const { token } = useFlatInject("userInfoStore")[0];
	const location = useLocation();

	useEffect(() => {
		// 判断是否登陆
		if (token) {
			const loginPath = routerHelper.getRoutePathByKey(
				ROUTE_ID.loginPage,
			);
			createRoutesAction();
			// 判断是否是登录页
			if (location.pathname === loginPath) {
				routerHelper.jumpTo(ROUTE_ID.helloPage);
			}
		} else {
			routerHelper.jumpTo(ROUTE_ID.loginPage);
		}
	}, []);

	return (
		<Routes>
			{routesData?.map((item) => {
				return routerHelper.toRenderRouteLoop(item);
			})}
		</Routes>
	);
};

export default App;
