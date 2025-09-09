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
import { Rule } from "antd/es/form";
import { TextAreaProps } from "antd/es/input/TextArea";
import { ColumnType } from "antd/es/table";
import MultipleFieldObj from "src/components/fields/multipleFieldObj";
import MultipleFieldOne from "src/components/fields/multipleFieldOne";
import React, { useEffect, useRef, type JSX } from "react";

export type ScopeType = "table" | "modal" | "search";
export type FieldType =
  | "Input"
  | "Select"
  | "Switch"
  | "Checkbox"
  | "Upload"
  | "TextArea"
  | "RangePicker"
  | "InputNumber"
  | "MultipleOne"
  | "MultipleObj";

export type FieldConfigOptions = (
  | string
  | number
  | { key: string | number; value: string | number; label: string | number }
)[];

export type CustomFieldRender<T> = (
  item: FieldConfig<T>,
  formIns: FormInstance<T>,
) => React.ReactElement<any>;

export interface FieldConfig<T = any> {
  label?: string;
  type?: FieldType;
  options?:
    | FieldConfigOptions
    | ((props?: { formIns?: FormInstance<T> }) => FieldConfigOptions);
  formOptions?: FormItemProps & { childRule?: Rule[] };
  childFieldConfig?: Record<PropertyKey, FieldConfig>;
  inputAttrConfig?: SelectProps &
    InputProps &
    CheckboxProps &
    SwitchProps &
    UploadProps &
    InputNumberProps &
    TextAreaProps;
  searchFromRender?: () => JSX.Element;
  formRender?: () => JSX.Element;
  isHideInTable?: boolean;
  isSearch?: boolean;
  scope?: ScopeType[];
  render?: CustomFieldRender<T>;
  watch?: (values: T, oldValues: T) => void;
}

export interface MyColumnType<T> extends ColumnType<T> {
  config?: FieldConfig<T>;
  fieldConfig?: FieldConfig<T>;
  editable?: boolean;
}

const { TextArea } = Input;
const { RangePicker } = DatePicker;

export const Field = <T,>({
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
  const watchState = Form.useWatch((values) => values, formIns);
  const oldRecord = useRef<T | undefined>(undefined);
  useEffect(() => {
    watch?.(watchState, oldRecord.current!);
    oldRecord.current = formIns?.getFieldsValue();
  }, [watchState]);
  let FieldItem;
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
            <Select.Option key={optionData.key} value={optionData.value}>
              {optionData.label}
            </Select.Option>
          );
        })}
      </Select>
    );
  } else if (type === "MultipleOne") {
    return <MultipleFieldOne fieldConfig={fieldConfig} formIns={formIns} />;
  } else if (type === "MultipleObj") {
    return <MultipleFieldObj fieldConfig={fieldConfig} formIns={formIns} />;
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
