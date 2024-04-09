import { Form, Modal } from "antd";
import { useEffect } from "react";
import { useFormFields } from "src/common/hooks";
import { useFlat } from "src/reduxService";
import { PageType } from "../../../../../../../plugins/plugin1/services/dealStore/model";
import useConfig from "../../useConfig";
const ModalForm: React.FC = () => {
	const [form] = Form.useForm<any>();
	const {
		setIsAddModalShow,
		addAct,
		updateAct,
		queryAct,
		recordData,
		pageNum,
		pageSize,
		isShowAddModal,
		isDetail,
	} = useFlat("dealStore");
	const { formList } = useConfig();
	//TODO 根据不同的类型，显示不同的form数据
	//
	// 配置类型吧
	// 什么类型，对应什么结构
	const FormFields = useFormFields(formList, {
		formIns: form,
		isJustShow: isDetail,
	});
	;
	useEffect(() => {
		if (recordData) {
			form.setFieldsValue(recordData);
		}
	}, [recordData]);
	let extraOptions = isDetail
		? {
				footer: [],
			}
		: {};
	return (
		<Modal
			open={isShowAddModal}
			title={recordData ? "Update" : "Add"}
			{...extraOptions}
			onCancel={() => {
				form.resetFields();
				setIsAddModalShow({ isShowAddModal: false });
			}}
			onOk={() => {
				form.validateFields()
					.then(async (values) => {
						let act = recordData ? updateAct : addAct;
						// let result = merge(recordData, values);
						await act(values);
						setIsAddModalShow({
							isShowAddModal: false,
						});
						form.resetFields();
						queryAct({ page: pageNum, page_size: pageSize });
					})
					.catch((info) => {
						console.log("Validate Failed:", info);
					});
			}}
		>
			<Form<PageType> form={form} onFieldsChange={() => {}}>
				{FormFields}
			</Form>
		</Modal>
	);
};

export default ModalForm;
