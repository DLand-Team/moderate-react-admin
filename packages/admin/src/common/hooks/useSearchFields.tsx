import { Col, Form } from "antd";
import { RuleObject } from "antd/es/form";
import { cloneDeep } from "lodash-es";
import { useState } from "react";
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
	const [fields, setFields] = useState([]);
	return columns.map((item, index) => {
		const { config = {} } = item;
		let fieldConfigTemp = cloneDeep(config);
		const {
			searchFromRender,
			formOptions,
			isSearch = true,
		} = fieldConfigTemp;
		let InputItem;
		if (!isSearch) return;
		if (searchFromRender) {
			InputItem = searchFromRender;
		} else if (config) {
			if (formOptions?.rules) {
				formOptions.rules.forEach((a: RuleObject) => {
					if (a.required) {
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
