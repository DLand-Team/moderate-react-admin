import { PLUGIN_ROUTE_NAME } from "plugins/config/router/name";
import { enumToObject } from "src/common/utils";

export enum NAME {
	HomePage,
	LoginPage,
	HelloPage,
	AnalyticsPage,
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
	PluginsPage,
	PluginListPage,
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
}

export const ROUTE_NAME = { ...NAME, ...PLUGIN_ROUTE_NAME };
export const ROUTE_ID = enumToObject(ROUTE_NAME);
