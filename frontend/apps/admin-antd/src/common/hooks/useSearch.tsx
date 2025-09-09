import { useSearchFields } from "src/common/hooks";
import { useSearchConfig } from "src/common/hooks/useSearchConfig";
import { MyColumnType } from "../utils";

export const useSearch = <T,>({ config }: { config: MyColumnType<T>[] }) => {
  const searchList = useSearchConfig(config);
  let count = 4;
  return useSearchFields(searchList, {
    count,
  });
};
