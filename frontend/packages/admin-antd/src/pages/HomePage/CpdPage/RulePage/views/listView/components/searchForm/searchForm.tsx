import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Row } from "antd";
import { useTranslation } from "react-i18next";
import { useSearchFields } from "src/common/hooks";
import useConfig from "../../useTableConfig";

const AdvancedSearchForm = () => {
    const [form] = Form.useForm();
    const { t } = useTranslation(["rule"]);
    const { searchList } = useConfig();
    let count = 3;
    const SearchFields = useSearchFields(searchList, {
        count,
        form,
    });

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

const SearchForm: React.FC = () => (
    <div style={{ marginBottom: "32px" }}>
        <AdvancedSearchForm />
    </div>
);

export default SearchForm;
