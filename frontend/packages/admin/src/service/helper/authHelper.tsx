import { ACTION_DICT } from "src/static/actionPermission";
import { MenuPermissionItem } from "../stores/authStore/model";
import { RouterHelper } from "./routerHelper";
import { RoutesStructDataItem } from "src/router/types";
import { ROUTE_CONFIG_MAP } from "src/router/routesConfig";

type PermissionNode = any;

export class AuthHelper {
	/**
	 * @description: 根据权限创建菜单
	 * @param {MenuPermissionItem} data
	 * @param {MenuItem} result
	 * @param {string[]} routesPermissions 路由权限数组ƒ
	 * @return {}
	 */
	static createRoutesPermissionsByMenu = (data: MenuPermissionItem[]) => {
		const menuPermissions = data.find((item) => {
			return item.path.toLowerCase() == "/userCenter".toLowerCase();
		});
		const { routesPermissions } = this.createRoutesLoop(
			menuPermissions?.children || [],
			[],
		);
	
		return { menuPermissions, routesPermissions };
	};

	static createRoutesLoop = (
		data: MenuPermissionItem[],
		routesPermissions: string[],
	) => {
		data?.forEach((item) => {
			routesPermissions.push(item.componentName);
			if (item?.children?.length) {
				this.createRoutesLoop(item.children, routesPermissions);
			}
		});
		return { routesPermissions };
	};

	static createPermissionByRoutesLoop(
		routesConfig: RoutesStructDataItem[],
		newData: PermissionNode[],
	) {
		routesConfig.forEach((routeStructItem) => {
			const { id } = routeStructItem;
			const routeInfoItem = ROUTE_CONFIG_MAP[id];
			let item: PermissionNode = {
				title: RouterHelper.getRouteTitleByKey(id),
				value: id,
				key: id,
			};
			newData.push(item);
			if (routeStructItem.children) {
				item.children = [];
				this.createPermissionByRoutesLoop(
					routeStructItem.children,
					item.children,
				);
			} else {
				item.children = [];
				const actionsPermissions: string[] =
					routeInfoItem.actionPermissions || [];
				item.children = actionsPermissions.map((actionId) => {
					const btnConfig =
						ACTION_DICT[actionId as keyof typeof ACTION_DICT];
					return {
						title: btnConfig.title,
						value: `${id}:${actionId}`,
						key: `${id}:${actionId}`,
					};
				});
			}
		});
	}
}
