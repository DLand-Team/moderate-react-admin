import { useEffect, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import { Editor, EditorProps } from '../editor';

// ---------------------------------∏-------------------------------------

export interface FieldEditorProps extends EditorProps {
  name: string;
}

export default function FieldEditor({ name, helperText, id, ...other }: FieldEditorProps) {
  const {
    control,
    watch,
    setValue,
    formState: { isSubmitSuccessful },
  } = useFormContext();

  const values = watch();
  const ref = useRef('edit' + Date.now().toString());

  useEffect(() => {
    if (values[name] === '<p><br></p>') {
      setValue(name, '', {
        shouldValidate: !isSubmitSuccessful,
      });
    }
  }, [isSubmitSuccessful, name, setValue, values]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Editor
          id={ref.current}
          value={field.value}
          onChange={field.onChange}
          error={!!error}
          sx={{
            width: '100%',
          }}
          helperText={
            (!!error || helperText) && (
              <FormHelperText error={!!error} sx={{ px: 2 }}>
                {error ? error?.message : helperText}
              </FormHelperText>
            )
          }
          {...other}
        />
      )}
    />
  );
}
