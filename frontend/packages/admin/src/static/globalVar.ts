import { ReactNode } from "react";

const globalVar = {
	service: new Map<
		"winBoxContent" | "keepAliveComp",
		Map<PropertyKey, ReactNode>
	>([
		["winBoxContent", new Map()],
		["keepAliveComp", new Map()],
	]),
};

export default globalVar;
