import React, { RefObject, memo, useLayoutEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { ROUTE_ID_KEY } from "src/router";

export type KeepAliveComponentProps = React.PropsWithChildren<{
	parentDomRef: RefObject<HTMLElement | null>;
	activeKey: ROUTE_ID_KEY;
	pageKey: ROUTE_ID_KEY;
}>;

function keepAliveRoute(props: KeepAliveComponentProps) {
	const { activeKey, children, pageKey } = props;
	const isActive = activeKey == pageKey;
	const aliveDom = useMemo(() => {
		const aliveDom = document.createElement("div");
		aliveDom.setAttribute("id", "alive");
		aliveDom.setAttribute("page-name", pageKey);
		// aliveDom.setAttribute("style", "height: 100%");
		return aliveDom;
	}, []);

	useLayoutEffect(() => {
		if (isActive) {
			// 删除所有子节点
			const element = document.getElementById(pageKey);
			if (element) {
				while (element.firstChild) {
					element.removeChild(element.firstChild);
				}
			}
			element?.appendChild(aliveDom);
		}
	});
	return createPortal(children, aliveDom, pageKey);
}

export default memo(keepAliveRoute);
