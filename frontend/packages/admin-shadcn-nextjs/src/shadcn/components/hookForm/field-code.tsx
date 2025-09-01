import { MuiOtpInput } from "mui-one-time-password-input";
import { UseFormReturn } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/src/shadcn/components/ui/form";

export const FieldCode = ({
	form,
	name,
	label,
	type,
	required,
	...other
}: {
	form: UseFormReturn<any>;
	name: string;
	label: string | React.FC<any>;
	type: string;
	required: boolean;
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
							<MuiOtpInput
								{...field}
								autoFocus
								gap={1.5}
								length={6}
								TextFieldsProps={{
									// error: !!error,
									placeholder: "-",
								}}
								{...other}
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
};

// // ----------------------------------------------------------------------

// type RHFCodesProps = MuiOtpInputProps & {
//     name: string;
// };

// export function FieldCode({ name, ...other }: RHFCodesProps) {
//     const { control } = useFormContext();

//     return (
//         <Controller
//             name={name}
//             control={control}
//             render={({ field, fieldState: { error } }) => (
//                 <div>
//                     <MuiOtpInput
//                         {...field}
//                         autoFocus
//                         gap={1.5}
//                         length={6}
//                         TextFieldsProps={{ error: !!error, placeholder: "-" }}
//                         {...other}
//                     />

//                     {error && (
//                         <FormHelperText sx={{ px: 2 }} error>
//                             {error.message}
//                         </FormHelperText>
//                     )}
//                 </div>
//             )}
//         />
//     );
// }
