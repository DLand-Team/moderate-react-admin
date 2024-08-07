import {
    CheckOutlined,
    DeleteOutlined,
    EditOutlined,
    RightOutlined,
} from "@ant-design/icons";
import { Col, Form, Input, Popconfirm, Row, Switch, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { ColumnsCreater } from "src/components/editTable";
import { useFlat } from "src/service";
import type { Segment } from "src/service/stores/ruleStore/model";
import OperateCarriersSelect from "../operateCarriersSelect";
import SearchSelect from "../searchSelect";

const columnCreater: ColumnsCreater<Segment, { branchName: string }> = (
    { editingKey, save, isEditing, cancel, edit, form, record },
    extra
) => {
    const { t } = useTranslation(["rule"]);
    const { t: commonT } = useTranslation(["common"]);
    const { isDetail, setIsEditing, deleteSegmentAct } = useFlat(
        ["ruleStore", extra?.branchName],
        {
            isDetail: "IN",
        }
    );
    let value: ReturnType<ColumnsCreater<Segment>> = [
        {
            title: t("rulePage_exclude"),
            dataIndex: "exclude",
            key: "exclude",
            editable: true,
            width: "100px",
            render: (value) => {
                return <Switch disabled checked={value}></Switch>;
            },
            fieldConfig: {
                type: "Switch",
                formOptions: {
                    name: "exclude",
                },
            },
        },
        {
            title: t("rulePage_codeShare"),
            dataIndex: "allowCodeShare",
            key: "allowCodeShare",
            editable: true,
            width: "100px",
            render: (value) => {
                return <Switch disabled checked={value}></Switch>;
            },
            fieldConfig: {
                type: "Switch",
                formOptions: {
                    name: "allowCodeShare",
                    valuePropName: "checked",
                    initialValue: false,
                    style: { margin: 0 },
                    normalize: (value) => {
                        return value ? 1 : 0;
                    },
                },
            },
        },
        {
            title: t("rulePage_onlyNonStopflight"),
            dataIndex: "onlyNonStopFlight",
            key: "onlyNonStopFlight",
            editable: true,
            width: "100px",
            render: (value) => {
                return <Switch disabled checked={value}></Switch>;
            },
            fieldConfig: {
                type: "Switch",
                formOptions: {
                    name: "onlyNonStopFlight",
                    style: {
                        margin: 0,
                    },
                    normalize: (value) => {
                        return value ? 1 : 0;
                    },
                },
            },
        },
        {
            title: t("rulePage_carriers"),
            dataIndex: "carrier",
            key: "carrier",
            align: "center",
            editable: true,
            width: "120px",
            fieldConfig: {
                render: () => {
                    const { carrier } = record || {};
                    return (
                        <SearchSelect
                            name={"carrier"}
                            style={{
                                width: "100px",
                            }}
                            initValue={carrier || "ALL"}
                        />
                    );
                },
            },
            render(e) {
                return e;
            },
        },
        {
            title: t("rulePage_operateCarriers"),
            dataIndex: "operateCarriersAll",
            key: "operateCarriersAll",
            editable: true,
            align: "center",
            render: (_, record) => {
                const { operateCarriers, notOperateCarriers } = record;
                let useFlagInitValue = "use",
                    searchSelectInitValue = "";
                if (operateCarriers) {
                    useFlagInitValue = "use";
                    searchSelectInitValue = operateCarriers;
                } else if (notOperateCarriers) {
                    useFlagInitValue = "not";
                    searchSelectInitValue = notOperateCarriers;
                }
                return (
                    searchSelectInitValue &&
                    `${useFlagInitValue}-${searchSelectInitValue}`
                );
            },
            fieldConfig: {
                render: (_, formIns) => {
                    const {
                        allowCodeShare,
                        operateCarriers,
                        notOperateCarriers,
                    } = formIns?.getFieldsValue() || {};
                    return (
                        <OperateCarriersSelect
                            allowCodeShare={allowCodeShare}
                            operateCarriers={operateCarriers}
                            notOperateCarriers={notOperateCarriers}
                            formIns={formIns}
                            isForm={true}
                        />
                    );
                },
            },
        },
        {
            title: t("rulePage_flightRange"),
            dataIndex: "flightRange",
            key: "flightRange",
            editable: true,
            align: "center",
            fieldConfig: {
                formOptions: {
                    name: "flightRange",
                },
                render: () => {
                    const { flightNoEnd = 9999, flightNoStart = 1 } = record;
                    return (
                        <Form.Item
                            style={{
                                margin: 0,
                            }}
                        >
                            <Row align={"middle"}>
                                <Col span={10}>
                                    <Form.Item
                                        name={"flightNoStart"}
                                        initialValue={flightNoStart || 1}
                                        style={{ margin: 0 }}
                                        normalize={(value) => {
                                            if (value && !isNaN(value * 1)) {
                                                return value * 1;
                                            }
                                            return value;
                                        }}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "rulePage_rule_flightNoStart",
                                            },
                                            {
                                                pattern: /^[0-9]+$/,
                                                message: "rule_number",
                                            },
                                            {
                                                message:
                                                    "rulePage_rule_flightNoStart1",
                                                validator: (
                                                    _,
                                                    value,
                                                    callback
                                                ) => {
                                                    if (value == 0) {
                                                        callback(t`rulePage_zero`);
                                                    } else {
                                                        callback();
                                                    }
                                                },
                                            },
                                            {
                                                message:
                                                    "rulePage_rule_flightNoStart2",
                                                validator: (
                                                    _,
                                                    value,
                                                    callback
                                                ) => {
                                                    if (
                                                        value &&
                                                        value * 1 >
                                                            form.getFieldValue(
                                                                "flightNoEnd"
                                                            ) *
                                                                1
                                                    ) {
                                                        callback(t`rulePage_zero`);
                                                    } else {
                                                        callback();
                                                    }
                                                },
                                            },
                                        ]}
                                    >
                                        <Input
                                            style={{
                                                width: 60,
                                            }}
                                            maxLength={4}
                                            className="flightRangeInputItem"
                                        ></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <RightOutlined />
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        name={"flightNoEnd"}
                                        initialValue={flightNoEnd || 9999}
                                        style={{ margin: 0 }}
                                        normalize={(value) => {
                                            if (value && !isNaN(value * 1)) {
                                                return value * 1;
                                            }
                                            return value;
                                        }}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "rulePage_rule_flightNoStart",
                                            },
                                            {
                                                pattern: /^[0-9]+$/,
                                                message: "rule_number",
                                            },
                                            {
                                                message:
                                                    "rulePage_rule_flightNoStart1",
                                                validator: (
                                                    _,
                                                    value,
                                                    callback
                                                ) => {
                                                    if (value == 0) {
                                                        callback(t`rulePage_zero`);
                                                    } else {
                                                        callback();
                                                    }
                                                },
                                            },
                                        ]}
                                    >
                                        <Input
                                            style={{
                                                width: 60,
                                            }}
                                            maxLength={4}
                                            className="flightRangeInputItem"
                                        ></Input>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form.Item>
                    );
                },
            },
            render: (_, record) => {
                const { flightNoEnd = "", flightNoStart = "" } = record;
                return `${flightNoStart || 1}-${flightNoEnd || 9999}`;
            },
        },
    ];
    if (!isDetail) {
        value.push({
            title: commonT("operation"),
            dataIndex: "operation",
            align: "center",
            render: (_: any, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={async () => {
                                await form.validateFields();
                                setIsEditing(false);
                                save(record.uid!);
                            }}
                            style={{ marginRight: 8 }}
                        >
                            <CheckOutlined />
                        </Typography.Link>
                        <Popconfirm
                            title={commonT`blog.cancel`}
                            onConfirm={() => {
                                setIsEditing(false);
                                cancel();
                            }}
                            okText={commonT`blog.Yes`}
                            cancelText={commonT`blog.No`}
                        >
                            <DeleteOutlined />
                        </Popconfirm>
                    </span>
                ) : (
                    <span>
                        <Typography.Link
                            disabled={editingKey !== ""}
                            onClick={() => {
                                edit(record);
                                setIsEditing(true);
                            }}
                            style={{ marginRight: 8 }}
                        >
                            {/* Edit */}
                            <EditOutlined />
                        </Typography.Link>
                        <Typography.Link disabled={editingKey !== ""}>
                            <Popconfirm
                                title={commonT`blog.delete`}
                                onConfirm={() => {
                                    deleteSegmentAct({
                                        id: record.id,
                                        uid: record.uid!,
                                    });
                                }}
                                okText={commonT`blog.Yes`}
                                cancelText={commonT`blog.No`}
                            >
                                <DeleteOutlined />
                            </Popconfirm>
                        </Typography.Link>
                    </span>
                );
            },
        });
    }
    return value;
};

export default columnCreater;
