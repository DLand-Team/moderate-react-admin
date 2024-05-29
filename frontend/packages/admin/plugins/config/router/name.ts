import { enumToObject } from "src/common/utils";

export enum PLUGIN_ROUTE_NAME {
	MdPage = 10000,
	WinboxPage,
	PdfPage,
	RivePage,
	MusicPage,
	ShikitorPage
}

export const PLUGIN_ROUTE_ID = enumToObject(PLUGIN_ROUTE_NAME);
