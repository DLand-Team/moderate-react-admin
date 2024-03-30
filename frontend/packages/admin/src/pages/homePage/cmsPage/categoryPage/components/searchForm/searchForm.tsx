import { useSearchFields } from "src/common/hooks";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row } from "antd";
import { useState } from "react";
import useConfig from "../../useConfig";
import { useFlat } from "src/reduxService";

const AdvancedSearchForm = () => {
  const { searchList } = useConfig();
  const [expand, setExpand] = useState(false);
  let count = 4;
  const SearchFields = useSearchFields(searchList, {
    count,
  });
  const [form] = Form.useForm();
  const { queryAct, pageSize } = useFlat("categoryStore");
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={onFinish}
    >
      <Row gutter={24}>
        {expand ? SearchFields : SearchFields.slice(0, count)}
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: "right" }}>
          <Button
            onClick={() => {
              queryAct({
                ...form.getFieldsValue(),
                page: 1,
                page_size: pageSize,
              });
            }}
            type="primary"
            htmlType="submit"
          >
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
      </Row>
    </Form>
  );
};

const App: React.FC = () => (
  <div style={{ marginBottom: "32px" }}>
    <AdvancedSearchForm />
  </div>
);

export default App;
