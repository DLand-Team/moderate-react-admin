import { useFormContext, Controller } from 'react-hook-form';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';

// ----------------------------------------------------------------------

export type FieldRadioGroupProps = RadioGroupProps & {
  name: string;
  options: { label: string; value: any; key: string; info?: string }[];
  label?: string;
  spacing?: number;
  helperText?: React.ReactNode;
  disabled?: boolean;
};

export default function FieldRadioGroup({
  row,
  name,
  label,
  options,
  spacing,
  helperText,
  disabled = false,
  ...other
}: FieldRadioGroupProps) {
  const { control } = useFormContext();

  const labelledby = label ? `${name}-${label}` : '';
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset">
          {label && (
            <FormLabel component="legend" id={labelledby} sx={{ typography: 'body2' }}>
              {label}
            </FormLabel>
          )}

          <RadioGroup {...field} aria-labelledby={labelledby} row={row} {...other}>
            {options.map((option) => (
              <div key={option.key}>
                <FormControlLabel
                  disabled={disabled}
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                  sx={{
                    '&:not(:last-of-type)': {
                      mb: spacing || 0,
                    },
                    ...(row && {
                      mr: 0,
                      '&:not(:last-of-type)': {
                        mr: spacing || 2,
                      },
                    }),
                  }}
                />
                {option.info && (
                  <>
                    {typeof option.info == 'string' ? (
                      <Typography
                        sx={{
                          color: 'var(--Scaling-Grey2, #696969)',
                          fontFamily: 'Public Sans',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: '400',
                          lineHeight: '22px',
                          marginBottom: '16px',
                        }}
                      >
                        {option.info}
                      </Typography>
                    ) : (
                      option.info
                    )}
                  </>
                )}
              </div>
            ))}
          </RadioGroup>

          {(!!error || helperText) && (
            <FormHelperText error={!!error} sx={{ mx: 0 }}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
