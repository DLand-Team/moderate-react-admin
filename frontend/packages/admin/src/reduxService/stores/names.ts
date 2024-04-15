import { names as pluginNames } from "plugins/config/services/name";

const names = {
	authStore: "authStore",
	appStore: "appStore",
	devStore: "devStore",
	routerStore: "routerStore",
	categoryStore: "categoryStore",
	posStore: "posStore",
	marketStore: "marketStore",
	carrierStore: "carrierStore",
	sortStore: "sortStore",
	filterStore: "filterStore",
	ruleStore: "ruleStore",
	dealStore: "dealStore",
	...pluginNames,
};

export default names;
