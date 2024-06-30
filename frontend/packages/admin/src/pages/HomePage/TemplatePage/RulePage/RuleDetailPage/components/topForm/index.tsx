import { Col, Form, FormInstance, Row, Skeleton } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FieldType } from "src/common/utils";
import { useFlat } from "src/service";
import { Rule } from "src/service/stores/ruleStore/model";

export type TopPartForm = Omit<
    Rule & { effectDateData?: string[] },
    "cpdRuleItinerarys"
>;
const TopForm = ({ formRef }: { formRef?: FormInstance<TopPartForm> }) => {
    const { list: filterList, queryListAct: queryFilterListAct } =
        useFlat("filterStore");
    const { list: sortList, queryListAct } = useFlat("sortStore");
    const { posList, queryPostListAct } = useFlat("posStore");
    const { marketList, queryMarkettListAct } = useFlat("marketStore");
    const { currentData } = useFlat("ruleStore");
    let dateStr = currentData?.effectStartDate?`${dayjs(currentData?.effectStartDate).format('YYYY-MM-DD')}~${dayjs(currentData?.effectEndDate).format('YYYY-MM-DD')}`:''
    useEffect(() => {
        queryMarkettListAct();
        queryPostListAct();
        queryListAct();
        queryFilterListAct();
    }, []);
    const { t } = useTranslation(["rule"]);

    return (
        <div>
            <Form<TopPartForm>
                form={formRef}
                layout="vertical"
                name="basic"
                style={{ width: "100%" }}
                initialValues={currentData || {}}
                autoComplete="off"
            >
                <Row
                    style={{
                        width: "100%",
                    }}
                    gutter={[10, 10]}
                >
                    <Col span={6}>
                        <Form.Item<FieldType>
                            label={t`rulePage_ruleName`}
                            name="ruleName"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        t`placeholder_input` +
                                        t`rulePage_ruleName`,
                                },
                                {
                                    max: 30,
                                    message: t`rulePage.rule_max_30`,
                                },
                                {
                                    pattern: /^[0-9a-zA-z_-]+$/,
                                    message: t`rulePage.rule_common1`,
                                },
                            ]}
                        >
                            {currentData?.ruleName || (
                                <Skeleton.Input block={true} active={true} />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item<FieldType>
                            label={t`rulePage_originMarket`}
                            name="oriMarketId"
                            rules={[
                                {
                                    required: true,
                                    message: t`placeholder_input`,
                                },
                            ]}
                        >
                            {marketList
                                .filter((item) => {
                                    return item.marketType === 0;
                                })
                                .find((item) => {
                                    return item.id == currentData!?.oriMarketId;
                                })?.marketName || (
                                <Skeleton.Input block={true} active={true} />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item<FieldType>
                            label={t`rulePage_destinationMarket`}
                            name="desMarketId"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        t("placeholder_input") +
                                        t("rulePage_pos") +
                                        "!",
                                },
                            ]}
                        >
                            {marketList
                                .filter((item) => {
                                    return item.marketType === 0;
                                })
                                .find((item) => {
                                    return item.id == currentData!?.oriMarketId;
                                })?.marketName || (
                                <Skeleton.Input block={true} active={true} />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item<FieldType>
                            label={t`rulePage_pos`}
                            name="posId"
                        >
                            {currentData ? (
                                posList.find((item) => {
                                    return item.id == currentData!.posId;
                                })?.posName
                            ) : (
                                <Skeleton.Input block={true} active={true} />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row
                    style={{
                        width: "100%",
                    }}
                    gutter={10}
                >
                    <Col span={6}>
                        <Form.Item<FieldType>
                            label={t`rulePage_applyProduct`}
                            name="applyProduct"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        t("placeholder_input") +
                                        t("rulePage_applyProductEx") +
                                        "!",
                                },
                            ]}
                        >
                            {currentData ? (
                                [
                                    [1, "ISHOP"],
                                    [2, "DSHOP"],
                                ].find((item) => {
                                    return item[0] == currentData?.applyProduct;
                                })?.[1]
                            ) : (
                                <Skeleton.Input block={true} active={true} />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item<FieldType>
                            label={t`rulePage_effectDateRange`}
                            name="effectDateData"
                            rules={[
                                {
                                    required: true,
                                    message: t`placeholder_input`,
                                },
                            ]}
                        >
                            {dateStr}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item<FieldType>
                            label={t`rulePage_sortItem`}
                            name="sortItemId"
                            rules={[
                                {
                                    required: true,
                                    message: t`placeholder_input`,
                                },
                            ]}
                        >
                            {currentData ? (
                                sortList.find((item) => {
                                    return (
                                        String(item.id) ==
                                        String(currentData!.sortItemId)
                                    );
                                })?.sortItemName
                            ) : (
                                <Skeleton.Input block={true} active={true} />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item<FieldType>
                            label={t`rulePage_filterItem`}
                            name="filterItemId"
                        >
                            {currentData ? (
                                filterList.find((item) => {
                                    return (
                                        String(item.id) ==
                                        String(currentData!.filterItemId)
                                    );
                                })?.filterItemName
                            ) : (
                                <Skeleton.Input block={true} active={true} />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row
                    style={{
                        width: "100%",
                    }}
                >
                    <Col span={6}>
                        <Form.Item<FieldType>
                            label={t`rulePage_sequenceNo`}
                            name="sequenceNo"
                            rules={[
                                {
                                    pattern: /^[0-9]+$/,
                                    message: t("rule_number") + "!",
                                },
                            ]}
                        >
                            {currentData?.sequenceNo}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item<FieldType>
                            label={t`rulePage_active`}
                            name="status"
                        >
                            {currentData?.status ? "true" : "false"}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item<FieldType>
                            label={t`rulePage_backupResult`}
                            name="backupResult"
                        >
                            {currentData?.backupResult ? "true" : "false"}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item<FieldType>
                            label={t`rulePage_applyProductEx`}
                            name="comment"
                        >
                            {currentData?.comment}
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default TopForm;
