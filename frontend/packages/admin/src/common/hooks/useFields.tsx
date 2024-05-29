import { FormInstance } from "antd";
import { useFormFields } from "src/common/hooks";
import { MyColumnType } from "../utils";
const formConfigCreater = <T,>(
	config: MyColumnType<T>[],
): MyColumnType<T>[] => {
	return config.filter((item) => {
		const { fieldConfig } = item as MyColumnType<T>;
		const { scope = ["modal", "search", "table"] } = fieldConfig || {};
		return fieldConfig && scope?.includes("modal");
	}) as MyColumnType<T>[];
};
export const useFields = <T,>({
	config,
	form,
	isDetail,
}: {
	config: MyColumnType<T>[];
	form: FormInstance<T>;
	isDetail: boolean;
}) => {
	const formConfig = formConfigCreater<T>(config);
	return useFormFields<T>(formConfig, {
		formIns: form,
		isJustShow: isDetail,
	});
};
