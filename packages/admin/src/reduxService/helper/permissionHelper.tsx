import { ACTION_DICT } from "src/config/permissionConfig";
import { RoutesStructDataItem } from "src/config/types";
import { routerHelper } from "src/reduxService";
import { ROUTE_INFO_CONFIG } from "src/config/routerConfig";
type PermissionNode = any;
class PermissionHelper {
	createPermissionByRoutesLoop(
		routesConfig: RoutesStructDataItem[],
		newData: PermissionNode[],
	) {
		routesConfig.forEach((routeStructItem) => {
			const { id } = routeStructItem;
			const routeInfoItem = ROUTE_INFO_CONFIG[id];
			let item: PermissionNode = {
				title: routerHelper.getRouteTitleByKey(id),
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

const permissionHelper = new PermissionHelper();

export default permissionHelper;
