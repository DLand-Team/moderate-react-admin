import { Form, Input, Modal, notification } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFlat } from "src/service";
import { ModalType, User } from "src/service/stores/sysStore/model";

const ModalForm = () => {
	const { t } = useTranslation();
	const {
		userModalType,
		setUserModalType,
		setCurrentUser,
		currentUser,
		updateUserAct,
		createUserAct,
	} = useFlat("sysStore");
	const [form] = Form.useForm<User>();
	useEffect(() => {
		form.setFieldsValue(currentUser || {});
	}, [currentUser]);
	const handleClose = () => {
		setUserModalType(ModalType.NONE);
		form.resetFields();
		if (userModalType == ModalType.EDIT) {
			setCurrentUser(null);
		}
	};
	return (
		<Modal
			open={!!userModalType}
			title="新建路由"
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
							userModalType == ModalType.EDIT
								? updateUserAct
								: createUserAct;
						api({
							...currentUser,
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
				name="form_in_modal"
				initialValues={{ modifier: "public" }}
			>
				<Form.Item name={"name"} label={t("menu:menuName")}>
					<Input disabled />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default ModalForm;
