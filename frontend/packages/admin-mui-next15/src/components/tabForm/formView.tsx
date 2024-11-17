import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { FormConfig, useFields } from "src/common/hooks";
import { FromRefType } from "./types";

export const FormView = ({
    formConfig,
    formRef,
    id,
}: {
    id: string;
    formRef: React.MutableRefObject<Record<PropertyKey, FromRefType>>;
    formConfig: FormConfig;
}) => {
    const { formNode, methods } = useFields(formConfig);
    useEffect(() => {
        formRef.current[id] = methods;
    }, [methods]);
    return (
        <>
            <Typography
                fontSize={"14px"}
                fontStyle={"normal"}
                fontWeight={400}
                lineHeight={"22px"}
                mb={"24px"}>
                * Required information
            </Typography>
            {formNode}
        </>
    );
};
