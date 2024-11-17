import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { Iconify } from '../../iconify';
import Crop from './crop';
import { useState } from 'react';
import { Alert } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CropModal({
  open,
  name,
  src,
  validateFunc,
  onComplete,
  setOpen,
}: {
  open: boolean;
  src: string;
  name: string;
  setOpen: (value: boolean) => void;
  onComplete: (file: File) => void;
  validateFunc?: (file: File) => [boolean, string];
}) {
  const handleClose = () => {
    setErrFlag(false);
    setErrInfo('');
    setOpen(false);
  };
  const ref = React.useRef<() => [boolean, string]>();
  const [errFlag, setErrFlag] = useState(false);
  const [errorInfo, setErrInfo] = useState('');
  return (
    <React.Fragment>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Crop image
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Iconify icon="mingcute:close-line" width={16} />
        </IconButton>
        <DialogContent dividers>
          {errFlag && (
            <Alert severity="warning" sx={{ mb: 3 }}>
              {errorInfo}
            </Alert>
          )}
          <Crop
            name={name}
            src={src}
            callRef={ref}
            onComplete={onComplete}
            validateFunc={(file) => {
              const [flag = true, info = 'error'] = validateFunc?.(file) || [];
              ;
              if (!flag) {
                setErrFlag(true);
                setErrInfo(info);
              }
              return [flag, info];
            }}
          ></Crop>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              const [flag = true, info = ''] = ref.current?.() || [];
              setErrFlag(!flag);
              if (flag) {
                handleClose();
              } else {
                setErrInfo(info);
              }
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
