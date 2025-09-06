"use client";

import { useAppRouterListener } from "@/src/common/hooks/useRouerListen";
import { CustomTabs } from "./tabs";

const TabNav = () => {
	useAppRouterListener(() => {
		console.log("路由变化了");
	});
	return <CustomTabs />;
};

export default TabNav;
