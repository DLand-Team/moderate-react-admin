import { useFormFields } from "src/common/hooks";
import { Form, Modal } from "antd";
import { useEffect, useRef } from "react";
import useConfig from "../../useConfig";
import { useFlat } from "src/reduxService";

const ModalForm: React.FC = () => {
	const [form] = Form.useForm<any>();
	const {
		addAct,
		updateAct,
		queryAct,
		refreshFormVersionAct,
		recordData,
		isDetail,
	} = useFlat("categoryStore");
	const { isShowModal, setIsShowModal } = useFlat("carrierStore");
	const { formList } = useConfig();
	const FormFields = useFormFields(formList, {
		formIns: form,
		isJustShow: isDetail,
	});
	debugger;
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
			open={isShowModal}
			title="add"
			{...extraOptions}
			onCancel={() => {
				form.resetFields();
				setIsShowModal(false);
			}}
			onOk={() => {
				form.validateFields()
					.then(async (values) => {
						let act = recordData ? updateAct : addAct;
						await act(values);
						setIsShowModal(false);
						form.resetFields();
						queryAct();
					})
					.catch((info) => {
						console.log("Validate Failed:", info);
					});
			}}
		>
			<Form<any>
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
