import { names as pluginNames } from "plugins/config/services/name";

const names = {
	authStore: "authStore",
	appStore: "appStore",
	devStore: "devStore",
	routerStore: "routerStore",
	categoryStore: "categoryStore",
	ruleStore: "ruleStore",
	dealStore: "dealStore",
	userStore: "userStore",
	enquiryStore: "enquiryStore",
	...pluginNames,
};

export default names;
