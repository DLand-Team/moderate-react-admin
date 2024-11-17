"use client";

import { useFlat } from "@/service";
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
import CloseIcon from "@mui/icons-material/Close";
import { Button, Tab, TabProps, Tabs, styled } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
    dataKey: string;
    handleClick?: (key: string) => void;
}

const DraggableTabNode = ({
    className,
    path,
    currentId,
    handleClick,
    ...props
}: DraggableTabPaneProps & {
    path: string;
    currentId: string;
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({
            id: props["dataKey"],
        });

    if (transform?.y) {
        transform.y = Math.min(0, transform?.y!);
    }

    const style: React.CSSProperties = {
        ...props.style,
        transform: CSS.Translate.toString(transform),
        transition,
        cursor: "move",
    };
    const sxData =
        currentId == props["dataKey"]
            ? {
                  height: "40px",
              }
            : { height: "35px", background: "#F2F2F2" };
    return (
        <Button
            onClick={() => {
                handleClick?.(props["dataKey"]);
            }}
            sx={{
                borderRadius: "6px 6px 0px 0px",
                ...sxData,
            }}
            style={{
                ...style,
            }}
            variant="outlined"
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            endIcon={
                <CloseIcon
                    sx={{
                        cursor: "pointer",
                    }}
                />
            }>
            {props.children}
        </Button>
    );
};

const NavTabs = () => {
    const router = useRouter();
    const {
        setTabItems,
        setActiveTabKey,
        activeTabKey,
        tabItems,
        language,
        setRefreshKey,
    } = useFlat("appStore");
    const currentDragRef = useRef<string | undefined>("");
    const sensor = useSensor(PointerSensor, {
        activationConstraint: { distance: 10 },
    });
    // useLocationListen(
    //     (location) => {
    //         const tabItemsTemp = cloneDeep(tabItems).filter((item) => {
    //             return item;
    //         });
    //         const { pathname } = location;
    //         const routeConfigItem =
    //             routerHelper.getRoutItemConfigByPath(pathname);

    //         const {
    //             id,
    //             meta,
    //             isTab = true,
    //             depends,
    //             parentId,
    //             component,
    //             index,
    //         } = routeConfigItem || {};
    //         if (!component) return;

    //         const parentConfigItem = routerHelper.getRoutItemConfigById(
    //             parentId!
    //         );
    //         {
    //             let label = meta?.title;
    //             if (
    //                 !tabItemsTemp.some((item) => {
    //                     return (
    //                         item.key.toLocaleLowerCase() ==
    //                         location.pathname.toLocaleLowerCase()
    //                     );
    //                 }) &&
    //                 label
    //             ) {
    //                 // 判断一下，如果自己父节点是否存在，如果存在，就在其旁边创建tab
    //                 let insertIndex = tabItemsTemp.length;
    //                 tabItemsTemp.splice(insertIndex, 0, {
    //                     location,
    //                     label: label!,
    //                     key: location.pathname,
    //                 });
    //             }
    //             setActiveTabKey(location.pathname);
    //         }

    //         let temp = tabItemsTemp.map((item) => {
    //             return item;
    //         });
    //         setTabItems(temp);
    //     },
    //     [language]
    // );

    const onDragEnd = ({ active, over }: DragEndEvent) => {
        const { rect } = active;
        currentDragRef.current = undefined;
        if (!over) return;
        const tabsHistoryTemp = [...tabItems];
        const activeIndex = tabsHistoryTemp.findIndex(
            (i) => i.key === active.id
        );
        const overIndex = tabsHistoryTemp.findIndex((i) => i.key === over?.id);
        setTabItems(arrayMove(tabsHistoryTemp, activeIndex, overIndex));
    };
    return (
        <DndContext
            collisionDetection={closestCenter}
            sensors={[sensor]}
            onDragEnd={onDragEnd}>
            <SortableContext
                items={tabItems.map((i) => i.key)}
                strategy={horizontalListSortingStrategy}>
                <Tabs
                    value={1}
                    scrollButtons={false}
                    sx={{
                        gap: "0px",
                    }}>
                    {tabItems.map((item) => {
                        return (
                            <DraggableTabNode
                                handleClick={(key) => {
                                    setActiveId(key);
                                    if (key == "1") {
                                        router.push("/dashboard/market");
                                    } else {
                                        router.push("/dashboard/app");
                                    }
                                }}
                                currentId={activeId}
                                path={item.key}
                                dataKey={item.key}
                                key={item.key}>
                                {item.value}
                            </DraggableTabNode>
                        );
                    })}
                </Tabs>
            </SortableContext>
        </DndContext>
    );
};

export default NavTabs;
