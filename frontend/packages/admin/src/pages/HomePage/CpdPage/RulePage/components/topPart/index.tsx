import { PlusOutlined } from "@ant-design/icons";
import {
    Checkbox,
    Col,
    DatePicker,
    Divider,
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
import { dpChain, useFlat } from "src/service";
import {
    AddItemDrawerType,
    type Rule,
} from "src/service/stores/ruleStore/model";

const { Option } = Select;
export type TopPartForm = Omit<
    Rule & { effectDateData?: dayjs.Dayjs[] },
    "cpdRuleItinerarys"
>;

function CustomSelect({
    optionArr,
    inputAttrConfig = {},
    handleChange,
    drawerTableType,
    branchName = "",
    ...rest
}: {
    optionArr: any[];
    inputAttrConfig?: any;
    handleChange?: any;
    drawerTableType: AddItemDrawerType;
    branchName: string;
}) {
    const { setIsAddItemDrawerFlag } = useFlat(["ruleStore", branchName]);
    const { t } = useTranslation(["rule"]);
    return (
        <Select
            onChange={handleChange}
            dropdownRender={(menu) => (
                <div>
                    {menu}
                    <Divider style={{ margin: "4px 0" }} />
                    <div
                        style={{ padding: "4px 8px", cursor: "pointer" }}
                        onClick={() => {
                            if (drawerTableType == AddItemDrawerType.filter) {
                                dpChain("filterStore").setIsShowModal(true);
                            } else if (
                                drawerTableType == AddItemDrawerType.sort
                            ) {
                                dpChain("sortStore").setIsShowModal(true);
                            } else {
                                setIsAddItemDrawerFlag({
                                    flag: true,
                                    type: drawerTableType,
                                });
                            }
                        }}>
                        <PlusOutlined />{" "}
                        {`${t("add")} ${
                            {
                                [AddItemDrawerType.market]:
                                    t("rulePage_Market"),
                                [AddItemDrawerType.pos]: t("rulePage_pos"),
                                [AddItemDrawerType.sort]:
                                    t("rulePage_sortItem"),
                                [AddItemDrawerType.filter]: t(
                                    "rulePage_filterItem"
                                ),
                            }[drawerTableType]
                        }`}
                    </div>
                </div>
            )}
            {...inputAttrConfig}
            {...rest}>
            {optionArr &&
                optionArr.length > 0 &&
                optionArr.map((item: any) => {
                    return (
                        <Option value={item.value} key={item.id}>
                            {item.label}
                        </Option>
                    );
                })}
        </Select>
    );
}

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
    const { posList, queryPostListAct } = useFlat("posStore");
    const { marketList, queryMarkettListAct } = useFlat("marketStore");
    const { currentData } = useFlat(["ruleStore", branchName]);
    useEffect(() => {
        queryMarkettListAct();
        queryPostListAct();
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
    }, [currentData]);
    return (
        <div>
            <Form<TopPartForm>
                form={formRef}
                layout="vertical"
                name="basic"
                style={{ width: "100%" }}
                initialValues={currentData || {}}
                autoComplete="off">
                <Row
                    style={{
                        width: "100%",
                    }}
                    gutter={[10, 10]}>
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
                                    message: t`rulePage.rule_max_30`,
                                },
                                {
                                    pattern: /^[0-9a-zA-z_-]+$/,
                                    message: t`rulePage.rule_common1`,
                                },
                            ]}>
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
                                    message: t`placeholder_input`,
                                },
                            ]}>
                            <CustomSelect
                                branchName={branchName}
                                inputAttrConfig={{
                                    placeholder: commonT`placeholder_input`,
                                }}
                                optionArr={marketList
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
                                drawerTableType={AddItemDrawerType.market}
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
                                        t("rulePage_pos") +
                                        "!",
                                },
                            ]}>
                            <CustomSelect
                                inputAttrConfig={{
                                    placeholder: commonT`placeholder_input`,
                                }}
                                branchName={branchName}
                                optionArr={marketList
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
                                drawerTableType={AddItemDrawerType.market}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item<FieldType>
                            label={t`rulePage_pos`}
                            name="posId">
                            <CustomSelect
                                inputAttrConfig={{
                                    placeholder: commonT`placeholder_input`,
                                }}
                                branchName={branchName}
                                optionArr={posList.map((item) => {
                                    return {
                                        id: item.id,
                                        value: item.id,
                                        label: item.posName,
                                    };
                                })}
                                drawerTableType={AddItemDrawerType.pos}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row
                    style={{
                        width: "100%",
                    }}
                    gutter={10}>
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
                            ]}>
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
                            ]}>
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
                                    message: t`placeholder_input`,
                                },
                            ]}>
                            <CustomSelect
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
                                drawerTableType={AddItemDrawerType.sort}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item<FieldType>
                            label={t`rulePage_filterItem`}
                            name="filterItemId">
                            <CustomSelect
                                inputAttrConfig={{
                                    placeholder: commonT`placeholder_input`,
                                }}
                                optionArr={filterList.map((item) => {
                                    if (!item.id) {
                                        alert(123);
                                    }
                                    return {
                                        id: item.id,
                                        value: item.id,
                                        label: item.filterItemName,
                                    };
                                })}
                                drawerTableType={AddItemDrawerType.filter}
                                branchName={branchName}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row
                    style={{
                        width: "100%",
                    }}>
                    <Col span={6}>
                        <Form.Item<FieldType>
                            label={t`rulePage_sequenceNo`}
                            name="sequenceNo"
                            rules={[
                                {
                                    pattern: /^[0-9]+$/,
                                    message: t("rule_number") + "!",
                                },
                            ]}>
                            <InputNumber
                                placeholder={commonT`placeholder_input`}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item<FieldType>
                            label={t`rulePage_active`}
                            name="status"
                            valuePropName="checked">
                            <Checkbox />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item<FieldType>
                            label={t`rulePage_backupResult`}
                            name="backupResult"
                            valuePropName="checked">
                            <Checkbox />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item<FieldType>
                            label={t`rulePage.comment`}
                            name="comment">
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
