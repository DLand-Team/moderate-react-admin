import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Row } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchFields } from "src/common/hooks";
import { useFlat } from "src/service";
import { MarketFilterData } from "src/service/stores/marketStore/model";
import useConfig from "../../useConfig";

const AdvancedSearchForm = () => {
  const { t } = useTranslation(["market"]);
  const [form] = Form.useForm();
  const { searchList } = useConfig();
  const [expand] = useState(false);
  let count = 4;
  const SearchFields = useSearchFields(searchList, {
    count,
    form,
  });

  const { setMarketFilterData } = useFlat("marketStore");

  const onFinish = (values: MarketFilterData) => {
    setMarketFilterData(values);
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
          {t`marketPage.Search`}
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
