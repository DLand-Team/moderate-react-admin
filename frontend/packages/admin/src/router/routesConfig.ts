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
			title: "dev:dealPage",
		},
		isNoAuth: true,
	},
	DealListPage: {
		id: "DealListPage",
		component: "DealListPage",
		meta: {
			title: "dev:dealListPage",
		},
		index: true,
		keepAlive: true,
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
	PosPage: {
		id: "PosPage",
		meta: {
			title: "dev:dev.posPage",
		},
		component: "PosPage",
		isNoAuth: true,
	},
	PosDetailPage: {
		id: "PosDetailPage",
		meta: {
			title: "dev:dev.posDetailPage",
		},
		component: "PosDetailPage",
		depends: ["PosPage"],
		isNoAuth: true,
	},
	PosListPage: {
		id: "PosListPage",
		meta: {
			title: "dev:posListPage",
		},
		index: true,
		component: "PosListPage",
		depends: ["PosPage"],
		isNoAuth: true,
	},
	PosAddPage: {
		id: "PosAddPage",
		meta: {
			title: "dev:dev.posAddPage",
		},
		component: "PosEditPage",
		depends: ["PosPage"],
		isNoAuth: true,
	},
	PosEditPage: {
		id: "PosEditPage",
		meta: {
			title: "dev:dev.posEditPage",
		},
		component: "PosEditPage",
		depends: ["PosPage"],
		isNoAuth: true,
	},
	RulePage: {
		id: "RulePage",
		meta: {
			title: "dev:dev.rulePage",
		},
		component: "RulePage",
		isNoAuth: true,
	},
	RuleDetailPage: {
		id: "RuleDetailPage",
		meta: {
			title: "dev:dev.ruleDetailPage",
		},
		component: "RuleDetailPage",
		depends: ["RulePage"],
		isNoAuth: true,
	},
	RuleListPage: {
		id: "RuleListPage",
		index: true,
		meta: {
			title: "dev:dev.ruleListPage",
		},
		component: "RuleListPage",
		depends: ["RulePage"],
		isNoAuth: true,
	},
	RuleEditPage: {
		id: "RuleEditPage",
		meta: {
			title: "dev:dev.ruleEditPage",
		},
		component: "RuleEditPage",
		depends: ["RulePage"],
		isNoAuth: true,
		keepAlive: true,
	},
	RuleAddPage: {
		id: "RuleAddPage",
		meta: {
			title: "dev:dev.ruleAddPage",
		},
		component: "RuleAddPage",
		depends: ["RulePage"],
		isNoAuth: true,
		keepAlive: true,
	},
	FilterPage: {
		id: "FilterPage",
		meta: {
			title: "dev:dev.filterPage",
		},
		component: "FilterPage",
		isNoAuth: true,
	},
	FilterListPage: {
		id: "FilterListPage",
		meta: {
			title: "dev:filterlListPage",
		},
		component: "FilterListPage",
		depends: ["FilterPage"],
		index: true,
		isMenu: false,
		isNoAuth: true,
	},
	SortPage: {
		id: "SortPage",
		meta: {
			title: "dev:dev.sortPage",
		},
		component: "SortPage",
		isNoAuth: true,
	},
	SortListPage: {
		id: "SortListPage",
		meta: {
			title: "dev:sortlListPage",
		},
		component: "SortListPage",
		index: true,
		depends: ["SortPage"],
		isMenu: false,
		isNoAuth: true,
	},
	MarketPage: {
		id: "MarketPage",
		meta: {
			title: "dev:dev.marketPage",
		},
		component: "MarketPage",
		index: false,
		isNoAuth: true,
	},
	MarketDetailPage: {
		id: "MarketDetailPage",
		meta: {
			title: "dev:dev.marketDetailPage",
		},
		component: "MarketDetailPage",
		depends: ["PosPage"],
		isNoAuth: true,
	},
	MarketListPage: {
		id: "MarketListPage",
		meta: {
			title: "dev:marketlListPage",
		},
		component: "MarketListPage",
		index: true,
		depends: ["MarketPage"],
		isNoAuth: true,
	},
	MarketEditPage: {
		id: "MarketEditPage",
		meta: {
			title: "dev:dev.marketEditPage",
		},
		component: "MarketEditPage",
		index: false,
		depends: ["MarketPage"],
		isNoAuth: true,
	},
	MarketAddPage: {
		id: "MarketAddPage",
		meta: {
			title: "dev:dev.marketAddPage",
		},
		component: "MarketEditPage",
		index: false,
		depends: ["MarketPage"],
		isNoAuth: true,
	},
	...PLUGIN_ROUTE_CONFIG_MAP,
};
