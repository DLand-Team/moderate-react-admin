import { Form, Select } from "antd";
import { CustomFieldRender } from "src/common/utils";
import { useFlat } from "src/service";
import { MarketItem } from "src/service/stores/marketStore/model";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const { Option } = Select;

let currentValue: string = "";

const LocationField: CustomFieldRender<MarketItem> = (_, form) => {
	const { t } = useTranslation(["market"]);
	const { locationList, getLocationListAct } = useFlat("commonStore");
	let [optionArr, setOptionArr] = useState<string[]>([]);
	let locationType = (
		{
			P: "AIRPORT",
			C: "CITY",
			S: "STATE",
			N: "COUNTRY",
			Z: "ATPCO ZONE",
			A: "TC",
			W: "WORLD",
		} as any
	)[form.getFieldValue("locationType")];
	useEffect(() => {
		getLocationListAct();
	}, []);
	useEffect(() => {
		setOptionArr(
			locationType in locationList ? locationList?.[locationType] : [],
		);
	}, [locationType]);

	const handleSearch = (newValue: string) => {
		let newOptionArr: string[] = [];
		let optionTemp = [...(locationList[locationType] || [])];
		if (newValue && optionArr && optionArr.length > 0) {
			if (currentValue != newValue) {
				optionArr =
					locationType in locationList
						? locationList[locationType]
						: [];
			}
			newOptionArr = optionTemp.filter((item: string) =>
				item.includes(newValue),
			);
			setOptionArr(newOptionArr);
		} else {
			setOptionArr(
				locationType in locationList ? locationList[locationType] : [],
			);
		}
		currentValue = newValue;
	};
	return (
		<Form.Item
			style={{
				margin: 0,
			}}
			name={"locationInfo"}
			rules={[
				{
					required: true,
					message:
						t`marketPage.placeholder_input` +
						" " +
						t`marketPage.location`,
				},
			]}
		>
			<Select
				showSearch
				defaultActiveFirstOption={false}
				suffixIcon={null}
				filterOption={false}
				onSearch={handleSearch}
				notFoundContent={null}
			>
				{optionArr &&
					optionArr.length > 0 &&
					optionArr.map((item, index) => {
						return (
							<Option value={item} key={index}>
								{item}
							</Option>
						);
					})}
			</Select>
		</Form.Item>
	);
};

export default LocationField;
