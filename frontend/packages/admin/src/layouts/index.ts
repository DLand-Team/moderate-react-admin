import { DefaultLayout as Default } from "./antd";
import { pluginLayoutMap } from "plugins/config/layouts";

const layoutMap = {
	...pluginLayoutMap,
	Default,
};

export default layoutMap;
export type LayoutMapkey = keyof typeof layoutMap;
