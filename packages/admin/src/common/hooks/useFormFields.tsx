import { MyColumnType } from "src/common/model/fieldsHooks";
import { Divider, Form, FormInstance } from "antd";
import { cloneDeep } from "lodash-es";
import { Fragment } from "react";
import { getField } from "src/common/utils";

const useFormFields = <T,>(
	formList: MyColumnType<T>[],
	{ isJustShow, formIns }: { isJustShow: boolean; formIns: FormInstance<T> },
) => {
	let recordKeyObj: Record<PropertyKey, any> = {};

	return formList
		.filter((item) => item.fieldConfig)
		.map((item) => {
			const { fieldConfig = {}, config } = item;
			const { formRender, formOptions } = fieldConfig! || config || {};
			const { name } = formOptions!;
			let temp: any = [];
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
				InputItem = formRender();
			} else if (fieldConfig) {
				fieldConfig.inputAttrConfig = cloneDeep(
					fieldConfig.inputAttrConfig || {},
				);
				if (!("disabled" in fieldConfig.inputAttrConfig)) {
					if (isJustShow) {
						fieldConfig.inputAttrConfig.disabled = true;
					} else {
						fieldConfig.inputAttrConfig.disabled = false;
					}
				}
				InputItem = getField<T>(fieldConfig, formIns);
			}
			return (
				<Fragment key={item.key}>
					<>{temp}</>
					<Form.Item {...item.config?.formOptions}>
						{InputItem}
					</Form.Item>
				</Fragment>
			);
		});
};

export default useFormFields;
