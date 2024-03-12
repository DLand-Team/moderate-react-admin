import { FormItemProps, SelectProps, InputProps, FormInstance } from "antd";
import { ColumnType } from "antd/es/table";

export type MyInputType = "Input" | "Select" | "Switch";
export type ScopeType = "table" | "modal" | "search";

export type FieldConfigOptions = (
	| string
	| { key: string|number; value: string|number; label: string|number }
)[];
export interface FieldConfig<T> {
	inputType?: MyInputType;
	options?:
		| FieldConfigOptions
		| ((props?: { formIns?: FormInstance<T> }) => FieldConfigOptions);
	formOptions?: FormItemProps;
	inputOptions?: SelectProps & InputProps;
	searchFromRender?: () => JSX.Element;
	formRender?: () => JSX.Element;
	isHidenInTable?: boolean;
	isSearch?: boolean;
	scope?: ScopeType[];
}

export interface MyColumnType<T> extends ColumnType<T> {
	fieldConfig?: FieldConfig<T>;
}
