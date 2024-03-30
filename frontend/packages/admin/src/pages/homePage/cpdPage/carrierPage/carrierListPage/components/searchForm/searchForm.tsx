import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Row } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchFields } from "src/common/hooks";
import { useFlat } from "src/reduxService";
import { Carrier } from "src/reduxService/stores/carrierStore/model";
import useConfig from "../../useConfig";

const AdvancedSearchForm = () => {
  const { t } = useTranslation(["carrier"]);
  const { searchList } = useConfig();
  const [expand] = useState(false);
  let count = 4;
  const SearchFields = useSearchFields(searchList, {
    count,
  });
  const [form] = Form.useForm();
  const { setFilterData } = useFlat("carrierStore");
  const onFinish = (values: Pick<Carrier, "familyName">) => {
    setFilterData(values);
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={onFinish}>
      <Row gutter={24}>
        {expand ? SearchFields : SearchFields.slice(0, count)}
        <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
          {t`carrierFamily.Search`}
        </Button>
      </Row>
      {/* <Row>
        <Col span={24} style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            style={{ margin: "0 8px" }}
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
          <a
            style={{ fontSize: 12 }}
            onClick={() => {
              setExpand(!expand);
            }}
          >
            {expand ? <UpOutlined /> : <DownOutlined />} Collapse
          </a>
        </Col>
      </Row> */}
    </Form>
  );
};

const App: React.FC = () => (
  <div style={{ marginBottom: "20px" }}>
    <AdvancedSearchForm />
  </div>
);

export default App;
