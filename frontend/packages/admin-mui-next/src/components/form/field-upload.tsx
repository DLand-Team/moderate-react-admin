'use client';
import FormHelperText from '@mui/material/FormHelperText';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { UploadAvatar, UploadBtn, UploadDrag, UploadProps } from '../upload';

// ----------------------------------------------------------------------

export interface FieldUploadProps extends Omit<UploadProps, 'file'> {
  name: string;
  multiple?: boolean;
  isCrop?: boolean;
  max?: number;
}

// ----------------------------------------------------------------------

export function FieldUploadBox({ name, max, ...other }: FieldUploadProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return <UploadBtn files={field.value} error={!!error} {...other} />;
      }}
    />
  );
}

export function FieldUploadAvatar({ name, max, accept, ...other }: FieldUploadProps) {
  const { control, setValue } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <UploadAvatar
            accept={
              accept
                ? accept
                : {
                    'image/*': [],
                  }
            }
            onAdd={(fileUrl: string) => {
              setValue(name, fileUrl);
            }}
            onDel={(fileUrl: string) => {
              setValue(name, null);
            }}
            files={field.value ? [field.value] : []}
            error={!!error}
            {...other}
          />
        );
      }}
    />
  );
}

// ----------------------------------------------------------------------

export function FieldUpload({
  accept,
  name,
  multiple,
  helperText,
  onUpload,
  isCrop,
  ...other
}: FieldUploadProps) {
  const { control, setValue, getValues, watch, trigger } = useFormContext();
  useEffect(() => {
    const subscription = watch((values, info) => {
      if (info.name == name) {
        trigger(name);
      }
    });
    return () => subscription.unsubscribe();
  }, []);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <UploadDrag
            isCrop={isCrop}
            multiple={multiple}
            accept={accept || { 'image/*': [] }}
            files={multiple ? field.value : field.value ? [field.value] : []}
            error={!!error}
            onOrder={(fileUrls: string[]) => {
              setValue(name, fileUrls);
            }}
            onAdd={(fileUrl: string) => {
              if (multiple) {
                const fileList = getValues(name) || [];
                setValue(name, [...fileList, fileUrl]);
              } else {
                setValue(name, fileUrl);
              }
            }}
            onDel={(fileUrl: string) => {
              if (multiple) {
                let fileList: any[] = getValues(name);
                let targetid = fileList.findIndex((item) => {
                  return item == fileUrl;
                });
                fileList.splice(targetid, 1);
                setValue(name, fileList);
              } else {
                setValue(name, null);
              }
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
        );
      }}
    />
  );
}
