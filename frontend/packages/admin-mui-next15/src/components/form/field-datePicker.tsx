import FormHelperText from "@mui/material/FormHelperText";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider as MuiLocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import myDay from "src/common/utils/myDay";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, useFormContext } from "react-hook-form";
// ----------------------------------------------------------------------

export type FieldDatePickerProps = DatePickerProps<myDay.Dayjs> & {
    name: string;
    helperText?: React.ReactNode;
};

export default function FieldDatePicker({
    name,
    helperText,
    ...other
}: FieldDatePickerProps) {
    const { control } = useFormContext();
    return (
        <MuiLocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={"zh-cn"}>
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => {
                    const { value, ...rest } = field;
                    let temp = value;
                    if (typeof value == "string") {
                        temp = myDay(value);
                    }
                    return (
                        <>
                            <DatePicker {...rest} value={temp} {...other} />
                            {(!!error || helperText) && (
                                <FormHelperText error={!!error}>
                                    {error ? error?.message : helperText}
                                </FormHelperText>
                            )}
                        </>
                    );
                }}
            />
        </MuiLocalizationProvider>
    );
}
