"use client";
// 组件层面
import React, { useEffect, useState } from "react";
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
import { cn } from "@/src/shadcn/lib/utils";
import { X } from "lucide-react";

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
	const [items, setItems] = useState<NonNullable<TabsProps["items"]>>([
		{ key: "1", label: "Tab 1", children: "Content of Tab Pane 1" },
		{ key: "2", label: "Tab 2", children: "Content of Tab Pane 2" },
		{ key: "3", label: "Tab 3", children: "Content of Tab Pane 3" },
	]);

	const sensor = useSensor(PointerSensor, {
		activationConstraint: { distance: 10 },
	});

	const onDragEnd = ({ active, over }: DragEndEvent) => {
		if (active.id !== over?.id) {
			setItems((prev) => {
				const activeIndex = prev.findIndex((i) => i.key === active.id);
				const overIndex = prev.findIndex((i) => i.key === over?.id);
				return arrayMove(prev, activeIndex, overIndex);
			});
		}
	};
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return null;
	}

	return (
		<DndContext
			sensors={[sensor]}
			onDragEnd={onDragEnd}
			collisionDetection={closestCenter}
		>
			<SortableContext
				items={items.map((i) => i.key)}
				strategy={horizontalListSortingStrategy}
			>
				{/* 底部的border颜色 bg-blue-100*/}
				<div className="flex items-center space-x-2 bg-muted/60 rounded-t-lg px-2 pt-1 border-b-2 border-b-blue-100">
					{items.map((item) => (
						<DraggableTabNode
							key={item.key}
							data-node-key={item.key}
						>
							<div
								className={cn(
									"relative flex items-center px-4 py-1.5 mr-1 rounded-t-md border border-b-0 text-sm overflow-hidden group select-none",
									"transition-colors duration-200",
									"bg-blue-100 text-blue-700 font-semibold",
									// true
									// 	? "bg-blue-100 text-blue-700 font-semibold"
									// 	: "bg-muted border-transparent cursor-pointer hover:bg-blue-50",
									// isDragging &&
									// 	"ring-2 ring-blue-300 opacity-90",
								)}
							>
								<div className="pr-7 truncate">
									{item.label}
								</div>
								<button
									tabIndex={-1}
									className={cn(
										"absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center h-6 w-6 rounded-full transition-colors duration-150 z-10",
										"hover:bg-destructive/10 active:bg-destructive/20",
										"group-hover:bg-accent/40",
									)}
									onClick={(e) => {
										e.stopPropagation();
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
										关闭 {item.label}
									</div>
								</button>
							</div>
						</DraggableTabNode>
					))}
				</div>
			</SortableContext>
		</DndContext>
	);
};
