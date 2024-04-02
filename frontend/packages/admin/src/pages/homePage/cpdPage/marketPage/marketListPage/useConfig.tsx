import { Modal, Space } from "antd";
import { Link } from "react-router-dom";
import { usePageConfig } from "src/common/hooks";
import { useFlat } from "src/reduxService";
import { useTranslation } from "react-i18next";
import { PageType } from "src/reduxService/stores/marketStore/model";

const useConfig = () => {
  const { deleteAct, marketList } = useFlat("marketStore");
  const { t } = useTranslation(["market"]);
  return usePageConfig<PageType>(() => {
    return [
      {
        title: "NO",
        dataIndex: "no",
        key: "no",
        config: {
          scope: ["table"],
          formOptions: {
            label: "no",
            name: "no",
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
        dataIndex: "market_name",
        key: "market_name",
        render: (item, _) => {
          // const { marketId } = record;
          return (
            <Link
              to={{
                pathname: "/userCenter/market/detail",
                // search: `?title=marketTitle&marketId=${marketId}`,
              }}>
              {item}
            </Link>
          );
        },
        config: {
          scope: ["search", "table"],
          formOptions: {
            label: "market_name",
            name: "market_name",
            rules: [
              {
                required: true,
                message: `${t`marketPage.placeholder_input`} ${t`marketPage.POSName`}`,
              },
              {
                max: 30,
                message: t`marketPage.rule_marketName_1`,
              },
              {
                pattern: /^[0-9a-zA-z_-]+$/,
                message: t`marketPage.placeholder_marketName`,
              },
            ],
          },
          inputAttrConfig: {
            placeholder: t`marketPage.placeholder_marketName`,
            maxLength: 30,
            size: "small",
          },
        },
      },
      {
        title: t`marketPage.comment`,
        dataIndex: "comment",
        key: "comment",
        render: (item, _) => {
          // const { marketId } = record;
          return (
            <Link
              to={{
                pathname: "/userCenter/market/detail",
                // search: `?title=marketTitle&marketId=${marketId}`,
              }}>
              {item}
            </Link>
          );
        },
        config: {
          formOptions: {
            label: t`marketPage.comment`,
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
        title: t`marketPage.action`,
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <a onClick={() => {}}>edit</a>
            <a
              onClick={() => {
                Modal.confirm({
                  content: "are you sure?",
                  onOk: async () => {
                    await deleteAct({
                      ids: [String(record.id)],
                    });
                  },
                });
              }}>
              delete
            </a>
          </Space>
        ),
      },
    ];
  }, [marketList]);
};

export default useConfig;
