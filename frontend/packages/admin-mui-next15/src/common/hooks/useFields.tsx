import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";
import { Stack, SxProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, {
    Fragment,
    PropsWithChildren,
    ReactElement,
    useMemo,
    useState,
} from "react";
import { Mode, UseFormReturn, useForm } from "react-hook-form";
import * as Yup from "yup";
import { FormProvider } from "src/components/form";
import { uuidv4 } from "../utils/uuidv4";
import { FormConfigItem, useGetField } from "./useGetField";

const StyledLoadingButton = styled(LoadingButton)<LoadingButtonProps>(() => ({
    backgroundColor: "rgba(34, 197, 94, 0.16)",
    color: "#118D57",
    "&:hover": {
        backgroundColor: "rgba(34, 197, 94, 0.36)",
    },
}));

export type FormConfig = {
    [key: string]: FormConfigItem;
};

// todo: change the component name
export function useFields(
    fromCg: FormConfig,
    options: {
        mode?: Mode;
        submitRender?: ReactElement;
        onSubmit?: (props?: {
            isRight: boolean;
            values: any;
            formRef: UseFormReturn<
                {
                    [key: string]: any;
                },
                any,
                undefined
            >;
        }) => void;
        formPrefix?: string;
        formId?: string;
        sx?: SxProps;
        Wrapper?: (props: PropsWithChildren) => React.ReactNode;
    } = {}
) {
    const {
        onSubmit,
        submitRender = null,
        formPrefix = "",
        sx = {},
        mode = "onChange",
        Wrapper = Fragment,
    } = options;
    let defaultValues: { [key: string]: any } = {};
    const [isFresh, setIsFresh] = useState("0");
    const fromConfig = useMemo(() => fromCg, [fromCg]);
    let yupShapeObj: any = {};
    Object.entries(fromConfig).forEach(([keyBase, value]) => {
        const {
            schema,
            defaultValue = "",
            name = keyBase,
            prefix = formPrefix ? [formPrefix] : "",
            fieldConfig = {},
        } = value!;

        let key = name;
        const { required } = fieldConfig;
        if (prefix) {
            let objKey = "";
            if (Array.isArray(prefix)) {
                objKey = [...prefix].join(".");
            } else {
                objKey = prefix;
            }
            if (!defaultValues[objKey]) {
                defaultValues[objKey] = {};
            }
            defaultValues[objKey][key] = defaultValue;
        } else {
            let currentShape = yupShapeObj;
            let current = defaultValues;
            let keyArr = key.split(".");
            keyArr.forEach((key, index) => {
                if (index != keyArr.length - 1) {
                    if (!current[key]) {
                        currentShape[key] = {};
                        current[key] = {};
                    }
                    currentShape = currentShape[key];
                    current = current[key];
                } else {
                    current[key] = defaultValue;
                    if (schema) {
                        currentShape[key] = schema;
                    }
                    if (required) {
                        if (currentShape[key]) {
                            currentShape[key] =
                                currentShape[key].required("This is required");
                        } else {
                            currentShape[key] =
                                Yup.string().required("This is required");
                        }
                    }
                }
            });
        }
    });

    let loop = (obj: Record<PropertyKey, any>, path: string, p: any = null) => {
        let temp = { ...obj };
        for (let i in temp) {
            if (
                typeof temp[i] == "object" &&
                !(temp[i] instanceof Yup.Schema)
            ) {
                loop(temp[i], path ? path + "." + i : i, temp);
            }
        }
        if (path) {
            let pathArr = path.split(".");
            if (pathArr.length > 1) {
                p[pathArr.slice(-1)[0]] = Yup.object(temp);
            } else {
                yupShapeObj[pathArr.slice(-1)[0]] = Yup.object(temp);
            }
        }
    };
    loop(yupShapeObj, "", yupShapeObj);
    const PersonalSchema = Yup.object().shape(yupShapeObj);
    const methods = useForm({
        resolver: yupResolver(PersonalSchema),
        defaultValues,
        mode,
    });

    const {
        watch,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;
    const getField = useGetField(methods);
    const fileds = useMemo(() => {
        return Object.entries(fromConfig).map(([key, value]) => {
            if (value.type == "custom") {
                return value.customForm?.() || <></>;
            }
            return (
                <React.Fragment key={key}>
                    {getField(value.name || key, {
                        prefix: formPrefix ? [formPrefix] : "",
                        ...value,
                    })}
                </React.Fragment>
            );
        });
    }, [isFresh, fromConfig]);

    React.useEffect(() => {
        const handler = (values: any, info: any) => {
            Object.entries(fromConfig).map(([_, value]) => {
                if (value.fieldConfig?.childFieldConfig) {
                    for (const item of Object.values(
                        value.fieldConfig?.childFieldConfig
                    )) {
                        if (item.watch) {
                            if (typeof item.watch !== "boolean") {
                                item.watch?.({
                                    currentConfig: item,
                                    values,
                                    info,
                                    api: methods,
                                });
                            }
                            setIsFresh(uuidv4());
                        }
                    }
                }
                if (value.watch) {
                    if (typeof value.watch !== "boolean") {
                        value.watch({
                            currentConfig: value,
                            values,
                            info,
                            api: methods,
                        });
                    }
                    setIsFresh(uuidv4());
                }
            });
        };
        handler(methods.getValues(), {});
        const subscription = watch(handler);
        return () => subscription.unsubscribe();
    }, [fromConfig]);
    let formNode = useMemo(() => {
        return (
            <FormProvider
                onSubmit={handleSubmit(onSubmit as any)}
                formRef={methods}>
                <Stack className="formStack" sx={sx} spacing={3}>
                    <Wrapper>{fileds}</Wrapper>
                    {onSubmit &&
                        (submitRender ? (
                            submitRender
                        ) : (
                            <StyledLoadingButton
                                type="submit"
                                variant="contained"
                                size="large"
                                onClick={async () => {
                                    const isRight = await methods.trigger();
                                    onSubmit({
                                        isRight,
                                        values: methods.getValues(),
                                        formRef: methods,
                                    });
                                }}
                                loading={isSubmitting}>
                                Save
                            </StyledLoadingButton>
                        ))}
                </Stack>
            </FormProvider>
        );
    }, [isFresh, fileds]);
    return {
        formNode,
        methods,
    };
}