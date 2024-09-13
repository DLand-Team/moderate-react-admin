import React, { RefObject, memo, useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { ROUTE_ID_KEY } from "src/router";

export type KeepAliveComponentProps = React.PropsWithChildren<{
	parentDomRef: RefObject<HTMLElement>;
	activeKey: ROUTE_ID_KEY;
	pageKey: ROUTE_ID_KEY;
}>;

function keepAliveRoute(props: KeepAliveComponentProps) {
	const { parentDomRef, activeKey, children, pageKey } = props;
	const isActive = activeKey == pageKey;
	debugger;
	const aliveDom = useMemo(() => {
		const aliveDom = document.createElement("div");
		aliveDom.setAttribute("id", "alive");
		aliveDom.setAttribute("page-name", pageKey);
		aliveDom.setAttribute("style", "height: 100%");
		return aliveDom;
	}, []);
	// alive标记，当被标记之后，就被保证挂载到混存的真实dom节点aliveDom上
	const isAliveRef = useRef(false);

	if (isActive && !isAliveRef.current) {
		isAliveRef.current = isActive;
	}
	useEffect(() => {
		const containerDiv = parentDomRef.current;
		if (isActive) {
			let oldDom = document.getElementById("alive");
			containerDiv?.contains(oldDom) &&
				containerDiv?.removeChild(oldDom!);
			containerDiv?.appendChild(aliveDom);
		} else {
			containerDiv?.contains(aliveDom) &&
				containerDiv?.removeChild(aliveDom);
		}
	}, [isActive]);
	return isAliveRef.current
		? createPortal(children, aliveDom, pageKey)
		: null;
}

export default memo(keepAliveRoute);
