import { throttle } from "@/common/utils";
import { ROUTE_CONFIG_MAP, ROUTE_ID_KEY, RoutesStructDataItem } from "@/router";
import type { TreeSelectItem } from "../stores/appStore/model";
import HelperBase from "./_helperBase";

export class RouterHelper extends HelperBase {
    // 生成路由配置根据权限
    // 每次登陆只会触发一次

    getRoutePathByKey(key: ROUTE_ID_KEY) {}

    getRouteParentIdByPath(path: string) {}

    getRouteTitleByKey(key: ROUTE_ID_KEY) {}

    judeKeepAliveByPath(path: string) {}

    getKeepAliveRoutePath() {
        return Object.values(ROUTE_CONFIG_MAP)
            .filter((item) => {
                return item.keepAlive;
            })
            .map((item) => {
                return item.id;
            });
    }

    getRoutItemConfigById(key: ROUTE_ID_KEY) {}

    // 根据路径获得路由数据
    getRoutItemConfigByPath(path: string) {
        return {
            keepAlive: false,
        };
    }
    getIndexRouteByPath(path: string) {}

    jumpToIndexChild(id: ROUTE_ID_KEY): boolean {
        return false;
    }
    getIndexRoute(id: ROUTE_ID_KEY) {}

    goBack() {}

    jumpTo = throttle(
        (
            id: ROUTE_ID_KEY,
            options?: {
                type?: "replace" | "push";
                state?: any;
                search?: Record<PropertyKey, any>;
                params?: string;
            }
        ) => {},
        200
    );

    getRouteIdByPath(path: string) {
        return "";
    }

    jumpToByPath = throttle(
        (
            path: string,
            options?: {
                type: "replace" | "push";
                state?: any;
            }
        ) => {},
        200
    );

    // 生成一个柱状选项根据路由tree
    generateTreeSelectDataByRoutesTree() {
        let result: TreeSelectItem[] = [];
        return result;
    }

    generateTreeSelectDataByRoutesTreeLoop(
        routesTreeData: RoutesStructDataItem[],
        path: string = "/"
    ) {
        let result: TreeSelectItem[] = [];
        routesTreeData.forEach((item) => {
            // value取的组件的页面文件夹的路径
            let obj: TreeSelectItem = {
                value: path + item.id,
                title: item.id,
            };
            if (item.children) {
                obj.children = this.generateTreeSelectDataByRoutesTreeLoop(
                    item.children,
                    path + item.id + "/"
                );
            }
            result.push(obj);
        });
        return result;
    }
}
