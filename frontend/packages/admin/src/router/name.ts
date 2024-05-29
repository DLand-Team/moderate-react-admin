import { enumToObject } from "src/common/utils";
import { PLUGIN_ROUTE_NAME } from "plugins/config/router/name";

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
	DealApprovalPage,
	DealRankPage,
	LoadingPage,
	UserPage,
	PluginsPage,
	PluginListPage,
	CategoryPage,
	EnquiryPage,
}

export const ROUTE_NAME = { ...NAME, ...PLUGIN_ROUTE_NAME };
export const ROUTE_ID = enumToObject(ROUTE_NAME);
