import { Card, Form, Modal, notification, Switch, Tag } from "antd";
import { useEffect, useState } from "react";
import { useFlat } from "src/service";
import { Role, RoleModalType } from "src/service/stores/sysStore/model";
import MenuTree from "./menuTree";

const MenuModalForm = () => {
	const {
		roleModalType,
		setRoleModalType,
		currentRole,
		roleMenuPermissions,
		queryMenuListAct,
		assignRoleMenuAct,
		queryRoleMenuPermissionsAct,
	} = useFlat("sysStore");
	const [form] = Form.useForm<Role>();
	useEffect(() => {
		if (roleModalType === RoleModalType.MENU) {
			queryMenuListAct();
		}
	}, [roleModalType]);
	useEffect(() => {
		currentRole?.id &&
			queryRoleMenuPermissionsAct({ roleId: currentRole?.id });
		form.setFieldsValue(currentRole || {});
	}, [currentRole]);
	const handleClose = () => {
		setRoleModalType(RoleModalType.NONE);
		form.resetFields();
	};
	const chenckState = useState<React.Key[]>([]);
	useEffect(() => {
		chenckState[1](roleMenuPermissions as any);
	}, [roleMenuPermissions]);
	return (
		<Modal
			open={roleModalType == RoleModalType.MENU}
			title={"菜单权限"}
			okText="确定"
			cancelText="取消"
			onCancel={() => {
				handleClose();
			}}
			onClose={() => {}}
			onOk={() => {
				assignRoleMenuAct({
					roleId: currentRole!?.id,
					menuIds: chenckState[0] as any,
				});
				notification.success({
					message: "成功",
					description: "",
					showProgress: true,
					duration: 2,
					pauseOnHover: true,
				});
				handleClose();
			}}
		>
			<Form
				form={form}
				layout="vertical"
				initialValues={{
					name: "",
					code: "",
					sort: 0,
					status: 1, // Assuming 1 for 开启 and 0 for 停用
					remark: "",
				}}
			>
				<Form.Item label="角色名称" name="name">
					<Tag>{currentRole?.name}</Tag>
				</Form.Item>
				<Form.Item label="角色标识" name="code">
					<Tag>{currentRole?.code}</Tag>
				</Form.Item>
				<Form.Item label="菜单权限" name="menuIds">
					<Card
						style={{
							height: "60vh",
							overflow: "auto",
						}}
					>
						<div
							style={{
								display: "flex",
								// align items center
								alignItems: "center",
								borderBottom: "1px solid #eee",
								paddingBottom: "10px",
								gap: "20px",
								marginBottom: "10px",
							}}
						>
							<div>
								全选/全不选:
								<Switch
									style={{
										marginLeft: "10px",
									}}
								/>
							</div>
							<div>
								折叠/全展开:
								<Switch
									style={{
										marginLeft: "10px",
									}}
								/>
							</div>
						</div>
						<MenuTree chenckState={chenckState} />
					</Card>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default MenuModalForm;
