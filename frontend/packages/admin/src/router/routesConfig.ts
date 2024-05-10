import i18n from "src/i18n";
import { ROUTE_ID_KEY, RouteItem } from "./types";
import { ROUTE_CONFIG_MAP as PLUGIN_ROUTE_CONFIG_MAP } from "plugins/config/router/routesConfig";

export const ROUTE_CONFIG_MAP: {
	[key in ROUTE_ID_KEY]: RouteItem;
} = {
	HomePage: {
		path: "/",
		id: "HomePage",
		meta: { title: "Home" },
		component: "HomePage",
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: true,
	},
	LoginPage: {
		id: "LoginPage",
		meta: { title: "Login" },
		component: "LoginPage",
		isNoAuth: true,
	},
	HelloPage: {
		id: "HelloPage",
		meta: {
			title: i18n.t("dev:dev.Dashboard"),
			icon: "FundProjectionScreenOutlined",
		},
		component: "HelloPage",
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: true,
		index: true,
	},
	SysPage: {
		id: "SysPage",
		meta: {
			title: i18n.t("dev:dev.sys"),
			icon: "ApartmentOutlined",
		},
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: true,
	},
	CmsPage: {
		id: "CmsPage",
		meta: {
			title: i18n.t("dev:dev.cms"),
			icon: "CoffeeOutlined",
		},
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: true,
	},
	CpdPage: {
		id: "CpdPage",
		meta: {
			title: i18n.t("dev:dev.cpdPage"),
			icon: "FireOutlined",
		},
		isNoAuth: true,
	},
	UserPage: {
		id: "UserPage",
		meta: { title: "User Management" },
		actionPermissions: ["ADD", "EDIT"],
		component: "UserPage",
		isNoAuth: true,
	},
	RolePage: {
		id: "RolePage",
		meta: { title: "Role Management" },
		component: "RolePage",
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: true,
		path: undefined,
	},
	DevPage: {
		id: "DevPage",
		meta: {
			title: i18n.t("dev:dev.name"),
			icon: "LaptopOutlined",
		},
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: true,
	},
	PageDevPage: {
		id: "PageDevPage",
		meta: { title: "Router Management" },
		component: "PageDevPage",
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: true,
	},
	PermissionPage: {
		id: "PermissionPage",
		meta: { title: "Permission Management" },
		component: "PermissionPage",
		isMenu: false,
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: true,
	},
	StoreDevPage: {
		id: "StoreDevPage",
		meta: { title: "Store Management" },
		component: "StoreDevPage",
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: true,
	},
	ApiDevPage: {
		id: "ApiDevPage",
		meta: { title: "API Management" },
		component: "ApiDevPage",
		isNoAuth: true,
		actionPermissions: ["ADD", "EDIT"],
	},
	NotFundPage: {
		id: "NotFundPage",
		meta: { title: "NotFundPage" },
		component: "NotFundPage",
		isNoAuth: true,
		isMenu: false,
		path: "*",
	},
	ErrorPage: {
		id: "ErrorPage",
		meta: { title: "ErrorPage" },
		component: "ErrorPage",
		isNoAuth: true,
		isMenu: false,
		path: "*",
	},
	MenuPage: {
		id: "MenuPage",
		meta: { title: "MenuPage" },
		component: "MenuPage",
		isNoAuth: true,
	},
	PluginsPage: {
		id: "PluginsPage",
		meta: { title: "Plugins", icon: "ProductOutlined" },
		component: "PluginsPage",
		isNoAuth: true,
	},
	PluginListPage: {
		id: "PluginListPage",
		meta: { title: "PluginListPage" },
		component: "PluginListPage",
		isNoAuth: true,
		isMenu: false,
		index: true,
	},
	...PLUGIN_ROUTE_CONFIG_MAP,
};
