import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Checkbox, Form, Modal, Space } from "antd";
import { useTranslation } from "react-i18next";
import { usePageConfig } from "src/common/hooks";
import { useFlat } from "src/service";

const useConfig = () => {
    const { setIsShowModal, deleteAct, list, queryListAct, getDetailAct } =
        useFlat("filterStore");
    const { t } = useTranslation(["filter"]);
    const { t: commonT } = useTranslation(["common"]);

    return usePageConfig<any>(() => {
        return [
            {
                title: t`filterItem.NO`,
                dataIndex: "id",
                key: "id",
                align: "center",
                fieldConfig: {
                    scope: ["table"],
                },
            },
            {
                title: t`filterItem.FilterName`,
                dataIndex: "filterItemName",
                key: "filterItemName",
                align: "center",
                fieldConfig: {
                    scope: ["modal", "table", "search"],
                    formOptions: {
                        label: t`filterItem.filterItemName`,
                        name: "filterItemName",
                        rules: [
                            {
                                required: true,
                                message: t`filterItem.rule__filterItemName_1`,
                            },
                            {
                                pattern: /^([a-zA-Z0-9-_]+)$/,
                                message: t`filterItem.rule__filterItemName_2`,
                            },
                            {
                                max: 30,
                                message: t`filterItem.rule__filterItemName_3`,
                            },
                        ],
                    },
                    inputAttrConfig: {
                        placeholder: t`filterItem.placeholder_filterItemName`,
                        maxLength: 30,
                    },
                },
            },
            {
                title: t`filterItem.AllDirect`,
                dataIndex: "allDirect",
                key: "allDirect",
                align: "center",
                fieldConfig: {
                    scope: ["modal", "table"],
                    formOptions: {
                        label: t`filterItem.AllDirect`,
                        name: "allDirect",
                    },
                    render: () => {
                        return (
                            <Form.Item name="allDirect" valuePropName="checked">
                                <Checkbox>{t`filterItem.AllDirect`}</Checkbox>
                            </Form.Item>
                        );
                    },
                },
                render: (record, _) => {
                    return (
                        <div>
                            {record ? t`filterItem.YES` : t`filterItem.NOT`}
                        </div>
                    );
                },
            },
            {
                title: t`filterItem.FilterBy`,
                dataIndex: "filterBy",
                key: "filterBy",
                align: "center",
                fieldConfig: {
                    scope: ["table"],
                    formOptions: {
                        label: t`filterItem.FilterBy`,
                        name: "filterBy",
                    },
                },
                render: (_, record) => {
                    //数据格式转换
                    let strArr: any = [];
                    let createStr = (info: string, infoVal: string) => {
                        let str =
                            info +
                            { 1: " > ", 2: " < ", 3: " = " }[
                                record[infoVal + "Operator"] as "1"
                            ] +
                            record[infoVal] +
                            (infoVal === "travelTime"
                                ? record.travelTimeType === 1
                                    ? ""
                                    : "%"
                                : "");
                        strArr.push(str);
                    };
                    if (record.price !== 0) {
                        createStr("Price", "price");
                    }
                    if (record.travelTime !== 0) {
                        createStr("Travel Time", "travelTime");
                    }
                    if (record.layover !== 0) {
                        createStr("Layover", "layover");
                    }
                    if (record.connectionsOperator !== 0) {
                        createStr("Connections", "connections");
                    }
                    return <div>{strArr.join("；")}</div>;
                },
            },
            {
                title: commonT`blog.action`,
                key: "action",
                align: "center",
                render: (_, record) => (
                    <Space size="middle">
                        <EditOutlined
                            style={{
                                fontSize: 15,
                                color: "#1890FF",
                                marginRight: 10,
                            }}
                            onClick={() => {
                                getDetailAct({ id: record.id });
                                setIsShowModal(true);
                            }}
                        />
                        <DeleteOutlined
                            style={{
                                fontSize: 15,
                                color: "#1890FF",
                                marginRight: 10,
                            }}
                            onClick={() => {
                                Modal.confirm({
                                    title: t`filterItem.DelTile`,
                                    content: t`filterItem.modalDeleteContent`,
                                    onOk: async () => {
                                        await deleteAct({
                                            ids: record.id,
                                        });
                                        queryListAct();
                                    },
                                    okText: commonT`blog.Yes`,
                                    cancelText: commonT`blog.No`,
                                });
                            }}
                        />
                    </Space>
                ),
            },
        ];
    }, [list, t]);
};

export default useConfig;
