import { useEffect, useRef } from "react";
import { Field } from "../utils";
import { Form } from "antd";

export const useGetField = <T,>(config: any, formIns: any) => {
	const record = useRef<T>();
	const watchState = Form.useWatch((values) => values, formIns);
	useEffect(() => {
		config.watch?.(watchState, record.current!);
		record.current = formIns.getFieldsValue();
	}, [watchState]);
	return Field({ fieldConfig: config, formIns });
};
