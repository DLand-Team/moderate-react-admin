import { PLUGIN_ROUTE_NAME } from "plugins/config/router/name";
import { enumToObject } from "src/common/utils";

export enum NAME {
	HomePage,
	LoginPage,
	HelloPage,
	SysPage,
	CmsPage,
	TemplatePage,
	MenuPage,
	RolePage,
	DevPage,
	CodeGeneratePage,
	PageDevPage,
	StoreDevPage,
	NotFundPage,
	ErrorPage,
	LoadingPage,
	PluginsPage,
	UserPage,
	PluginListPage,
}

export const ROUTE_NAME = { ...NAME, ...PLUGIN_ROUTE_NAME };
export const ROUTE_ID = enumToObject(ROUTE_NAME);
