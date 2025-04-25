import { ReactNode, type JSX } from "react";
import { UUID, cloneDeep } from "src/common/utils";
import i18n from "src/i18n";
import { pageList } from "src/pages";
import { ROUTE_CONFIG_MAP, ROUTE_ID, ROUTE_NAME, RouteItem } from "src/router";
import { globalVar, menuIconMap, type MenuIconType } from "src/static";
import { type MenuItem } from "../stores/appStore/model";
import { type MenuPermissionItem } from "../stores/authStore/model";
import { type RoutesConfigMap } from "../stores/routerStore/model";
import HelperBase from "./_helperBase";

export class AppHelper extends HelperBase {
	createMenuData(
		data: MenuPermissionItem[] = [],
		perimissionList: string[] = [],
		routesMap?: RoutesConfigMap,
		routesTree?: RouteItem[],
	) {
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
		const { menuData = [] } = data
			? this.createMenuDataLoopByServer(data, [])
			: {};
		result = result.concat(menuData);
		// 创建客户端权限配置的菜单信息
		if (Object.values(routesMap).length) {
			const children = routesTree!.find((item) => {
				return item!?.id === ROUTE_ID.HomePage;
			})?.children;
			if (children?.length) {
				this.createMenuDataLoop(children, result, perimissionList);
			}
		}
		this.sortLoop(result);
		return result;
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

	/**
	 * @description: 递归生成菜单数据 “客户端权限控制专属”
	 * @param {RouteItem} data
	 * @param {MenuItem} result
	 */
	createMenuDataLoop = (
		data: RouteItem[],
		result: MenuItem[],
		permissionList: string[] = [],
	) => {
		data.forEach((item) => {
			const {
				isPublish = true,
				isMenu = true,
				isNoAuth,
				component,
			} = item;

			// 不是menu，排除
			// 不是客户端鉴权，排除
			// 如果该菜单关联了路由，但是对应的路由组件却没注册，排除
			if (
				(!isPublish && process.env.NODE_ENV == "production") ||
				!isMenu ||
				(!isNoAuth && !permissionList.includes(item.id as string)) ||
				(component && !(component! in pageList))
			) {
				return;
			}
			const targetMenuItem = result.find((resultItem) => {
				return resultItem.key == item.id!;
			});
			const temp: MenuItem = targetMenuItem || {
				key: item.id!,
				icon: item.meta?.icon,
				label: item.meta!?.title! || "",
			};
			!targetMenuItem && result.push(temp);
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
		return result;
	};

	getMenuConfigByPathName(pathName: string) {
		const selectedKeysTemp = pathName.split("/").filter((item) => {
			return item;
		});
		const openKeysTemp = selectedKeysTemp.slice(1, -1);
		const selectedKeys =
			selectedKeysTemp.length > 1
				? selectedKeysTemp.slice(1)
				: selectedKeysTemp;
		const { routesMap } = this.routerStore;
		selectedKeys.forEach((selectKey) => {
			const {} = routesMap;
			for (let key in routesMap) {
				const item = routesMap[key as keyof typeof routesMap];
				if (
					item.path == pathName &&
					item.parentId == selectKey &&
					item.index
				) {
					selectedKeys.push(item.id!);
					openKeysTemp.push(item.parentId);
				}
			}
		});
		return {
			selectedKeys,
			openKeys: openKeysTemp.length ? openKeysTemp : [],
			newTabItem: location,
		};
	}

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
