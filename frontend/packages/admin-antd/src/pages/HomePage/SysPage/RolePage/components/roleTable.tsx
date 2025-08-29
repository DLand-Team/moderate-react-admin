import type { PaginationProps, TableColumnsType } from "antd";
import { Checkbox, Modal, Table, Tag } from "antd";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { dpChain, useFlat } from "src/service";
import { Role, RoleModalType } from "src/service/stores/sysStore/model";

export const columns: TableColumnsType<Role> = [
	{
		title: "角色编号",
		dataIndex: "id",
		key: "id",
		width: 100,
	},
	{
		title: "角色名称",
		dataIndex: "name",
		key: "name",
		width: 150,
	},
	{
		title: "角色类型",
		dataIndex: "type",
		key: "type",
		width: 100,
		render: (type: number) => (
			<Tag color={type === 1 ? "blue" : "green"}>
				{type === 1 ? "内置" : "自定义"}
			</Tag>
		),
	},
	{
		title: "角色标识",
		dataIndex: "code",
		key: "code",
		width: 150,
	},
	{
		title: "显示顺序",
		dataIndex: "sort",
		key: "sort",
		width: 100,
	},
	{
		title: "备注",
		dataIndex: "remark",
		key: "remark",
		width: 150,
	},
	{
		title: "状态",
		dataIndex: "status",
		key: "status",
		width: 100,
		render: (status: number) => (
			<Checkbox checked={status === 0}>
				{status === 0 ? "开启" : "关闭"}
			</Checkbox>
		),
	},
	{
		title: "创建时间",
		dataIndex: "createTime",
		key: "createTime",
		width: 200,
		render: (createTime: number) =>
			dayjs(createTime).format("YYYY-MM-DD HH:mm:ss"),
	},
	{
		// action
		title: "操作",
		key: "action",
		width: 250,
		render: (_, record) => {
			const handleClick = (type: RoleModalType) => {
				dpChain("sysStore").queryRoleAct({
					id: record.id,
				});
				dpChain("sysStore").setRoleModalType(type);
				if (type === RoleModalType.NONE) {
					dpChain("sysStore").setCurrentRole(null);
				}
			};
			return (
				<>
					<a onClick={() => handleClick(RoleModalType.EDIT)}>编辑</a>
					<a
						onClick={() => handleClick(RoleModalType.MENU)}
						style={{ marginLeft: 8 }}
					>
						菜单权限
					</a>
					<a
						onClick={() => handleClick(RoleModalType.DATA)}
						style={{ marginLeft: 8 }}
					>
						数据权限
					</a>
					<a
						onClick={() => {
							Modal.confirm({
								title: "系统提示",
								content: "是否删除选中数据",
								onOk() {
									dpChain("sysStore").deleteUserAct({
										id: record.id,
									});
								},
							});
						}}
						style={{ marginLeft: 8 }}
					>
						删除
					</a>
				</>
			);
		},
	},
];

const showTotal: PaginationProps["showTotal"] = (total) => `共 ${total} 条数据`;

const UserTable: React.FC = () => {
	const { roleList, queryRoleListAct, rolePagination } = useFlat("sysStore");
	useEffect(() => {
		queryRoleListAct();
	}, []);
	return (
		<Table<Role>
			columns={columns}
			dataSource={roleList}
			rowKey={"id"}
			scroll={{ x: 1000 }}
			pagination={{
				showSizeChanger: true,
				showTotal: showTotal,
				showQuickJumper: true,
				...rolePagination,
			}}
		/>
	);
};

export default UserTable;
