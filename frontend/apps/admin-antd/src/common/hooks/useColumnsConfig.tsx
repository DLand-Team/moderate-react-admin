import { useMemo } from "react";
import { MyColumnType } from "src/common/utils";

const creater = <T,>(config: MyColumnType<T>[]): MyColumnType<T>[] => {
  return config.filter((item) => {
    const { fieldConfig = {} } = item;
    const {
      formOptions = {},
      isHideInTable,
      scope = ["modal", "search", "table"],
    } = fieldConfig;
    const { name } = formOptions;
    return (
      (typeof name == "string" || !name) &&
      !isHideInTable &&
      scope?.includes("table")
    );
  });
};
export const useColumnsConfig = (config: MyColumnType<any>[]) => {
  return useMemo(() => {
    return creater<any>(config);
  }, [config]);
};
