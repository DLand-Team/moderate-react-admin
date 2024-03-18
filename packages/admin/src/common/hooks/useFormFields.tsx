import { MyColumnType } from "src/common/model/fieldsHooks";
import { Divider, Form, FormInstance } from "antd";
import { cloneDeep } from "lodash-es";
import { Fragment } from "react";
import { getFields } from "src/common/utils";

const useFormFields = <T,>(
	formList: MyColumnType<T>[],
	{ isJustShow, formIns }: { isJustShow: boolean; formIns: FormInstance<T> },
) => {
	let recordKeyObj = {};

	return formList.map((item) => {
		const { config } = item;
		const { formRender, formOptions } = config!;
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
		} else if (config) {
			config.inputOptions = cloneDeep(config.inputOptions || {});
			if (!("disabled" in config.inputOptions)) {
				if (isJustShow) {
					config.inputOptions.disabled = true;
				} else {
					config.inputOptions.disabled = false;
				}
			}
			InputItem = getFields<T>(config, formIns);
		}
		return (
			<Fragment key={item.key}>
				<>{temp}</>
				<Form.Item {...item.config.formOptions}>{InputItem}</Form.Item>
			</Fragment>
		);
	});
};

export default useFormFields;
