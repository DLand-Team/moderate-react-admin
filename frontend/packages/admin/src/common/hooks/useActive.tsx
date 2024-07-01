import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { AppHelper, RouterHelper, useFlat } from "src/service";

export const useActive = ({
	onActive,
	onLeave,
}: {
	onActive?: (isFirst: boolean | undefined) => void;
	onLeave?: (isLast: boolean) => void;
}) => {
	const location = useLocation();
	const { activeKey } = useFlat("routerStore");
	const currentPath = useRef<string>(location.pathname);
	const activeFlag = useRef<boolean>();
	useEffect(() => {
		if (RouterHelper.getRouteIdByPath(currentPath.current) == activeKey) {
			onActive?.(activeFlag.current ?? true);
			activeFlag.current = true;
		}
		return () => {
			if (activeFlag.current) {
				onLeave?.(!AppHelper.judeIsHasTabByPath(currentPath.current));
			}
			activeFlag.current = false;
		};
	}, [activeKey]);
};
