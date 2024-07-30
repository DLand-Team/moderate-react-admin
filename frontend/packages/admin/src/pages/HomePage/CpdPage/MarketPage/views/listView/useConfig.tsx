import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, Space, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { usePageConfig } from "src/common/hooks";
import { getTextWidth } from "src/common/utils";
import { ROUTE_ID } from "src/router";
import { useFlat } from "src/service";
import { routerHelper } from "src/service";
import type { Market } from "src/service/stores/marketStore/model";

const useConfig = () => {
    const { deleteAct, marketList, queryMarkettListAct } =
        useFlat("marketStore");
    const { t } = useTranslation(["market"]);
    const { t: commonT } = useTranslation(["common"]);
    return usePageConfig<Market>(() => {
        return [
            {
                title: t`marketPage.NO`,
                dataIndex: "id",
                key: "id",
                align: "center",
                fieldConfig: {
                    scope: ["table"],
                    formOptions: {
                        label: "id",
                        name: "id",
                        rules: [
                            {
                                required: true,
                            },
                            {
                                type: "string",
                                min: 4,
                                max: 60,
                            },
                        ],
                    },
                },
            },
            {
                title: t`marketPage.marketName`,
                dataIndex: "marketName",
                key: "marketName",
                align: "center",
                render: (item, record) => {
                    return (
                        <Link
                            to={{
                                pathname: routerHelper.getRoutePathByKey(
                                    ROUTE_ID.MarketDetail
                                ),
                                search: "?id=" + record.id,
                            }}
                        >
                            {item}
                        </Link>
                    );
                },
                fieldConfig: {
                    formOptions: {
                        label: t`marketPage.marketName`,
                        name: "marketName",
                    },
                    inputAttrConfig: {
                        placeholder: t`marketPage.placeholder_input`,
                        maxLength: 30,
                    },
                },
            },
            {
                title: t`marketPage.marketType`,
                dataIndex: "marketType",
                key: "marketType",
                align: "center",
                render: (item) => {
                    return {
                        0: t`marketPage.NORMAL`,
                        1: t`marketPage.CONNECITON`,
                    }[item * 1];
                },
                fieldConfig: {
                    scope: ["search", "table"],
                    formOptions: {
                        label: t`marketPage.marketType`,
                        name: "marketType",
                    },
                    options: [
                        {
                            key: "0",
                            value: "0",
                            label: t`marketPage.NORMAL`,
                        },
                        {
                            key: "1",
                            value: "1",
                            label: t`marketPage.CONNECITON`,
                        },
                    ],
                    type: "Select",
                    inputAttrConfig: {
                        placeholder: t`marketPage.placeholder_select`,
                        style: {
                            width: "100%",
                        },
                        allowClear: true,
                    },
                },
            },
            {
                title: t`marketPage.comment`,
                dataIndex: "comment",
                key: "comment",
                align: "center",
                fieldConfig: {
                    scope: ["table"],
                },
                ellipsis: {
                    showTitle: false,
                },
                render: (value) => {
                    const width = getTextWidth(value, "14");
                    if (width > 150) {
                        return (
                            <Tooltip placement="topLeft" title={value}>
                                {value}
                            </Tooltip>
                        );
                    }
                    return value;
                },
            },
            {
                title: t`marketPage.action`,
                key: "action",
                align: "center",
                render: (_, record) => (
                    <Space size="middle">
                        <a
                            onClick={() => {
                                routerHelper.jumpTo(ROUTE_ID.MarketEdit, {
                                    search: {
                                        id: record.id,
                                    },
                                });
                            }}
                        >
                            {/* edit */}
                            <EditOutlined />
                        </a>
                        <a
                            onClick={() => {
                                Modal.confirm({
                                    title: commonT`blog.modalDeleteTitle`,
                                    content: commonT`blog.modalDeleteContent`,
                                    onOk: async () => {
                                        await deleteAct({
                                            ids: record.id,
                                        });
                                        queryMarkettListAct();
                                    },
                                    okText: commonT`blog.Yes`,
                                    cancelText: commonT`blog.No`,
                                });
                            }}
                        >
                            {/* delete */}
                            <DeleteOutlined />
                        </a>
                    </Space>
                ),
            },
        ];
    }, [marketList]);
};

export default useConfig;
