"use client";
import { RouteItem } from "@/src/router";
// 组件层面
import { emit, routerHelper, useFlat } from "@/src/service";
import { cn } from "@/src/shadcn/lib/utils";
import type { DragEndEvent } from "@dnd-kit/core";
import {
	closestCenter,
	DndContext,
	PointerSensor,
	useSensor,
} from "@dnd-kit/core";
import {
	arrayMove,
	horizontalListSortingStrategy,
	SortableContext,
	useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cloneDeep } from "lodash-es";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
	"data-node-key": string;
}

export const DraggableTabNode: React.FC<Readonly<DraggableTabPaneProps>> = ({
	className,
	...props
}) => {
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

	return React.cloneElement(props.children as React.ReactElement<any>, {
		ref: setNodeRef,
		style,
		...attributes,
		...listeners,
	});
};

export const CustomTabs: React.FC = () => {
	const { setHistoryRoutes, historyRoutes, currentRouteUrl } =
		useFlat("appStore");

	const sensor = useSensor(PointerSensor, {
		activationConstraint: { distance: 10 },
	});

	const onDragEnd = ({ active, over }: DragEndEvent) => {
		if (active.id !== over?.id) {
			const activeIndex = historyRoutes.findIndex(
				(i) => i.id === active.id,
			);
			const overIndex = historyRoutes.findIndex((i) => i.id === over?.id);
			setHistoryRoutes(
				arrayMove(cloneDeep(historyRoutes), activeIndex, overIndex),
			);
		}
	};
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return null;
	}
	const isAlowDelete = Object.keys(historyRoutes).length > 1;

	const checkActive = (url: string) => {
		return currentRouteUrl === url;
	};

	return (
		<DndContext
			sensors={[sensor]}
			onDragEnd={onDragEnd}
			collisionDetection={closestCenter}
		>
			<SortableContext
				items={Object.values(historyRoutes).map((item) => item.id)}
				strategy={horizontalListSortingStrategy}
			>
				{/* 底部的border颜色 bg-blue-100*/}
				<div className="flex items-center space-x-2 bg-muted/60 rounded-t-lg px-2 pt-1 border-b-2 border-b-blue-100">
					{Object.values(historyRoutes).map((item) => (
						<DraggableTabNode key={item.id} data-node-key={item.id}>
							<div
								onClick={() => {
									routerHelper.junpTo(item.id);
								}}
								className={cn(
									"relative flex items-center px-4 py-1.5 mr-1 rounded-t-md border border-b-0 text-sm overflow-hidden group select-none",
									"transition-colors duration-200",
									checkActive(item.url!)
										? "bg-blue-100 text-blue-700 font-semibold"
										: "bg-muted border-transparent cursor-pointer hover:bg-blue-50",
								)}
							>
								<div
									className={cn(
										"truncate",
										isAlowDelete ? "pr-6" : "",
									)}
								>
									{item.meta?.title || ""}
								</div>
								{isAlowDelete && (
									<button
										tabIndex={-1}
										className={cn(
											"absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center h-6 w-6 rounded-full transition-colors duration-150 z-10",

											"hover:bg-destructive/10 active:bg-destructive/20",
											"group-hover:bg-accent/40",
										)}
										disabled={!isAlowDelete}
										onClick={(e) => {
											e.stopPropagation();
											emit(
												"appStore",
											).deleteHistoryRouteAct({
												url: item.url!,
											});
										}}
										type="button"
									>
										<X
											size={16}
											className={cn(
												"text-muted-foreground",
												"group-hover:text-destructive",
											)}
										/>
										<div className="sr-only">
											关闭 {item.meta?.title || ""}
										</div>
									</button>
								)}
							</div>
						</DraggableTabNode>
					))}
				</div>
			</SortableContext>
		</DndContext>
	);
};
