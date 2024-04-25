import { ReactNode } from "react";

const globalVar = {
	service: new Map<"winBoxContent", Map<PropertyKey, ReactNode>>([
		["winBoxContent", new Map()],
	]),
};

export default globalVar;
