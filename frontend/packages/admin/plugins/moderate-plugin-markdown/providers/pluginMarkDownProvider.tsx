import { PluginDetailDrawer } from "../components/pluginDetailDrawer";
import React from "react";

export const PluginMarkDownProvider = ({
	children,
}: React.PropsWithChildren) => {
	return (
		<>
			<PluginDetailDrawer />
			{children}
		</>
	);
};
