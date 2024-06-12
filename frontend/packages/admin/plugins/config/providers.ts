import { WinBoxProvider } from "plugins/moderate-plugin-winbox/providers/winBoxProvider";
import { ShiProvider } from "plugins/moderate-plugin-shikitor/providers/shiProvider";
import { PluginMarkDownProvider } from "plugins/moderate-plugin-markdown/providers/pluginMarkDownProvider";
//>>>PROVIDER_INPORT_SIGN<<<//

export const pluginProviders = [
  WinBoxProvider,
  ShiProvider,
  PluginMarkDownProvider,
  //>>>PROVIDER_SIGN<<<//
];
