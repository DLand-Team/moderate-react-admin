import { MyColumnType } from "@/common/model/fieldsHooks";
import { Divider, Form, FormInstance } from "antd";
import { cloneDeep } from "lodash-es";
import { Fragment } from "react";
import { getFields } from "@/common/utils";

const useFormFields = <T,>(
	formList: MyColumnType<T>[],
	{ isJustShow, formIns }: { isJustShow: boolean; formIns: FormInstance<T> },
) => {
	let recordKeyObj = {};

	return formList.map((item, index) => {
		const { fieldConfig } = item;
		const { formRender, formOptions } = fieldConfig;
		const { name } = formOptions;
		let temp = [];
		if (Array.isArray(name)) {
			let nameArr = name.slice(0, -1);

			nameArr.forEach((nameItem, index) => {
				if (!recordKeyObj[nameItem]) {
					recordKeyObj[nameItem] = true;
					temp.push(
						<Divider
							key={`${index} ${nameItem}`}
							orientation="left"
						>
							{index === 0 ? (
								<h3>{nameItem}</h3>
							) : (
								<h5>{nameItem}</h5>
							)}
						</Divider>,
					);
				}
			});
		}
		let InputItem;
		if (formRender) {
			InputItem = formRender;
		} else if (fieldConfig) {
			if (isJustShow) {
				fieldConfig.inputOptions = cloneDeep(
					fieldConfig.inputOptions || {},
				);
				fieldConfig.inputOptions.disabled = true;
			}
			InputItem = getFields<T>(fieldConfig, formIns);
		}
		return (
			<Fragment key={item.key}>
				<>{temp}</>
				<Form.Item {...item.fieldConfig.formOptions}>
					{InputItem}
				</Form.Item>
			</Fragment>
		);
	});
};

export default useFormFields;
