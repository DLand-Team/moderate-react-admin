import { ROUTE_CONFIG_MAP as PLUGIN_ROUTE_CONFIG_MAP } from "plugins/config/router/routesConfig";
import { ROUTE_ID_KEY, RouteItem } from "./types";

export const ROUTE_CONFIG_MAP: {
	[key in ROUTE_ID_KEY]: RouteItem;
} = {
	Home: {
		id: "Home",
		meta: { title: "common:HomePageTile" },
		component: "HomePage",
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: true,
		keepAlive: true,
		isTab: false,
	},
	Login: {
		id: "Login",
		component: "LoginPage",
		isNoAuth: true,
		path: "/",
	},
	Hello: {
		id: "Hello",
		meta: {
			title: "common:HelloPageTile",
			icon: "FundProjectionScreenOutlined",
		},
		component: "HelloPage",
		actionPermissions: ["ADD", "EDIT"],
		keepAlive: true,
		isNoAuth: true,
		index: true,
	},
	Sys: {
		id: "Sys",
		meta: {
			title: "common:SysPageTitle",
			icon: "ApartmentOutlined",
		},
		actionPermissions: ["ADD", "EDIT"],
	},
	Cms: {
		id: "Cms",
		meta: {
			title: "common:CmsPageTitle",
			icon: "CoffeeOutlined",
		},
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: true,
	},
	Template: {
		id: "Template",
		meta: {
			title: "common:TemplatePage",
			icon: "StarOutlined",
		},
		actionPermissions: ["ADD", "EDIT"],
	},
	Cpd: {
		id: "Cpd",
		meta: {
			title: "common:cpdPage",
			icon: "StarOutlined",
		},
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: true,
	},
	Role: {
		id: "Role",
		meta: { title: "common:RolePageTitle" },
		component: "RolePage",
		actionPermissions: ["ADD", "EDIT"],
		path: undefined,
	},
	Dev: {
		id: "Dev",
		meta: {
			title: "common:DevPageTitle",
			icon: "LaptopOutlined",
		},
		actionPermissions: ["ADD", "EDIT"],
		isPublish: false,
		isNoAuth: true,
	},
	PageDev: {
		id: "PageDev",
		meta: { title: "common:PageDevPageTitle" },
		component: "PageDevPage",
		actionPermissions: ["ADD", "EDIT"],
	},
	StoreDev: {
		id: "StoreDev",
		meta: { title: "common:StoreDevPageTitle" },
		component: "StoreDevPage",
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: false,
	},
	NotFund: {
		id: "NotFund",
		meta: { title: "common:NotFundPageTitle" },
		component: "NotFundPage",
		isNoAuth: true,
		isMenu: false,
		path: "*",
		isTab: false,
	},
	Error: {
		id: "Error",
		meta: { title: "common:ErrorPageTitle" },
		component: "ErrorPage",
		isNoAuth: true,
		isMenu: false,
		path: "*",
		isTab: false,
	},
	Menu: {
		id: "Menu",
		meta: { title: "common:MenuPageTitle" },
		component: "MenuPage",
	},
	Plugins: {
		id: "Plugins",
		meta: {
			title: "common:PluginsPageTitle",
			icon: "ProductOutlined",
		},
		component: "PluginsPage",
		isNoAuth: true,
	},
	PluginList: {
		id: "PluginList",
		component: "PluginListPage",
		isNoAuth: true,
		isMenu: false,
		index: true,
	},
	Loading: {
		id: "Loading",
		component: "LoadingPage",
		meta: {
			title: "LoadingPage",
		},
		isMenu: false,
		isNoAuth: true,
		isTab: false,
	},
	Market: {
		index: true,
		id: "Market",
		meta: {
			title: "common:marketPage",
		},
		component: "MarketPage",
		isNoAuth: true,
	},
	MarketDetail: {
		id: "MarketDetail",
		meta: {
			title: "common:marketDetailPage",
		},
		component: "MarketDetailPage",
		depends: ["Market"],
		isMenu: false,
		isNoAuth: true,
	},
	MarketList: {
		id: "MarketList",
		meta: {
			title: "common:marketListPage",
		},
		component: "MarketListPage",
		index: true,
		depends: ["Market"],
		isMenu: false,
		isNoAuth: true,
	},
	MarketEdit: {
		id: "MarketEdit",
		meta: {
			title: "common:marketEditPage",
		},
		component: "MarketEditPage",
		depends: ["Market"],
		isMenu: false,
		isNoAuth: true,
	},
	MarketAdd: {
		id: "MarketAdd",
		meta: {
			title: "common:marketAddPage",
		},
		component: "MarketAddPage",
		isMenu: false,
		depends: ["Market"],
		isNoAuth: true,
	},
	Pos: {
		id: "Pos",
		meta: {
			title: "common:posPage",
		},
		component: "PosPage",
		isNoAuth: true,
	},
	PosDetail: {
		id: "PosDetail",
		meta: {
			title: "common:posDetailPage",
		},
		component: "PosDetailPage",
		depends: ["Pos"],
		isMenu: false,
		isNoAuth: true,
	},
	PosList: {
		id: "PosList",
		meta: {
			title: "common:posListPage",
		},
		component: "PosListPage",
		depends: ["Pos"],
		isMenu: false,
		keepAlive: true,
		index: true,
		isNoAuth: true,
	},
	PosAdd: {
		id: "PosAdd",
		meta: {
			title: "common:posAddPage",
		},
		component: "PosAddPage",
		depends: ["Pos"],
		isMenu: false,
		keepAlive: true,
		isNoAuth: true,
	},
	PosEdit: {
		id: "PosEdit",
		meta: {
			title: "common:posEditPage",
		},
		component: "PosEditPage",
		depends: ["Pos"],
		keepAlive: true,
		isMenu: false,
		isNoAuth: true,
	},
	Rule: {
		id: "Rule",
		meta: {
			title: "common:rulePage",
		},
		component: "RulePage",
		isNoAuth: true,
		keepAlive: true,
	},
	RuleDetail: {
		id: "RuleDetail",
		meta: {
			title: "common:ruleDetailPage",
		},
		component: "RuleDetailPage",
		depends: ["Rule"],
		keepAlive: true,
		isMenu: false,
		isTab: false,
		isNoAuth: true,
	},
	RuleList: {
		id: "RuleList",
		meta: {
			title: "common:ruleListPage",
		},
		component: "RuleListPage",
		depends: ["Rule"],
		keepAlive: true,
		isMenu: false,
		index: true,
		isNoAuth: true,
	},
	RuleEdit: {
		id: "RuleEdit",
		meta: {
			title: "common:ruleEditPage",
		},
		component: "RuleEditPage",
		depends: ["Rule"],
		keepAlive: true,
		isMenu: false,
		isTab: false,
		isNoAuth: true,
	},
	RuleAdd: {
		id: "RuleAdd",
		meta: {
			title: "common:ruleAddPage",
		},
		component: "RuleAddPage",
		depends: ["Rule"],
		keepAlive: true,
		isMenu: false,
		isTab: false,
		isNoAuth: true,
	},
	Sort: {
		id: "Sort",
		meta: {
			title: "common:sortPage",
		},
		component: "SortPage",
		isNoAuth: true,
	},
	SortList: {
		id: "SortList",
		meta: {
			title: "common:sortPage",
		},
		component: "SortListPage",
		index: true,
		isMenu: false,
		isNoAuth: true,
	},

	...PLUGIN_ROUTE_CONFIG_MAP,
};
