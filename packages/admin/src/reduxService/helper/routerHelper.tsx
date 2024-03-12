import historyInstanse from "@/common/components/customRouter/historyInstance";
import {
	ROUTE_ID,
	ROUTE_INFO_CONFIG,
	ROUTE_NAME,
	ROUTE_STRUCT_CONFIG,
} from "@/config/routerConfig";
import type {
	ROUTE_ID_KEY,
	RouteItem,
	RoutesStructDataItem,
} from "@/config/types";
import { DynamicPageRender, pageList } from "@/pages";
import { UserOutlined } from "@ant-design/icons";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { BrowserHistory } from "history";
import { cloneDeep } from "lodash-es";
import { Suspense, createElement } from "react";
import { Route } from "react-router-dom";
import { dp, reduxStore as store } from "..";

type MenuItem = ItemType &
	Partial<{
		key: string;
		children: MenuItem[];
	}>;
export class RouterHelper {
	history: BrowserHistory = historyInstanse;
	routesConfigMapCopy = cloneDeep(ROUTE_INFO_CONFIG);
	// 递归生成菜单数据
	generateMenuDataLoop = (data: RouteItem[], result: MenuItem[]) => {
		data.forEach((item) => {
			const { isMenu = true } = item;
			if (!isMenu) {
				return;
			}
			const temp: MenuItem = {
				key: item.id,
				// icon: createElement(UserOutlined),
				label: item.meta.title,
			};
			result.push(temp);
			if (item?.children?.length) {
				temp.children = this.generateMenuDataLoop(item.children, []);
			}
		});
		return result;
	};

	// 递归创建路由
	toRenderRouteLoop = (item: RouteItem) => {
		const { children, component } = item;
		let routeChildren = [];
		if (children) {
			routeChildren = children.map((item) => {
				return this.toRenderRouteLoop(item);
			});
		}
		let element;
		if (!item.element) {
			const Page = pageList[component];
			if (Page) {
				;
				element = (
					<Suspense>
						<DynamicPageRender name={component} />
					</Suspense>
				);
			}
		}
		;
		return (
			<Route
				children={routeChildren}
				key={item.path}
				path={item.path}
				element={item.element || element}
			></Route>
		);
	};

	static createDefaultRoutesConfig() {
		return Object.values(ROUTE_INFO_CONFIG)
			.filter((item) => {
				return item.isDefault;
			})
			.map((routeItem) => {
				return {
					...routeItem,
				};
			});
	}

	// 生成路由配置
	createRouteConfigLoop = (
		children: any[],
		routesStuctData: RoutesStructDataItem[],
		prefix: string,
	) => {
		routesStuctData.forEach((routeStructItem) => {
			const authStore = store.getState().authStore;
			const { id, isMustShow } = routeStructItem;
			// 如果有权限或者是必须显示的，或者是管理员
			if (
				authStore.isAdmin ||
				authStore.permissions?.includes(id) ||
				isMustShow
			) {
				const { component, ...rest } = this.routesConfigMapCopy[id];

				const path = prefix + "/" + id;
				this.routesConfigMapCopy[id].id = id as ROUTE_ID_KEY;
				this.routesConfigMapCopy[id].path = path;

				let routesConfig: RouteItem = {
					...rest,
					path,
					id,
					component,
				};

				// 沿途记录，然后拼接成path

				children!.push(routesConfig);
				if (routeStructItem.children!?.length > 0) {
					routesConfig.children = this.createRouteConfigLoop(
						[],
						routeStructItem.children!,
						routesConfig.path,
					);
				}
			}
		});
		return children;
	};

	// 生成路由配置根据权限
	createRoutesConfigByUserInfo = (): {
		routesConfig: RouteItem[];
		routesConfigMap: {
			[key in ROUTE_ID_KEY]: RouteItem;
		};
	} => {
		const routerStore = store.getState().routerStore;
		let homeChildren = ROUTE_STRUCT_CONFIG.find(
			(item) => item.id === ROUTE_ID.homePage,
		)!.children!;
		homeChildren.sort((a, b) => {
			return ROUTE_NAME[a.id] - ROUTE_NAME[b.id];
		});
		let routesConfig = [...routerStore.routesConfig];
		let targetId = routesConfig.findIndex((item) => {
			return item.id === ROUTE_ID.homePage;
		});
		routesConfig[targetId] = Object.assign({}, routesConfig[targetId], {
			children: this.createRouteConfigLoop([], homeChildren, "/homePage"),
		});
		;
		return {
			routesConfig: [...routesConfig],
			routesConfigMap: this.routesConfigMapCopy,
		};
	};

	getRoutePathByKey(key: string) {
		const routerStore = store.getState().routerStore;
		return routerStore.routesConfigMap[key]?.path;
	}

	getRouteTitleByKey(key: string) {
		const routerStore = store.getState().routerStore;
		return routerStore.routesConfigMap[key]?.meta?.title;
	}

	getRouteIdByPath(path: string) {
		const routerStore = store.getState().routerStore;
		return routerStore.routesConfigMap[path]?.id;
	}

	getKeepAliveRoutePath() {
		return Object.values(ROUTE_INFO_CONFIG)
			.filter((item) => {
				return item.keepAlive;
			})
			.map((item) => {
				return item.id;
			});
	}

	getHistory() {
		return this.history;
	}

	jumpTo(
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
			this.history.push(path, state);
		} else {
			this.history.replace(path, state);
		}
	}

	jumpToByPath(
		path: string,
		options?: {
			type: "replace" | "push";
			state?: any;
		},
	) {
		const { type = "push", state } = options || {};
		if (type === "push") {
			this.history.push(path, state);
		} else {
			this.history.replace(path, state);
		}
	}
}

const routerHelper = new RouterHelper();
export default routerHelper;
