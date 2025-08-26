import { PLUGIN_ROUTE_NAME } from "plugins/config/router/name";
import { enumToObject } from "src/common/utils";

export enum NAME {
	HomePage,
	LoginPage,
	HelloPage,
	CmsPage,
	SysPage,
	TemplatePage,
	MenuPage,
	RolePage,
	DevPage,
	PageDevPage,
	StoreDevPage,
	NotFundPage,
	ErrorPage,
	LoadingPage,
	PluginsPage,
	UserPage,
	// CpdPage,
	// market
	MarketPage,
	MarketDetailPage,
	MarketListPage,
	MarketAddPage,
	MarketEditPage,
	// pos
	PosPage,
	PosListPage,
	PosDetailPage,
	PosEditPage,
	PosAddPage,
	// rule
	RulePage,
	RuleDetailPage,
	RuleListPage,
	RuleEditPage,
	RuleAddPage,
	// filter
	FilterPage,
	FilterListPage,
	// sort
	SortPage,
	SortListPage,
	PluginListPage,
}

export const ROUTE_NAME = { ...NAME, ...PLUGIN_ROUTE_NAME };
export const ROUTE_ID = enumToObject(ROUTE_NAME);
