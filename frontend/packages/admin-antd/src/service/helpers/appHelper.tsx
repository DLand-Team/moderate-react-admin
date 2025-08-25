import { ReactNode, type JSX } from "react";
import { UUID, cloneDeep } from "src/common/utils";
import i18n from "src/i18n";
import {
	ROUTE_CONFIG_MAP,
	ROUTE_ID_KEY,
	ROUTE_NAME,
	RouteItem,
} from "src/router";
import { globalVar, menuIconMap, type MenuIconType } from "src/static";
import { type MenuItem } from "../stores/appStore/model";
import {
	MenuItemData,
	type MenuPermissionItem,
} from "../stores/authStore/model";
import { type RoutesConfigMap } from "../stores/routerStore/model";
import HelperBase from "./_helperBase";

// 创建菜单的流程
// 默认路由，也就是没得到任何的权限数据，前端页面自主控制，为路由创建菜单

// 获取权限接口，得到菜单权限，tree状的 => 最好就是将tree状的数据平铺，方便接下来的业务使用
// 然后直接根据菜单权限渲染菜单

// 然后根据菜单权限，获得路由权限
// 进而根据路由权限，分析得出前端自控的菜单，对现有的服务端菜单进行补充

export class AppHelper extends HelperBase {
	createMenuData(params: {
		menuPermissions?: MenuPermissionItem | null;
		routesPermissions?: string[];
		routesMap?: RoutesConfigMap;
		routesTree?: RouteItem[];
		menuListData?: MenuItemData[] | null;
		menuTreeData?: MenuItemData[] | null;
	}) {
		let {
			menuListData = [],
			menuPermissions,
			routesMap,
			routesTree = [],
		} = params;
		// 初始化阶段， routesMap和routesTree还没根据权限初始化好，那么就调用RouterHelper获取默认值
		if (!routesMap) {
			const {
				routesMapData: routesMapDataTemp,
				routesTreeData: routesTreeDataTemp = [],
			} = this.routerHelper.createRoutesConfigByPermissions?.({
				routesPermissions: [],
				routesConfigMap: cloneDeep(ROUTE_CONFIG_MAP),
			});
			routesMap = routesMapDataTemp;
			routesTree = routesTreeDataTemp;
		}
		let result: MenuItem[] = [];
		// 创建服务端权限配置的菜单信息
		const { menuData = [] } = menuPermissions
			? this.createMenuDataLoopByServer(menuPermissions.children, [])
			: {};
		this.createMenuDataLoopEx({
			result: menuData,
			menuListData: menuListData!,
			routesMap,
			routesTree,
		});
		result = result.concat(menuData);
		this.sortLoop(result);
		return result;
	}

	createMenuDataLoopEx(params: {
		result: MenuItem[];
		menuListData: MenuItemData[];
		routesMap?: RoutesConfigMap;
		routesTree?: RouteItem[];
	}) {
		const { result, routesMap, menuListData } = params;
		// 根据服务端菜单结构作为主体，将前端路由进行补充
		// 补充的逻辑就是，根据服务端的权限，一个一个在路由中去找，找没有在服务端权限注册的子节点
		// 如果找到了子节点，就把子节点的菜单，放在服务菜单tree主体中
		const root: MenuItem = {
			key: "HomePage",
			children: result,
		};
		// 找到了客户端补充的子节点，那么
		const clientChildLoop = (severMenuItem: MenuItem) => {
			let clientMenuChildren = [];
			for (let key in routesMap) {
				const clientMenuItem = routesMap[key as ROUTE_ID_KEY];
				const { isMenu = true, isNoAuth } = clientMenuItem;
				const isRegisterServer = !!menuListData.find((item) => {
					return item.componentName == key;
				});
				if (!isMenu || !isNoAuth) {
					continue;
				}
				if (
					clientMenuItem.parentId == severMenuItem.key &&
					!isRegisterServer
				) {
					clientMenuChildren.push(clientMenuItem);
					const newItem = {
						key: clientMenuItem.id!,
						label: clientMenuItem.meta?.title,
					};
					if (!severMenuItem.children) {
						severMenuItem.children = [];
					}
					// 找子节点，并且是没有在服务端注册的子节点
					severMenuItem.children?.push(newItem);
				}
			}
			severMenuItem.children?.forEach(clientChildLoop);
		};
		clientChildLoop(root);
	}

