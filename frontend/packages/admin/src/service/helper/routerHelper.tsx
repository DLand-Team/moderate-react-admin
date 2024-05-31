import React, { Fragment, Suspense } from "react";
import { Route } from "react-router-dom";
import { includeOne, upFirstcharacter } from "src/common/utils";
import historyInstance from "src/components/customRouter/historyInstance";
import { pageList } from "src/pages";
import { ROUTE_ID } from "src/router/name";
import { ROUTE_CONFIG_MAP } from "src/router/routesConfig";
import { ROUTE_STRUCT_CONFIG } from "src/router/routesTree";
import {
	ROUTE_ID_KEY,
	RouteItem,
	RoutesStructDataItem,
} from "src/router/types";
import { reduxStore as store } from "..";
import RiveLoading from "plugins/moderate-plugin-rive/common/components/riveLoading";

export type MenuItem = {
	key: ROUTE_ID_KEY;
	children?: MenuItem[];
	icon?: React.ReactNode;
	label?: string;
};

export type TreeSelectItem = {
	value: string;
	title: string;
	children?: TreeSelectItem[];
};
const bindHistoryEvent = function (type: "pushState" | "replaceState") {
	const historyEvent = history[type];
	return function (...arg: any) {
		const newEvent = historyEvent.apply(history, arg); //执行history函数
		const e = new Event(type);
		window.dispatchEvent(e);
		return newEvent;
	};
};
history.pushState = bindHistoryEvent("pushState");
history.replaceState = bindHistoryEvent("replaceState");

