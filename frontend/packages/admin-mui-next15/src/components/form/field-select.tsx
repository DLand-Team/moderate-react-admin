import { useFormContext, Controller } from 'react-hook-form';
import { Theme, SxProps } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import Select, { SelectProps } from '@mui/material/Select';
import TextField, { TextFieldProps } from '@mui/material/TextField';

// ----------------------------------------------------------------------

export type FieldSelectProps = TextFieldProps & {
  name: string;
  native?: boolean;
  maxHeight?: boolean | number;
  children: React.ReactNode;
  PaperPropsSx?: SxProps<Theme>;
  test?: string;
};

export function FieldSelect({
  name,
  native = false,
  maxHeight = 220,
  helperText,
  children,
  PaperPropsSx,
  ...other
}: FieldSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          value={field.value || ''}
          select
          fullWidth
          SelectProps={{
            native,
            MenuProps: {
              PaperProps: {
                sx: {
                  ...(!native && {
                    maxHeight: typeof maxHeight === 'number' ? maxHeight : 'unset',
                  }),
                  ...PaperPropsSx,
                },
              },
            },
            sx: { textTransform: 'capitalize' },
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
}

// ----------------------------------------------------------------------

export type FieldMultiSelectProps = SelectProps<string[]> & {
  name: string;
  label?: string;
  chip?: boolean;
  checkbox?: boolean;
  placeholder?: string;
  helperText?: React.ReactNode;
  options: {
    label: string;
    value: string;
  }[];
};

export function FieldMultiSelect({
  name,
  chip,
  label,
  options,
  checkbox,
  placeholder,
  helperText,
  sx,
  ...other
}: FieldMultiSelectProps) {
  const { control } = useFormContext();

  const renderValues = (selectedIds: string[]) => {
    const selectedItems = options.filter((item) => selectedIds.includes(item.value));

    if (!selectedItems.length && placeholder) {
      return (
        <Box component="em" sx={{ color: 'text.disabled' }}>
          {placeholder}
        </Box>
      );
    }

    if (chip) {
      return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selectedItems.map((item) => (
            <Chip key={item.value} size="small" label={item.label} />
          ))}
        </Box>
      );
    }

    return <>{selectedItems.map((item) => item.label).join(', ')}</>;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const { value, ...rest } = field;
        let temp = Array.isArray(value) ? value : [];
        return (
          <FormControl sx={sx}>
            {label && <InputLabel id={name}> {label} </InputLabel>}

            <Select
              {...rest}
              value={temp}
              multiple
              displayEmpty={!!placeholder}
              labelId={name}
              input={<OutlinedInput fullWidth label={label} error={!!error} />}
              renderValue={renderValues}
              {...other}
            >
              {placeholder && (
                <MenuItem disabled value="">
                  <em> {placeholder} </em>
                </MenuItem>
              )}

              {options.map((option) => {
                const selected = field.value.includes(option.value);

                return (
                  <MenuItem key={option.value} value={option.value}>
                    {checkbox && <Checkbox size="small" disableRipple checked={selected} />}

                    {option.label}
                  </MenuItem>
                );
              })}
            </Select>

            {(!!error || helperText) && (
              <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
}
