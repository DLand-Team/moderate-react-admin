import { EditOutlined, FileOutlined, PlusOutlined } from "@ant-design/icons";
import {
    Button,
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
import { dpChain, ruleHelper, useFlat } from "src/service";
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
    drawerTableType: {
        add: AddItemDrawerType;
        edit?: AddItemDrawerType;
        detail?: AddItemDrawerType;
    };
    branchName: string;
}) {
    const { setIsAddItemDrawerFlag } = useFlat("ruleStore", {});
    const { t } = useTranslation(["rule"]);
    const { t: commonT } = useTranslation(["common"]);
    const handleClick = (
        subType: "add" | "edit" | "detail",
        id: string | number = ""
    ) => {
        let type = drawerTableType[subType];
        let flag = true;
        if (type == AddItemDrawerType.filter) {
            if (subType != "add") {
                dpChain("filterStore").getDetailAct({ id });
                if (subType == "detail") {
                    dpChain("filterStore").setIsDetail(true);
                }
            } else {
                dpChain("filterStore").setCurrentData(null);
            }
            dpChain("filterStore").setIsShowModal(true);
            flag = false;
        } else if (type == AddItemDrawerType.sort) {
            if (subType != "add") {
                if (subType == "detail") {
                    dpChain("sortStore").setIsDetail(true);
                }
                dpChain("sortStore").getDetailAct({ id });
            } else {
                dpChain("sortStore").setCurrentData(null);
            }
            dpChain("sortStore").setIsShowModal(true);
            flag = false;
        }
        ;
        type != undefined &&
            setIsAddItemDrawerFlag({
                flag,
                type,
                id,
            });
    };
    return (
        <Select
            onChange={handleChange}
            optionRender={(option) => {
                return (
                    <div
                        style={{
                            position: "relative",
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                flex: 1,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {option.label}
                        </div>
                        <Button.Group
                            style={{
                                width: "50px",
                                height: "100%",
                            }}
                        >
                            <Button
                                onClick={() => {
                                    handleClick("edit", option.value!);
                                }}
                                type="primary"
                                size="small"
                                icon={<EditOutlined />}
                            ></Button>
                            <Button
                                onClick={() => {
                                    handleClick("detail", option.value!);
                                }}
                                type="primary"
                                size="small"
                                icon={<FileOutlined />}
                            ></Button>
                        </Button.Group>
                    </div>
                );
            }}
            dropdownRender={(menu) => (
                <div>
                    {menu}
                    <Divider style={{ margin: "4px 0" }} />
                    <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            handleClick("add");
                        }}
                    >
                        <Button icon={<PlusOutlined />} type="text">
                            {`${commonT("add")} ${
                                {
                                    [AddItemDrawerType.market_add]:
                                        t("rulePage_Market"),
                                    [AddItemDrawerType.pos_add]:
                                        t("rulePage_pos"),
                                    [AddItemDrawerType.sort]:
                                        t("rulePage_sortItem"),
                                    [AddItemDrawerType.filter]: t(
                                        "rulePage_filterItem"
                                    ),
                                }[
                                    drawerTableType[
                                        "add"
                                    ] as AddItemDrawerType.market_add
                                ]
                            }`}
                        </Button>
                    </div>
                </div>
            )}
            {...inputAttrConfig}
            {...rest}
        >
            {optionArr &&
                optionArr.length > 0 &&
                optionArr.map((item: any) => {
                    return (
                        <Option value={item.value} key={item.id + item.label}>
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
                        debugger
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
                            <CustomSelect
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
                            <CustomSelect
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
                            <CustomSelect
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
                                drawerTableType={{
                                    add: AddItemDrawerType.sort,
                                    edit: AddItemDrawerType.sort,
                                    detail: AddItemDrawerType.sort,
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item<FieldType>
                            label={t`rulePage_filterItem`}
                            name="filterItemId"
                        >
                            <CustomSelect
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
                                    add: AddItemDrawerType.filter,
                                    edit: AddItemDrawerType.filter,
                                    detail: AddItemDrawerType.filter,
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
