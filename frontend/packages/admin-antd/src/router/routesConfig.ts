import { ROUTE_CONFIG_MAP as PLUGIN_ROUTE_CONFIG_MAP } from "plugins/config/router/routesConfig";
import { ROUTE_ID_KEY, RouteItem } from "./types";

export const ROUTE_CONFIG_MAP: {
	[key in ROUTE_ID_KEY]: RouteItem;
} = {
	HomePage: {
		id: "HomePage",
		meta: { title: "common:HomePageTile" },
		component: "HomePage",
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: true,
		keepAlive: true,
		isTab: false,
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
			title: "common:HelloPageTile",
			icon: "FundProjectionScreenOutlined",
		},
		component: "HelloPage",
		actionPermissions: ["ADD", "EDIT"],
		keepAlive: true,
		index: true,
	},
	SysPage: {
		id: "SysPage",
		meta: {
			title: "common:SysPageTitle",
			icon: "ApartmentOutlined",
		},
		actionPermissions: ["ADD", "EDIT"],
	},
	CmsPage: {
		id: "CmsPage",
		meta: {
			title: "common:CmsPageTitle",
			icon: "CoffeeOutlined",
		},
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: true,
	},
	TemplatePage: {
		id: "TemplatePage",
		meta: {
			title: "common:TemplatePage",
			icon: "StarOutlined",
		},
	},
	RolePage: {
		id: "RolePage",
		meta: { title: "common:RolePageTitle" },
		component: "RolePage",
		actionPermissions: ["ADD", "EDIT"],
		path: undefined,
	},
	DevPage: {
		id: "DevPage",
		meta: {
			title: "common:DevPageTitle",
			icon: "LaptopOutlined",
		},
		actionPermissions: ["ADD", "EDIT"],
		isPublish: false,
		isNoAuth: true,
	},
	PageDevPage: {
		id: "PageDevPage",
		meta: { title: "common:PageDevPageTitle" },
		component: "PageDevPage",
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: true,
	},
	StoreDevPage: {
		id: "StoreDevPage",
		meta: { title: "common:StoreDevPageTitle" },
		component: "StoreDevPage",
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: false,
	},
	NotFundPage: {
		id: "NotFundPage",
		meta: { title: "common:NotFundPageTitle" },
		component: "NotFundPage",
		isNoAuth: true,
		isMenu: false,
		path: "*",
		isTab: false,
	},
	ErrorPage: {
		id: "ErrorPage",
		meta: { title: "common:ErrorPageTitle" },
		component: "ErrorPage",
		isNoAuth: true,
		isMenu: false,
		path: "*",
		isTab: false,
	},
	MenuPage: {
		id: "MenuPage",
		meta: { title: "common:MenuPageTitle" },
		component: "MenuPage",
	},
	PluginsPage: {
		id: "PluginsPage",
		meta: {
			title: "common:PluginsPageTitle",
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
	LoadingPage: {
		id: "LoadingPage",
		component: "LoadingPage",
		meta: {
			title: "LoadingPage",
		},
		isMenu: false,
		isNoAuth: true,
		isTab: false,
	},
	MarketPage: {
		index: true,
		id: "MarketPage",
		meta: {
			title: "common:marketPage",
		},
		component: "MarketPage",
		isNoAuth: true,
	},
	MarketDetailPage: {
		id: "MarketDetailPage",
		meta: {
			title: "common:marketDetailPage",
		},
		component: "MarketDetailPage",
		depends: ["MarketPage"],
		isMenu: false,
		isNoAuth: true,
	},
	MarketListPage: {
		id: "MarketListPage",
		meta: {
			title: "common:marketDetailPage",
		},
		component: "MarketListPage",
		depends: ["MarketPage"],
		index: true,
		isMenu: false,
		isNoAuth: true,
	},
	MarketEditPage: {
		id: "MarketEditPage",
		meta: {
			title: "common:marketEditPage",
		},
		component: "MarketEditPage",
		depends: ["MarketPage"],
		isMenu: false,
		isNoAuth: true,
	},
	MarketAddPage: {
		id: "MarketAddPage",
		meta: {
			title: "common:marketAddPage",
		},
		component: "MarketAddPage",
		isMenu: false,
		depends: ["MarketPage"],
		isNoAuth: true,
	},
	PosPage: {
		id: "PosPage",
		meta: {
			title: "common:posPage",
		},
		component: "PosPage",
	},
	PosDetailPage: {
		id: "PosDetailPage",
		meta: {
			title: "common:posDetailPage",
		},
		component: "PosDetailPage",
		depends: ["PosPage"],
		isMenu: false,
		isNoAuth: true,
	},
	PosListPage: {
		id: "PosListPage",
		component: "PosListPage",
		depends: ["PosPage"],
		isMenu: false,
		keepAlive: true,
		index: true,
		isNoAuth: true,
	},
	PosAddPage: {
		id: "PosAddPage",
		meta: {
			title: "common:posAddPage",
		},
		component: "PosAddPage",
		depends: ["PosPage"],
		isMenu: false,
		keepAlive: true,
		isNoAuth: true,
	},
	PosEditPage: {
		id: "PosEditPage",
		meta: {
			title: "common:posEditPage",
		},
		component: "PosEditPage",
		depends: ["PosPage"],
		keepAlive: true,
		isMenu: false,
		isNoAuth: true,
	},
	RulePage: {
		id: "RulePage",
		meta: {
			title: "common:rulePage",
		},
		component: "RulePage",
		isNoAuth: true,
		keepAlive: true,
	},
	RuleDetailPage: {
		id: "RuleDetailPage",
		meta: {
			title: "common:ruleDetailPage",
		},
		component: "RuleDetailPage",
		depends: ["RulePage"],
		keepAlive: true,
		isMenu: false,
		isNoAuth: true,
	},
	RuleListPage: {
		id: "RuleListPage",
		component: "RuleListPage",
		depends: ["RulePage"],
		keepAlive: true,
		isMenu: false,
		index: true,
		isNoAuth: true,
	},
	RuleEditPage: {
		id: "RuleEditPage",
		meta: {
			title: "common:ruleEditPage",
		},
		component: "RuleEditPage",
		depends: ["RulePage"],
		isMenu: false,
		isNoAuth: true,
	},
	RuleAddPage: {
		id: "RuleAddPage",
		meta: {
			title: "common:ruleAddPage",
		},
		component: "RuleAddPage",
		depends: ["RulePage"],
		keepAlive: true,
		isMenu: false,
		isNoAuth: true,
	},
	FilterPage: {
		id: "FilterPage",
		meta: {
			title: "common:filterPage",
		},
		component: "FilterPage",
		isNoAuth: true,
	},
	FilterListPage: {
		id: "FilterListPage",
		// meta: {
		//     title: "common:filterPage",
		// },
		component: "FilterListPage",
		index: true,
		isMenu: false,
		isNoAuth: true,
	},
	SortPage: {
		id: "SortPage",
		meta: {
			title: "common:sortPage",
		},
		component: "SortPage",
		isNoAuth: true,
	},
	SortListPage: {
		id: "SortListPage",
		// meta: {
		//     title: "common:sortPage",
		// },
		component: "SortListPage",
		index: true,
		isMenu: false,
		isNoAuth: true,
	},

	...PLUGIN_ROUTE_CONFIG_MAP,
};
