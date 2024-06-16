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
		keepAlive: true,
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
		index: true,
		keepAlive: true,
		isNoAuth: true,
	},
	SysPage: {
		id: "SysPage",
		meta: {
			title: "app:SysPageTitle",
			icon: "ApartmentOutlined",
		},
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: false,
		isNotRoute: true,
	},
	CmsPage: {
		id: "CmsPage",
		meta: {
			title: "app:CmsPageTitle",
			icon: "CoffeeOutlined",
		},
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: true,
		isNotRoute: true,
	},
	TemplatePage: {
		id: "TemplatePage",
		meta: {
			title: "app:TemplatePage",
			icon: "StarOutlined",
		},
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: true,
		isNotRoute: true,
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
		isPublish: false,
		isNotRoute: true,
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
	DealPage: {
		id: "DealPage",
		component: "DealPage",
		meta: {
			title: "DealPage",
		},
		isNoAuth: true,
	},
	DealApprovalPage: {
		id: "DealApprovalPage",
		component: "DealApprovalPage",
		meta: {
			title: "DealApprovalPage",
		},
		isNoAuth: true,
		keepAlive: true,
	},
	DealListPage: {
		id: "DealListPage",
		component: "DealListPage",
		meta: {
			title: "DealListPage",
		},
		isNoAuth: true,
		keepAlive: true,
	},
	DealRankPage: {
		id: "DealRankPage",
		component: "DealRankPage",
		meta: {
			title: "DealRankPage",
		},
		keepAlive: true,
		isNoAuth: true,
	},
	LoadingPage: {
		id: "LoadingPage",
		component: "LoadingPage",
		meta: {
			title: "LoadingPage",
		},
		isMenu: false,
		isNoAuth: true,
	},
	CategoryPage: {
		id: "CategoryPage",
		component: "CategoryPage",
		meta: {
			title: "CategoryPage",
		},
		isNoAuth: true,
	},
	EnquiryPage: {
		id: "EnquiryPage",
		component: "EnquiryPage",
		meta: {
			title: "EnquiryPage",
		},
		isNoAuth: true,
	},
	...PLUGIN_ROUTE_CONFIG_MAP,
};
