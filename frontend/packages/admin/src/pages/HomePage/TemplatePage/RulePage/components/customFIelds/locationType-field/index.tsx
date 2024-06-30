import { Form, Select } from "antd";
import { useTranslation } from "react-i18next";
import { CustomFieldRender } from "src/common/utils";
import { RuleItem } from "src/service/stores/ruleStore/model";

const { Option } = Select;

const LocationTypeField: CustomFieldRender<RuleItem> = (_, form) => {
	const { t } = useTranslation();

	let inputAttrConfig = {
		placeholder: t`placeholder_select`,
		maxLength: 60,
		style: {
			width: "100%",
		},
	};
	let ruleType = form.getFieldValue("ruleType");
	let optionArr =
		ruleType == 0
			? [
					["P", t`rulePage.AIRPORT`],
					["C", t`"rulePage.CITY"`],
					["S", t`rulePage.STATE`],
					["N", t`rulePage.COUNTRY`],
					["Z", t`rulePage.ATPCO`],
					["A", t`rulePage.TC`],
					["W", t`rulePage.WORLD`],
				]
			: [
					["P", t`rulePage.AIRPORT`],
					["C", t`rulePage.CITY`],
				];
	return (
		<Form.Item
			style={{
				margin: 0,
			}}
			name={"locationType"}
		>
			<Select
				onChange={() => {
					form.setFieldValue("locationInfo", "");
				}}
				{...inputAttrConfig}
			>
				{optionArr &&
					optionArr.length > 0 &&
					optionArr.map((item) => {
						return (
							<Option value={item[0]} key={item[0]}>
								{item[1]}
							</Option>
						);
					})}
			</Select>
		</Form.Item>
	);
};

export default LocationTypeField;
