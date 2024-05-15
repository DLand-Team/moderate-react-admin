import { DefaultLayout } from "./antd";
import { pluginLayoutMap } from "plugins/config/layouts";

const layoutMap = {
	...pluginLayoutMap,
	DefaultLayout,
};

export default layoutMap;
export type LayoutMapkey = keyof typeof layoutMap;
