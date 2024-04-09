import { Form, Select } from "antd";
import { useTranslation } from "react-i18next";
import { CustomFieldRender } from "src/common/utils";
import { MarketItem } from "src/reduxService/stores/marketStore/model";

const { Option } = Select;

const LocationTypeField: CustomFieldRender<MarketItem> = (_, form) => {
  const { t } = useTranslation();

  let inputAttrConfig = {
    placeholder: t`placeholder_select`,
    maxLength: 60,
    style: {
      width: "100%",
    },
  };
  let marketType = form.getFieldValue("marketType");
  let optionArr =
    marketType == 0
      ? [
          ["P", t`marketPage.AIRPORT`],
          ["C", t`"marketPage.CITY"`],
          ["S", t`marketPage.STATE`],
          ["N", t`marketPage.COUNTRY`],
          ["Z", t`marketPage.ATPCO`],
          ["A", t`marketPage.TC`],
          ["W", t`marketPage.WORLD`],
        ]
      : [
          ["P", t`marketPage.AIRPORT`],
          ["C", t`marketPage.CITY`],
        ];
  return (
    <Form.Item
      style={{
        margin: 0,
      }}
      name={"locationType"}>
      <Select
        onChange={() => {
          form.setFieldsValue({
            locationInfo: "",
          });
        }}
        {...inputAttrConfig}>
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
