import { FormProvider as Form, UseFormReturn } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  formRef: UseFormReturn<any>;
  onSubmit?: VoidFunction;
};

export default function FormProvider({ children, onSubmit, formRef }: Props) {
  return (
    <Form {...formRef}>
      <form
        style={{
          width: '100%',
        }}
        onSubmit={onSubmit}
      >
        {children}
      </form>
    </Form>
  );
}
