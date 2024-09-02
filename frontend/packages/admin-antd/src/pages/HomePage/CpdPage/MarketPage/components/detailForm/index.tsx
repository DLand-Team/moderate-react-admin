import { Col, Form, FormInstance, Input, Row, Select } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { FieldType } from "src/common/utils";
import { useFlat } from "src/service";
import type { Market } from "src/service/stores/marketStore/model";
const { Option } = Select;
export type TopPartForm = Pick<Market, "marketName" | "comment" | "marketType">;
const TopForm = ({
    formRef,
    branchName,
}: {
    formRef?: FormInstance<TopPartForm>;
    branchName?: string;
}) => {
    const { currentData, setCurrentMarketData, isDisabledMarketType } = useFlat(
        ["marketStore", branchName]
    );
    let [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const { t } = useTranslation(["market"]);
    let inputAttrConfig = {
        disabled: id ? true : false,
        size: "large" as SizeType,
    };
    let optionArr = [
        [0, t`marketPage.NORMAL`],
        [1, t`marketPage.CONNECITON`],
    ];
    return (
        <div>
            <Form<TopPartForm>
                onValuesChange={(_, values) => {
                    let newData = currentData
                        ? { ...currentData, ...values }
                        : { ...values };
                    setCurrentMarketData(newData as Market);
                    if (values.marketType === 1) {
                        if (currentData) {
                            //marketType === 1 类型为中专点
                            //@ts-ignore
                            newData!?.cpdMarketItems!?.forEach((item) => {
                                item.exclude = false;
                            });
                            //@ts-ignore
                            setCurrentMarketData(newData);
                        }
                    }
                }}
                form={formRef}
                layout="vertical"
                name="basic"
                wrapperCol={{ span: 16 }}
                style={{ width: "100%" }}
                initialValues={currentData || {}}
                autoComplete="off"
            >
                <Row
                    style={{
                        width: "100%",
                    }}
                >
                    <Col span={12}>
                        <Form.Item<FieldType>
                            label={t`marketPage.marketName`}
                            name="marketName"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        t`marketPage.placeholder_input` +
                                        t`marketPage.marketName`,
                                },
                                {
                                    max: 30,
                                    message: t`marketPage.rule_max_30`,
                                },
                                {
                                    pattern: /^[0-9a-zA-z_-]+$/,
                                    message: t`marketPage.rule_common1`,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<FieldType>
                            label={t`marketPage.marketType`}
                            name="marketType"
                            initialValue={0}
                            rules={[
                                {
                                    required: true,
                                    message: t`marketPage.placeholder_select`,
                                },
                            ]}
                        >
                            <Select
                                {...inputAttrConfig}
                                disabled={isDisabledMarketType}
                            >
                                {optionArr &&
                                    optionArr.length > 0 &&
                                    optionArr.map((item) => {
                                        return (
                                            <Option
                                                value={item[0]}
                                                key={item[0]}
                                            >
                                                {item[1]}
                                            </Option>
                                        );
                                    })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<FieldType>
                            label={t`marketPage.comment`}
                            name="comment"
                            rules={[
                                {
                                    max: 200,
                                    message: t("marketPage.placeholder_comment"),
                                },
                            ]}
                        >
                            <Input.TextArea style={{ height: 120 }} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default TopForm;
