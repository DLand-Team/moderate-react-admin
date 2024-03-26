import {
	FormItemProps,
	SelectProps,
	InputProps,
	FormInstance,
	CheckboxProps,
	SwitchProps,
	UploadProps,
	InputNumberProps,
} from "antd";
import { TextAreaProps } from "antd/lib/input/TextArea";
import { ColumnType } from "antd/es/table";
import { Input } from "antd";
Input.TextArea;
export type MyInputType =
	| "Input"
	| "Select"
	| "Switch"
	| "Checkbox"
	| "Upload"
	| "TextArea"
	| "RangePicker"
	| "InputNumber";
export type ScopeType = "table" | "modal" | "search";

export type FieldConfigOptions = (
	| string
	| { key: string | number; value: string | number; label: string | number }
)[];
export interface FieldConfig<T = any> {
	label?: string;
	name?: string;
	type?: MyInputType;
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
	render?: any;
}

export interface MyColumnType<T> extends ColumnType<T> {
	config?: FieldConfig<T>;
	fieldConfig?: FieldConfig<T>;
}

