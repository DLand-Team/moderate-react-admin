import { Form, Input, Modal, notification, Select } from "antd";
import { useEffect } from "react";
import { useFlat } from "src/service";
import { Role, RoleModalType } from "src/service/stores/sysStore/model";

const DataModalForm = () => {
	const {
		roleModalType,
		setRoleModalType,
		currentRole,
		updateRoleAct,
		createRoleAct,
	} = useFlat("sysStore");
	const [form] = Form.useForm<Role>();

	useEffect(() => {
		form.setFieldsValue(currentRole || {});
	}, [currentRole]);
	const handleClose = () => {
		setRoleModalType(RoleModalType.NONE);
		form.resetFields();
	};
	return (
		<Modal
			open={roleModalType == RoleModalType.DATA}
			title={"数据权限"}
			okText="确定"
			cancelText="取消"
			onCancel={() => {
				handleClose();
			}}
			onClose={() => {}}
			onOk={() => {
				form.validateFields()
					.then((values) => {
						const api =
							roleModalType == RoleModalType.EDIT
								? updateRoleAct
								: createRoleAct;
						api({
							...currentRole,
							...values,
						});
						notification.success({
							message: "成功",
							description: "",
							showProgress: true,
							duration: 2,
							pauseOnHover: true,
						});
						handleClose();
					})
					.catch((info) => {
						console.log("Validate Failed:", info);
					});
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
				<Form.Item
					label="角色名称"
					name="name"
					rules={[{ required: true, message: "请输入角色名称" }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="角色标识"
					name="code"
					rules={[{ required: true, message: "请输入角色标识" }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="显示顺序"
					name="sort"
					rules={[{ required: true, message: "请输入显示顺序" }]}
				>
					<Input type="number" />
				</Form.Item>
				<Form.Item
					label="状态"
					name="status"
					rules={[{ required: true, message: "请选择状态" }]}
				>
					<Select>
						<Select.Option value={1}>开启</Select.Option>
						<Select.Option value={0}>停用</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item label="备注" name="remark">
					<Input.TextArea />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default DataModalForm;
