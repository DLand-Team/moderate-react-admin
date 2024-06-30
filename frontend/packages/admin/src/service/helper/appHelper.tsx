import { cloneDeep } from "lodash-es";
import { ReactNode } from "react";
import { UUID } from "src/common/utils";
import i18n from "src/i18n";
import { pageList } from "src/pages";
import { ROUTE_ID, ROUTE_NAME } from "src/router/name";
import { ROUTE_STRUCT_CONFIG } from "src/router/routesTree";
import {
	ROUTE_ID_KEY,
	RouteItem,
	RoutesStructDataItem,
} from "src/router/types";
import { MenuItem, RouterHelper } from "src/service";
import GlobalVar from "src/static/globalVar";
import iconMap, { MenuIconType } from "src/static/iconMap";
import { dp, reduxStore } from "..";
import { MenuPermissionItem } from "../stores/authStore/model";

export class AppHelper {
	static createMenuData(
		data: MenuPermissionItem[],
		perimissionList: string[],
	) {
		let result: MenuItem[] = [];
		// 创建服务端权限配置的菜单信息
		const { menuData = [] } = data
			? AppHelper.createMenuDataLoopByPermissions(data, [])
			: {};
		result = result.concat(menuData);
		const { routesMap } = reduxStore.getState().routerStore;
		// 创建客户端权限配置的菜单信息
		if (Object.values(routesMap).length) {
			const temp = ROUTE_STRUCT_CONFIG.find((item) => {
				return item.id === ROUTE_ID.HomePage;
			});
			if (temp?.children?.length) {
				const { menuData } =
					AppHelper.createMenuDataLoopByPermissionsNew(
						temp?.children,
						perimissionList,
						[],
					);
				result = result.concat(menuData);
			}
		}
		this.sortLoop(result);
		result.sort((a, b) => {
			return ROUTE_NAME[a.key] - ROUTE_NAME[b.key];
		});
		return result;
	}

	static sortLoop = (result: MenuItem[]) => {
		result.sort((a, b) => {
			return ROUTE_NAME[a.key] - ROUTE_NAME[b.key];
		});
		result.forEach((item) => {
			if (item.children?.length) {
				this.sortLoop(item.children);
			}
		});
	};

	/**
	 * @description: 递归生成菜单根据后端权限 “服务端权限控制专属“
	 * @param {MenuPermissionItem} data
	 * @param {MenuItem} result
	 */
	static createMenuDataLoopByPermissions = (
		data: MenuPermissionItem[],
		result: MenuItem[],
	) => {
		data.forEach((item) => {
			// 通过后端配置的权限，找到对应的前端配置数据
			// 获取相关信息：图标，国际化等信息
			const configItem = RouterHelper.getRoutItemConfigById(
				item.componentName,
			);
			if (!configItem) return;
			const temp: MenuItem = {
				key: item.componentName,
				label: configItem.meta?.title || "",
				icon: configItem.meta?.icon,
			};
			result.push(temp);
			if (item?.children?.length) {
				temp.children = this.createMenuDataLoopByPermissions(
					item.children,
					[],
				).menuData;
			}
		});
		return { menuData: result };
	};

	static createMenuDataLoopByPermissionsNew = (
		data: RoutesStructDataItem[],
		permissions: string[],
		result: MenuItem[],
	) => {
		data.forEach((item) => {
			// 通过后端配置的权限，找到对应的前端配置数据
			// 获取相关信息：图标，国际化等信息
			const configItem = RouterHelper.getRoutItemConfigById(item.id);
			const { isMenu = true, isNoAuth } = configItem;
			if (!configItem || !isMenu) return;
			if (!isNoAuth) return;
			if (permissions.includes(item.id)) {
				return;
			}

			const temp: MenuItem = {
				key: item.id,
				label: configItem.meta?.title || "",
				icon: configItem.meta?.icon,
			};
			result.push(temp);
			if (item?.children?.length) {
				const menuChildren = this.createMenuDataLoopByPermissionsNew(
					item.children,
					permissions,
					[],
				).menuData;
				if (menuChildren.length) {
					temp.children = menuChildren;
				}
			}
		});
		return { menuData: result };
	};

	/**
	 * @description: 递归生成菜单数据 “客户端权限控制专属”
	 * @param {RouteItem} data
	 * @param {MenuItem} result
	 */
	static createMenuDataLoop = (
		data: RouteItem[],
		result: MenuItem[],
		permissionList: string[] = [],
	) => {
		data.forEach((item) => {
			const {
				isNotRoute,
				isPublish = true,
				isMenu = true,
				isNoAuth,
				component,
			} = item;

			if (!isPublish && process.env.NODE_ENV == "production") {
				return;
			}
			// 不是menu，排除
			// 不是客户端鉴权，排除
			// 如果是路由，但是组件却没注册，排除
			if (
				!isMenu ||
				!isNoAuth ||
				(!isNotRoute && !(component! in pageList))
			) {
				return;
			}
			if (permissionList.includes(item.id as string)) {
				return;
			}
			const temp: MenuItem = {
				key: item.id!,
				icon: item.meta?.icon,
				label: item.meta!?.title! || "",
			};
			result.push(temp);
			if (item?.children?.length) {
				const children = this.createMenuDataLoop(
					item.children,
					[],
					permissionList,
				);
				if (children.length) {
					temp.children = children;
				}
			}
		});
		result.sort((a, b) => {
			return ROUTE_NAME[a.key] - ROUTE_NAME[b.key];
		});
		return result;
	};

