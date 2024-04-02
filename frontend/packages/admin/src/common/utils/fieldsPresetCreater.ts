import { normalizeNum } from ".";
import { MyColumnType, MyInputType, ScopeType } from "../model/fieldsHooks";

export const getInputNumerFormItemConfig = <T>(
	name: string,
	options?: {
		type?: MyInputType;
		formName?: string[];
		isRequire?: boolean;
		scope?: ScopeType[];
	},
): MyColumnType<T> => {
	const { scope } = options || {};
	return {
		title: name,
		dataIndex: name,
		key: name,
		fieldConfig: {
			scope,
			formOptions: {
				rules: [
					{
						required: true,
					},
					{
						type: "number",
					},
				],
				label: name,
				name: name,
				normalize: normalizeNum,
			},
		},
	};
};

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
