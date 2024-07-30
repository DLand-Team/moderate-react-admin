import { useMemo } from "react";
import { MyColumnType } from "../utils/getField";

const usePageConfig = <T,>(
	pageConfigCreater: () => (MyColumnType<T> | false)[],
	dep: any[],
): {
	config: MyColumnType<T>[];
	columns: MyColumnType<T>[];
	formList: MyColumnType<T>[];
	searchList: MyColumnType<T>[];
} => {
	const config = useMemo(() => {
		return pageConfigCreater().filter((item) => {
			return item;
		});
	}, dep) as MyColumnType<T>[];
	const columns = useMemo(() => {
		return config.filter((item) => {
			const { fieldConfig = {} } = item;
			const {
				formOptions = {},
				isHideInTable: isHideInTable,
				scope = ["modal", "search", "table"],
			} = fieldConfig;
			const { name } = formOptions;
			return (
				(typeof name == "string" || !name) &&
				!isHideInTable &&
				scope?.includes("table")
			);
		});
	}, dep);
	const formList = useMemo(() => {
		return config.filter((item) => {
			const { fieldConfig } = item;
			const { scope = ["modal", "search", "table"] } = fieldConfig || {};
			return fieldConfig && scope?.includes("modal");
		});
	}, dep);
	const searchList = useMemo(() => {
		return config.filter((item) => {
			const { fieldConfig } = item;
			const { scope = ["modal", "search", "table"] } = fieldConfig || {};
			return fieldConfig && scope?.includes("search");
		});
	}, dep);
	return {
		config,
		columns,
		formList,
		searchList,
	};
};

export default usePageConfig;
