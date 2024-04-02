import { usePageConfig } from "src/common/hooks";
import { Modal, Space, Select, Form } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useFlat } from "src/reduxService";
import { useTranslation } from "react-i18next";
let Option = Select.Option;

const useConfig = () => {
  const {
    setIsShowModal,
    deleteAct,
    list,
    getDetailAct,
    queryListAct,
    carrierList,
  } = useFlat("carrierStore");
  const { t } = useTranslation(["carrier"]);
  const { t: commonT } = useTranslation(["common"]);
  return usePageConfig<any>(() => {
    return [
      {
        title: t`carrierFamily.NO`,
        dataIndex: "id",
        key: "id",
        align: "center",
        fieldConfig: {
          scope: ["table"],
        },
      },
      {
        title: t`carrierFamily.carrierFamilyName`,
        dataIndex: "familyName",
        key: "familyName",
        align: "center",
        fieldConfig: {
          formOptions: {
            label: t`carrierFamily.SearchName`,
            name: "familyName",
            rules: [
              {
                required: true,
                message: t`carrierFamily.rule__carrierFamilyName_1`,
              },
              {
                pattern: /^([a-zA-Z0-9-_]+)$/,
                message: t`carrierFamily.rule__carrierFamilyName_2`,
              },
              {
                max: 30,
                message: t`carrierFamily.rule__carrierFamilyName_3`,
              },
            ],
          },
          inputAttrConfig: {
            placeholder: t`carrierFamily.placeholder_carrierFamilyName`,
          },
        },
        render(value) {
          return <a>{value}</a>;
        },
      },
      {
        title: t`carrierFamily.Carrier`,
        dataIndex: "carriers",
        key: "carriers",
        align: "center",
        fieldConfig: {
          scope: ["modal", "table"],
          formOptions: {
            label: t`carrierFamily.ItemList`,
            name: "carriers",
          },
          render() {
            return (
              <Form.Item
                name="carriers"
                label={t`carrierFamily.ItemList`}
                rules={[
                  {
                    required: true,
                    message: t`carrierFamily.rule__carrierFamilyList_1`,
                  },
                  {
                    message: t`carrierFamily.rule__carrierFamilyList_2`,
                    validator: (rule, value, callback) => {
                      if (value && value.length > 20) {
                        //@ts-ignore
                        callback(rule.message);
                      }
                      callback();
                    },
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder={t`carrierFamily.placeholder_carrierFamilyList`}
                >
                  {carrierList &&
                    carrierList.length > 0 &&
                    carrierList.map((item) => {
                      return (
                        <Option value={item.carrier} key={item.id}>
                          {item.carrier}
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
        title: t`carrierFamily.action`,
        key: "action",
        align: "center",
        render: (_, record) => (
          <Space size="middle">
            <a
              onClick={() => {
                getDetailAct({ id: record.id });
                setIsShowModal(true);
              }}
            >
              <EditOutlined />
            </a>
            <a
              onClick={() => {
                Modal.confirm({
                  title: commonT`blog.modalDeleteTitle`,
                  content: commonT`blog.modalDeleteContent`,
                  onOk: async () => {
                    await deleteAct({ ids: record.id });
                    queryListAct();
                  },
                  okText: commonT`blog.Yes`,
                  cancelText: commonT`blog.No`,
                });
              }}
            >
              <DeleteOutlined />
            </a>
          </Space>
        ),
      },
    ];
  }, [list]);
};

export default useConfig;
