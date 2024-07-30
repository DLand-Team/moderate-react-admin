import {
    JSXElementConstructor,
    memo,
    ReactElement,
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";
import { Outlet, useLocation, useOutlet } from "react-router-dom";
import { appHelper, dpChain, routerHelper, useFlat } from "src/service";
import KeepAliveRoute from "./keepAliveRoute";

import { useForceUpdate } from "src/common/hooks";
import { UUID } from "src/common/utils";
import { ROUTE_ID_KEY } from "src/router";
import AnimationWrapper from "../animationWrapper";

const KeepAliveOutlet = memo(() => {
    const { tabItems, refreshKey, setRefreshKey } = useFlat("appStore");
    const outlet = useOutlet();
    const { pathname } = useLocation();
    const isKeepAlive = routerHelper.judeKeepAliveByPath(pathname);
    const componentList = useRef(new Map());
    const outletRef = useRef<ReactElement<
        any,
        string | JSXElementConstructor<any>
    > | null>(null);
    outletRef.current = outlet;
    const cacheSig = useState(UUID());
    useEffect(() => {
        if (refreshKey.length) {
            refreshKey.map((key) => {
                componentList.current.delete(key);
            });
            cacheSig[1](UUID());
            forceUpdate();
            setRefreshKey([]);
        }
    }, [refreshKey]);
    useEffect(() => {
        if (!tabItems.length) return;
        const pathArr = tabItems.map((item) => {
            return item.location?.pathname?.split("/").slice(-1)[0];
        });
        let aliveKeys = Array.from(componentList.current);
        aliveKeys.forEach(([key]) => {
            if (!pathArr.includes(key)) {
                componentList.current.delete(key);
            }
        });
    }, [tabItems]);
    const forceUpdate = useForceUpdate();
    const cacheKey = useMemo(
        () => pathname.split("/").slice(-1)[0],
        [pathname]
    );
    const activeKey = useRef<ROUTE_ID_KEY>(cacheKey as ROUTE_ID_KEY);
    useEffect(() => {
        activeKey.current = cacheKey as ROUTE_ID_KEY;
        dpChain("routerStore").setRouterActiveKey(activeKey.current);
        appHelper.saveKeepAliveComponent({
            id: cacheKey,
            comp: outlet,
        });
        if (isKeepAlive && !componentList.current.has(activeKey.current)) {
            componentList.current.set(activeKey.current, outletRef.current);
        }
        forceUpdate();
    }, [cacheKey, cacheSig[0]]);
    const aliveParentRef = useRef(null);
    return (
        <>
            <AnimationWrapper>
                <div
                    style={{
                        height: "100%",
                    }}
                    ref={aliveParentRef}
                >
                    {!isKeepAlive && <Outlet />}
                </div>
            </AnimationWrapper>

            {Array.from(componentList.current).map(([key, component]) => {
                return (
                    <KeepAliveRoute
                        parentDomRef={aliveParentRef}
                        key={key as ROUTE_ID_KEY}
                        activeKey={activeKey.current}
                        pageKey={key as ROUTE_ID_KEY}
                    >
                        {component}
                    </KeepAliveRoute>
                );
            })}
        </>
    );
});

export default KeepAliveOutlet;
