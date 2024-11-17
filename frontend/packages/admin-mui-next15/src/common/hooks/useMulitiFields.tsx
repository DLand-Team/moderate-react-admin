import { useMemo } from "react";
import { getField } from "src/common/utils/getField";
import { FormConfigItem } from "./useGetField";
import { IconButton, Stack } from "@mui/material";
import { Iconify } from "src/components";

export function useMulitiFields(fields: FormConfigItem[]) {
    const fileds = useMemo(() => {
        return fields.map((entity) => {
            const { label } = entity;
            const Field = getField("string");
            return (
                <Stack direction="row">
                    <Field label={label} name={entity.id!}></Field>
                    <IconButton
                        style={{
                            zIndex: 10,
                        }}
                        onClick={(_) => {}}
                        sx={{ position: "absolute", right: "40px" }}>
                        <Iconify width={16} icon={"icon-park-outline:add"} />
                    </IconButton>
                </Stack>
            );
        });
    }, []);
    return fileds;
}
