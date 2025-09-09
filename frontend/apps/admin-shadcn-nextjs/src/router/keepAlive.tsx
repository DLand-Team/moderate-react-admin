"use client";
import { useForceUpdate } from "@/src/common/hooks/useForceUpdate";
import { ROUTE_ID_KEY } from "@/src/router";
import { routerHelper, useFlat } from "@/src/service";
import { usePathname } from "next/navigation"; // 如果用的是 next/router
import React, {
    Fragment,
    PropsWithChildren,
    useEffect,
    useMemo,
    useRef,
} from "react";
import KeepAliveRoute from "./keepAliveRoute";

const KeepAlive = ({ children }: PropsWithChildren) => {
    const { keepAliveRouteIds } = useFlat("appStore");
    const pathname = usePathname();
    const cache = useRef<Map<string, React.ReactNode>>(new Map());
    const forceUpdate = useForceUpdate();
    const cacheKey = useMemo(() => {
        return pathname.split("/").slice(-1)[0];
    }, [pathname]);
    const activeKey = useRef<ROUTE_ID_KEY>(cacheKey as ROUTE_ID_KEY);
    // 判断是否需要缓存
    const routeItemId = routerHelper.getRouteIdByPath(pathname);
    const isKeepAlive = routeItemId && routerHelper.isKeepAlive(routeItemId);
    const aliveParentRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        activeKey.current = cacheKey as ROUTE_ID_KEY;
        if (isKeepAlive) {
            const View = routerHelper.getKeepAliveComponent(pathname);
            if (View && !cache.current.has(pathname)) {
                const { ClientView, component } = View;
                const domId = pathname.split("/").pop();
                let list: React.ReactNode[] = [];
                React.Children.forEach(component, (child) => {
                    if (React.isValidElement(child)) {
                        //@ts-ignore
                        if (child.props?.id !== domId) {
                            list.push(child);
                        } else {
                            list.push(<ClientView />);
                        }
                    }
                });
                cache.current.set(
                    pathname,
                    <>
                        {list.map((item, index) => (
                            <Fragment key={index}>{item}</Fragment>
                        ))}
                    </>
                );
            }
            forceUpdate();
        }
    }, [keepAliveRouteIds, pathname]);
    ;
    return (
        <div
            style={{
                height: "100%",
            }}>
            <div
                id={"container"}
                style={{
                    height: "100%",
                }}
                ref={aliveParentRef}>
                {/* {!isKeepAlive && <Outlet />} */}
                {!cache.current.has(pathname) && children}
            </div>

            {[...cache.current.entries()].map(([key, node]) => (
                <KeepAliveRoute
                    parentDomRef={aliveParentRef}
                    key={key as ROUTE_ID_KEY}
                    activeKey={activeKey.current}
                    pageKey={key.split("/").pop() as ROUTE_ID_KEY}>
                    {node}
                </KeepAliveRoute>
            ))}
        </div>
    );
};

export default KeepAlive;
