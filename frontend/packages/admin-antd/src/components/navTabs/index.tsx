import {
    CloseCircleOutlined,
    DeleteRowOutlined,
    ReloadOutlined,
} from "@ant-design/icons";
import type { DragEndEvent } from "@dnd-kit/core";
import {
    DndContext,
    PointerSensor,
    closestCenter,
    useSensor,
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    horizontalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Dropdown, MenuProps, Tabs, theme } from "antd";
import React, { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocationListen } from "src/common/hooks";
import { cloneDeep } from "src/common/utils";
import { ROUTE_ID, ROUTE_ID_KEY } from "src/router";
import { appHelper, getStore, routerHelper, useFlat } from "src/service";
import styles from "./index.module.scss";

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
    "data-node-key": string;
}

const DraggableTabNode = ({
    className,
    zIndex,
    path,
    currentId,
    ...props
}: DraggableTabPaneProps & {
    zIndex: number;
    path: string;
    currentId: React.MutableRefObject<string | undefined>;
}) => {
    const {
        token: { colorBgLayout },
    } = theme.useToken();
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({
            id: props["data-node-key"],
        });
    const style: React.CSSProperties = {
        ...props.style,
        transform: CSS.Translate.toString(transform),
        transition,
        cursor: "move",
    };
    let routeId = path.split("/").slice(-1)[0];

    let cacheComp = appHelper.getKeepAliveComponentById({
        id: routeId,
    });

    if (currentId.current == path && cacheComp && transform!?.y > 50) {
        return (
            <div
                style={{
                    ...style,
                    width: "200px",
                    zIndex: 2,
                }}
                ref={setNodeRef}
                {...listeners}
                {...attributes}
            >
                <Tabs
                    className={styles.test}
                    type="card"
                    items={[
                        {
                            label: routeId,
                            key: routeId,
                        },
                    ]}
                />
                <div
                    style={{
                        width: "60vw",
                        opacity: "initial",
                        position: "relative",
                        top: "-20px",
                        background: colorBgLayout,
                        padding: "20px",
                        borderRadius: "12px",
                        height: "50vh",
                        overflow: "auto",
                    }}
                >
                    {cacheComp}
                </div>
            </div>
        );
    }

    return (
        <div
            style={{
                ...style,
                zIndex,
            }}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
        >
            {props.children}
        </div>
    );
};

