import type { PaginationProps, TableColumnsType } from "antd";
import { Button, Modal, Switch, Table } from "antd";
import React, { useEffect } from "react";
import { dpChain, useFlat } from "src/service";
import { ModalType, User } from "src/service/stores/sysStore/model";

const columns: TableColumnsType<User> = [
	{
		title: "用户编号",
		dataIndex: "id",
		key: "id",
		// fixed: "left",
	},
	{
		title: "用户名称",
		dataIndex: "username",
		key: "username",
	},
	{
		title: "用户昵称",
		dataIndex: "nickname",
		key: "nickname",
	},
	{
		title: "手机号码",
		dataIndex: "mobile",
		key: "mobile",
	},
	{
		title: "部门",
		dataIndex: "deptName",
		key: "deptName",
	},
	{
		title: "状态",
		dataIndex: "status",
		key: "status",
		// fixed: "right",
		render: (value) => {
			return <Switch checked={value === 0}></Switch>;
		},
	},
	{
		title: "操作",
		dataIndex: "action",
		key: "action",
		// fixed: "right",
		width: "200px",
		render: (_, record) => {
			return (
				<div
					style={{
						display: "flex",
					}}
				>
					<Button
						onClick={async () => {
							dpChain("sysStore").queryUserAct({
								id: record.id,
							});
							dpChain("sysStore").setUserModalType(
								ModalType.EDIT,
							);
						}}
						type="link"
					>
						修改
					</Button>
					<Button
						onClick={() => {
							dpChain("sysStore").setUserModalType(ModalType.ADD);
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

const showTotal: PaginationProps["showTotal"] = (total) => `共 ${total} 条数据`;

const UserTable: React.FC = () => {
	const { userList, queryUserListAct, userPagination, currentDeptId } =
		useFlat("sysStore");
	useEffect(() => {
		queryUserListAct({
			deptId: currentDeptId!,
		});
	}, [userPagination, currentDeptId]);
	return (
		<Table<User>
			columns={columns}
			dataSource={userList}
			rowKey={"id"}
			scroll={{ x: 1000 }}
			pagination={{
				showSizeChanger: true,
				showTotal: showTotal,
				showQuickJumper: true,
				...userPagination,
			}}
		/>
	);
};

export default UserTable;
