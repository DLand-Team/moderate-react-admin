import { OptionsObject, enqueueSnackbar } from 'notistack';
export * from './provider';
const optionPreset: OptionsObject = {
  autoHideDuration: 2000,
  anchorOrigin: {
    horizontal: 'right',
    vertical: 'top',
  },
};
export const notify = {
  info: (...args: Parameters<typeof enqueueSnackbar>) => {
    const [message, options] = args;
    enqueueSnackbar(message, { ...optionPreset, ...options, variant: 'info' });
  },
  error: (...args: Parameters<typeof enqueueSnackbar>) => {
    const [message, options] = args;
    enqueueSnackbar(message, { ...optionPreset, ...options, variant: 'error' });
  },
  success: (...args: Parameters<typeof enqueueSnackbar>) => {
    const [message, options] = args;
    enqueueSnackbar(message, { ...optionPreset, ...options, variant: 'success' });
  },
  warn: (...args: Parameters<typeof enqueueSnackbar>) => {
    const [message, options] = args;
    enqueueSnackbar(message, { ...optionPreset, ...options, variant: 'warning' });
  },
};
