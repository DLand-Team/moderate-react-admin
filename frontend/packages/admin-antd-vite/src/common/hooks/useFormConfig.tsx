import { useMemo } from "react";
import { MyColumnType } from "src/common/utils";
const formConfigCreater = <T,>(
	config: MyColumnType<T>[],
): MyColumnType<T>[] => {
	return config.filter((item) => {
		const { fieldConfig } = item as MyColumnType<T>;
		const { scope = ["modal", "search", "table"] } = fieldConfig || {};
		return fieldConfig && scope?.includes("modal");
	}) as MyColumnType<T>[];
};
export const useFormConfig = (config: MyColumnType<any>[]) => {
	const formCinfig = useMemo(() => {
		return formConfigCreater<any>(config);
	}, [config]);
	return formCinfig;
};
