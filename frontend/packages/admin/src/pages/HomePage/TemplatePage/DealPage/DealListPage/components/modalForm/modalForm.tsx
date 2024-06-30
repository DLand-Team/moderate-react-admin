import { Form, Modal } from "antd";
import { cloneDeep, merge } from "lodash-es";
import React, { useEffect } from "react";
import { useFields } from "src/common/hooks/useFields";
import { useFlat } from "src/service";
import { DealEntity } from "src/service/stores/dealStore/model";
import useConfig from "../../useConfig";
const ModalForm: React.FC = () => {
	const [form] = Form.useForm<any>();
	const {
		setIsAddModalShow,
		recordData,
		isShowAddModal,
		isDetail,
		queryDealListAct,
		updateAct,
	} = useFlat("dealStore");
	const config = useConfig(form);
	const FormFields = useFields<DealEntity>({
		config,
		form,
		isDetail,
	});

	useEffect(() => {
		if (recordData) {
			let recordDataTemp = cloneDeep(recordData);
			form.setFieldsValue(recordDataTemp);
		}
	}, [recordData]);
	let extraOptions = isDetail
		? {
				footer: [],
			}
		: {};
	return (
		<Modal
			width={"60vw"}
			open={isShowAddModal}
			title={recordData ? "Update" : "Add"}
			{...extraOptions}
			onCancel={() => {
				form.resetFields();
				setIsAddModalShow({ isShowAddModal: false });
			}}
			onOk={async () => {
				await form.validateFields();
				const values = form.getFieldsValue();
				let result = merge(cloneDeep(recordData), values);
				await updateAct(result);
				setIsAddModalShow({
					isShowAddModal: false,
				});
				form.resetFields();
				queryDealListAct();
			}}
		>
			<Form<DealEntity> form={form} onFieldsChange={() => {}}>
				{FormFields}
			</Form>
		</Modal>
	);
};

export default ModalForm;
