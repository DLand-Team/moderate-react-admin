import {
    CheckOutlined,
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { Button, Form, Popconfirm, Switch, Typography, message } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ColumnsCreater, EditTable, Wrapper } from "src/common/hooks/editTable";
import { UUID } from "src/common/utils";
import { useFlat } from "src/service";
import { MarketItem } from "src/service/stores/marketStore/model";
import LocationField from "../customFIelds/location-field";
import LocationTypeField from "../customFIelds/locationType-field";

const calcWeight = (data: { locationType: string; exclude: boolean }) => {
    const { locationType, exclude } = data;
    let weight = 0;
    weight +=
        {
            P: 1,
            C: 2,
            S: 3,
            N: 4,
            Z: 5,
            A: 6,
            W: 7,
        }[locationType] || 0;
    weight = weight * (exclude ? 1 : 10);
    return weight;
};

const colCreater: ColumnsCreater<MarketItem> = ({
    editingKey,
    form,
    save,
    isEditing,
    cancel,
    edit,
    deleteByKey,
}) => {
    const { t } = useTranslation(["market"]);
    const { t: commonT } = useTranslation(["common"]);
    const { setIsDisabledMarketType, setIsEditing } = useFlat("marketStore");
    return [
        {
            title: t("marketPage.locationType"),
            dataIndex: "locationType",
            key: "locationType",
            editable: true,
            align: "center",
            fieldConfig: {
                formOptions: {
                    rules: [
                        {
                            required: true,
                            message:
                                t`marketPage.placeholder_select` +
                                t`marketPage.locationType`,
                        },
                    ],
                },
                inputAttrConfig: {
                    // placeholder: `${t("marketPage.placeholder_select")} ${t(
                    //   "marketPage.marketType"
                    // )}`,
                    placeholder:
                        t`marketPage.placeholder_select` +
                        t`marketPage.marketType`,
                    maxLength: 60,
                    style: {
                        width: "140px",
                    },
                },
                type: "Select",
                render: LocationTypeField,
            },
            render: (value) => {
                return (
                    <>
                        {
                            (
                                {
                                    P: t`marketPage.AIRPORT`,
                                    C: t`marketPage.CITY`,
                                    S: t`marketPage.STATE`,
                                    N: t`marketPage.COUNTRY`,
                                    Z: t`marketPage.ATPCO`,
                                    A: t`marketPage.TC`,
                                    W: t`marketPage.WORLD`,
                                } as any
                            )[value]
                        }
                    </>
                );
            },
        },
        {
            title: t("marketPage.location"),
            dataIndex: "locationInfo",
            key: "locationInfo",
            editable: true,
            align: "center",
            fieldConfig: {
                inputAttrConfig: {
                    placeholder: t`marketPage.rule_placeholder`,
                },
                formOptions: {
                    name: "locationInfo",
                    rules: [
                        {
                            required: true,
                            message:
                                t`marketPage.placeholder_input` +
                                " " +
                                t`marketPage.location`,
                        },
                    ],
                },
                render: LocationField,
            },
        },
        {
            title: t("marketPage.EXCLUDE"),
            dataIndex: "exclude",
            key: "exclude",
            editable: true,
            align: "center",
            render: (value) => {
                return <Switch disabled checked={value}></Switch>;
            },
            fieldConfig: {
                type: "Switch",
                formOptions: {
                    name: "exclude",
                    style: {
                        margin: 0,
                    },
                    valuePropName: "checked",
                    initialValue: false,
                },
            },
        },
        {
            title: t("marketPage.weight"),
            dataIndex: "weight",
            key: "weight",
            editable: true,
            align: "center",
            fieldConfig: {
                render: (_, formIns) => {
                    const { locationType, exclude } = form.getFieldsValue();
                    const weightValue = calcWeight({
                        locationType,
                        exclude,
                    });
                    useEffect(() => {
                        formIns.setFieldValue("weight", weightValue);
                    }, [weightValue]);

                    return (
                        <Form.Item name={"weight"}>
                            {calcWeight({
                                locationType,
                                exclude,
                            })}
                        </Form.Item>
                    );
                },
            },
            render: (value) => {
                return <div>{value}</div>;
            },
        },
        {
            title: t("marketPage.operation"),
            dataIndex: "operation",
            align: "center",
            render: (_: any, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => {
                                setIsDisabledMarketType(false);
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
                                cancel();
                                setIsEditing(false);
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
                                    deleteByKey(record.uid!);
                                }}
                                okText={commonT`blog.Yes`}
                                cancelText={commonT`blog.No`}
                            >
                                {/* Delete */}
                                <DeleteOutlined />
                            </Popconfirm>
                        </Typography.Link>
                    </span>
                );
            },
        },
    ];
};

const WrapperComp: Wrapper<MarketItem> = ({
    children,
    editingKey,
    setDataList,
    dataList,
}) => {
    const { t } = useTranslation(["market"]);
    const { t: commonT } = useTranslation(["common"]);
    const { currentData, setCurrentMarketData, setIsDisabledMarketType } =
        useFlat("marketStore");
    return (
        <>
            {children}
            <Button
                style={{
                    marginTop: "30px",
                }}
                onClick={() => {
                    if (editingKey) {
                        message.warning({
                            content: commonT`blog.editing`,
                        });
                        return;
                    }
                    const newData = [
                        ...dataList,
                        {
                            uid: UUID(),
                        } as MarketItem,
                    ];
                    setDataList(newData);
                    setCurrentMarketData({
                        ...currentData!,
                        cpdMarketItems: newData,
                    });
                    setIsDisabledMarketType(true);
                }}
                icon={<PlusOutlined />}
                type="dashed"
            >
                {t`marketPage.addLine`}
            </Button>
        </>
    );
};

const MarketItemsTable = () => {
    const { currentData, setCurrentMarketData } = useFlat("marketStore");
    const { t } = useTranslation(["market"]);

    return (
        <>
            <Typography
                style={{
                    fontSize: "16px",
                    marginBottom: "30px",
                }}
            >
                {t("marketPage.itemlistTile")}
            </Typography>
            <EditTable<MarketItem>
                columnCreater={colCreater}
                values={currentData?.cpdMarketItems || []}
                Wrapper={WrapperComp}
                handleValuesChange={(_, values) => {
                    setCurrentMarketData({
                        ...currentData!,
                        cpdMarketItems: values,
                    });
                }}
            />
        </>
    );
};

export default MarketItemsTable;
