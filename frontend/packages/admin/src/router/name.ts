import { PLUGIN_ROUTE_NAME } from "plugins/config/router/name";
import { enumToObject } from "src/common/utils";

export enum NAME {
	HomePage,
	LoginPage,
	HelloPage,
	SysPage,
	CmsPage,
	TemplatePage,
	RolePage,
	DevPage,
	PageDevPage,
	StoreDevPage,
	NotFundPage,
	MenuPage,
	ErrorPage,
	DealPage,
	DealListPage,
	LoadingPage,
	UserPage,
	PluginsPage,
	PluginListPage,
	// pos
	PosPage,
	PosListPage,
	PosDetailPage,
	PosEditPage,
	PosAddPage,
	// market
	MarketPage,
	MarketDetailPage,
	MarketListPage,
	MarketAddPage,
	MarketEditPage,
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
}

export const ROUTE_NAME = { ...NAME, ...PLUGIN_ROUTE_NAME };
export const ROUTE_ID = enumToObject(ROUTE_NAME);
