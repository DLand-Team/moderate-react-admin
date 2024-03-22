import { useLocation } from "react-router-dom";
import { ROUTE_ID } from "src/config/routerConfig";
import { dp, useFlat } from "src/reduxService";
import { RouterHelper } from "src/reduxService/helper";
import useAsyncEffcet from "../hooks/useAsyncEffect";

const AuthProvider = ({ children }: React.PropsWithChildren) => {
	const { token } = useFlat("authStore");
	const location = useLocation();
	;
	useAsyncEffcet(async () => {
		// 判断是否登陆
		;
		if (token) {
			await dp("authStore", "getUserPermissionsAct");
			const loginPath = RouterHelper.getRoutePathByKey(
				ROUTE_ID.loginPage,
			);
			// 判断是否是登录页
			if (location.pathname === loginPath) {
				RouterHelper.jumpTo(ROUTE_ID.helloPage);
			}
		} else {
			RouterHelper.jumpTo(ROUTE_ID.loginPage);
		}
	}, [token]);

	return <>{children}</>;
};

export default AuthProvider;
