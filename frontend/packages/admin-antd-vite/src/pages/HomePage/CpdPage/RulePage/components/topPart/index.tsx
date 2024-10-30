import {
    Checkbox,
    Col,
    DatePicker,
    Form,
    FormInstance,
    Input,
    InputNumber,
    Row,
    Select,
} from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FieldType } from "src/common/utils";
import { ruleHelper, useFlat } from "src/service";
import {
    AddItemDrawerType,
    type Rule,
} from "src/service/stores/ruleStore/model";
import SelectPro from "../selectPro";

const { Option } = Select;
export type TopPartForm = Omit<
    Rule & { effectDateData?: dayjs.Dayjs[] },
    "cpdRuleItinerarys"
>;

const TopPart = ({
    formRef,
    branchName = "",
}: {
    formRef?: FormInstance<TopPartForm>;
    branchName: string;
}) => {
    const { list: filterList, queryListAct: queryFilterListAct } =
        useFlat("filterStore");
    const { list: sortList, queryListAct } = useFlat("sortStore");
    const { allPosList, queryAllPostListAct } = useFlat("posStore", {
        allPosList: "IN",
    });
    const { allMarketList, queryAllMarketListAct } = useFlat("marketStore", {
        allMarketList: "IN",
    });
    const { currentData } = useFlat(["ruleStore", branchName]);
    useEffect(() => {
        queryAllMarketListAct();
        queryAllPostListAct();
        queryListAct();
        queryFilterListAct();
    }, []);
    const { t } = useTranslation(["rule"]);
    const { t: commonT } = useTranslation(["common"]);

    useEffect(() => {
        formRef?.resetFields();
        formRef?.setFieldsValue({
            ...currentData,
            effectDateData: [
                dayjs(currentData?.effectStartDate)!,
                dayjs(currentData?.effectEndDate!),
            ],
        });
        if (formRef && currentData) {
            const seqValue = ruleHelper.calcSeqNo({
                type: "oriMarket",
                value: currentData.oriMarketId,
                formRef,
                marketList: allMarketList,
                posList: allPosList,
            });
            formRef.setFieldValue("sequenceNo", seqValue);
        }
    }, [currentData]);

    return (
        <div>
            <Form<TopPartForm>
                form={formRef}
                layout="vertical"
                name="basic"
                style={{ width: "100%" }}
                initialValues={currentData || {}}
                autoComplete="off"
                onFieldsChange={(values) => {
                    const name = values?.[0]?.name?.[0];
                    const value = values?.[0]?.value;
                    if (!formRef) return;
                    if (
                        name === "oriMarketId" ||
                        name === "desMarketId" ||
                        name === "posId"
                    ) {
                        const seqValue = ruleHelper.calcSeqNo({
                            type: name,
                            value,
                            formRef,
                            marketList: allMarketList,
                            posList: allPosList,
                        });
                        formRef.setFieldValue("sequenceNo", seqValue);
                    }
                }}
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
                                        commonT`placeholder_input` +
                                        t`rulePage_ruleName`,
                                },
                                {
                                    max: 30,
                                    message: t`rule_max_30`,
                                },
                                {
                                    pattern: /^[0-9a-zA-z_-]+$/,
                                    message: t`rule_name_warn`,
                                },
                            ]}
                        >
                            <Input placeholder={commonT`placeholder_input`} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item<FieldType>
                            label={t`rulePage_originMarket`}
                            name="oriMarketId"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        t("placeholder_input") +
                                        t("rulePage_originMarket") +
                                        "!",
                                },
                            ]}
                        >
                            <SelectPro
                                branchName={branchName}
                                inputAttrConfig={{
                                    placeholder: commonT`placeholder_input`,
                                }}
                                optionArr={allMarketList
                                    .filter((item) => {
                                        return item.marketType === 0;
                                    })
                                    .map((item) => {
                                        return {
                                            id: item.id,
                                            value: item.id,
                                            label: item.marketName,
                                        };
                                    })}
                                drawerTableType={{
                                    add: AddItemDrawerType.market_add,
                                    edit: AddItemDrawerType.market_edit,
                                    detail: AddItemDrawerType.market_detail,
                                }}
                            />
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
                                        t("rulePage_destinationMarket") +
                                        "!",
                                },
                            ]}
                        >
                            <SelectPro
                                inputAttrConfig={{
                                    placeholder: commonT`placeholder_input`,
                                }}
                                branchName={branchName}
                                optionArr={allMarketList
                                    .filter((item) => {
                                        return item.marketType === 0;
                                    })
                                    .map((item) => {
                                        return {
                                            id: item.id,
                                            value: item.id,
                                            label: item.marketName,
                                        };
                                    })}
                                drawerTableType={{
                                    add: AddItemDrawerType.market_add,
                                    edit: AddItemDrawerType.market_edit,
                                    detail: AddItemDrawerType.market_detail,
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item<FieldType>
                            label={t`rulePage_pos`}
                            name="posId"
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
                            <SelectPro
                                inputAttrConfig={{
                                    placeholder: commonT`placeholder_input`,
                                }}
                                branchName={branchName}
                                optionArr={allPosList.map((item) => {
                                    return {
                                        id: item.id,
                                        value: item.id,
                                        label: item.posName,
                                    };
                                })}
                                drawerTableType={{
                                    add: AddItemDrawerType.pos_add,
                                    edit: AddItemDrawerType.pos_edit,
                                    detail: AddItemDrawerType.pos_detail,
                                }}
                            />
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
                                        t("rulePage_applyProduct") +
                                        "!",
                                },
                            ]}
                        >
                            <Select placeholder={t("placeholder_input")}>
                                {[
                                    [1, "ISHOP"],
                                    [2, "DSHOP"],
                                ].map((item) => {
                                    return (
                                        <Option value={item[0]} key={item[0]}>
                                            {item[1]}
                                        </Option>
                                    );
                                })}
                            </Select>
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
                            <DatePicker.RangePicker></DatePicker.RangePicker>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item<FieldType>
                            label={t`rulePage_sortItem`}
                            name="sortItemId"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        t("placeholder_input") +
                                        t("rulePage_sortItem") +
                                        "!",
                                },
                            ]}
                        >
                            <SelectPro
                                inputAttrConfig={{
                                    placeholder: commonT`placeholder_input`,
                                }}
                                branchName={branchName}
                                optionArr={sortList.map((item) => {
                                    return {
                                        id: item.id,
                                        value: item.id,
                                        label: item.sortItemName,
                                    };
                                })}
                                drawerTableType={{
                                    add: AddItemDrawerType.sort_add,
                                    edit: AddItemDrawerType.sort_edit,
                                    detail: AddItemDrawerType.sort_detail,
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item<FieldType>
                            label={t`rulePage_filterItem`}
                            name="filterItemId"
                        >
                            <SelectPro
                                inputAttrConfig={{
                                    placeholder: commonT`placeholder_input`,
                                }}
                                optionArr={filterList.map((item) => {
                                    return {
                                        id: item.id,
                                        value: item.id,
                                        label: item.filterItemName,
                                    };
                                })}
                                drawerTableType={{
                                    add: AddItemDrawerType.filter_add,
                                    edit: AddItemDrawerType.filter_edit,
                                    detail: AddItemDrawerType.filter_detail,
                                }}
                                branchName={branchName}
                            />
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
                            <InputNumber
                                disabled={true}
                                placeholder={commonT`placeholder_input`}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item<FieldType>
                            label={t`rulePage_active`}
                            name="status"
                            valuePropName="checked"
                        >
                            <Checkbox />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item<FieldType>
                            label={t`rulePage_backupResult`}
                            name="backupResult"
                            valuePropName="checked"
                        >
                            <Checkbox />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item<FieldType>
                            label={t`rulePage.comment`}
                            name="comment"
                            rules={[
                                {
                                    max: 200,
                                    message: t("rulePage.placeholder_comment"),
                                },
                            ]}
                        >
                            <Input.TextArea
                                placeholder={commonT`placeholder_input`}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default TopPart;
