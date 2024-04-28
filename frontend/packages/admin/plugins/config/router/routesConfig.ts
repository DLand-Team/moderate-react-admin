import { PLUGIN_ROUTE_ID_KEY, PluginRouteItem } from "./types";

export const ROUTE_INFO_CONFIG: {
	[key in PLUGIN_ROUTE_ID_KEY]: PluginRouteItem;
} = {
	MdPage: {
		id: "MdPage",
		meta: { title: "MdPage" },
		isNoAuth: true,
		component: "MdPage",
	},
	WinboxPage: {
		id: "WinboxPage",
		meta: { title: "WinboxPage" },
		isNoAuth: true,
		component: "WinboxPage",
	},
	PdfPage: {
		id: "PdfPage",
		meta: { title: "PdfPage" },
		isNoAuth: true,
		component: "PdfPage",
	},

	MusicPage: {
		id: "MusicPage",
		meta: { title: "MusicPage" },
		isNoAuth: true,
		component: "MusicPage",
	},
	RivePage: {
		id: "RivePage",
		meta: { title: "RivePage" },
		isNoAuth: true,
		component: "RivePage",
	},
};