const NavTabs: React.FC = () => {
    const { t } = useTranslation();
    const {
        setTabItems,
        setActiveTabKey,
        activeTabKey,
        tabItems,
        language,
        setRefreshKey,
    } = useFlat("appStore");
    const currentTabRef = useRef<string>();
    const [tabClassName, setTabClassName] = useState("");
    const currentDragRef = useRef<string>();
    const sensor = useSensor(PointerSensor, {
        activationConstraint: { distance: 10 },
    });

    useLocationListen(
        (location) => {
            const tabItemsTemp = cloneDeep(
                getStore("appStore").tabItems
            ).filter((item) => {
                return item;
            });
            const { pathname } = location;
            const routeConfigItem =
                routerHelper.getRoutItemConfigByPath(pathname);

            const {
                id,
                meta,
                isTab = true,
                depends,
                parentId,
                component,
                index,
            } = routeConfigItem || {};
            if (!component) return;

            const parentConfigItem = routerHelper.getRoutItemConfigById(
                parentId!
            );
            if (!isTab) {
                if (!depends?.length) return;
                const indexRoute = routerHelper.getIndexRouteByPath(
                    parentConfigItem.path!
                );
                if (indexRoute) {
                    let targetIndex = tabItemsTemp.findIndex((item) => {
                        return item.key === indexRoute.path;
                    });

                    tabItemsTemp[targetIndex] = {
                        ...tabItemsTemp[targetIndex],
                        location,
                        label:
                            routerHelper.getRouteTitleByKey(
                                id as ROUTE_ID_KEY
                            ) || "",
                    };
                    setActiveTabKey(indexRoute.path!);
                }
            } else {
                let label = meta?.title;
                if (index && !meta?.title) {
                    label = parentConfigItem.meta?.title;
                }
                if (routerHelper.getIndexRouteByPath(location.pathname)) {
                    return;
                }
                if (
                    !tabItemsTemp.some((item) => {
                        return (
                            item.key.toLocaleLowerCase() ==
                            location.pathname.toLocaleLowerCase()
                        );
                    }) &&
                    label
                ) {
                    // 判断一下，如果自己父节点是否存在，如果存在，就在其旁边创建tab
                    let insertIndex = tabItemsTemp.length;
                    if (parentConfigItem?.id) {
                        const indexRoute =
                            routerHelper.getIndexRoute(parentConfigItem?.id) ||
                            parentConfigItem;
                        let insertIndexTemp = tabItemsTemp.findIndex((item) => {
                            return (
                                item.key.toLocaleLowerCase() ==
                                indexRoute.path!?.toLocaleLowerCase()
                            );
                        });
                        insertIndex =
                            insertIndexTemp !== -1
                                ? insertIndexTemp + 1
                                : insertIndex;
                    }
                    tabItemsTemp.splice(insertIndex, 0, {
                        location,
                        label: label!,
                        key: location.pathname,
                    });
                } else {
                    let targetIndex = tabItemsTemp.findIndex((item) => {
                        return item.key === location.pathname;
                    });
                    tabItemsTemp[targetIndex] = {
                        location,
                        label: label || "",
                        key: location.pathname,
                    };
                }
                setActiveTabKey(location.pathname);
            }

            let temp = tabItemsTemp.map((item) => {
                return item;
            });
            setTabItems(temp);
        },
        [language]
    );
    const onDragEnd = ({ active, over }: DragEndEvent) => {
        setTabClassName(styles.test);
        const { rect } = active;
        const { current } = rect;
        const { top, left } = current.translated!;
        if (top - current.initial?.top! > 80) {
            appHelper.addWinbox({
                content: appHelper.getKeepAliveComponentById({
                    id: (active.id as string).split("/").slice(-1)[0],
                }),
                pos: {
                    x: left,
                    y: top,
                },
                title: active.id as string,
                type: "page",
            });
            appHelper.closeTabByPath({
                pathName: active.id as string,
            });

            return;
        }
        currentDragRef.current = undefined;
        if (!over) return;
        const tabsHistoryTemp = [...tabItems];
        const activeIndex = tabsHistoryTemp.findIndex(
            (i) => i.key === active.id
        );
        const overIndex = tabsHistoryTemp.findIndex((i) => i.key === over?.id);
        setTabItems(arrayMove(tabsHistoryTemp, activeIndex, overIndex));
    };
    const items: MenuProps["items"] = useMemo(() => {
        return [
            {
                label: (
                    <a
                    // onClick={(e) => {
                    //     e.preventDefault();

                    // }}
                    >
                        {t("common:Refesh")}
                    </a>
                ),
                key: "0",
                icon: <ReloadOutlined />,
            },
            // {
            // 	label: <a>Favourite</a>,
            // 	key: "1",
            // 	icon: <HeartOutlined />,
            // },
            // {
            //     label: (
            //         <a
            //             onClick={() => {
            //                 appHelper.addWinbox({
            //                     content: appHelper.getKeepAliveComponentById({
            //                         id: (currentTabRef.current as string)
            //                             .split("/")
            //                             .slice(-1)[0],
            //                     }),
            //                     pos: {
            //                         x: 500,
            //                         y: 200,
            //                     },
            //                     title: currentTabRef.current,
            //                     type: "page",
            //                 });
            //                 appHelper.closeTabByPath({
            //                     pathName: currentTabRef.current as string,
            //                 });
            //             }}
            //         >
            //             t('Float')
            //         </a>
            //     ),
            //     icon: <BlockOutlined />,
            //     key: "3",
            // },
            {
                label: (
                    <a
                        onClick={() => {
                            appHelper.closeRightTabByPath({
                                pathName: currentTabRef.current,
                            });
                        }}
                    >
                        {t("common:CloseRight")}
                    </a>
                ),
                icon: <DeleteRowOutlined />,
                key: "4",
            },
            {
                label: (
                    <a
                        onClick={() => {
                            currentTabRef.current &&
                                appHelper.closeOtherTabByPath({
                                    pathName: currentTabRef.current,
                                });
                        }}
                    >
                        {t("common:CloseOther")}
                    </a>
                ),
                icon: <CloseCircleOutlined />,
                key: "5",
            },
        ];
    }, []);

    const onEdit = (
        targetKey: React.MouseEvent | React.KeyboardEvent | string,
        action: "add" | "remove"
    ) => {
        if (action === "remove") {
            appHelper.closeTabByPath({
                pathName: tabItems.find((item) => {
                    return item.key == targetKey;
                })?.location?.pathname!,
            });
        }
    };
    return (
        <Tabs
            className={tabClassName}
            style={{
                width: "100%",
                height: "40px",
                zIndex: 2,
            }}
            onEdit={onEdit}
            tabBarGutter={2}
            type="editable-card"
            indicator={{ size: (origin) => origin - 20, align: "center" }}
            items={tabItems.map((item) => {
                return {
                    ...item,
                    label: t(item.label),
                    key: item.key,
                };
            })}
            hideAdd
            activeKey={activeTabKey}
            onChange={(e) => {
                setActiveTabKey(e);
                let target = tabItems.find((item) => {
                    return item.key === e;
                });

                if (target) {
                    routerHelper.jumpToByPath(
                        target!?.location?.pathname +
                            (target.location?.search || "") +
                            (target.location?.hash || "")
                    );
                } else {
                    routerHelper.jumpToByPath(e);
                }
            }}
            renderTabBar={(tabBarProps, DefaultTabBar) => (
                <DndContext
                    collisionDetection={closestCenter}
                    onDragStart={({ active }) => {
                        currentDragRef.current = active.id as string;
                        setTabClassName(styles.content);
                        let target = tabItems.find((item) => {
                            return item.key === currentDragRef.current;
                        });
                        if (target) {
                            routerHelper.jumpToByPath(
                                currentDragRef.current +
                                    target.location?.search +
                                    target.location?.hash
                            );
                        } else {
                            routerHelper.jumpToByPath(currentDragRef.current);
                        }
                    }}
                    sensors={[sensor]}
                    onDragEnd={onDragEnd}
                >
                    <SortableContext
                        items={tabItems.map((i) => i.key)}
                        strategy={horizontalListSortingStrategy}
                    >
                        <DefaultTabBar {...tabBarProps}>
                            {(node) => {
                                return (
                                    <DraggableTabNode
                                        {...node.props}
                                        zIndex={
                                            tabBarProps.activeKey == node.key
                                                ? 1
                                                : 0
                                        }
                                        currentId={currentDragRef}
                                        path={node.key}
                                        key={node.key}
                                    >
                                        <Dropdown
                                            onOpenChange={(open) => {
                                                if (open) {
                                                    currentTabRef.current =
                                                        node.key!;
                                                } else {
                                                    currentTabRef.current =
                                                        undefined;
                                                }
                                            }}
                                            menu={{
                                                items,
                                                onClick() {
                                                    const key = node.key;
                                                    if (!key) return;
                                                    if (
                                                        key == location.pathname
                                                    ) {
                                                        routerHelper.jumpTo(
                                                            ROUTE_ID.LoadingPage
                                                        );
                                                    }

                                                    setRefreshKey([
                                                        key
                                                            .split("/")
                                                            .slice(-1)[0],
                                                    ]);
                                                },
                                            }}
                                            trigger={["contextMenu"]}
                                        >
                                            {node}
                                        </Dropdown>
                                    </DraggableTabNode>
                                );
                            }}
                        </DefaultTabBar>
                    </SortableContext>
                </DndContext>
            )}
        />
    );
};

export default NavTabs;
