import { enumToObject } from "src/common/utils";
import { PLUGIN_ROUTE_NAME } from "plugins/config/router/name";

export enum NAME {
	HomePage,
	LoginPage,
	HelloPage,
	SysPage,
	CmsPage,
	RolePage,
	UserPage,
	DevPage,
	PageDevPage,
	StoreDevPage,
	NotFundPage,
	MenuPage,
	PluginsPage,
	PluginListPage,
	ErrorPage,
}

export const ROUTE_NAME = { ...NAME, ...PLUGIN_ROUTE_NAME };
export const ROUTE_ID = enumToObject(ROUTE_NAME);
