import { stores as pluginStores } from "plugins/config/services/stores";
import appStore from "./appStore";
import authStore from "./authStore";
import dealStore from "./dealStore";
import devStore from "./devStore";
import filterStore from "./filterStore";
import marketStore from "./marketStore";
import posStore from "./posStore";
import routerStore from "./routerStore";
import ruleStore from "./ruleStore";
import sortStore from "./sortStore";
import commonStore from "./commonStore";
import categoryStore from "./categoryStore";

const stores = {
	appStore,
	commonStore,
	authStore,
	devStore,
	routerStore,
	dealStore,
	ruleStore,
	marketStore,
	posStore,
	sortStore,
	filterStore,
	categoryStore,
	...pluginStores,
};

export { stores };
