import { DefaultLayout as Default } from "./default";
import { pluginLayoutMap } from "plugins/config/layouts";

const layoutMap = {
    Default,
    ...pluginLayoutMap,
};

export default layoutMap;
export type LayoutMapkey = keyof typeof layoutMap;
