import { Modal, Space } from "antd";
import { Link } from "react-router-dom";
import { usePageConfig } from "src/common/hooks";
import { useFlat } from "src/reduxService";
import { useTranslation } from "react-i18next";
import { Pos } from "src/reduxService/stores/posStore/model";
import { RouterHelper } from "src/reduxService/helper/routerHelper";
import { ROUTE_ID } from "src/config/routerConfig";

const useConfig = () => {
  const { deleteAct, posList } = useFlat("posStore");
  const { t } = useTranslation(["pos"]);
  return usePageConfig<Pos>(() => {
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
        title: t`posPage.posName`,
        dataIndex: "posName",
        key: "posName",
        render: (item, _) => {
          // const { posId } = record;
          return (
            <Link
              to={{
                pathname: "/userCenter/pos/detail",
                // search: `?title=posTitle&posId=${posId}`,
              }}>
              {item}
            </Link>
          );
        },
        fieldConfig: {
          formOptions: {
            label: "posName",
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
            placeholder: t`posPage.placeholder_posName`,
            maxLength: 30,
          },
        },
      },
      {
        title: t`posPage.comment`,
        dataIndex: "comment",
        key: "comment",
        render: (item, _) => {
          // const { posId } = record;
          return (
            <Link
              to={{
                pathname: "/userCenter/pos/detail",
                // search: `?title=posTitle&posId=${posId}`,
              }}>
              {item}
            </Link>
          );
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
        title: t`posPage.action`,
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <a
              onClick={() => {
                RouterHelper.jumpTo(ROUTE_ID.PosEditPage, {
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
  }, [posList]);
};

export default useConfig;
