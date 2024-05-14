import { antd } from "./antd";
import { pluginLayoutMap } from "plugins/config/layouts";

const layoutMap = {
	...pluginLayoutMap,
	antd,
};

export default layoutMap;
export type LayoutMapkey = keyof typeof layoutMap;
