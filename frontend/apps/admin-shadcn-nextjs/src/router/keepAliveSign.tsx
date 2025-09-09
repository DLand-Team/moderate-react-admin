"use client";

import { ROUTE_ID_KEY } from "@/src/router";
import { routerHelper } from "@/src/service";
import { PropsWithChildren, useEffect } from "react";

export const KeepAliveSlot = (id: any) => {
  return <div id={id}></div>;
};

const KeepAliveSign = ({
  routeId,
  children,
  ClientView,
  ...rest
}: PropsWithChildren<{
  routeId: ROUTE_ID_KEY;
  ClientView: React.ComponentType<any>;
}>) => {
  useEffect(() => {
    routerHelper.registerPage(routeId, {
      ClientView,
      component: children,
    });
  }, [children]);

  return <>{children}</>;
};

export default KeepAliveSign;
