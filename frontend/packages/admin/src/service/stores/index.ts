import { stores as pluginStores } from "plugins/config/services/stores";
// 职责功能划分的仓库
import appStore from "./appStore";
import authStore from "./authStore";
import devStore from "./devStore";
import routerStore from "./routerStore";
import dealStore from "./dealStore";
import categoryStore from "./categoryStore";
import userStore from "./userStore";
import enquiryStore from "./enquiryStore";
const stores = {
	appStore,
	authStore,
	devStore,
	routerStore,
	dealStore,
	categoryStore,
	userStore,
	enquiryStore,
	...pluginStores,
};

export { stores };
