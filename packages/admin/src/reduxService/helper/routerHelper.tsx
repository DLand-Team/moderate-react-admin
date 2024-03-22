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
import { includeOne } from "src/common/utils";

export type MenuItem = Partial<ItemType> & {
	key: ROUTE_ID_KEY;
	children?: MenuItem[];
};

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
		parentId,
	}: {
		children: any[];
		routesStuctData: RoutesStructDataItem[];
		prefix: string;
		routesConfigMap: {
			[key in ROUTE_ID_KEY]: RouteItem;
		};
		routesPermissions: string[];
		parentId: string;
	}) => {
		routesStuctData.forEach((routeStructItem) => {
			const { id } = routeStructItem;
			const { depands, path: pathE } = routesConfigMap[id];
			// 如果有权限或者是必须显示的，或者是管理员
			if (
				routesPermissions?.includes(id) ||
				(depands && includeOne(routesPermissions, depands)) ||
				routesConfigMap[id].isNoAuth
			) {
				const { component, ...rest } = routesConfigMap[id];
				const path = prefix + "/" + id;
				routesConfigMap[id].parentId = parentId as ROUTE_ID_KEY;
				routesConfigMap[id].id = id as ROUTE_ID_KEY;
				routesConfigMap[id].path = pathE || path;
				let routesConfig: RouteItem = {
					...rest,
					path: pathE || path,
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
						parentId: id,
					});
				}
			}
		});
		return children;
	};

	/**
	 * @description: 创建路由配置数据（根据路由权限）
	 * @param {MenuPermissionItem} data 若依后台的菜单权限数组
	 * @return {*} 适用于antd的菜单组件数据
	 */
	static createRoutesConfigByPermissions = ({
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
				parentId: ROUTE_ID.homePage,
			}),
		});
		return {
			routesConfig: [...routesConfig],
			routesConfigMap: routesConfigMap,
		};
	};

	// 递归创建路由
	static toRenderRouteLoop = (item: RouteItem) => {
		const { children, component, path, index, ...rest } = item;
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
				// index是官方的配置项https://reactrouter.com/en/main/route/route#index
				// 这句话很神奇的，当配置了index了之后，那么他便没有了path，父组件路由是啥就会路由到这个子组件
				path={index ? "" : path}
				element={item.element || element}
				{...(rest as any)}
			></Route>
		);
	};

	// 生成路由配置根据权限
	// 每次登陆只会触发一次

	static getRoutePathByKey(key: ROUTE_ID_KEY) {
		const routerStore = store.getState().routerStore;
		return routerStore.routesConfigMap[key]?.path;
	}

	static getRouteTitleByKey(key: ROUTE_ID_KEY) {
		const routerStore = store.getState().routerStore;
		return routerStore.routesConfigMap[key]?.meta?.title;
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

	static getRoutItemConfigById(key: ROUTE_ID_KEY) {
		const routerStore = store.getState().routerStore;
		return routerStore.routesConfigMap[key];
	}

	static getHistory() {
		return historyInstanse;
	}

	static jumpTo(
		id: ROUTE_ID_KEY,
		options?: {
			type: "replace" | "push";
			state?: any;
		},
	) {
		const { type = "push", state } = options || {};
		const path = this.getRoutePathByKey(id);
		if (!path) {
			historyInstanse!?.push("notFund", state);
			throw new Error("路由不存在");
		}

		if (type === "push") {
			historyInstanse!?.push(path, state);
		} else {
			historyInstanse!?.replace(path, state);
		}
	}

	static getRouteIdByPath(path: string) {
		return path.split("/").slice(-1)[0];
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
