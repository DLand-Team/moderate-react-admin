"use client";
import { X } from "lucide-react";
import * as React from "react";
import { cn } from "src/shadcn/lib/utils";
import {
	DndContext,
	PointerSensor,
	useSensor,
	useSensors,
	closestCenter,
	DragEndEvent,
} from "@dnd-kit/core";
import {
	SortableContext,
	useSortable,
	arrayMove,
	horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Tab = {
	id: number;
	title: string;
	content: React.ReactNode;
};

// Sortable tab node with antd-like drag style
function SortableTab({
	tab,
	activeTab,
	setActiveTab,
	closeTab,
	isDraggingTab,
	setIsDraggingTab,
}: {
	tab: Tab;
	activeTab: number;
	setActiveTab: (id: number) => void;
	closeTab: (id: number) => void;
	isDraggingTab: number | null;
	setIsDraggingTab: (id: number | null) => void;
}) {
	const {
		setNodeRef,
		attributes,
		listeners,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: tab.id });

	// antd tabs: active tab zIndex: 1, dragging tab zIndex: 1000
	const zIndex = isDragging ? 1000 : activeTab === tab.id ? 1 : 0;

	const style: React.CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
		zIndex,
		position: isDragging ? "absolute" : "relative",
		background: isDragging ? "#e0edff" : undefined, // 拖拽时悬浮色
		boxShadow: isDragging ? "0 4px 16px 0 rgba(24,144,255,.12)" : undefined,
		width: isDragging ? 120 : undefined, // 固定宽度，避免拖拽变形
		pointerEvents: isDragging ? "none" : undefined,
	};

	React.useEffect(() => {
		if (isDragging) setIsDraggingTab(tab.id);
		else if (isDraggingTab === tab.id) setIsDraggingTab(null);
	}, [isDragging]);

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={cn(
				"relative flex items-center px-4 py-1.5 mr-1 rounded-t-md border border-b-0 text-sm overflow-hidden group select-none",
				"transition-colors duration-200",
				activeTab === tab.id
					? "bg-blue-100 text-blue-700 font-semibold"
					: "bg-muted border-transparent cursor-pointer hover:bg-blue-50",
				isDragging && "ring-2 ring-blue-300 opacity-90"
			)}
			onClick={() => setActiveTab(tab.id)}
			style={{ minWidth: 100, ...style }}
		>
			<span className="pr-7 truncate">{tab.title}</span>
			<button
				tabIndex={-1}
				className={cn(
					"absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center h-6 w-6 rounded-full transition-colors duration-150 z-10",
					"hover:bg-destructive/10 active:bg-destructive/20",
					"group-hover:bg-accent/40"
				)}
				onClick={(e) => {
					e.stopPropagation();
					closeTab(tab.id);
				}}
				type="button"
			>
				<X
					size={16}
					className={cn(
						"text-muted-foreground",
						"group-hover:text-destructive"
					)}
				/>
				<span className="sr-only">关闭 {tab.title}</span>
			</button>
		</div>
	);
}

export function TabNav() {
	const [tabs, setTabs] = React.useState<Tab[]>([
		{ id: 1, title: "首页", content: "这里是首页内容" },
		{ id: 2, title: "用户管理", content: "这里是用户管理内容" },
		{ id: 3, title: "设置", content: "这里是设置内容" },
	]);
	const [activeTab, setActiveTab] = React.useState<number>(tabs[0].id);
	const [isDraggingTab, setIsDraggingTab] = React.useState<number | null>(
		null
	);

	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
	);

	const closeTab = (id: number) => {
		let idx = tabs.findIndex((t) => t.id === id);
		let newTabs = tabs.filter((t) => t.id !== id);
		setTabs(newTabs);
		if (activeTab === id && newTabs.length > 0) {
			setActiveTab(newTabs[Math.max(0, idx - 1)].id);
		}
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (over && active.id !== over.id) {
			const oldIndex = tabs.findIndex((tab) => tab.id === active.id);
			const newIndex = tabs.findIndex((tab) => tab.id === over.id);
			const newTabs = arrayMove(tabs, oldIndex, newIndex);
			setTabs(newTabs);
		}
		setIsDraggingTab(null);
	};

	return (
		<div className="w-full mx-auto p-6">
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<SortableContext
					items={tabs.map((tab) => tab.id)}
					strategy={horizontalListSortingStrategy}
				>
					<div
						className="flex items-center space-x-2 bg-muted/60 rounded-t-lg px-2 py-1 border-b relative"
						style={{ minHeight: 44 }}
					>
						{tabs.map((tab) => (
							<SortableTab
								key={tab.id}
								tab={tab}
								activeTab={activeTab}
								setActiveTab={setActiveTab}
								closeTab={closeTab}
								isDraggingTab={isDraggingTab}
								setIsDraggingTab={setIsDraggingTab}
							/>
						))}
					</div>
				</SortableContext>
			</DndContext>
		</div>
	);
}

export default TabNav;
