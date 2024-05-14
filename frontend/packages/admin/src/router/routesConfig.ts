import i18n from "src/i18n";
import { ROUTE_ID_KEY, RouteItem } from "./types";
import { ROUTE_CONFIG_MAP as PLUGIN_ROUTE_CONFIG_MAP } from "plugins/config/router/routesConfig";

export const ROUTE_CONFIG_MAP: {
	[key in ROUTE_ID_KEY]: RouteItem;
} = {
	HomePage: {
		id: "HomePage",
		meta: { title: i18n.t("app:HomePageTile") },
		component: "HomePage",
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: true,
	},
	LoginPage: {
		id: "LoginPage",
		component: "LoginPage",
		isNoAuth: true,
		path: "/",
	},
	HelloPage: {
		id: "HelloPage",
		meta: {
			title: i18n.t("app:HelloPageTile"),
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
			title: i18n.t("app:SysPageTitle"),
			icon: "ApartmentOutlined",
		},
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: true,
	},
	CmsPage: {
		id: "CmsPage",
		meta: {
			title: i18n.t("app:CmsPageTitle"),
			icon: "CoffeeOutlined",
		},
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: true,
	},
	UserPage: {
		id: "UserPage",
		meta: { title: i18n.t("app:UserPageTitle") },
		actionPermissions: ["ADD", "EDIT"],
		component: "UserPage",
		isNoAuth: true,
	},
	RolePage: {
		id: "RolePage",
		meta: { title: i18n.t("app:RolePageTitle") },
		component: "RolePage",
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: true,
		path: undefined,
	},
	DevPage: {
		id: "DevPage",
		meta: {
			title: i18n.t("app:DevPageTitle"),
			icon: "LaptopOutlined",
		},
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: true,
	},
	PageDevPage: {
		id: "PageDevPage",
		meta: { title: i18n.t("app:PageDevPageTitle") },
		component: "PageDevPage",
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: true,
	},
	StoreDevPage: {
		id: "StoreDevPage",
		meta: { title: i18n.t("app:StoreDevPageTitle") },
		component: "StoreDevPage",
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: true,
	},
	NotFundPage: {
		id: "NotFundPage",
		meta: { title: i18n.t("app:NotFundPageTitle") },
		component: "NotFundPage",
		isNoAuth: true,
		isMenu: false,
		path: "*",
	},
	ErrorPage: {
		id: "ErrorPage",
		meta: { title: i18n.t("app:ErrorPageTitle") },
		component: "ErrorPage",
		isNoAuth: true,
		isMenu: false,
		path: "*",
	},
	MenuPage: {
		id: "MenuPage",
		meta: { title: i18n.t("app:MenuPageTitle") },
		component: "MenuPage",
		isNoAuth: true,
	},
	PluginsPage: {
		id: "PluginsPage",
		meta: {
			title: i18n.t("app:PluginsPageTitle"),
			icon: "ProductOutlined",
		},
		component: "PluginsPage",
		isNoAuth: true,
	},
	PluginListPage: {
		id: "PluginListPage",
		component: "PluginListPage",
		isNoAuth: true,
		isMenu: false,
		index: true,
	},
	...PLUGIN_ROUTE_CONFIG_MAP,
};