	static getMenuConfigByPathName(pathName: string) {
		const selectedKeysTemp = pathName.split("/").filter((item) => {
			return item;
		});
		const openKeysTemp = selectedKeysTemp.slice(1, -1);
		return {
			selectedKeys:
				selectedKeysTemp.length > 1
					? selectedKeysTemp.slice(1)
					: selectedKeysTemp,
			openKeys: openKeysTemp.length ? openKeysTemp : [],
			newTabItem: location,
		};
	}

	// 根据菜单数据（纯原始类型），转换为适用于antd，包含element的完整结构
	// 为啥转？因为redux内部不可以直接存element类型的数据
	// 该loop主要是补全icon
	static transMenuForAntdLoop(data: MenuItem[]) {
		const result: MenuItem[] = cloneDeep(data);
		result.forEach((item) => {
			if (item.label) {
				item.label = i18n.t(item.label);
			}
			if (item.icon) {
				const IconNode = iconMap[item.icon as MenuIconType];
				item.icon = <IconNode />;
			}
			if (item.children?.length) {
				item.children = this.transMenuForAntdLoop(item.children);
			}
		});
		return result;
	}

	static closeTabByPath({ pathName }: { pathName?: string } = {}) {
		if (!pathName) {
			pathName = location.pathname;
		}
		const { tabItems, activeTabKey } = reduxStore.getState().appStore;
		const routeId = RouterHelper.getRouteIdByPath(activeTabKey);
		const routeItemData = RouterHelper.getRoutItemConfigById(
			routeId as ROUTE_ID_KEY,
		);
		if (tabItems.length > 1 || routeItemData.depends) {
			dp("appStore", "deleteTabHistoryAct", {
				pathName,
			});
			if (activeTabKey == pathName) {
				if (routeItemData.depends) {
					RouterHelper.jumpTo(routeItemData.parentId as ROUTE_ID_KEY);
				} else {
					const item = tabItems.find((item) => {
						return item.key !== pathName;
					});
					item && RouterHelper.jumpToByPath(item?.key);
				}
			}
		}
	}
	static closeOtherTabByPath({ pathName }: { pathName?: string } = {}) {
		const { tabItems, activeTabKey } = reduxStore.getState().appStore;
		if (pathName && activeTabKey !== pathName) {
			RouterHelper.jumpToByPath(pathName);
		}
		const item = tabItems.find((item) => {
			return item.key == pathName;
		});
		item && dp("appStore", "setTabItems", [item]);
	}
	static closeRightTabByPath({ pathName }: { pathName?: string } = {}) {
		const { tabItems, activeTabKey } = reduxStore.getState().appStore;
		const targetIndex = tabItems.findIndex((item) => {
			return item.key == pathName;
		});
		if (
			pathName &&
			tabItems.slice(targetIndex).some((item) => {
				return item.key === activeTabKey;
			})
		) {
			RouterHelper.jumpToByPath(pathName);
		}
		dp("appStore", "setTabItems", tabItems.slice(0, targetIndex + 1));
	}
	static createApp(
		providerList: (
			| ((props: { children?: ReactNode }) => JSX.Element)
			| (({ ...props }: { [x: string]: any }) => JSX.Element)
		)[],
	) {
		return this.providerLoop(providerList);
	}

	static providerLoop(
		providerList: (
			| ((props: { children?: ReactNode }) => JSX.Element)
			| (({ ...props }: { [x: string]: any }) => JSX.Element)
		)[],
		i = 0,
	) {
		if (i === providerList.length) {
			return;
		}
		const Pv = providerList[i];
		return <Pv key={i}>{this.providerLoop(providerList, i + 1)}</Pv>;
	}

	static addWinbox({
		content,
		pos = { x: 0, y: 0 },
		title = "",
		type = "",
	}: {
		content: ReactNode;
		pos?: { x: number; y: number };
		title?: string;
		type?: string;
	}) {
		const winBoxContent = GlobalVar.service.get("winBoxContent");
		const id = UUID();
		winBoxContent?.set(id, content);
		dp("appStore", "addWinBox", { id: id, pos, title, type });
	}

	static saveKeepAliveComponent({ comp, id }: { comp: any; id: string }) {
		const keepAliveContent = GlobalVar.service.get("keepAliveComp");
		keepAliveContent?.set(id, comp);
	}

	static isHasKeepAliveComponent({ id }: { id: string }) {
		const keepAliveContent = GlobalVar.service.get("keepAliveComp");
		return !!keepAliveContent?.get(id);
	}

	static getKeepAliveComponentList() {
		const keepAliveContent = GlobalVar.service.get("keepAliveComp");
		return keepAliveContent!;
	}

	static getKeepAliveComponentById({ id }: { id: string }) {
		const keepAliveContent = GlobalVar.service.get("keepAliveComp");
		return keepAliveContent!.get(id);
	}
}
