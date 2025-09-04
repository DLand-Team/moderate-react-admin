import { ROUTE_ID_KEY, RouteItem } from "./types";

export const ROUTE_CONFIG_MAP: {
	[key in ROUTE_ID_KEY]: RouteItem;
} = {
	dashboard: {
		id: "dashboard",
		meta: { title: "common:HomePageTile" },
		actionPermissions: ["ADD", "EDIT"],
		isNoAuth: true,
		keepAlive: true,
		isTab: false,
	},
	login: {
		id: "login",
		isNoAuth: true,
		path: "/",
	},
	hello: {
		id: "hello",
		meta: {
			title: "common:HelloPageTile",
			icon: "FundProjectionScreenOutlined",
		},
		index: true,
		isNoAuth: true,
		keepAlive: true,
	},
	test: {
		id: "test",
		meta: {
			title: "common:HelloPageTile",
			icon: "FundProjectionScreenOutlined",
		},
		index: true,
		isNoAuth: true,
		keepAlive: true,
	},
};
