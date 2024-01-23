import { useFormFields } from "@/common/hooks";
import { Form, Modal } from "antd";
import { useEffect } from "react";
import { useStore } from "../../services/pageStore";
import { PageType } from "../../services/pageStore/model";
import useConfig from "../../useConfig";

const ModalForm: React.FC = () => {
	const [form] = Form.useForm<PageType>();
	const {
		setAddModalShowAct,
		addAct,
		updateAct,
		queryAct,
		recordData,
		isShowAddModal,
		isDetail,
	} = useStore()[0];
	const { formList } = useConfig();
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
			title="add"
			{...extraOptions}
			onCancel={() => {
				form.resetFields();
				setAddModalShowAct(false);
			}}
			onOk={() => {
				form.validateFields()
					.then(async (values) => {
						let act = recordData ? updateAct : addAct;
						await act(values);
						setAddModalShowAct(false);
						form.resetFields();
						queryAct();
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
