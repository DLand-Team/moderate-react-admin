import { useFormFields } from "src/common/hooks";
import { Form, Modal } from "antd";
import { useEffect, useRef } from "react";
import useConfig from "../../useConfig";
import { useFlat } from "src/reduxService";
import { PageType } from "../../../services/model";

const ModalForm: React.FC = () => {
	const [form] = Form.useForm<PageType>();
	const {
		setAddModalShowAct,
		addAct,
		updateAct,
		queryAct,
		refreshFormVersionAct,
		recordData,
		isShowAddModal,
		isDetail,
	} = useFlat("posStore");
	const { formList } = useConfig();
	const FormFields = useFormFields(formList, {
		formIns: form,
		isJustShow: isDetail,
	});
	useEffect(() => {
		if (recordData) {
			form.setFieldsValue(recordData);
			refreshFormVersionAct();
		}
	}, [recordData]);
	let extraOptions = isDetail
		? {
				footer: [],
			}
		: {};
	const prime_id = useRef();
	return (
		<Modal
			open={isShowAddModal}
			title="add"
			{...extraOptions}
			onCancel={() => {
				form.resetFields();
				setAddModalShowAct({ isShowAddModal: false });
			}}
			onOk={() => {
				form.validateFields()
					.then(async (values) => {
						let act = recordData ? updateAct : addAct;
						await act(values);
						setAddModalShowAct({ isShowAddModal: false });
						form.resetFields();
						queryAct();
					})
					.catch((info) => {
						console.log("Validate Failed:", info);
					});
			}}
		>
			<Form<PageType>
				form={form}
				onFieldsChange={(values) => {
					// 当prime_id表单修改，并且修改新的值和旧的值不一样的时候，清空parent_id
					if (
						values[0].name === "prime_id" &&
						prime_id.current !== values[0].value
					) {
						prime_id.current = values[0].value;
						form.setFieldValue("parent_id", "");
					}
					refreshFormVersionAct();
				}}
			>
				{FormFields}
			</Form>
		</Modal>
	);
};

export default ModalForm;