	sortLoop = (result: MenuItem[]) => {
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
	createMenuDataLoopByServer = (
		data: MenuPermissionItem[],
		result: MenuItem[],
	) => {
		data.forEach((item) => {
			// 通过后端配置的权限，找到对应的前端配置数据
			// 获取相关信息：图标，国际化等信息
			const configItem = this.routerHelper.getRoutItemConfigById?.(
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
				temp.children = this.createMenuDataLoopByServer(
					item.children,
					[],
				).menuData;
			}
		});
		return { menuData: result };
	};

	// 根据pathname获得路由配置数据，拿到路由配置数据中的标识id，再到菜单列表中找，找不到，就说明没在后端注册权限，那就往上找，看看有没有依赖的主体路由，循环找，直到root
	getMenuConfigByPathNameEx(pathName: string, menuList: MenuItemData[]) {
		const selectedKeys: any[] = [];
		const openKeys: any[] = [];
		// 判断是否在后端权限系统中注册
		// 如果注册了，那么获得他的parentid，然后找父节点的menu，进而获得其componetName，然后继续下一循环
		// 如果没注册，那就找这个节点的依赖节点，如果存在就针对节点进行循环
		const routeDataItem =
			this.routerHelper.getRoutItemConfigByPath(pathName);
		if (routeDataItem) {
			const loop = (routeDataItem: RouteItem) => {
				const menuDataItem = menuList.find((item) => {
					return item.componentName == routeDataItem?.id;
				});
				selectedKeys.push(routeDataItem.id);
				openKeys.push(routeDataItem.id);
				if (!menuDataItem) {
					if (routeDataItem.depends?.length) {
						const parentRouteDataItem =
							this.routerHelper.getRoutItemConfigById(
								routeDataItem.depends[0],
							);
						loop(parentRouteDataItem);
					} else if (routeDataItem.parentId) {
						const parentRouteDataItem =
							this.routerHelper.getRoutItemConfigById(
								routeDataItem.parentId,
							);
						loop(parentRouteDataItem);
					}
				} else {
					const { parentId } = menuDataItem;
					const parentMenuItem = menuList.find((item) => {
						return item.id == parentId;
					});
					if (parentMenuItem) {
						const { componentName } = parentMenuItem;
						const parentRouteDataItem =
							this.routerHelper.getRoutItemConfigById(
								componentName as ROUTE_ID_KEY,
							);
						parentRouteDataItem && loop(parentRouteDataItem);
					}
				}
			};
			loop(routeDataItem);
		}

		return {
			selectedKeys,
			openKeys,
		};
	}

	// // 根据路由数据来的，如果不存在后端控制菜单，那就可以完全使用这个
	// getMenuConfigByPathName(pathName: string) {
	// 	const selectedKeysTemp = pathName.split("/").filter((item) => {
	// 		return item;
	// 	});
	// 	const openKeysTemp = selectedKeysTemp.slice(1, -1);
	// 	const selectedKeys =
	// 		selectedKeysTemp.length > 1
	// 			? selectedKeysTemp.slice(1)
	// 			: selectedKeysTemp;
	// 	const { routesMap } = this.routerStore;
	// 	selectedKeys.forEach((selectKey) => {
	// 		for (let key in routesMap) {
	// 			const item = routesMap[key as keyof typeof routesMap];
	// 			// 判断一下，
	// 			if (
	// 				item.path == pathName &&
	// 				item.parentId == selectKey &&
	// 				item.index
	// 			) {
	// 				selectedKeys.push(item.id!);
	// 				openKeysTemp.push(item.parentId);
	// 			}
	// 		}
	// 	});
	// 	return {
	// 		selectedKeys,
	// 		openKeys: openKeysTemp.length ? openKeysTemp : [],
	// 		newTabItem: location,
	// 	};
	// }

	// 根据菜单数据（纯原始类型），转换为适用于antd，包含element的完整结构
	// 为啥转？因为redux内部不可以直接存element类型的数据
	// 该loop主要是补全icon
	transMenuForAntdLoop(data: MenuItem[]) {
		const result: MenuItem[] = cloneDeep(data);
		result.forEach((item) => {
			if (item.label) {
				item.label = i18n.t(item.label);
			}
			if (item.icon) {
				const IconNode = menuIconMap[item.icon as MenuIconType];
				item.icon = <IconNode />;
			}
			if (item.children?.length) {
				item.children = this.transMenuForAntdLoop(item.children);
			}
		});
		return result;
	}

	closeTabByPath({ pathName }: { pathName?: string } = {}) {
		if (!pathName) {
			pathName = window.location.pathname;
		}
		const { tabItems, activeTabKey } = this.appStore;
		const {
			id: currentId,
			depends,
			index,
			parentId,
		} = this.routerHelper.getRoutItemConfigByPath(pathName) || {};
		if (!currentId) {
			return this.dpChain("appStore").deleteTabHistoryAct({
				pathName,
			});
		}

		// 如果存在上层依赖（即上层没有，本身就不存在）的路由，并且还不是index，那么就返回上层的index页面
		if (depends && !index) {
			this.dpChain("appStore")?.deleteTabHistoryAct({
				pathName,
			});
			const targetId =
				this.routerHelper.getIndexRoute(parentId!)?.id || currentId;
			if (!targetId) {
				console.error("未找到需要关闭的窗口id");
			}
			targetId && this.routerHelper.jumpTo(targetId);
		} else if (tabItems.length > 1) {
			this.dpChain("appStore").deleteTabHistoryAct({
				pathName,
			});
			// 当前如果是选中状态，关闭的话，向后或向前选中一个
			if (activeTabKey == pathName) {
				const itemIndex = tabItems.findIndex((item) => {
					return item.key == pathName;
				});
				itemIndex != -1 &&
					this.routerHelper.jumpToByPath(
						tabItems[
							itemIndex == tabItems.length - 1
								? itemIndex - 1
								: itemIndex + 1
						]?.key,
					);
			}
		}
	}

	swtichToParentTabByPath(pathName: string) {
		const { id: currentId, parentId } =
			this.routerHelper.getRoutItemConfigByPath(pathName);
		const targetId =
			this.routerHelper.getIndexRoute(parentId!)?.id || currentId;

		targetId && this.routerHelper.jumpTo(targetId);
	}

	closeOtherTabByPath({ pathName }: { pathName?: string } = {}) {
		const { tabItems, activeTabKey } = this.appStore;
		if (pathName && activeTabKey !== pathName) {
			this.routerHelper.jumpToByPath(pathName);
		}
		const item = tabItems.find((item) => {
			return item.key == pathName;
		});
		item && this.dpChain("appStore").setTabItems([item]);
	}

	closeRightTabByPath({ pathName }: { pathName?: string } = {}) {
		const { tabItems, activeTabKey } = this.appStore;
		const targetIndex = tabItems.findIndex((item) => {
			return item.key == pathName;
		});
		if (
			pathName &&
			tabItems.slice(targetIndex).some((item) => {
				return item.key === activeTabKey;
			})
		) {
			this.routerHelper.jumpToByPath(pathName);
		}
		this.dpChain("appStore").setTabItems(
			tabItems.slice(0, targetIndex + 1),
		);
	}

	// 判断tab是否存在
	judeIsHasTabByPath(pathName: string) {
		const { tabItems } = this.appStore;
		const { isTab = true, depends } =
			this.routerHelper.getRoutItemConfigByPath(pathName) || {};
		if (!isTab && depends?.length) {
			const targetItem = tabItems.find((item) => {
				const parentIndexRouteId =
					this.routerHelper.getIndexRoute(depends[0])?.id ||
					depends[0];
				return (
					item.key.toLowerCase() ==
					this.routerHelper
						.getRoutePathByKey(parentIndexRouteId)
						.toLowerCase()
				);
			});
			return targetItem?.location?.pathname == pathName;
		} else {
			const targetIndex = tabItems.findIndex((item) => {
				return item.key.toLowerCase() == pathName.toLowerCase();
			});
			return targetIndex != -1;
		}
	}

	createApp(
		providerList: (
			| ((props: { children?: ReactNode }) => JSX.Element)
			| (({ ...props }: { [x: string]: any }) => JSX.Element)
		)[],
	) {
		return this.providerLoop(providerList);
	}

	providerLoop(
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

	addWinbox({
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
		const winBoxContent = globalVar.service.get("winBoxContent");
		const id = UUID();
		winBoxContent?.set(id, content);
		this.dpChain("appStore").addWinBox({ id: id, pos, title, type });
	}

	saveKeepAliveComponent({ comp, id }: { comp: any; id: string }) {
		const keepAliveContent = globalVar.service.get("keepAliveComp");
		keepAliveContent?.set(id, comp);
	}

	isHasKeepAliveComponent({ id }: { id: string }) {
		const keepAliveContent = globalVar.service.get("keepAliveComp");
		return !!keepAliveContent?.get(id);
	}

	getKeepAliveComponentList() {
		const keepAliveContent = globalVar.service.get("keepAliveComp");
		return keepAliveContent!;
	}

	getKeepAliveComponentById({ id }: { id: string }) {
		const keepAliveContent = globalVar.service.get("keepAliveComp");
		return keepAliveContent!.get(id);
	}
}
