import { isEqual } from "@/common/utils";
import { appHelper, routerHelper, useFlat } from "@/service";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

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
    const { activeKey } = useFlat("routerStore", {
        activeKey: "IN",
    });
    const pathName = usePathname();
    const currentPath = useRef<string>(pathName);
    const activeFlag = useRef<boolean | undefined>(undefined);
    const isFirsted = useRef(false);
    const activeDepsRecord = useRef(activeDeps);

    let depSigture = useRef<string>(Date.now().toString());
    // 只判断当前所在组件
    // 并且有依赖

    if (
        currentPath.current == pathName &&
        routerHelper.getRouteIdByPath(currentPath.current) == activeKey &&
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
        if (routerHelper.getRouteIdByPath(currentPath.current) == activeKey) {
            const isFirst = activeFlag.current ?? true;
            if (isFirst && onFirstActive) {
                onFirstActive?.();
                isFirsted.current = true;
            } else {
                onActive?.(isFirst);
            }
            activeFlag.current = true;
        }
        return () => {
            if (activeFlag.current) {
                const isLast =
                    !appHelper.judeIsHasTabByPath(currentPath.current) ||
                    !routerHelper.getRoutItemConfigByPath(currentPath.current)
                        .keepAlive;
                if (isLast && onLastLeave) {
                    onLastLeave();
                } else {
                    onLeave?.(isLast);
                }
                activeFlag.current = isLast ? undefined : false;
            }
        };
    }, [activeKey, depSigture.current]);

    return () => {
        isFirsted.current = false;
        if (activeDepsRecord.current) {
            activeDepsRecord.current = [];
        }
        activeFlag.current = undefined;
    };
};
export default useActive;
