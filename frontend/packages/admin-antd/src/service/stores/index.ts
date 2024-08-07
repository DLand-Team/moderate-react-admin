import 'src/service/setup'
import { stores as pluginStores } from "plugins/config/services/stores";
import appStore from "./appStore";
import authStore from "./authStore";
import dealStore from "./dealStore";
import devStore from "./devStore";
import marketStore from "./marketStore";
import posStore from "./posStore";
import routerStore from "./routerStore";
import ruleStore from "./ruleStore";
import userStore from "./userStore";
import commonStore from "./commonStore";
import categoryStore from "./categoryStore";

const stores = {
	appStore,
	commonStore,
	authStore,
	devStore,
	routerStore,
	dealStore,
	userStore,
	ruleStore,
	marketStore,
	posStore,
	categoryStore,
	...pluginStores,
};

export { stores };
