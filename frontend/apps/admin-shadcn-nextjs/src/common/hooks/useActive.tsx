import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { isEqual } from "src/common/utils";
import { routerHelper, useFlat } from "src/service";

const useActive = (
    {
        onActive,
        onLeave,
        onFirstActive,
        onLastLeave,
    }: {
        onActive?: (isFirst: boolean | undefined) => void;
        onLeave?: (isLast: boolean) => void;
        onFirstActive?: () => void;
        onLastLeave?: () => void;
    },
    activeDeps?: any[]
) => {
    const pathName = usePathname();
    const { currentRouteUrl } = useFlat("appStore", {
        currentRouteUrl: "IN",
    });
    const currentPath = useRef<string>(pathName);
    const activeFlag = useRef<boolean | undefined>(undefined);
    const isFirsted = useRef(false);
    const activeDepsRecord = useRef(activeDeps);
    const flag = useRef(0);
    let depSigture = useRef<string>(Date.now().toString());
    // 只判断当前所在组件
    // 并且有依赖

    if (
        currentPath.current == pathName &&
        currentPath.current == currentRouteUrl &&
        activeDepsRecord.current
    ) {
        const idDepEqual = isEqual(activeDepsRecord.current, activeDeps);
        depSigture.current = idDepEqual
            ? depSigture.current
            : Date.now().toString();
        // 如果首次创建了
        // 并且依赖变化了
        // 就重置
        if (isFirsted.current && !idDepEqual) {
            activeDepsRecord.current = activeDeps;
            // 重置
            isFirsted.current = false;
            activeFlag.current = undefined;
        }
    }

    useEffect(() => {
        if (currentPath.current == currentRouteUrl) {
            const isFirst = activeFlag.current ?? true;
            if (isFirst) {
                if ((flag.current = 1)) {
                    flag.current = 2;
                    let isFirst2 = flag.current == 2;
                    if (isFirst2) {
                        if (onFirstActive) {
                            onFirstActive?.();
                        } else {
                            onActive?.(isFirst2);
                        }
                        flag.current = 3;
                    }
                    activeFlag.current = true;
                } else {
                    flag.current = 1;
                }
            } else {
                if (flag.current == 3) {
                    flag.current = 4;
                } else {
                    if (flag.current == 4) {
                        onActive?.(false);
                    }
                }
            }
        }
        return () => {
            if (activeFlag.current) {
                const isLast =
                    !routerHelper.getKeepAliveComponent(currentPath.current) ||
                    !routerHelper.getRouteConfigByPath(currentPath.current)
                        ?.keepAlive;
                if (isLast && onLastLeave) {
                    onLastLeave();
                } else {
                    onLeave?.(isLast);
                }
                activeFlag.current = isLast ? undefined : false;
            }
        };
    }, [currentRouteUrl, depSigture.current]);

    return () => {
        isFirsted.current = false;
        if (activeDepsRecord.current) {
            activeDepsRecord.current = [];
        }
        activeFlag.current = undefined;
    };
};
export default useActive;
