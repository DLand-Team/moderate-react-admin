import {
	Checkbox,
	CheckboxProps,
	DatePicker,
	Form,
	FormInstance,
	FormItemProps,
	Input,
	InputNumber,
	InputNumberProps,
	InputProps,
	Select,
	SelectProps,
	Switch,
	SwitchProps,
	Upload,
	UploadProps,
} from "antd";
import { TextAreaProps } from "antd/es/input/TextArea";
import { ColumnType } from "antd/es/table";
import { useEffect, useRef } from "react";
export type ScopeType = "table" | "modal" | "search";
export type FieldType =
	| "Input"
	| "Select"
	| "Switch"
	| "Checkbox"
	| "Upload"
	| "TextArea"
	| "RangePicker"
	| "InputNumber";

export type FieldConfigOptions = (
	| string
	| number
	| { key: string | number; value: string | number; label: string | number }
)[];

export interface FieldConfig<T = any> {
	label?: string;
	type?: FieldType;
	options?:
		| FieldConfigOptions
		| ((props?: { formIns?: FormInstance<T> }) => FieldConfigOptions);
	formOptions?: FormItemProps;
	inputAttrConfig?: SelectProps &
		InputProps &
		CheckboxProps &
		SwitchProps &
		UploadProps &
		InputNumberProps &
		TextAreaProps;
	searchFromRender?: () => JSX.Element;
	formRender?: () => JSX.Element;
	isHidenInTable?: boolean;
	isSearch?: boolean;
	scope?: ScopeType[];
	render?: (
		item: FieldConfig<T>,
		formIns: FormInstance<T>,
	) => React.ReactNode;
	watch?: (values: T, oldValues: T) => void;
}

const { TextArea } = Input;
const { RangePicker } = DatePicker;

export const Field = <T = any,>({
	fieldConfig,
	formIns,
}: {
	fieldConfig: FieldConfig<T>;
	formIns: FormInstance<T>;
}) => {
	const {
		render,
		type,
		options,
		inputAttrConfig = {},
		formOptions,
		watch,
	} = fieldConfig;
	let FieldItem;
	const record = useRef<T>();
	const watchState = Form.useWatch((values) => values, formIns);
	useEffect(() => {
		if (watch) {
			watch?.(watchState, record.current!);
			record.current = formIns.getFieldsValue();
		}
	}, [watchState]);
	if (render) {
		return render(fieldConfig, formIns);
	}
	if (type === "Select") {
		let optionsArr = [];
		if (typeof options == "function") {
			optionsArr = options({ formIns });
		} else {
			optionsArr = options || [];
		}
		FieldItem = (
			<Select allowClear {...inputAttrConfig}>
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
		const InputItem: any = type
			? {
					Switch,
					Checkbox,
					InputNumber,
					RangePicker,
					TextArea,
					Upload,
					Input,
				}[type]
			: Input;
		FieldItem = <InputItem {...inputAttrConfig} />;
	}
	return <Form.Item {...formOptions}>{FieldItem}</Form.Item>;
};
export const getField = <T = any,>(
	fieldConfig: FieldConfig<T>,
	formIns: FormInstance<T>,
) => {
	const {
		render,
		type,
		options,
		inputAttrConfig = {},
		formOptions,
		watch,
	} = fieldConfig;
	let FieldItem;
	const record = useRef<T>();
	const watchState = Form.useWatch((values) => values, formIns);
	useEffect(() => {
		watch?.(watchState, record.current!);
		record.current = formIns.getFieldsValue();
	}, [watchState]);
	if (render) {
		return render(fieldConfig, formIns);
	}
	if (type === "Select") {
		let optionsArr = [];
		if (typeof options == "function") {
			optionsArr = options({ formIns });
		} else {
			optionsArr = options || [];
		}
		FieldItem = (
			<Select allowClear {...inputAttrConfig}>
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
		const InputItem: any = type
			? {
					Switch,
					Checkbox,
					InputNumber,
					RangePicker,
					TextArea,
					Upload,
					Input,
				}[type]
			: Input;
		FieldItem = <InputItem {...inputAttrConfig} />;
	}
	return <Form.Item {...formOptions}>{FieldItem}</Form.Item>;
};

export interface MyColumnType<T> extends ColumnType<T> {
	config?: FieldConfig<T>;
	fieldConfig?: FieldConfig<T>;
}
