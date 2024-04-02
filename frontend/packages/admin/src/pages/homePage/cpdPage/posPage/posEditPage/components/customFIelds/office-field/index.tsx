import React, { useEffect } from "react";
import { Form, Select } from "antd";
import { useFlat } from "src/reduxService";

const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log("search:", value);
};


// Filter `option.label` match the user type `input`
const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const FieldRenderOffice: React.FC = () => {
  const { posCarrierList, getPosCarrierListAct } = useFlat("posStore");
  useEffect(() => {
    if (!posCarrierList.length) {
      getPosCarrierListAct();
    }
  }, []);
  return (
    <Form.Item
      style={{
        margin: 0,
      }}
      name={"officeOwner"}>
      <Select
        showSearch
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={filterOption}
        options={posCarrierList.map((item) => {
          return {
            value: String(item.id),
            label: item.carrier,
          };
        })}
      />
    </Form.Item>
  );
};

export default FieldRenderOffice;
