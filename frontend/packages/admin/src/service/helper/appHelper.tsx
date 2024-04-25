import { dp, reduxStore } from "..";
import { MenuPermissionItem } from "../stores/authStore/model";
import { MenuItem, RouterHelper } from "./routerHelper";
import iconMap, { MenuIconType } from "src/static/iconMap";
import { cloneDeep } from "lodash-es";
import { ROUTE_ID, ROUTE_NAME } from "src/router/name";
import { ROUTE_ID_KEY, RouteItem } from "src/router/types";
import { pageList } from "src/pages1";
import { ReactNode } from "react";

export class AppHelper {
	/**
	 * @description: 创建菜单
	 * @param {MenuPermissionItem} data 若依后台的菜单权限数组
	 * @return {*} 适用于antd的菜单组件数据
	 */
	static createMenuData(data: MenuPermissionItem[]) {
		let result: MenuItem[] = [];
		// 创建服务端权限配置的菜单信息
		const { menuData = [] } = data
			? AppHelper.createMenuDataLoopByPermissions(data, [])
			: {};
		result = result.concat(menuData);
		const { routesConfig } = reduxStore.getState().routerStore;
		// 创建客户端权限配置的菜单信息
		if (routesConfig.length) {
			const temp = routesConfig.find((item) => {
				return item.id === ROUTE_ID.HomePage;
			});
			if (temp?.children?.length) {
				result = result.concat(
					AppHelper.createMenuDataLoop(temp?.children, []),
				);
			}
		}
		result.sort((a, b) => {
			return ROUTE_NAME[a.key] - ROUTE_NAME[b.key];
		});
		return result;
	}
	/**
	 * @description: 递归生成菜单根据后端权限 “服务端权限控制专属“
	 * @param {MenuPermissionItem} data
	 * @param {MenuItem} result
	 * @param {*} data
	 * @return {*} {menuData 菜单数据}
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

	/**
	 * @description: 递归生成菜单数据 “客户端权限控制专属”
	 * @param {RouteItem} data
	 * @param {MenuItem} result
	 * @return {*}
	 */
	static createMenuDataLoop = (data: RouteItem[], result: MenuItem[]) => {
		data.forEach((item) => {
			const { isMenu = true, isNoAuth, component = "HomePage" } = item;
			if (component == "PluginsPage") {
			}
			if (!isMenu || !isNoAuth || !pageList[component]) {
				return;
			}
			const temp: MenuItem = {
				key: item.id!,
				icon: item.meta?.icon,
				label: item.meta!?.title! || "",
			};
			result.push(temp);
			if (item?.children?.length) {
				const children = this.createMenuDataLoop(item.children, []);
				if (children.length) {
					temp.children = this.createMenuDataLoop(item.children, []);
				}
			}
		});
		return result;
	};

	static getMenuConfigByPathName(pathName: string) {
		const selectedKeysTemp = pathName.split("/").filter((item) => {
			return item;
		});
		const { depands = [] } =
			RouterHelper.getRoutItemConfigById(
				selectedKeysTemp.slice(-1)[0] as ROUTE_ID_KEY,
			) || {};

		const openKeysTemp = selectedKeysTemp.slice(1, -1);
		return {
			selectedKeys: selectedKeysTemp.concat(depands),
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
			if (item.icon) {
				const IconNode = iconMap[item.icon as MenuIconType];
				item.icon = <IconNode />;
				if (item.children?.length) {
					item.children = this.transMenuForAntdLoop(item.children);
				}
			}
		});
		return result;
	}

	static closeTabByPath({ pathName }: { pathName?: string } = {}) {
		if (!pathName) {
			pathName = location.pathname;
		}
		const { tabsHistory, activeTabKey } = reduxStore.getState().appStore;
		const routeId = RouterHelper.getRouteIdByPath(activeTabKey);
		const routeItemData = RouterHelper.getRoutItemConfigById(
			routeId as ROUTE_ID_KEY,
		);
		debugger;
		if (tabsHistory.length > 1 || routeItemData.depands) {
			dp("appStore", "deleteTabHistoryAct", {
				pathName,
			});
			if (activeTabKey == pathName) {
				if (routeItemData.depands) {
					RouterHelper.jumpTo(routeItemData.parentId as ROUTE_ID_KEY);
				} else {
					const item = tabsHistory.find((item) => {
						return item.pathname !== pathName;
					});
					item && RouterHelper.jumpToByPath(item?.pathname);
				}
			}
		}
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
}
export default new AppHelper();
