import { stores as pluginStores } from "plugins/config/services/stores";
// 职责功能划分的仓库
import appStore from "./appStore";
import authStore from "./authStore";
import devStore from "./devStore";
import routerStore from "./routerStore";
import marketStore from "./marketStore";
import posStore from "./posStore";
import carrierStore from "./carrierStore";
import sortStore from "./sortStore";
import filterStore from "./filterStore";
import ruleStore from "./ruleStore";

const stores = {
	appStore,
	authStore,
	devStore,
	routerStore,
	posStore,
	marketStore,
	carrierStore,
	sortStore,
	filterStore,
	ruleStore,
	...pluginStores,
};

export { stores };
