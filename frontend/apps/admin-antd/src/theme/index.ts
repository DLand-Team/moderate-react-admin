import defaultTheme from "./default";
import pluginThemeMap from "plugins/config/themes";

const themeMap = {
	Default: defaultTheme,
	...pluginThemeMap,
};

export type ThemeMapkey = keyof typeof themeMap;
export default themeMap;
