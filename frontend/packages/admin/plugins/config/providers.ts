import { WinBoxProvider } from "plugins/moderate-plugin-winbox/providers/winBoxProvider";

import { PluginMarkDownProvider } from "plugins/moderate-plugin-markdown/providers/pluginMarkDownProvider";
import { ShiProvider } from "plugins/moderate-plugin-shikitor/providers/shiProvider";
//>>>PROVIDER_INPORT_SIGN<<<//

export const pluginProviders = [
	ShiProvider,
	WinBoxProvider,
	PluginMarkDownProvider,
	//>>>PROVIDER_SIGN<<<//
];
