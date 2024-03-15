import { normalizeNum } from ".";
import { MyColumnType, MyInputType, ScopeType } from "../model/fieldsHooks";

export const getInputNumerFormItemConfig = <T>(
	name: string,
	options?: {
		inputType?: MyInputType;
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
		config: {
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
	let { config } = options;
	if (!config || Object.values(config).length === 0) {
		config = {
			inputType: "Input",
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
	config.formOptions = {
		name: name,
		label: name,
		rules: [
			{
				required: true,
			},
		],
		...(config.formOptions || {}),
	};
	return {
		title: name,
		dataIndex: name,
		key: name,
		config,
	};
};
