import { Form, Modal } from "antd";
import { cloneDeep } from "lodash-es";
import React, { useEffect } from "react";
import { useFields } from "src/common/hooks/useFields";
import { useFlat } from "src/service";
import { DealEntity } from "src/service/stores/dealStore/model";
import { UserEntity } from "src/service/stores/userStore/model";
import useConfig from "../../useConfig";
const ModalForm: React.FC = () => {
	const [form] = Form.useForm<any>();
	const {
		isShowDeatilModal,
		setIsShowDeatilModal,
		currentData: recordData,
	} = useFlat("userStore");
	const config = useConfig(form);
	const FormFields = useFields<UserEntity>({
		config,
		form,
		isDetail: true,
	});

	useEffect(() => {
		if (recordData) {
			let recordDataTemp = cloneDeep(recordData);
			if (recordData) {
				//@ts-ignore
				recordDataTemp.ask = {
					partnerships: { partners: ["1", "2", "3"] },
				};
			}
			form.setFieldsValue(recordDataTemp);
		}
	}, [recordData]);
	let extraOptions = true
		? {
				footer: [],
			}
		: {};
	return (
		<Modal
			width={"60vw"}
			open={isShowDeatilModal}
			title={"Detail"}
			{...extraOptions}
			onCancel={() => {
				form.resetFields();
				setIsShowDeatilModal(false);
			}}
			onOk={async () => {
				setIsShowDeatilModal(false);
			}}
		>
			<Form<DealEntity> form={form} onFieldsChange={() => {}}>
				{FormFields}
			</Form>
		</Modal>
	);
};

export default ModalForm;
