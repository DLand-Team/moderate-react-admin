import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Checkbox, Form, Modal, Space } from "antd";
import { useTranslation } from "react-i18next";
import { usePageConfig } from "src/common/hooks";
import { useFlat } from "src/reduxService";

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
        align: "left",
        fieldConfig: {
          scope: ["table"],
        },
      },
      {
        title: t`filterItem.FilterName`,
        dataIndex: "filterItemName",
        key: "filterItemName",
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
      },
      {
        title: t`filterItem.FilterBy`,
        dataIndex: "allDirect",
        key: "allDirect",
        fieldConfig: {
          scope: ["table"],
          formOptions: {
            label: t`filterItem.FilterBy`,
            name: "FilterBy",
          },
          // render: () => {
          //   return (
              
          //   );
          // },
        },
      },
      {
        title: commonT`blog.action`,
        key: "action",
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
                });
              }}
            />
          </Space>
        ),
      },
    ];
  }, [list]);
};

export default useConfig;
