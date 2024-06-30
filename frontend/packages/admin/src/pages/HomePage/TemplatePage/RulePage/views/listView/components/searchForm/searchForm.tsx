import { Button, Col, Form, Row } from "antd";
import { useSearchFields } from "src/common/hooks";
import useConfig from "../../useConfig";

const AdvancedSearchForm = () => {
    const [form] = Form.useForm();
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
                <Col span={20}>
                    <Row gutter={24}>{SearchFields}</Row>
                </Col>
                <Col span={4} style={{ textAlign: "right" }}>
                    <Button
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
                </Col>
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
