import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Row } from "antd";
import { useTranslation } from "react-i18next";
import { useSearchFields } from "src/common/hooks";
import { MyColumnType } from "src/common/utils";
import { useFlat } from "src/service";
import type { Pos } from "src/service/stores/posStore/model";

export interface AdvancedSearchFormProps {
    searchList: MyColumnType<Pos>[];
}
const AdvancedSearchForm = ({ searchList }: AdvancedSearchFormProps) => {
    const { setPosFilterData } = useFlat("posStore");
    const { t } = useTranslation(["pos"]);
    const [form] = Form.useForm();
    const SearchFields = useSearchFields(searchList, {
        count: 4,
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
            onFinish={onFinish}
        >
            <Row gutter={24}>
                {SearchFields}
                <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SearchOutlined />}
                >
                    {t`posPage.Search`}
                </Button>
            </Row>
        </Form>
    );
};

const SearchForm: React.FC<AdvancedSearchFormProps> = (props) => (
    <div style={{ marginBottom: "32px" }}>
        <AdvancedSearchForm {...props} />
    </div>
);

export default SearchForm;
