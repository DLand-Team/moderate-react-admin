import { Modal, Space, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { usePageConfig } from "src/common/hooks";
import { useFlat } from "src/service";
import { useTranslation } from "react-i18next";
import { Pos } from "src/service/stores/posStore/model";
import { RouterHelper } from "src/service/helper/routerHelper";
import { ROUTE_ID } from "src/router/name";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getTextWidth } from "src/common/utils";

const useConfig = () => {
    const { deleteAct, posList, queryPostListAct } = useFlat("posStore");
    const { t } = useTranslation(["pos"]);
    const { t: commonT } = useTranslation(["common"]);
    return usePageConfig<Pos>(() => {
        return [
            {
                title: t`posPage.NO`,
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
                title: t`posPage.posName`,
                dataIndex: "posName",
                key: "posName",
                align: "center",
                render: (item, record) => {
                    return (
                        <Link
                            to={{
                                pathname: RouterHelper.getRoutePathByKey(
                                    ROUTE_ID.PosDetailPage
                                ),
                                search: "?id=" + record.id,
                            }}
                        >
                            {item}
                        </Link>
                    );
                },
                fieldConfig: {
                    // scope: ["table", "search"],
                    formOptions: {
                        label: t`posPage.posName`,
                        name: "posName",
                        rules: [
                            {
                                required: true,
                                message: `${t`posPage.placeholder_input`} ${t`posPage.POSName`}`,
                            },
                            {
                                max: 30,
                                message: t`posPage.rule_posName_1`,
                            },
                            {
                                pattern: /^[0-9a-zA-z_-]+$/,
                                message: t`posPage.placeholder_posName`,
                            },
                        ],
                    },
                    inputAttrConfig: {
                        placeholder: t`posPage.placeholder_searchPosName`,
                        maxLength: 30,
                    },
                },
            },
            {
                title: t`posPage.comment`,
                dataIndex: "comment",
                key: "comment",
                align: "center",
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
                fieldConfig: {
                    scope: ["table"],
                    formOptions: {
                        label: t`posPage.comment`,
                        name: "comment",
                        rules: [
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
                title: t`posPage.action`,
                key: "action",
                align: "center",
                render: (_, record) => (
                    <Space size="middle">
                        <a
                            onClick={() => {
                                RouterHelper.jumpTo(ROUTE_ID.PosEditPage, {
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
                                        queryPostListAct();
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
    }, [posList]);
};

export default useConfig;
