import { ItemType } from "antd/es/menu/hooks/useItems";
import { Suspense } from "react";
import { Route } from "react-router-dom";
import historyInstanse from "src/common/components/customRouter/historyInstance";
import {
	ROUTE_ID,
	ROUTE_INFO_CONFIG,
	ROUTE_NAME,
	ROUTE_STRUCT_CONFIG,
} from "src/config/routerConfig";
import type {
	ROUTE_ID_KEY,
	RouteItem,
	RoutesStructDataItem,
} from "src/config/types";
import { DynamicPageRender, pageList } from "src/pages";
import { reduxStore as store } from "..";

export type MenuItem = Partial<ItemType> &
	Partial<{
		key: string;
		children: MenuItem[];
	}>;

export class RouterHelper {
	static createDefaultRoutesConfig() {
		return Object.values(ROUTE_INFO_CONFIG)
			.filter((item) => {
				return item.isNoAuth;
			})
			.map((routeItem) => {
				return {
					...routeItem,
				};
			});
	}

	// 生成路由配置
	static createRouteConfigLoop = ({
		children,
		routesStuctData,
		prefix,
		routesConfigMap,
		routesPermissions,
	}: {
		children: any[];
		routesStuctData: RoutesStructDataItem[];
		prefix: string;
		routesConfigMap: {
			[key in ROUTE_ID_KEY]: RouteItem;
		};
		routesPermissions: string[];
	}) => {
		routesStuctData.forEach((routeStructItem) => {
			const { id } = routeStructItem;
			// 如果有权限或者是必须显示的，或者是管理员
			if (
				routesPermissions?.includes(id) ||
				routesConfigMap[id].isNoAuth
			) {
				const { component, ...rest } = routesConfigMap[id];
				const path = prefix + "/" + id;
				routesConfigMap[id].id = id as ROUTE_ID_KEY;
				routesConfigMap[id].path = path;

				let routesConfig: RouteItem = {
					...rest,
					path,
					id,
					component,
				};
				// 沿途记录，然后拼接成path
				children!.push(routesConfig);
				if (routeStructItem.children!?.length > 0) {
					routesConfig.children = this.createRouteConfigLoop({
						children: [],
						routesStuctData: routeStructItem.children!,
						prefix: routesConfig.path || "",
						routesPermissions,
						routesConfigMap,
					});
				}
			}
		});
		return children;
	};

	static createRoutesConfigByUserInfo = ({
		routesPermissions,
		routesConfigMap,
	}: {
		routesPermissions: string[];
		routesConfigMap: {
			[key in ROUTE_ID_KEY]: RouteItem;
		};
	}): {
		routesConfig: RouteItem[];
		routesConfigMap: {
			[key in ROUTE_ID_KEY]: RouteItem;
		};
	} => {
		// 初始化一个这个实体类
		// 每次执行，确保初始化，防止重新登录
		let homeChildren = ROUTE_STRUCT_CONFIG.find(
			(item) => item.id === ROUTE_ID.homePage,
		)!.children!;
		homeChildren.sort((a, b) => {
			return ROUTE_NAME[a.id] - ROUTE_NAME[b.id];
		});
		let routesConfig = [...RouterHelper.createDefaultRoutesConfig()];
		let targetId = routesConfig.findIndex((item) => {
			return item.id === ROUTE_ID.homePage;
		});
		routesConfig[targetId] = Object.assign({}, routesConfig[targetId], {
			children: RouterHelper.createRouteConfigLoop({
				children: [],
				routesStuctData: homeChildren,
				prefix: "/" + ROUTE_ID[ROUTE_ID.homePage],
				routesConfigMap,
				routesPermissions,
			}),
		});
		return {
			routesConfig: [...routesConfig],
			routesConfigMap: routesConfigMap,
		};
	};

	// 递归创建路由
	static toRenderRouteLoop = (item: RouteItem) => {
		const { children, component } = item;
		let routeChildren: JSX.Element[] = [];
		if (children) {
			routeChildren = children.map((item) => {
				return RouterHelper.toRenderRouteLoop(item);
			});
		}
		let element;
		if (!item.element) {
			if (component && component in pageList) {
				element = (
					<Suspense>
						<DynamicPageRender name={component} />
					</Suspense>
				);
			}
		}
		return (
			<Route
				children={routeChildren}
				key={item.id}
				path={item.path}
				element={item.element || element}
			></Route>
		);
	};

	// 生成路由配置根据权限
	// 每次登陆只会触发一次

	static getRoutePathByKey(key: string) {
		const routerStore = store.getState().routerStore;
		return routerStore.routesConfigMap[key]?.path;
	}

	static getRouteTitleByKey(key: string) {
		const routerStore = store.getState().routerStore;
		return routerStore.routesConfigMap[key]?.meta?.title;
	}

	static getRouteIdByPath(path: string) {
		const routerStore = store.getState().routerStore;
		return routerStore.routesConfigMap[path]?.id;
	}

	static getKeepAliveRoutePath() {
		return Object.values(ROUTE_INFO_CONFIG)
			.filter((item) => {
				return item.keepAlive;
			})
			.map((item) => {
				return item.id;
			});
	}

	static getHistory() {
		return historyInstanse;
	}

	static jumpTo(
		id: string,
		options?: {
			type: "replace" | "push";
			state?: any;
		},
	) {
		const { type = "push", state } = options || {};
		const path = this.getRoutePathByKey(id);
		if (!path) return new Error("路由不存在");
		if (type === "push") {
			historyInstanse!?.push(path, state);
		} else {
			historyInstanse!?.replace(path, state);
		}
	}

	static jumpToByPath(
		path: string,
		options?: {
			type: "replace" | "push";
			state?: any;
		},
	) {
		const { type = "push", state } = options || {};
		if (type === "push") {
			historyInstanse!?.push(path, state);
		} else {
			historyInstanse!?.replace(path, state);
		}
	}
}

const routerHelper = new RouterHelper();
export default routerHelper;
