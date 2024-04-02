import { Col } from "antd";
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
			inputAttrConfig,
			formOptions,
			isSearch = true,
		} = fieldConfigTemp;
		let InputItem;
		if (!isSearch) return;
		if (searchFromRender) {
			InputItem = searchFromRender;
			return (
				<Col span={Math.floor(24 / count!)} key={index}>
					<InputItem />
				</Col>
			);
		} else if (fieldConfig) {
			if (inputAttrConfig) {
				inputAttrConfig.disabled = false;
			}
			if (formOptions?.rules) {
				formOptions.rules.forEach((a: Rule) => {
					//@ts-ignore
					if (a.required) {
						//@ts-ignore
						a.required = false;
					}
				});
			}
			return (
				<Col span={Math.floor(24 / count!)} key={index}>
					<Field fieldConfig={fieldConfigTemp} formIns={form} />
				</Col>
			);
		}
	});
};

export default useSearchFields;
