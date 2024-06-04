import { names as pluginNames } from "plugins/config/services/name";

const names = {
	authStore: "authStore",
	appStore: "appStore",
	devStore: "devStore",
	routerStore: "routerStore",
	categoryStore: "categoryStore",
	dealStore: "dealStore",
	userStore: "userStore",
	enquiryStore: "enquiryStore",
	...pluginNames,
};

export default names;
