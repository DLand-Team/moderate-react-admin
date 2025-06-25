import {
	Form,
	Input,
	InputNumber,
	Modal,
	notification,
	Radio,
	Select,
	TreeSelect,
} from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "src/i18n";
import { useFlat } from "src/service";
import { MenuItemData } from "src/service/stores/authStore/model";

const options = [
	{ label: i18n.t("menu:menuType_group"), value: 1 },
	{ label: i18n.t("menu:menuType_menu"), value: 2 },
	{ label: i18n.t("menu:menuType_link"), value: 3 },
];

const ModalForm = () => {
	const { t } = useTranslation();
	const { routesMap } = useFlat("routerStore");
	const {
		menuTreeData,
		menuListData,
		updateMenuAct,
		createMenuAct,
		currentEditMenuData,
		setCurrentEditMenuData,
		modalType,
		setModalType,
	} = useFlat("authStore");
	const [form] = Form.useForm<MenuItemData>();
	useEffect(() => {
		form.setFieldsValue(currentEditMenuData || {});
	}, [currentEditMenuData]);
	const handleClose = () => {
		setModalType("");
		form.resetFields();
		if (modalType == "edit") {
			setCurrentEditMenuData(null);
		}
	};
	return (
		<Modal
			open={!!modalType}
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
						const {
							componentName,
							sort,
							type,
							name,
							parentId,
							status,
						} = values;
						const api =
							modalType == "edit" ? updateMenuAct : createMenuAct;
						api({
							...currentEditMenuData,
							componentName,
							path: componentName,
							sort,
							type: Number(type),
							name,
							parentId,
							status,
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
				<Form.Item
					name="parentId"
					label={t("menu:parentMenu")}
					rules={[
						{
							required: true,
							message: "请输入!",
						},
					]}
				>
					<TreeSelect
						showSearch
						style={{ width: "100%" }}
						dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
						placeholder="Please select"
						allowClear
						treeData={[
							{
								id: "0",
								name: "主类目",
								children: menuTreeData as any,
							},
						]}
						fieldNames={{
							label: "name",
							value: "id",
						}}
					/>
				</Form.Item>
				<Form.Item
					rules={[
						{
							required: true,
							message: "请输入!",
						},
					]}
					name={"name"}
					label={t("menu:menuName")}
				>
					<Input />
				</Form.Item>

				<Form.Item
					rules={[
						{
							required: true,
							message: "请输入!",
						},
					]}
					name={"type"}
					label={t("menu:menuType")}
				>
					<Radio.Group
						options={options}
						optionType="button"
						buttonStyle="solid"
					/>
				</Form.Item>

				<Form.Item
					name={"componentName"}
					label={t("menu:componentName")}
				>
					<Select
						showSearch
						options={Object.values(routesMap)
							.filter((routeItem) => {
								return !menuListData?.find((item) => {
									return item.componentName == routeItem.id;
								});
							})
							.map((item) => {
								return {
									value: item.id,
									label: item.id,
								};
							})}
					></Select>
				</Form.Item>
				<Form.Item
					rules={[
						{
							required: true,
							message: "请输入!",
						},
					]}
					name={"sort"}
					label={t("menu:menuSort")}
				>
					<InputNumber type="number" />
				</Form.Item>
				<Form.Item
					rules={[
						{
							required: true,
							message: "请输入!",
						},
					]}
					name={"status"}
					label={t("menu:menuStatus")}
					initialValue={0}
				>
					<Radio.Group
						options={[
							{
								label: t("menu:menuStatus_off"),
								value: 1,
							},
							{
								label: t("menu:menuStatus_on"),
								value: 0,
							},
						]}
					></Radio.Group>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default ModalForm;
