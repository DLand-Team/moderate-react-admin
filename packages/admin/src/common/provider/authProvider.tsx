import { ROUTE_ID } from "@/config/routerConfig";
import { routerHelper, useFlat } from "@/reduxService";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AuthProvider = ({ children }: React.PropsWithChildren) => {
	const { setRoutesConfigMap, setRouterConfig } = useFlat("routerStore");
	const { token } = useFlat("authStore");
	const location = useLocation();

	useEffect(() => {
		// 判断是否登陆
		if (token) {
			const loginPath = routerHelper.getRoutePathByKey(
				ROUTE_ID.loginPage,
			);
			const { routesConfig, routesConfigMap } =
				routerHelper.createRoutesConfigByUserInfo();
			setRouterConfig(routesConfig);
			setRoutesConfigMap(routesConfigMap);
			// 判断是否是登录页
			if (location.pathname === loginPath) {
				routerHelper.jumpTo(ROUTE_ID.helloPage);
			}
		} else {
			routerHelper.jumpTo(ROUTE_ID.loginPage);
		}
	}, [token]);

	return <>{children}</>;
};

export default AuthProvider;
