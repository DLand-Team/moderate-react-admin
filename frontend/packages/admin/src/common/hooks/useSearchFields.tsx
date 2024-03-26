import { Col, Form } from "antd";
import { Rule } from "antd/es/form";
import { cloneDeep } from "lodash-es";
import { MyColumnType } from "../model/fieldsHooks";
import { Field } from "../utils";

const useSearchFields = <T,>(
	columns: MyColumnType<T>[],
	options: {
		count?: number;
		form?: any;
	} = { count: 4 },
) => {
	const { count, form } = options;
	return columns.map((item, index) => {
		const { fieldConfig = {} } = item;
		let fieldConfigTemp = cloneDeep(fieldConfig);
		const {
			searchFromRender,
			formOptions,
			isSearch = true,
		} = fieldConfigTemp;
		let InputItem;
		if (!isSearch) return;
		if (searchFromRender) {
			InputItem = searchFromRender;
		} else if (fieldConfig) {
			if (formOptions?.rules) {
				formOptions.rules.forEach((a: Rule) => {
					//@ts-ignore
					if (a.required) {
						//@ts-ignore
						a.required = false;
					}
				});
			}
			InputItem = <Field fieldConfig={fieldConfigTemp} formIns={form} />;
		}
		return (
			<Col span={Math.floor(24 / count!)} key={index}>
				<Form.Item {...formOptions} hidden={!isSearch}>
					{InputItem}
				</Form.Item>
			</Col>
		);
	});
};

export default useSearchFields;
