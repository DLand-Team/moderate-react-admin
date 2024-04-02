import { usePageConfig } from "src/common/hooks";
import { Modal, Space, Select, Form } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useFlat } from "src/reduxService";
import { useTranslation } from "react-i18next";
let Option = Select.Option;

const useConfig = () => {
  const { deleteAct, ruleList, queryRuleAct } = useFlat("ruleStore");
  const { t } = useTranslation(["rule"]);
  const { t: commonT } = useTranslation(["common"]);
  return usePageConfig<any>(() => {
    return [
      {
        title: t`ruleFamily.NO`,
        dataIndex: "id",
        key: "id",
        align: "center",
        fieldConfig: {
          scope: ["table"],
        },
      },
      {
        title: t`ruleFamily.ruleName`,
        dataIndex: "ruleName",
        key: "ruleName",
        align: "center",
        fieldConfig: {
          formOptions: {
            label: t`ruleFamily.ruleName`,
            name: "ruleName",
            rules: [],
          },
          inputAttrConfig: {
            placeholder: t`ruleFamily.placeholder_ruleFamilyName`,
          },
        },
        render(value) {
          return <a>{value}</a>;
        },
      },
      {
        title: t`ruleFamily.applyProduct`,
        dataIndex: "applyProduct",
        key: "applyProduct",
        align: "center",
        fieldConfig: {
          scope: ["search", "table"],
          formOptions: {
            label: t`ruleFamily.applyProduct`,
            name: "rules",
          },
          render() {
            return (
              <Form.Item
                name="rules"
                label={t`ruleFamily.applyProduct`}
                rules={[]}>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder={t`ruleFamily.placeholder_ruleFamilyList`}>
                  {ruleList &&
                    ruleList.length > 0 &&
                    ruleList.map((item) => {
                      return (
                        <Option value={item.id} key={item.id}>
                          {item.ruleName}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            );
          },
        },
        render(value) {
          return <a>{value}</a>;
        },
      },
      {
        title: t`ruleFamily.status`,
        dataIndex: "status",
        key: "status",
        align: "center",
        fieldConfig: {
          scope: ["search", "table"],
          formOptions: {
            label: t`ruleFamily.status`,
            name: "rules",
          },
          render() {
            return (
              <Form.Item name="rules" label={t`ruleFamily.status`} rules={[]}>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder={t`ruleFamily.placeholder_ruleFamilyList`}>
                  {ruleList &&
                    ruleList.length > 0 &&
                    ruleList.map((item) => {
                      return (
                        <Option value={item.id} key={item.id}>
                          {item.ruleName}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            );
          },
        },
        render(value) {
          return <a>{value}</a>;
        },
      },
      {
        title: t`ruleFamily.action`,
        key: "action",
        align: "center",
        render: (_, record) => (
          <Space size="middle">
            <a onClick={() => {}}>
              <EditOutlined />
            </a>
            <a
              onClick={() => {
                Modal.confirm({
                  title: commonT`blog.modalDeleteTitle`,
                  content: commonT`blog.modalDeleteContent`,
                  onOk: async () => {
                    await deleteAct({ ids: record.id });
                    queryRuleAct();
                  },
                  okText: commonT`blog.Yes`,
                  cancelText: commonT`blog.No`,
                });
              }}>
              <DeleteOutlined />
            </a>
          </Space>
        ),
      },
    ];
  }, [ruleList]);
};

export default useConfig;
