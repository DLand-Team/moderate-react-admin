import { ROUTE_ID_KEY } from "@/router";
import { type MenuPermissionItem } from "../stores/authStore/model";
import HelperBase from "./_helperBase";


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
