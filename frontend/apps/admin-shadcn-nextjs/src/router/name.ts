import { enumToObject } from "src/common/utils";

export enum ROUTE_NAME {
	dashboard,
	login,
	hello,
	test,
	menu,
	sys,
	// CmsPage,
	// TemplatePage,
	// MenuPage,
	// RolePage,
	// DevPage,
	// CodeGeneratePage,
	// PageDevPage,
	// StoreDevPage,
	// NotFundPage,
	// ErrorPage,
	// LoadingPage,
	// PluginsPage,
	// UserPage,
	// PluginListPage,
}

export const ROUTE_ID = enumToObject({ ...ROUTE_NAME });
