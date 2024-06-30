import { Modal, Space } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { usePageConfig } from "src/common/hooks";
import { ROUTE_ID } from "src/router/name";
import { useFlat } from "src/service";
import { RouterHelper } from "src/service/helper/routerHelper";
import { Rule } from "src/service/stores/ruleStore/model";

const useConfig = () => {
    const { deleteAct, queryRuleListAct, ruleList } = useFlat("ruleStore");
    const { t } = useTranslation(["rule"]);
    return usePageConfig<Rule>(() => {
        return [
            {
                title: "NO",
                dataIndex: "id",
                key: "id",
                fieldConfig: {
                    scope: ["search", "table"],
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
                render: (item, record) => {
                    const { id } = record;
                    return (
                        <Link
                            to={{
                                pathname: RouterHelper.getRoutePathByKey(
                                    ROUTE_ID.RuleDetailPage
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
                        placeholder: t`rulePage.placeholder_ruleName`,
                        maxLength: 30,
                    },
                },
            },
            {
                title: t`rulePage_ruleType`,
                dataIndex: "ruleType",
                key: "ruleType",
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
            },
            {
                title: t`rulePage_action`,
                key: "action",
                render: (_, record) => (
                    <Space size="middle">
                        <a
                            onClick={() => {
                                RouterHelper.jumpTo(ROUTE_ID.RuleEditPage, {
                                    search: {
                                        id: record.id,
                                    },
                                });
                            }}
                        >
                            edit
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
                            delete
                        </a>
                    </Space>
                ),
            },
        ];
    }, [ruleList]);
};

export default useConfig;
