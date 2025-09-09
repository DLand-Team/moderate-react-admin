import React from "react";
import { useLocation } from "react-router-dom";
import { useAsyncEffect } from "src/common/hooks";
import { ROUTE_ID } from "src/router";
import { dpChain, routerHelper, useFlat } from "src/service";

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const { token } = useFlat("authStore");
  const location = useLocation();
  useAsyncEffect(async () => {
    // 判断是否登陆
    if (token) {
      await dpChain("authStore").getUserPermissionsAct(null);
      const loginPath = routerHelper.getRoutePathByKey(ROUTE_ID.LoginPage);
      // 判断是否是登录页
      if (location.pathname === loginPath) {
        routerHelper.jumpTo(ROUTE_ID.HomePage);
      }
    } else {
      routerHelper.jumpTo(ROUTE_ID.LoginPage);
    }
  }, [token]);

  return <>{children}</>;
};

export default AuthProvider;
