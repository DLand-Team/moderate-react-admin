import { Button, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, UseFormReturn, useFormContext } from "react-hook-form";
import {
    FieldConfig,
    FormConfig,
    FormConfigItem,
    useGetField,
} from "src/common/hooks";
import { uuidv4 } from "src/common/utils";
import { Iconify } from "../iconify";

// ----------------------------------------------------------------------

export type FieldMulProps = {
    name: string;
    childFieldConfig?: FormConfig | FormConfigItem;
    mulType?: "one" | "obj";
    placeholder?: string;
    addLabel?: string; // add btn label
    itemFieldConfig?: FieldConfig;
    methods?: UseFormReturn;
    max?: number;
};

export default function FieldMul(props: FieldMulProps) {
    const {
        name,
        mulType = "one",
        addLabel,
        itemFieldConfig,
        childFieldConfig,
        max,
    } = props;
    const { setValue, getValues, unregister, register } = useFormContext();
    const { control } = useFormContext();
    let value = getValues(name);
    const [arr, setArr] = useState([{ id: uuidv4(), label: name }]);
    useEffect(() => {
        value &&
            Array.isArray(value) &&
            setArr(
                value?.map?.(() => {
                    return { id: uuidv4(), label: name };
                })
            );
    }, []);
    const getField = useGetField();
    let comp;
    const fields = arr.map((entity, index) => {
        const { id } = entity;
        let itemName = `${name}.${index}`;
        let fields: any;
        if (mulType == "one") {
            fields = childFieldConfig
                ? getField(itemName, childFieldConfig)
                : getField(itemName, {
                      label:
                          itemFieldConfig?.placeholder ||
                          itemFieldConfig?.label,
                      fieldConfig: itemFieldConfig || props,
                  });
            comp = (
                <Stack
                    sx={{
                        marginBottom: "10px",
                    }}
                    direction="row"
                    key={id}>
                    {fields}
                    <IconButton
                        sx={{
                            width: "51px",
                            height: "51px",
                        }}
                        onClick={(_) => {
                            if (arr.length <= 1) {
                                return;
                            }
                            let temp = [...arr];
                            const targetId = arr.findIndex((item) => {
                                return item.id === id;
                            });
                            temp.splice(targetId, 1);
                            let formValue = [...getValues(name)];
                            // 删除值
                            formValue.splice(targetId, 1);
                            unregister(`${name}`, {
                                keepDefaultValue: false,
                                keepDirty: false,
                            });
                            for (let i in temp) {
                                unregister(`${name}.${i}`, {
                                    keepDefaultValue: false,
                                    keepDirty: false,
                                });
                            }
                            register(`${name}`);
                            for (let i in temp) {
                                register(`${name}.${i}`);
                            }
                            setValue(`${name}`, formValue);
                            formValue.forEach((value, index) => {
                                setValue(`${name}.${index}`, value);
                            });
                            setArr(temp);
                        }}>
                        <Iconify icon={"icon-park-outline:delete"} />
                    </IconButton>
                </Stack>
            );
        } else if (childFieldConfig) {
            fields = Object.entries(childFieldConfig).map(([key, value]) => {
                (value as any).name = `${itemName}.${key}`;
                let temp: any = { ...value };
                if (value.labelMap?.[index]) {
                    temp.label = value.labelMap?.[index];
                }
                return (
                    <Stack
                        key={(value as any).name}
                        sx={{
                            mb: 2,
                            width: "100%",
                        }}
                        direction="row">
                        {getField(`${itemName}.${key}`, temp)}
                    </Stack>
                );
            });
            comp = (
                <Stack
                    className="mulItem"
                    sx={{
                        width: "100%",
                    }}
                    key={id}>
                    {fields}
                    <Stack
                        sx={{
                            width: "100%",
                            mb: 2,
                        }}
                        direction="row">
                        <IconButton
                            sx={{}}
                            onClick={(_) => {
                                if (arr.length <= 1) {
                                    return;
                                }
                                let temp = [...arr];
                                const targetId = arr.findIndex((item) => {
                                    return item.id === id;
                                });
                                temp.splice(targetId, 1);
                                let formValue = [...getValues(name)];
                                // 删除值
                                formValue.splice(targetId, 1);
                                for (let i in temp) {
                                    unregister(`${name}.${i}`, {
                                        keepDefaultValue: false,
                                        keepDirty: false,
                                    });
                                }
                                for (let i in temp) {
                                    register(`${name}.${i}`);
                                }
                                setValue(`${name}`, formValue);
                                formValue.forEach((value, index) => {
                                    setValue(`${name}.${index}`, value);
                                });
                                setArr(temp);
                            }}>
                            <Iconify icon={"icon-park-outline:delete"} />
                        </IconButton>
                    </Stack>
                </Stack>
            );
        } else {
            return <>error</>;
        }
        return comp;
    });

    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({ fieldState: { error } }) => {
                    return (
                        <>
                            {fields}
                            <div>
                                {(!max || (max && arr.length < 5)) && (
                                    <Button
                                        onClick={(_) => {
                                            setArr([
                                                ...arr,
                                                { id: uuidv4(), label: name },
                                            ]);
                                        }}
                                        startIcon={
                                            <Iconify
                                                color={"#256CCB"}
                                                width={"32px"}
                                                height={"32px"}
                                                icon={"formkit:add"}
                                            />
                                        }>
                                        <Typography
                                            fontSize={"14px"}
                                            color={"#256CCB"}>
                                            {addLabel || `add ${name}`}
                                        </Typography>
                                    </Button>
                                )}
                            </div>

                            {(error?.root?.message || error?.message) && (
                                <div
                                    style={{
                                        color: "#FF5630",
                                        lineHeight: 1.5,
                                        fontSize: "0.75rem",
                                        fontWeight: 400,
                                        textAlign: "left",
                                        marginRight: "14px",
                                        marginBottom: "0",
                                        marginLeft: "14px",
                                    }}>
                                    {error?.message || error?.root?.message}
                                </div>
                            )}
                        </>
                    );
                }}
            />
        </>
    );
}
