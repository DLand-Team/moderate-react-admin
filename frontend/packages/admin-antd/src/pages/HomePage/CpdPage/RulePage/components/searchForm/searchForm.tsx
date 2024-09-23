import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Row } from "antd";
import { useTranslation } from "react-i18next";
import { useSearchFields } from "src/common/hooks";
import { useFlat } from "src/service";
import { RuleFilterData } from "src/service/stores/ruleStore/model";
import useConfig from "../../views/listView/useTableConfig";

const AdvancedSearchForm = () => {
    const [form] = Form.useForm();
    const { t } = useTranslation(["rule"]);
    const { searchList } = useConfig();
    let count = 3;
    ;
    const SearchFields = useSearchFields(searchList, {
        count,
        form,
    });

    const { setRuleFilterData } = useFlat("ruleStore");

    const onFinish = (values: RuleFilterData) => {
        setRuleFilterData(values);
    };

    return (
        <Form
            form={form}
            name="advanced_search"
            className="ant-advanced-search-form"
            onFinish={onFinish}
        >
            <Row gutter={24}>
                {SearchFields}
                <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SearchOutlined />}
                >
                    {t`rulePage_search`}
                </Button>
            </Row>
        </Form>
    );
};

const SearchForm = () => (
    <div style={{ marginBottom: "32px" }}>
        <AdvancedSearchForm />
    </div>
);

export default SearchForm;
