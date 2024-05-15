import { ROUTE_CONFIG_MAP as PLUGIN_ROUTE_CONFIG_MAP } from "plugins/config/router/routesConfig";
import { ROUTE_ID_KEY, RouteItem } from "./types";

export const ROUTE_CONFIG_MAP: {
	[key in ROUTE_ID_KEY]: RouteItem;
} = {
	HomePage: {
		id: "HomePage",
		meta: { title: "app:HomePageTile" },
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
			title: "app:HelloPageTile",
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
			title: "app:SysPageTitle",
			icon: "ApartmentOutlined",
		},
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: true,
	},
	CmsPage: {
		id: "CmsPage",
		meta: {
			title: "app:CmsPageTitle",
			icon: "CoffeeOutlined",
		},
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: true,
	},
	UserPage: {
		id: "UserPage",
		meta: { title: "app:UserPageTitle" },
		actionPermissions: ["ADD", "EDIT"],
		component: "UserPage",
		isNoAuth: true,
	},
	RolePage: {
		id: "RolePage",
		meta: { title: "app:RolePageTitle" },
		component: "RolePage",
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: true,
		path: undefined,
	},
	DevPage: {
		id: "DevPage",
		meta: {
			title: "app:DevPageTitle",
			icon: "LaptopOutlined",
		},
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: true,
	},
	PageDevPage: {
		id: "PageDevPage",
		meta: { title: "app:PageDevPageTitle" },
		component: "PageDevPage",
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: true,
	},
	StoreDevPage: {
		id: "StoreDevPage",
		meta: { title: "app:StoreDevPageTitle" },
		component: "StoreDevPage",
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: true,
	},
	NotFundPage: {
		id: "NotFundPage",
		meta: { title: "app:NotFundPageTitle" },
		component: "NotFundPage",
		isNoAuth: true,
		isMenu: false,
		path: "*",
	},
	ErrorPage: {
		id: "ErrorPage",
		meta: { title: "app:ErrorPageTitle" },
		component: "ErrorPage",
		isNoAuth: true,
		isMenu: false,
		path: "*",
	},
	MenuPage: {
		id: "MenuPage",
		meta: { title: "app:MenuPageTitle" },
		component: "MenuPage",
		isNoAuth: true,
	},
	PluginsPage: {
		id: "PluginsPage",
		meta: {
			title: "app:PluginsPageTitle",
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
