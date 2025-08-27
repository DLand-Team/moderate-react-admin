import { DoubleRightOutlined } from "@ant-design/icons";
import type { PaginationProps, TableColumnsType } from "antd";
import { Button, Dropdown, Input, Modal, Switch, Table } from "antd";
import React, { useEffect } from "react";
import { dpChain, useFlat } from "src/service";
import { ModalType, User } from "src/service/stores/sysStore/model";

let newPassword = "";

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
					<Dropdown
						menu={{
							items: [
								{
									key: "role",
									label: "分配角色",
									onClick: () => {},
								},
								{
									key: "resetPassword",
									label: "重置密码",
									onClick: () => {
										newPassword = "";
										Modal.confirm({
											title: "重置密码",
											content: (
												<div>
													<Input.Password
														onChange={(e) => {
															newPassword =
																e.target.value;
														}}
														placeholder="请输入新密码"
													/>
												</div>
											),
											onOk: () => {
												dpChain(
													"sysStore",
												).updateUserPasswordAct({
													id: record.id,
													password: newPassword,
												});
											},
										});
									},
								},
								{
									key: "delete",
									label: "删除",
									onClick: () => {
										Modal.confirm({
											title: "系统提示",
											content: "是否删除选中数据",
											onOk() {
												dpChain(
													"sysStore",
												).deleteUserAct({
													id: record.id,
												});
											},
										});
									},
								},
							],
						}}
						placement="bottomLeft"
					>
						<Button type="link">
							<DoubleRightOutlined />
							更多
						</Button>
					</Dropdown>
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
