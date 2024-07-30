import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, Space } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { usePageConfig } from "src/common/hooks";
import { ROUTE_ID } from "src/router";
import { routerHelper, useFlat } from "src/service";
import type { Rule } from "src/service/stores/ruleStore/model";

const useConfig = () => {
    const { deleteAct, queryRuleListAct, ruleList } = useFlat("ruleStore");
    const { t } = useTranslation(["rule"]);
    return usePageConfig<Rule>(() => {
        return [
            {
                title: "NO",
                dataIndex: "id",
                key: "id",
                align:'center',
                fieldConfig: {
                    scope: [ "table"],
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
                title: t`rulePage_ruleName`,
                dataIndex: "ruleName",
                key: "ruleName",
                align:'center',
                render: (item, record) => {
                    const { id } = record;
                    return (
                        <Link
                            to={{
                                pathname: routerHelper.getRoutePathByKey(
                                    ROUTE_ID.RuleDetail
                                ),
                                search: `?id=${id}`,
                            }}
                        >
                            {item}
                        </Link>
                    );
                },
                fieldConfig: {
                    formOptions: {
                        label: t`rulePage_ruleName`,
                        name: "ruleName",
                    },
                    inputAttrConfig: {
                        placeholder: t`placeholder_input`,
                        maxLength: 30,
                    },
                },
            },
            {
                title: t`rulePage_ruleType`,
                dataIndex: "ruleType",
                key: "ruleType",
                align:'center',
                render: (item) => {
                    return {
                        0: t`rulePage.NORMAL`,
                        1: t`rulePage.CONNECITON`,
                    }[item * 1];
                },
                fieldConfig: {
                    formOptions: {
                        label: t`rulePage.comment`,
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
                title: t`rulePage.comment`,
                dataIndex: "comment",
                key: "comment",
                align:'center',
            },
            {
                title: t`rulePage_action`,
                key: "action",
                align:'center',
                render: (_, record) => (
                    <Space size="middle">
                        <a
                            onClick={() => {
                                routerHelper.jumpTo(ROUTE_ID.RuleEdit, {
                                    search: {
                                        id: record.id,
                                    },
                                });
                            }}
                        >
                            <EditOutlined />
                        </a>
                        <a
                            onClick={() => {
                                Modal.confirm({
                                    content: "are you sure?",
                                    onOk: async () => {
                                        await deleteAct({
                                            ids: record.id,
                                        });
                                        queryRuleListAct();
                                    },
                                });
                            }}
                        >
                            <DeleteOutlined />
                        </a>
                    </Space>
                ),
            },
        ];
    }, [ruleList]);
};

export default useConfig;
