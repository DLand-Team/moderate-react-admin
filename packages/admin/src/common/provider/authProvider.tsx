import { ROUTE_ID } from "src/config/routerConfig";
import { dp, routerHelper, useFlat } from "src/reduxService";
import { useLocation } from "react-router-dom";
import useAsyncEffcet from "../hooks/useAsyncEffect";

const AuthProvider = ({ children }: React.PropsWithChildren) => {
	const { token } = useFlat("authStore");
	const location = useLocation();

	useAsyncEffcet(async () => {
		// 判断是否登陆
		if (token) {
			await dp("authStore", "getUserPermissionsAct");
			const loginPath = routerHelper.getRoutePathByKey(
				ROUTE_ID.loginPage,
			);
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
