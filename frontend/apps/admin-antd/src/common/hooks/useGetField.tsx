import { Field } from "../utils";

export const useGetField = (config: any, formIns: any) => {
  return Field({ fieldConfig: config, formIns });
};
