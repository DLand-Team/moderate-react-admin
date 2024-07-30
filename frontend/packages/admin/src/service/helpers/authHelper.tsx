import {
    ROUTE_CONFIG_MAP,
    ROUTE_ID_KEY,
    RoutesStructDataItem,
} from "src/router";
import { ACTION_DICT } from "src/static";
import { MenuPermissionItem } from "../stores/authStore/model";
import HelperBase from "./_helperBase";

type PermissionNode = any;

export class AuthHelper extends HelperBase {
    /**
     * @description: 根据权限创建菜单
     * @param {MenuPermissionItem} data
     * @param {MenuItem} result
     * @param {string[]} routesPermissions 路由权限数组ƒ
     * @return {}
     */
    createRoutesPermissionsByMenu = (data: MenuPermissionItem) => {
        const { routesPermissions } = this.createRoutesLoop(
            data?.children || [],
            []
        );
        return { routesPermissions };
    };

    createRoutesLoop = (
        data: MenuPermissionItem[],
        routesPermissions: string[]
    ) => {
        data?.forEach((item) => {
            routesPermissions.push(item.componentName);
            if (item?.children?.length) {
                this.createRoutesLoop(item.children, routesPermissions);
            }
        });
        return { routesPermissions };
    };

    createPermissionByRoutesLoop(
        routesConfig: RoutesStructDataItem[],
        newData: PermissionNode[]
    ) {
        routesConfig.forEach((routeStructItem) => {
            const { id } = routeStructItem;
            const routeInfoItem = ROUTE_CONFIG_MAP[id];
            let item: PermissionNode = {
                title: this.routerHelper.getRouteTitleByKey(id),
                value: id,
                key: id,
            };
            newData.push(item);
            if (routeStructItem.children) {
                item.children = [];
                this.createPermissionByRoutesLoop(
                    routeStructItem.children,
                    item.children
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

    transformPermissionLoop(menuPermissions: MenuPermissionItem) {
        const { componentName, children } = menuPermissions;
        if (componentName) {
            menuPermissions.componentName =
                menuPermissions.componentName.replace(
                    "Page",
                    ""
                ) as ROUTE_ID_KEY;
        }
        if (children && children.length) {
            children.forEach((item) => {
                this.transformPermissionLoop(item);
            });
        }
    }
}
