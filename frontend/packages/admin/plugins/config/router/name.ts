import { enumToObject } from "src/common/utils";

export enum PLUGIN_ROUTE_NAME {
	WinboxPage = 10000,
	RivePage,
}

export const PLUGIN_ROUTE_ID = enumToObject(PLUGIN_ROUTE_NAME);
