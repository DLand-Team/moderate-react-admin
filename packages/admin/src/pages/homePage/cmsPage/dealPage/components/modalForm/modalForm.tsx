import { useFormFields } from "@/common/hooks";
import { Form, Modal } from "antd";
import { useEffect } from "react";
import { useStore } from "../../services/pageStore";
import { PageType } from "../../services/pageStore/model";
import { useFromConfig } from "../../useConfig";
import { merge } from "lodash-es";
const ModalForm: React.FC = () => {
	const [form] = Form.useForm<PageType>();
	const {
		setAddModalShowAct,
		addAct,
		updateAct,
		queryAct,
		recordData,
		pageNum,
		pageSize,
		isShowAddModal,
		isDetail,
	} = useStore()[0];
	const { formList } = useFromConfig();
	//TODO 根据不同的类型，显示不同的form数据
	//
	// 配置类型吧
	// 什么类型，对应什么结构
	const FormFields = useFormFields(formList, {
		formIns: form,
		isJustShow: isDetail,
	});
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
				setAddModalShowAct(false);
			}}
			onOk={() => {
				form.validateFields()
					.then(async (values) => {
						let act = recordData ? updateAct : addAct;
						let result = merge(recordData, values);
						await act(values);
						setAddModalShowAct(false);
						form.resetFields();
						queryAct({ page: pageNum, page_size: pageSize });
					})
					.catch((info) => {
						console.log("Validate Failed:", info);
					});
			}}
		>
			<Form<PageType> form={form} onFieldsChange={(values, old) => {}}>
				{FormFields}
			</Form>
		</Modal>
	);
};

export default ModalForm;
