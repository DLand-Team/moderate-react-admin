import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export const FieldText = ({
  form,
  name,
  placeholder,
  label,
  type,
  required,
}: {
  form: UseFormReturn<any>;
  name: string;
  placeholder?: string;
  label: string | React.FC<any>;
  type?: string;
  required?: boolean;
}) => {
  const LableComp = typeof label != "string" ? label : () => label;
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>
              <LableComp />
            </FormLabel>
            <FormControl>
              <Input
                required={required}
                type={type}
                placeholder={placeholder}
                {...field}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