export class RouterHelper {
	static createClientRoutesConfig() {
		return Object.values(ROUTE_CONFIG_MAP)
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
		routesStructData,
		prefix,
		routesConfigMap,
		routesPermissions,
		parentId,
	}: {
		children: any[];
		routesStructData: RoutesStructDataItem[];
		prefix: string;
		routesConfigMap: {
			[key in ROUTE_ID_KEY]: RouteItem;
		};
		routesPermissions: string[];
		parentId: ROUTE_ID_KEY;
	}) => {
		routesStructData.forEach((routeStructItem) => {
			const { id } = routeStructItem;
			const { depends, path: pathE, index } = routesConfigMap[id];
			// 如果有权限或者是必须显示的，或者是管理员
			if (
				routesPermissions?.includes(id) ||
				(depends && includeOne(routesPermissions, depends)) ||
				routesConfigMap[id].isNoAuth
			) {
				const { component, ...rest } = routesConfigMap[id];
				const path = index ? prefix : prefix + "/" + id;
				routesConfigMap[id].parentId = parentId;
				routesConfigMap[id].id = id;
				routesConfigMap[id].path = pathE
					? pathE === "*"
						? prefix + "/" + pathE
						: pathE
					: path;

				let routesConfig: RouteItem = {
					...rest,
					path: routesConfigMap[id].path,
					id,
					component,
					parentId: parentId,
				};
				// 沿途记录，然后拼接成path
				children!.push(routesConfig);
				if (routeStructItem.children!?.length > 0) {
					routesConfig.children = this.createRouteConfigLoop({
						children: [],
						routesStructData: routeStructItem.children!,
						prefix: routesConfigMap[id].path || "",
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
		routesTreeData: RouteItem[];
		routesMapData: {
			[key in ROUTE_ID_KEY]: RouteItem;
		};
	} => {
		let homeChildren = ROUTE_STRUCT_CONFIG.find(
			(item) => item.id === ROUTE_ID.HomePage,
		)!.children!;

		// 获取客户端显示的路由作为基础，再去融合后端动态配置权限菜单关联的路由
		let routesTreeData = [...RouterHelper.createClientRoutesConfig()];
		let targetId = routesTreeData.findIndex((item) => {
			return item.id === ROUTE_ID.HomePage;
		});
		routesTreeData[targetId] = Object.assign({}, routesTreeData[targetId], {
			children: RouterHelper.createRouteConfigLoop({
				children: [],
				routesStructData: homeChildren,
				prefix: "/" + ROUTE_ID[ROUTE_ID.HomePage],
				routesConfigMap,
				routesPermissions,
				parentId: ROUTE_ID.HomePage,
			}),
		});
		routesTreeData =
			routesTreeData.filter((item) => {
				return ROUTE_STRUCT_CONFIG.some((item2) => {
					return item2.id === item.id;
				});
			}) || [];
		return {
			routesTreeData,
			routesMapData: routesConfigMap,
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
				// 排除部分组件：发布环境上无需存在的路由组件
				const Comp = pageList[component] || Fragment;
				element = (
					<Suspense fallback={<RiveLoading />}>
						<Comp />
					</Suspense>
				);
			}
		}
		return (
			<Route
				children={index ? null : routeChildren}
				key={item.id}
				path={path || item.id}
				element={item.element || element}
				index={index}
				{...(rest as any)}
			></Route>
		);
	};

	// 生成路由配置根据权限
	// 每次登陆只会触发一次

	static getRoutePathByKey(key: ROUTE_ID_KEY) {
		const routerStore = store.getState().routerStore;
		let path = routerStore.routesMap[key]?.path;
		return path || "/" + key;
	}

	static getRouteParentIdByPath(path: string): ROUTE_ID_KEY {
		const id = this.getRouteIdByPath(path);
		const routerStore = store.getState().routerStore;
		return routerStore.routesMap[id]?.parentId as ROUTE_ID_KEY;
	}

	static getRouteTitleByKey(key: ROUTE_ID_KEY) {
		const routerStore = store.getState().routerStore;
		return routerStore.routesMap[upFirstcharacter(key) as ROUTE_ID_KEY]
			?.meta?.title;
	}

	static judeKeepAliveByPath(path: string) {
		const id = this.getRouteIdByPath(path);
		const { routesMap } = store.getState().routerStore;
		return routesMap[id]?.keepAlive;
	}

	static getKeepAliveRoutePath() {
		return Object.values(ROUTE_CONFIG_MAP)
			.filter((item) => {
				return item.keepAlive;
			})
			.map((item) => {
				return item.id;
			});
	}

	static getRoutItemConfigById(key: ROUTE_ID_KEY) {
		const routerStore = store.getState().routerStore;
		return routerStore.routesMap[key];
	}

	static getHistory() {
		return historyInstance;
	}

	static goBack() {
		historyInstance.back();
	}

	static jumpTo(
		id: ROUTE_ID_KEY,
		options?: {
			type?: "replace" | "push";
			state?: any;
			search?: Record<PropertyKey, any>;
		},
	) {
		const { type = "push", state, search } = options || {};
		const path = this.getRoutePathByKey(id);
		if (!path) {
			historyInstance!?.push("notFund", state);
			throw new Error("路由不存在");
		}
		let searchStr = "";
		if (search) {
			let arr = [];
			for (let i in search) {
				arr.push(`${i}=${search[i]}`);
			}
			searchStr = "?" + arr.join("&");
		}
		let targetPath = `${path}${searchStr}`;
		if (type === "push") {
			historyInstance!?.push(targetPath, state);
		} else {
			historyInstance!?.replace(targetPath, state);
		}
	}

	static getRouteIdByPath(path: string): ROUTE_ID_KEY {
		return path.split("/").slice(-1)[0] as ROUTE_ID_KEY;
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
			historyInstance!?.push(path, state);
		} else {
			historyInstance!?.replace(path, state);
		}
	}

	// 生成一个柱状选项根据路由tree
	static generateTreeSelectDataByRoutesTree() {
		let result: TreeSelectItem[] = [
			{
				value: "/",
				title: "root",
				children:
					this.generateTreeSelectDataByRoutesTreeLoop(
						ROUTE_STRUCT_CONFIG,
					),
			},
		];
		return result;
	}

	static generateTreeSelectDataByRoutesTreeLoop(
		routesTreeData: RoutesStructDataItem[],
		path: string = "/",
	) {
		let result: TreeSelectItem[] = [];
		routesTreeData.forEach((item) => {
			// value取的组件的页面文件夹的路径
			let obj: TreeSelectItem = {
				value: path + item.id,
				title: item.id,
			};
			if (item.children) {
				obj.children = this.generateTreeSelectDataByRoutesTreeLoop(
					item.children,
					path + item.id + "/",
				);
			}
			result.push(obj);
		});
		return result;
	}
}
