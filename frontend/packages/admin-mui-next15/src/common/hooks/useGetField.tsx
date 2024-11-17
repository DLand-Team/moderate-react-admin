import { Stack, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { UseFormReturn, WatchObserver } from "react-hook-form";
import React from "react";
import {
    FieldCheckboxProps,
    FieldMultiSelectProps,
    FieldSelectProps,
    FieldUploadProps,
} from "src/components/form";
import { FieldDatePickerProps } from "src/components/form/field-datePicker";
import { FieldEditorProps } from "src/components/form/field-editor";
import { FieldMulProps } from "src/components/form/field-mul";
import { FieldRadioGroupProps } from "src/components/form/field-radio-group";
import { FieldSwitchProps } from "src/components/form/field-switch";
import { FieldTextProps } from "src/components/form/field-text-field";
import { InputType, getField } from "../utils/getField";
import { FieldAutocompleteProps } from "src/components/form/field-autocompleteGoogle";

export type ReadonlyLoop<T> = {
    readonly [P in keyof T]: T[P] extends Record<PropertyKey, any>
        ? ReadonlyLoop<T[P]>
        : Readonly<T[P]>;
};

export type FieldConfig = {
    required?: boolean;
} & Partial<FieldAutocompleteProps> &
    Partial<FieldTextProps> &
    Partial<FieldSelectProps> &
    Partial<FieldUploadProps> &
    Partial<FieldDatePickerProps> &
    Partial<FieldCheckboxProps> &
    Partial<FieldEditorProps> &
    Partial<FieldMultiSelectProps> &
    Partial<FieldMulProps> &
    Partial<FieldRadioGroupProps> &
    Partial<FieldSwitchProps>;

export interface FormConfigItem {
    id?: string;
    prefix?: string | string[];
    customForm?: () => React.ReactNode;
    type?: InputType | "custom";
    schema?: any;
    defaultValue?: unknown;
    name?: string;
    label?: string | React.ReactNode; // 输入框的label
    labelMap?: { [key: string]: string };
    group?: string;
    isHidden?: boolean;
    wrapper?: (props: {
        children?: React.ReactNode;
        formMethods?: UseFormReturn | null;
        name?: string;
        currentConfig?: FormConfigItem;
    }) => React.ReactNode;
    fieldConfig?: FieldConfig;
    config?: {
        options?:
            | string[]
            | {
                  key: string | number;
                  value: string | number;
                  label: string | number;
                  info?: React.ReactNode;
              }[];
    };
    watch?:
        | ((props: {
              currentConfig: Omit<FormConfigItem, "watch">;
              values: Parameters<WatchObserver<any>>[0];
              info: Parameters<WatchObserver<any>>[1];
              api: UseFormReturn<any>;
          }) => void)
        | boolean;
    isNotInForm?: boolean;
}

export const useGetField = (methods: UseFormReturn | null = null) => {
    const getFieldByFormConfig = (keyBase: string, item: FormConfigItem) => {
        const {
            isHidden,
            type,
            label = keyBase,
            config,
            prefix = "",
            fieldConfig,
            wrapper,
        } = item;
        if (isHidden) return;
        let key = keyBase;
        if (prefix) {
            if (Array.isArray(prefix)) {
                let temp = [...prefix];
                temp.push(key);
                key = temp.join(".");
            } else {
                key = prefix + "." + key;
            }
        }
        let fieldNode = null;
        if (type === "select") {
            const FieldItem = getField(type);
            fieldNode = (
                <FieldItem {...fieldConfig} name={key} label={label} key={key}>
                    {config?.options?.map((item) => {
                        return (
                            <MenuItem
                                key={typeof item == "string" ? item : item.key}
                                value={
                                    typeof item == "string" ? item : item.value
                                }>
                                {typeof item == "string" ? item : item.label}
                            </MenuItem>
                        );
                    })}
                </FieldItem>
            );
        } else if (type === "editer") {
            const FieldItem = getField(type);
            fieldNode = (
                <Stack
                    sx={{
                        width: "100%",
                    }}
                    spacing={1.5}
                    key={key}>
                    <Typography variant="subtitle2">{label}</Typography>
                    <FieldItem {...fieldConfig} simple name={key} />
                </Stack>
            );
        } else if (type === "autoCompleteGoogle") {
            const FieldItem = getField(type);
            fieldNode = (
                <FieldItem
                    {...fieldConfig}
                    name={key}
                    label={label}
                    key={key}
                />
            );
        } else if (type === "checkbox") {
            const FieldItem = getField(type);
            fieldNode = (
                <FieldItem
                    {...fieldConfig}
                    name={key}
                    label={label}
                    key={key}
                />
            );
        } else if (type === "datePicker") {
            const FieldItem = getField(type);
            fieldNode = (
                <FieldItem
                    {...fieldConfig}
                    name={key}
                    label={label}
                    key={key}
                />
            );
        } else if (type === "multiple") {
            const FieldItem = getField(type);
            fieldNode = (
                <FieldItem
                    methods={methods!}
                    {...fieldConfig}
                    name={key}
                    key={key}
                />
            );
        } else if (type === "upload") {
            const FieldItem = getField(type);
            fieldNode = (
                <Stack
                    sx={{
                        width: "100%",
                    }}
                    spacing={1.5}>
                    <Typography variant="subtitle2">{label}</Typography>
                    <FieldItem {...fieldConfig} name={key} key={key} />
                </Stack>
            );
        } else if (type === "uploadBox") {
            const FieldItem = getField(type);
            fieldNode = (
                <Stack spacing={1.5}>
                    <Typography variant="subtitle2">{label}</Typography>
                    <FieldItem {...fieldConfig} name={key} key={key} />
                </Stack>
            );
        } else if (type === "uploadAvatar") {
            const FieldItem = getField(type);
            fieldNode = (
                <Stack spacing={1.5}>
                    <Typography variant="subtitle2">{label}</Typography>
                    <FieldItem {...fieldConfig} name={key} key={key} />
                </Stack>
            );
        } else if (type === "radio") {
            const FieldItem = getField(type);
            let options: { key: string; value: string; label: string }[] = [];
            if (
                config?.options?.length &&
                typeof config?.options[0] == "string"
            ) {
                options = config?.options.map((item) => {
                    return {
                        value: item,
                        key: item,
                        label: item,
                    } as { key: string; value: string; label: string };
                });
            } else {
                options = config?.options as {
                    key: string;
                    value: string;
                    label: string;
                }[];
            }
            fieldNode = (
                <Stack spacing={1.5}>
                    <Typography variant="subtitle2">{label}</Typography>
                    <FieldItem
                        options={options}
                        {...fieldConfig}
                        name={key}
                        key={key}
                    />
                </Stack>
            );
        } else if (type === "multiSelect") {
            const FieldItem = getField("multiSelect");
            fieldNode = (
                <Stack spacing={1.5}>
                    <Typography variant="subtitle2">{label}</Typography>
                    <FieldItem
                        {...(fieldConfig as FieldMultiSelectProps)}
                        name={key}
                        label={label as string}
                        key={key}
                    />
                </Stack>
            );
        } else if (type === "switch") {
            const FieldItem = getField("switch");
            fieldNode = (
                <Stack spacing={1.5}>
                    <FieldItem
                        {...(fieldConfig as FieldSwitchProps)}
                        name={key}
                        label={label as string}
                        key={key}
                    />
                </Stack>
            );
        } else {
            const FieldItem = getField("string");
            fieldNode = (
                <FieldItem
                    {...fieldConfig}
                    name={key}
                    label={label}
                    key={key}
                />
            );
        }
        if (wrapper) {
            let Wrapper = wrapper;
            return (
                <Wrapper
                    currentConfig={item}
                    name={key}
                    formMethods={methods}
                    key={key}>
                    {fieldNode}
                </Wrapper>
            );
        }
        return fieldNode;
    };
    return getFieldByFormConfig;
};
