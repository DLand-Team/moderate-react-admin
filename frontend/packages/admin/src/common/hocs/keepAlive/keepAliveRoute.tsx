import { RefObject, useLayoutEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";

export type KeepAliveComponentProps = React.PropsWithChildren<{
	parentDomRef: RefObject<HTMLElement>;
	activeKey: string;
	pageKey: string;
}>;

function keepAliveRoute(props: KeepAliveComponentProps) {
	const { parentDomRef, activeKey, children, pageKey } = props;
	const isActive = activeKey == pageKey;
	const aliveDom = useMemo(() => {
		const aliveDom = document.createElement("div");
		aliveDom.setAttribute("page-name", pageKey);
		aliveDom.setAttribute("style", "height: 100%");
		return aliveDom;
	}, []);
	// alive标记，当被标记之后，就被保证挂载到混存的真实dom节点aliveDom上
	const isAliveRef = useRef(false);

	if (isActive && !isAliveRef.current) {
		isAliveRef.current = isActive;
	}
	useLayoutEffect(() => {
		const containerDiv = parentDomRef.current;
		if (isActive) {
			containerDiv?.appendChild(aliveDom);
		} else {
			containerDiv?.contains(aliveDom) &&
				containerDiv?.removeChild(aliveDom);
		}
	}, [isActive, parentDomRef.current]);

	return isAliveRef.current
		? createPortal(children, aliveDom, pageKey)
		: null;
}

export default keepAliveRoute;
