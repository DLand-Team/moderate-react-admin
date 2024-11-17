import { UUID, cloneDeep } from "@/common/utils";
import { ROUTE_NAME, RouteItem } from "@/router";
import { ReactNode, type JSX } from "react";
import { type MenuItem } from "../stores/appStore/model";
import { type MenuPermissionItem } from "../stores/authStore/model";
import { type RoutesConfigMap } from "../stores/routerStore/model";
import HelperBase from "./_helperBase";

export class AppHelper extends HelperBase {
    createMenuData(
        data: MenuPermissionItem[] = [],
        perimissionList: string[] = [],
        routesMap?: RoutesConfigMap,
        routesTree?: RouteItem[]
    ) {
        return [
            {
                path: "#/dashboard/menu_level",
                type: "group",
                title: "兵器库",
                children: [
                    {
                        title: "模版",
                        path: "#/dashboard/menu_level/menu_level_1a",
                        children: [
                            {
                                title: "分析页模版",
                                path: "#/dashboard/menu_level/menu_level_1a/menu_level_2a",
                                children: [
                                    {
                                        title: "方案A",
                                        path: "#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3a",
                                    },
                                    {
                                        title: "方案B",
                                        path: "#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3a",
                                    },
                                    {
                                        title: "方案C",
                                        path: "#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3b",
                                    },
                                ],
                            },
                            {
                                title: "详情页模版",
                                path: "#/dashboard/menu_level/menu_level_1a/menu_level_2a",
                                children: [
                                    {
                                        title: "商品",
                                        path: "#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3a",
                                    },
                                    {
                                        title: "岗位",
                                        path: "#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3a",
                                    },
                                    {
                                        title: "文章",
                                        path: "#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3b",
                                    },
                                    {
                                        title: "票据",
                                        path: "#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3b",
                                    },
                                    {
                                        title: "分段",
                                        path: "#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3b",
                                    },
                                ],
                            },
                            {
                                title: "表格模版",
                                path: "#/dashboard/menu_level/menu_level_1a/menu_level_2a",
                                children: [
                                    {
                                        title: "基础表格",
                                        path: "#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3a",
                                    },
                                    {
                                        title: "Fixed 固定列表格",
                                        path: "#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3a",
                                    },
                                    {
                                        title: "Form 可编辑表格",
                                        path: "#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3b",
                                    },
                                    {
                                        title: "ColWith 指定列宽度",
                                        path: "#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3b",
                                    },
                                    {
                                        title: "AutoBar 固定高度滚动",
                                        path: "#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3b",
                                    },
                                ],
                            },
                            {
                                title: "表单模版",
                                path: "#/dashboard/menu_level/menu_level_1a/menu_level_2b",
                                children: [
                                    {
                                        title: "基础表单",
                                        path: "#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3a",
                                    },
                                    {
                                        title: "Tab栏目 + 表单",
                                        path: "#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3a",
                                    },
                                    {
                                        title: "Tree树 + 表单",
                                        path: "#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3b",
                                    },
                                    {
                                        title: "Step 步进器 + 表单",
                                        path: "#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3b",
                                    },
                                ],
                            },
                            {
                                title: "CURD综合模版",
                                path: "#/dashboard/menu_level/menu_level_1a/menu_level_2b",
                                children: [
                                    {
                                        title: "modal表单方式",
                                        path: "#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3a",
                                    },
                                    {
                                        title: "嵌套路由模式",
                                        path: "#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3a",
                                    },
                                    {
                                        title: "抽屉模式",
                                        path: "#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3b",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        title: "组件",
                        path: "#/dashboard/menu_level/menu_level_1b",
                    },
                ],
            },
        ];
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
        result: MenuItem[]
    ) => {
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
        permissionList: string[] = []
    ) => {};

    getMenuConfigByPathName(pathName: string) {}
    closeTabByPath({ pathName }: { pathName?: string } = {}) {}
    swtichToParentTabByPath(pathName: string) {}

    closeOtherTabByPath({ pathName }: { pathName?: string } = {}) {}
    closeRightTabByPath({ pathName }: { pathName?: string } = {}) {}
    // 判断tab是否存在
    judeIsHasTabByPath(pathName: string) {
        return false;
    }
    createApp(
        providerList: (
            | ((props: { children?: ReactNode }) => JSX.Element)
            | (({ ...props }: { [x: string]: any }) => JSX.Element)
        )[]
    ) {
        return this.providerLoop(providerList);
    }

    providerLoop(
        providerList: (
            | ((props: { children?: ReactNode }) => JSX.Element)
            | (({ ...props }: { [x: string]: any }) => JSX.Element)
        )[],
        i = 0
    ) {
        if (i === providerList.length) {
            return;
        }
        const Pv = providerList[i];
        return <Pv key={i}>{this.providerLoop(providerList, i + 1)}</Pv>;
    }
}
