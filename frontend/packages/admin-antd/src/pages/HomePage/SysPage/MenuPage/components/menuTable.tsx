import type { TableColumnsType, TableProps } from "antd";
import { Button, Modal, Switch, Table } from "antd";
import React from "react";
import { dpChain, useFlat } from "src/service";
import ModalForm from "./modalForm";

type TableRowSelection<T extends object = object> =
	TableProps<T>["rowSelection"];

interface DataType {
	key: React.ReactNode;
	name: string;
	age: number;
	address: string;
	children?: DataType[];
	id: number;
}

const columns: TableColumnsType<DataType> = [
	{
		title: "菜单名称",
		dataIndex: "name",
		key: "name",
		fixed: "left",
		width: "200px",
	},
	{
		title: "路由名称",
		dataIndex: "componentName",
		key: "componentName",
		width: "200px",
	},
	{
		title: "图标",
		dataIndex: "icon",
		width: "300px",
		key: "icon",
	},
	{
		title: "排序",
		dataIndex: "sort",
		width: "300px",
		key: "sort",
	},
	{
		title: "状态",
		dataIndex: "status",
		width: "50px",
		key: "status",
		fixed: "right",
		render: (value) => {
			return <Switch checked={value === 0}></Switch>;
		},
	},
	{
		title: "操作",
		dataIndex: "action",
		width: "200px",
		key: "action",
		fixed: "right",
		render: (_, record) => {
			return (
				<div
					style={{
						display: "flex",
					}}
				>
					<Button
						onClick={async () => {
							dpChain("authStore").getMenuDataAct({
								id: record.id,
							});
							dpChain("authStore").setModalType("edit");
						}}
						type="link"
					>
						修改
					</Button>
					<Button
						onClick={() => {
							dpChain("authStore").setModalType("add");
							dpChain("authStore").setCurrentEditMenuData({
								parentId: record.id,
							});
						}}
						type="link"
					>
						新增
					</Button>
					<Button
						type="link"
						onClick={() => {
							Modal.confirm({
								title: "系统提示",
								content: "是否删除选中数据",
								onOk() {
									dpChain("authStore").deleteMenuAct({
										id: record.id,
									});
								},
							});
						}}
					>
						删除
					</Button>
				</div>
			);
		},
	},
];

// rowSelection objects indicates the need for row selection
const rowSelection: TableRowSelection<DataType> = {
	onChange: (selectedRowKeys, selectedRows) => {
		console.log(
			`selectedRowKeys: ${selectedRowKeys}`,
			"selectedRows: ",
			selectedRows,
		);
	},
	onSelect: (record, selected, selectedRows) => {
		console.log(record, selected, selectedRows);
	},
	onSelectAll: (selected, selectedRows, changeRows) => {
		console.log(selected, selectedRows, changeRows);
	},
};

const MenuTable: React.FC = () => {
	const { menuTreeData } = useFlat("authStore");
	return (
		<>
			<Table<DataType>
				columns={columns}
				rowSelection={{ ...rowSelection }}
				dataSource={menuTreeData}
				rowKey={"id"}
				scroll={{ x: 2000 }}
			/>
			<ModalForm />
		</>
	);
};

export default MenuTable;
