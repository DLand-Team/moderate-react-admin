import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";
import { fCurrencyWithout } from "src/common/utils";

// ----------------------------------------------------------------------

export type FieldTextProps = TextFieldProps & {
    name: string;
};

export default function FieldText({
    name,
    helperText,
    type,
    defaultValue,
    ...other
}: FieldTextProps) {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => {
                if (field.value && type === "money") {
                    let newVal = fCurrencyWithout(
                        Number(String(field.value).replace(/\,/g, ""))
                    );
                    if (newVal !== "NaN") {
                        field.value = newVal;
                    } else {
                        field.value = 0;
                    }
                }
                return (
                    <TextField
                        {...field}
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                        fullWidth
                        value={field.value}
                        onChange={(event) => {
                            if (type === "number") {
                                field.onChange(
                                    Number(
                                        event.target.value.replace(/\,/g, "")
                                    )
                                );
                            } else {
                                field.onChange(event.target.value);
                            }
                        }}
                        error={!!error}
                        helperText={error ? error?.message : helperText}
                        {...other}
                        sx={{
                            ...(other.sx || {}),
                            "& .MuiInputBase-input.MuiFilledInput-input": {
                                color: "#141414",
                            },
                        }}
                    />
                );
            }}
        />
    );
}
