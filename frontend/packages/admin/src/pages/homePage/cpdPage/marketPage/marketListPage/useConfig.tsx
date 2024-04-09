import { Modal, Space } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { usePageConfig } from "src/common/hooks";
import { ROUTE_ID } from "src/config/routerConfig";
import { useFlat } from "src/reduxService";
import { RouterHelper } from "src/reduxService/helper/routerHelper";
import { Market } from "src/reduxService/stores/marketStore/model";

const useConfig = () => {
  const { deleteAct, marketList } = useFlat("marketStore");
  const { t } = useTranslation(["pos"]);
  return usePageConfig<Market>(() => {
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
        title: t`marketPage.marketName`,
        dataIndex: "marketName",
        key: "marketName",
        render: (item, record) => {
          const { id } = record;
          return (
            <Link
              to={{
                pathname: "/userCenter/marketPage/edit",
                search: `?title=posTitle&posId=${id}`,
              }}>
              {item}
            </Link>
          );
        },
        fieldConfig: {
          formOptions: {
            label: "marketName",
            name: "marketName",
          },
          inputAttrConfig: {
            placeholder: t`posPage.placeholder_posName`,
            maxLength: 30,
          },
        },
      },
      {
        title: t`marketPage.marketType`,
        dataIndex: "marketType",
        key: "marketType",
        render: (item) => {
          return {
            0: t`marketPage.NORMAL`,
            1: t`marketPage.CONNECITON`,
          }[item * 1];
        },
        fieldConfig: {
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
        title: t`marketPage.comment`,
        dataIndex: "comment",
        key: "comment",
      },
      {
        title: t`marketPage.action`,
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <a
              onClick={() => {
                RouterHelper.jumpTo(ROUTE_ID.MarketEditPage, {
                  search: {
                    id: record.id,
                  },
                });
              }}>
              edit
            </a>
            <a
              onClick={() => {
                Modal.confirm({
                  content: "are you sure?",
                  onOk: async () => {
                    await deleteAct({
                      id: record.id,
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
