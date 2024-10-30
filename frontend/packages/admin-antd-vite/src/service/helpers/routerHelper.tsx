import { Fragment, Suspense, type JSX } from "react";
import { Route } from "react-router-dom";
import { throttle, includeOne, upFirstcharacter } from "src/common/utils";
import { pageList } from "src/pages";
import { historyInstance } from "src/providers/routerProvider/historyIns";
import {
	ROUTE_CONFIG_MAP,
	ROUTE_ID,
	ROUTE_ID_KEY,
	ROUTE_STRUCT_CONFIG,
	RouteItem,
	RoutesStructDataItem,
} from "src/router";
import type { TreeSelectItem } from "../stores/appStore/model";
import HelperBase from "./_helperBase";
import { ProgressFallback } from "src/components";

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

export class RouterHelper extends HelperBase {
	createClientRoutesConfig() {
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
	createRouteConfigLoop = ({
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
		routesPermissions: string[] | null;
		parentId: ROUTE_ID_KEY;
	}) => {
		routesStructData.forEach((routeStructItem) => {
			const { id } = routeStructItem;
			if (!(id in routesConfigMap)) {
				return;
			}
			const { depends, path: pathE, segment = "" } = routesConfigMap[id];
			// 如果有权限或者是必须显示的，或者是管理员
			if (
				!routesPermissions ||
				routesPermissions?.includes(id) ||
				(depends && includeOne(routesPermissions, depends)) ||
				routesConfigMap[id].isNoAuth
			) {
				const { component, ...rest } = routesConfigMap[id];
				const path = prefix + "/" + id + (segment ? "/" + segment : "");
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
					routesConfigMap[id].children = routesConfig.children;
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
	createRoutesConfigByPermissions = ({
		routesPermissions,
		routesConfigMap,
	}: {
		routesPermissions: string[] | null;
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
		let routesTreeData = [...this.createClientRoutesConfig()];
		let targetId = routesTreeData.findIndex((item) => {
			return item.id === ROUTE_ID.HomePage;
		});
		routesTreeData[targetId] = Object.assign(
			{ path: "/" + ROUTE_ID.HomePage },
			routesTreeData[targetId],
			{
				children: this.createRouteConfigLoop({
					children: [],
					routesStructData: homeChildren,
					prefix: "/" + ROUTE_ID[ROUTE_ID.HomePage],
					routesConfigMap,
					routesPermissions,
					parentId: ROUTE_ID.HomePage,
				}),
			},
		);
		routesConfigMap.HomePage = routesTreeData[targetId];
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
	toRenderRouteLoop = (item: RouteItem) => {
		const { children, component, path, index, ...rest } = item;
		let routeChildren: JSX.Element[] = [];
		if (children) {
			routeChildren = children.map((item) => {
				return this.toRenderRouteLoop(item);
			});
		}
		let element;
		if (!item.element) {
			if (component && component in pageList) {
				// 排除部分组件：发布环境上无需存在的路由组件
				const Comp = pageList[component] || Fragment;
				element = (
					<Suspense fallback={<ProgressFallback />}>
						<Comp />
					</Suspense>
				);
			}
		}
		return (
			<Route
				children={routeChildren}
				key={item.id}
				path={path || item.id}
				element={item.element || element}
				{...(rest as any)}
			></Route>
		);
	};

	// 生成路由配置根据权限
	// 每次登陆只会触发一次

	getRoutePathByKey(key: ROUTE_ID_KEY) {
		let path = this.routerStore.routesMap?.[key]?.path!?.replace(
			/\/:.+$/,
			"",
		);
		return path || "/" + key;
	}

	getRouteParentIdByPath(path: string): ROUTE_ID_KEY {
		const id = this.getRouteIdByPath(path);
		return this.routerStore.routesMap?.[id]?.parentId as ROUTE_ID_KEY;
	}

	getRouteTitleByKey(key: ROUTE_ID_KEY) {
		let value =
			this.routerStore.routesMap[key as ROUTE_ID_KEY] ||
			this.routerStore.routesMap[upFirstcharacter(key) as ROUTE_ID_KEY];
		return value?.meta?.title;
	}

	judeKeepAliveByPath(path: string) {
		const id = this.getRouteIdByPath(path);
		const { routesMap } = this.routerStore;
		return routesMap[id]?.keepAlive;
	}

	getKeepAliveRoutePath() {
		return Object.values(ROUTE_CONFIG_MAP)
			.filter((item) => {
				return item.keepAlive;
			})
			.map((item) => {
				return item.id;
			});
	}

	getRoutItemConfigById(key: ROUTE_ID_KEY) {
		return this.routerStore.routesMap[key];
	}

	// 根据路径获得路由数据
	getRoutItemConfigByPath(path: string) {
		const routerId = this.getRouteIdByPath(path);
		const routeConfigItem = this.getRoutItemConfigById(routerId);
		return routeConfigItem;
	}
	getIndexRouteByPath(path: string) {
		const routeConfigItem = this.getRoutItemConfigByPath(path);
		// 如果存在子路由，判断一波是否存在index的路由，存在则返回该index路由
		if (routeConfigItem?.children) {
			const indexRouteConfig = routeConfigItem.children.find((item) => {
				return item.index;
			});
			if (indexRouteConfig) {
				return indexRouteConfig;
			}
		}
		return null;
	}

	getHistory() {
		return historyInstance;
	}
	jumpToIndexChild(id: ROUTE_ID_KEY): boolean {
		const routeConfigItem = this.getRoutItemConfigById(id as ROUTE_ID_KEY);

		const { children, component } = routeConfigItem || {};
		if (children?.length) {
			let targetIndex = children?.findIndex((item) => {
				return item.index;
			});
			if (targetIndex == -1) {
				if (!component) {
					return this.jumpToIndexChild(children?.[0].id!);
				}
			} else {
				return this.jumpToIndexChild(children?.[targetIndex].id!);
			}
		} else {
			this.jumpTo(id);
		}
		return false;
	}
	getIndexRoute(id: ROUTE_ID_KEY) {
		const routeConfigItem = this.getRoutItemConfigById(id as ROUTE_ID_KEY);

		const { children } = routeConfigItem || {};

		if (children?.length) {
			let targetIndex = children?.findIndex((item) => {
				return item.index;
			});
			return children?.[targetIndex == -1 ? 0 : targetIndex];
		}
		return null;
	}

	goBack() {
		historyInstance.back();
	}

	jumpTo = throttle(
		(
			id: ROUTE_ID_KEY,
			options?: {
				type?: "replace" | "push";
				state?: any;
				search?: Record<PropertyKey, any>;
				params?: string;
			},
		) => {
			const { type = "push", state, search, params = "" } = options || {};
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
			let targetPath =
				`${path}${searchStr}` + (params ? "/" + params : "");
			if (type === "push") {
				historyInstance!?.push(targetPath, state);
			} else {
				historyInstance!?.replace(targetPath, state);
			}
		},
		200,
	);

	getRouteIdByPath(path: string): ROUTE_ID_KEY {
		return Object.values(this.routerStore.routesMap).find((item) => {
			if (item.segment) {
				return item.path?.includes(path.replace(/\/[^\/]+$/, ""));
			}
			return item.path == path;
		})?.id!;
	}

	jumpToByPath = throttle(
		(
			path: string,
			options?: {
				type: "replace" | "push";
				state?: any;
			},
		) => {
			const { type = "push", state } = options || {};
			if (type === "push") {
				historyInstance!?.push(path, state);
			} else {
				historyInstance!?.replace(path, state);
			}
		},
		200,
	);

	// 生成一个柱状选项根据路由tree
	generateTreeSelectDataByRoutesTree() {
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

	generateTreeSelectDataByRoutesTreeLoop(
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
