import { getFields } from "src/common/utils";
import { Col, Form } from "antd";
import { RuleObject } from "antd/es/form";
import { cloneDeep } from "lodash-es";
import { useEffect, useState } from "react";
import { MyColumnType } from "../model/fieldsHooks";

const useSearchFields = <T,>(
	columns: MyColumnType<T>[],
	options: {
		count?: number;
	} = { count: 4 },
) => {
	const { count } = options;
	const [fields, setFields] = useState([]);
	useEffect(() => {
		let temp = [];
		for (let i = 0; i < columns.length; i++) {
			const { config = {} } = columns[i];
			let fieldConfigTemp = cloneDeep(config);
			const {
				searchFromRender,
				formOptions,
				isSearch = true,
			} = fieldConfigTemp;
			let InputItem;
			if (!isSearch) continue;
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
				InputItem = getFields(fieldConfigTemp);
			}
			temp.push(
				<Col span={Math.floor(24 / count!)} key={i}>
					<Form.Item {...formOptions} hidden={!isSearch}>
						{InputItem}
					</Form.Item>
				</Col>,
			);
		}
		setFields(temp);
	}, []);

	return fields;
};

export default useSearchFields;
