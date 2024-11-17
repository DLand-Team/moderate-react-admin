import { UseFormReturn } from "react-hook-form";
import TabForm from "./tabForm";

export type TabFormProps = Parameters<typeof TabForm>["0"];
export type FromRefType = UseFormReturn<
	{
		[key: string]: any;
	},
	any,
	any
>;

export type FormRefType = UseFormReturn<
	{
		[key: string]: any;
	},
	any,
	any
>;
export interface TabFormRef {
	validate: (formArr: FormRefType[]) => Promise<boolean>;
	getTabFormRef: () => Record<PropertyKey, FormRefType>;
}
