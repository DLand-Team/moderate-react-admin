import { MyColumnType } from "./getField";

export const fieldCreater = <T>(
	name: string,
	options: MyColumnType<T> = {},
): MyColumnType<T> => {
	let { fieldConfig } = options;
	if (!fieldConfig || Object.values(fieldConfig).length === 0) {
		fieldConfig = {
			type: "Input",
			isSearch: true,
			formOptions: {
				rules: [
					{
						required: true,
					},
				],
				label: name,
				name: name,
			},
		};
	}
	fieldConfig.formOptions = {
		name: name,
		label: name,
		rules: [
			{
				required: true,
			},
		],
		...(fieldConfig.formOptions || {}),
	};
	return {
		title: name,
		dataIndex: name,
		key: name,
		fieldConfig,
	};
};

export const itemCreater = <T>(
	dataIndex: keyof T,
	props: MyColumnType<T> = {},
) => {
	const { fieldConfig = {}, ...rest } = props;
	return {
		title: dataIndex,
		dataIndex: dataIndex,
		key: dataIndex,
		fieldConfig,
		...rest,
	};
};
