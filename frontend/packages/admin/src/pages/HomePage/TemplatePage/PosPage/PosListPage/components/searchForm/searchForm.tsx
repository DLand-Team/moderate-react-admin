import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Row } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchFields } from "src/common/hooks";
import { useFlat } from "src/service";
import useConfig from "../../useConfig";

const AdvancedSearchForm = () => {
  const { setPosFilterData } = useFlat("posStore");
  const { t } = useTranslation(["pos"]);
  const [form] = Form.useForm();
  const { searchList } = useConfig();
  const [expand] = useState(false);
  let count = 4;
  const SearchFields = useSearchFields(searchList, {
    count,
    form,
  });

  const onFinish = (values: any) => {
    setPosFilterData(values);
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
          {t`posPage.Search`}
        </Button>
      </Row>
    </Form>
  );
};

const SearchForm: React.FC = () => (
  <div style={{ marginBottom: "32px" }}>
    <AdvancedSearchForm />
  </div>
);

export default SearchForm;
