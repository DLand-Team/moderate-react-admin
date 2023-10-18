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
import { pageList } from "@/pages";
import { store } from "@/services";
import { UserOutlined } from "@ant-design/icons";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { BrowserHistory } from "history";
import { cloneDeep } from "lodash-es";
import { Suspense, createElement } from "react";
import { Route } from "react-router-dom";

type MenuItem = ItemType &
	Partial<{
		key: string;
		children: MenuItem[];
	}>;
class RouterHelper {
	history: BrowserHistory;
	routesConfigMapTemp = cloneDeep(ROUTE_INFO_CONFIG);
	constructor() {
		this.init();
	}

	createRouteItem = (routeItem: RouteItem) => {
		const { component } = routeItem;
		const Page = pageList[component];
		return {
			...routeItem,
			element: (
				<Suspense>
					<Page></Page>
				</Suspense>
			),
		};
	};

	// 生成路由配置
	createRouteConfigLoop = (
		children: any[],
		routesStuctData: RoutesStructDataItem[],
		prefix: string,
	) => {
		routesStuctData.forEach((routeStructItem) => {
			const { id, isMustShow } = routeStructItem;
			// 如果有权限或者是必须显示的，或者是管理员
			if (
				store
					.getModule("userInfoStore")
					.state.permissions.includes(id) ||
				store
					.getModule("routerStore")
					.state.defaultPermissions.includes(id) ||
				isMustShow ||
				store.getModule("userInfoStore").state.isAdmin
			) {
				const { component, ...rest } = this.routesConfigMapTemp[id];
				const Page = pageList[component];
				const path = prefix + "/" + id;
				this.routesConfigMapTemp[id].id = id as ROUTE_ID_KEY;
				this.routesConfigMapTemp[id].path = path;

				let routeData: RouteItem = {
					...rest,
					path,
					id,
				};

				// 沿途记录，然后拼接成path
				if (Page) {
					routeData.element = (
						<Suspense>
							<Page />
						</Suspense>
					);
				}
				children!.push(routeData);
				if (routeStructItem.children!?.length > 0) {
					routeData.children = this.createRouteConfigLoop(
						[],
						routeStructItem.children!,
						routeData.path,
					);
				}
			}
		});
		return children;
	};

	// 生成路由配置根据权限
	createRoutesConfigByUserInfo = (): RouteItem[] => {
		this.init();
		let homeChildren = ROUTE_STRUCT_CONFIG.find(
			(item) => item.id === ROUTE_ID.homePage,
		)!.children!;
		homeChildren.sort((a, b) => {
			return ROUTE_NAME[a.id] - ROUTE_NAME[b.id];
		});
		let routeData = [...store.getModule("routerStore").state.routesData];
		let targetId = routeData.findIndex((item) => {
			return item.id === ROUTE_ID.homePage;
		});
		routeData[targetId] = Object.assign({}, routeData[targetId], {
			children: this.createRouteConfigLoop([], homeChildren, "/homePage"),
		});
		store
			.getModule("routerStore")
			.actions.setRoutesConfigMap(this.routesConfigMapTemp);
		return [...routeData];
	};

	getRoutePathByKey(key: string) {
		return store.getModule("routerStore").state.routesConfigMap[key]?.path;
	}
	getRouteTitleByKey(key: string) {
		return store.getModule("routerStore").state.routesConfigMap[key]?.meta
			?.title;
	}
	getRouteIdByPath(path: string) {
		return store.getModule("routerStore").state.routesConfigMap[path]?.id;
	}
	getKeepAliveRoutePath() {
		return Object.values(ROUTE_INFO_CONFIG).filter((item)=>{
				return item.keepAlive
			}).map((item) => {
				return item.id;
			});
	}
	createDefaultRoutesConfig(defaultRouteKeys) {
		return defaultRouteKeys.map((item: ROUTE_ID_KEY) => {
			let routeItem = ROUTE_INFO_CONFIG[item];
			const { component } = routeItem;
			const Page = pageList[component];
			return {
				...routeItem,
				element: (
					<Suspense>
						<Page></Page>
					</Suspense>
				),
			};
		});
	}
	getRoutesDefalutData() {
		return store.getModule("routerStore").state.defaultRoutesData;
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
		if(!path) return new Error("路由不存在")
		if (type === "push") {
			this.history.push(path, state);
		} else {
			this.history.replace(path, state);
		}
	}
	init() {
		this.history = historyInstanse;
		this.routesConfigMapTemp = cloneDeep(ROUTE_INFO_CONFIG);
	}
	// 递归生成菜单数据
	generateMenuDataLoop = (data: RouteItem[], result: MenuItem[]) => {
		data.forEach((item) => {
			const { isMenu = true } = item;
			if (!isMenu) {
				return;
			}
			const temp: MenuItem = {
				key: item.id,
				icon: createElement(UserOutlined),
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
		const { children } = item;
		let routeChildren = [];
		if (children) {
			routeChildren = children.map((item) => {
				return this.toRenderRouteLoop(item);
			});
		}
		return (
			<Route
				children={routeChildren}
				key={item.path}
				path={item.path}
				element={item.element}
			></Route>
		);
	};
}

const routerHelper = new RouterHelper();
export default routerHelper;
