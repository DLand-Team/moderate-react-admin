import { SnackbarProvider } from 'notistack';
type Props = {
  children: React.ReactNode;
};

export function NotifyProvider({ children }: Props) {
  return (
    <SnackbarProvider
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'top',
      }}
      maxSnack={3}
    >
      {children}
    </SnackbarProvider>
  );
}
