import { useLocation } from "react-router-dom";
import { useAsyncEffect } from "src/common/hooks";
import { ROUTE_ID } from "src/router/name";
import { useFlat } from "src/service";
import { RouterHelper } from "src/service/helper";
import React from "react";

const AuthProvider = ({ children }: React.PropsWithChildren) => {
	const { token } = useFlat("authStore");
	const location = useLocation();
	useAsyncEffect(async () => {
		// 判断是否登陆
		if (token) {
			const loginPath = RouterHelper.getRoutePathByKey(
				ROUTE_ID.LoginPage,
			);
			// 判断是否是登录页
			if (location.pathname === loginPath) {
				RouterHelper.jumpTo(ROUTE_ID.DealListPage);
			}
		} else {
			// RouterHelper.jumpTo(ROUTE_ID.LoginPage);
		}
	}, [token]);

	return <>{children}</>;
};

export default AuthProvider;
