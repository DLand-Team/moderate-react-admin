import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Row } from "antd";
import { useTranslation } from "react-i18next";
import { useSearchFields } from "src/common/hooks";
import { MyColumnType } from "src/common/utils";
import { useFlat } from "src/service";
import type {
    Market,
    MarketFilterData,
} from "src/service/stores/marketStore/model";

const AdvancedSearchForm = ({ searchList }: { searchList: any }) => {
    const { t } = useTranslation(["market"]);
    const [form] = Form.useForm();
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
            onFinish={onFinish}
        >
            <Row gutter={24}>
                {SearchFields}
                <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SearchOutlined />}
                >
                    {t`marketPage.Search`}
                </Button>
            </Row>
        </Form>
    );
};

const SearchForm = (
    {
        searchList
    }: {
        searchList: MyColumnType<Market>[];
    }
) => (<div style={{ marginBottom: "32px" }}>
    <AdvancedSearchForm searchList={searchList} />
</div>);

export default SearchForm;
