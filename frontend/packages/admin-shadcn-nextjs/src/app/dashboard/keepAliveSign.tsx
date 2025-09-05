"use client";

import { ROUTE_ID_KEY } from "@/src/router";
import { routerHelper } from "@/src/service";
import React, { Fragment, PropsWithChildren, useEffect } from "react";

export const Slot = ({ id }: { id: string }) => {
	return <div id="slot">123</div>;
};

const KeepAliveSign = ({
	routeId,
	render,
	children,
}: PropsWithChildren<{
	routeId: ROUTE_ID_KEY;
	render?: React.ComponentType<any>;
}>) => {
	useEffect(() => {
		const View = render || Fragment;
		routerHelper.registerPage(routeId, () => {
			let arr: React.ReactNode[] = [];
			React.Children.forEach(children, (child) => {
				if (React.isValidElement(child)) {
					// 如果子元素是 Slot 组件，且 id 属性与 routeId 相同，则跳过渲染
					//@ts-ignore
					if (child && child.props!?.id === routeId) {
						debugger;
						arr.push(<View />);
					} else {
						arr.push(child);
					}
				}
			});
			return (
				<>
					{arr.map((item, index) => (
						<React.Fragment key={index}>{item}</React.Fragment>
					))}
				</>
			);
		});
	}, []);

	return <div id={routeId}>{children}</div>;
};

export default KeepAliveSign;
