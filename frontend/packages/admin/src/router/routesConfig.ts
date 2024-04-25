import i18n from "src/i18n";
import { ROUTE_ID_KEY, RouteItem } from "./types";
import { ROUTE_INFO_CONFIG as PLUGIN_ROUTE_INFO_CONFIG } from "plugins/config/router/routesConfig";

export const ROUTE_INFO_CONFIG: {
	[key in ROUTE_ID_KEY]: RouteItem;
} = {
	LoginPage: {
		id: "LoginPage",
		meta: { title: "Login" },
		component: "LoginPage",
		path: "/login",
		isNoAuth: true,
	},
	HomePage: {
		id: "HomePage",
		meta: { title: "Home" },
		path: "/",
		component: "HomePage",
		actionPermissions: ["ADD", "EDIT"],
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
	MenuPage: {
		id: "MenuPage",
		meta: { title: "MenuPage" },
		component: "MenuPage",
		isNoAuth: true,
		index: false,
	},
	PluginsPage: {
		id: "PluginsPage",
		meta: { title: "Plugins", icon: "ProductOutlined" },
		component: "PluginsPage",
		isNoAuth: true,
		index: false,
	},
	PluginListPage: {
		id: "PluginListPage",
		meta: { title: "PluginListPage" },
		component: "PluginListPage",
		isNoAuth: true,
		index: true,
		isMenu: false,
	},
	...PLUGIN_ROUTE_INFO_CONFIG,
};
