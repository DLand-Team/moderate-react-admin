import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Row } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchFields } from "src/common/hooks";
import { useFlat } from "src/service";
import type { Sort } from "src/service/stores/sortStore/model";
import useConfig from "../../useConfig";

const AdvancedSearchForm = () => {
  const { searchList } = useConfig();
  const [expand] = useState(false);
  let count = 4;
  const SearchFields = useSearchFields(searchList, {
    count,
  });
  const { t } = useTranslation(["sort"]);
  const [form] = Form.useForm();
  const { setFilterData } = useFlat("sortStore");
  const onFinish = (values: Pick<Sort, "sortItemName">) => {
    console.log(values);
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
          {t`sortItem.Search`}
        </Button>
      </Row>
    </Form>
  );
};

const App: React.FC = () => (
  <div style={{ marginBottom: "20px" }}>
    <AdvancedSearchForm />
  </div>
);

export default App;
