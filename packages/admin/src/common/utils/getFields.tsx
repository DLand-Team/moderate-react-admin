import {
	Checkbox,
	DatePicker,
	FormInstance,
	Input,
	InputNumber,
	Select,
	Switch,
	Upload,
} from "antd";
import { FieldConfig } from "../model/fieldsHooks";
const { TextArea } = Input;
const { RangePicker } = DatePicker;
export const getFields = <T,>(
	config: FieldConfig<T>,
	formIns?: FormInstance<T>,
) => {
	const { inputType, options, inputOptions = {} } = config;
	let FieldItem;
	if (inputType === "Select") {
		let optionsArr = [];
		if (typeof options == "function") {
			optionsArr = options({ formIns });
		} else {
			optionsArr = options || [];
		}
		FieldItem = (
			<Select allowClear {...inputOptions}>
				{optionsArr.map((item) => {
					let optionData: typeof item;
					if (typeof item == "object") {
						optionData = item;
					} else {
						optionData = {
							key: item,
							value: item,
							label: item,
						};
					}
					return (
						<Select.Option
							key={optionData.key}
							value={optionData.value}
						>
							{optionData.label}
						</Select.Option>
					);
				})}
			</Select>
		);
	} else {
		let InputItem =
			{
				Switch,
				Checkbox,
				InputNumber,
				RangePicker,
				TextArea,
				Upload,
			}[inputType] || Input;
		FieldItem = <InputItem {...inputOptions} />;
	}
	return FieldItem;
};
