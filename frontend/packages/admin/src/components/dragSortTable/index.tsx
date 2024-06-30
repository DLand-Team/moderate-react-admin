import type { DragEndEvent } from "@dnd-kit/core";
import {
	DndContext,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	restrictToFirstScrollableAncestor,
	restrictToParentElement,
	restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import {
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Progress, ProgressProps, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableProps } from "antd/lib";
import React, { useEffect, useRef, useState } from "react";
const twoColors: ProgressProps["strokeColor"] = {
	"0%": "#108ee9",
	"100%": "#87d068",
};
interface DataType {
	key: string;
	name: string;
	age: number;
	address: string;
}

const columns: ColumnsType<DataType> = [
	{
		title: "Name",
		dataIndex: "name",
	},
	{
		title: "Age",
		dataIndex: "age",
	},
	{
		title: "Address",
		dataIndex: "address",
	},
];

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
	"data-row-key": string;
}

const Row = (props: RowProps) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: props["data-row-key"],
	});

	const style: React.CSSProperties = {
		...props.style,
		transform: CSS.Translate.toString(transform),
		transition,
		cursor: "move",
		...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
	};

	return (
		<tr
			{...props}
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
		/>
	);
};

const DragSortTable: React.FC<
	TableProps & {
		onDragEnd: ({ active, over }: DragEndEvent) => void;
	}
> = (props) => {
	const [isLoading, setIsLoadding] = useState(false);
	// const percentValye = useRef(0);
	const [percent, setPercent] = useState(0);
	const endIdRef = useRef(null);
	const isOverEndRef = useRef(false);
	const { onDragEnd, dataSource = [] } = props;
	const timer = useRef<any>(null);
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				// https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
				distance: 1,
			},
		}),
	);
	useEffect(() => {
		setIsLoadding(false);
	}, [props.dataSource]);
	return (
		<DndContext
			sensors={sensors}
			modifiers={[
				restrictToVerticalAxis,
				restrictToParentElement,
				restrictToFirstScrollableAncestor,
			]}
			onDragStart={() => {
				endIdRef.current =
					props.dataSource?.slice(-1)[0][
						(props.rowKey as string) || "id"
					];
			}}
			onDragCancel={() => {
				isOverEndRef.current = false;
				endIdRef.current = null;
				setPercent(0);
				clearInterval(timer.current);
				timer.current = null;
			}}
			onDragEnd={(props) => {
				isOverEndRef.current = false;
				endIdRef.current = null;
				setPercent(0);
				clearInterval(timer.current);
				timer.current = null;
				onDragEnd(props);
			}}
		>
			<SortableContext
				// rowKey array
				items={dataSource!?.map((i) => i.id)}
				strategy={verticalListSortingStrategy}
			>
				<Table
					loading={isLoading}
					components={{
						body: {
							row: Row,
						},
					}}
					columns={columns}
					{...props}
				/>
				{percent > 0 && (
					<Progress
						style={{
							position: "relative",
							top: "-40px",
						}}
						size={30}
						type="circle"
						percent={percent}
						strokeColor={twoColors}
					/>
				)}
			</SortableContext>
		</DndContext>
	);
};

export default DragSortTable;
