import { usePageConfig } from "src/common/hooks";
import { Modal, Space, Form, Select } from "antd";
import { useFlat } from "src/service";
import { useTranslation } from "react-i18next";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const useConfig = () => {
  const { setIsShowModal, deleteAct, list, queryListAct, getDetailAct } =
    useFlat("sortStore");
  const { t } = useTranslation(["sort"]);
  const { t: commonT } = useTranslation(["common"]);
  return usePageConfig<any>(() => {
    return [
      {
        title: t`sortItem.NO`,
        dataIndex: "id",
        key: "id",
        align: "center",
        fieldConfig: {
          scope: ["table"],
        },
      },
      {
        title: t`sortItem.sortItemName`,
        dataIndex: "sortItemName",
        key: "sortItemName",
        align: "center",
        fieldConfig: {
          scope: ["modal", "table", "search"],
          formOptions: {
            label: t`sortItem.sortItemName`,
            name: "sortItemName",
            rules: [
              {
                required: true,
                message: t`sortItem.rule__sortItemName_1`,
              },
              {
                pattern: /^([a-zA-Z0-9-_]+)$/,
                message: t`sortItem.rule__sortItemName_2`,
              },
              {
                max: 30,
                message: t`sortItem.rule__sortItemName_3`,
              },
            ],
          },
          inputAttrConfig: {
            placeholder: t`sortItem.placeholder_sortItemName`,
            maxLength: 30,
          },
        },

        // render(value) {
        //   return (
        //     <a
        //       onClick={() => {
        //         setIsShowModal(true);
        //       }}
        //     >
        //       {value}
        //     </a>
        //   );
        // },
      },
      {
        title: t`sortItem.SortBy`,
        dataIndex: "sortString",
        key: "sortString",
        align: "center",
        fieldConfig: {
          scope: ["modal", "table"],
          formOptions: {
            label: t`sortItem.SortBy`,
            name: "sortString",
            rules: [
              {
                required: true,
                message: t`sortItem.placeholder_sortBy`,
              },
            ],
          },
          render() {
            return (
              <Form.Item
                name="sortString"
                label={t`sortItem.SortBy`}
                rules={[
                  {
                    required: true,
                    message: t`sortItem.placeholder_sortBy`,
                  },
                ]}>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder={t`sortItem.placeholder_sortBy`}
                  options={[
                    { value: "1", label: t`sortItem.TravelTime` },
                    { value: "2", label: t`sortItem.Connection` },
                    { value: "3", label: t`sortItem.Price` },
                    { value: "4", label: t`sortItem.DepartureTime` },
                    { value: "5", label: t`sortItem.ArrivalTime` },
                    { value: "6", label: t`sortItem.Online` },
                    { value: "7", label: t`sortItem.Nocodeshare` },
                    { value: "8", label: t`sortItem.Sortscore` },
                  ]}
                />
              </Form.Item>
            );
          },
          // inputAttrConfig: {
          //   placeholder: t`sortItem.placeholder_sortBy`,
          //   mode: "multiple",
          //   style: {
          //     width: "100%",
          //   },
          // },
        },
        render: (item) => {
          let arrs = [];
          if (item.indexOf("-") > -1) {
            arrs = item.split("-");
          } else {
            arrs[0] = item;
          }
          for (let i = 0; i < arrs.length; i++) {
            if (arrs[i] === "1") {
              // arrs[i] = `${t`sortItem.TravelTime`}`;
              arrs[i] = t`sortItem.TravelTime`;
            } else if (arrs[i] === "2") {
              arrs[i] = t`sortItem.Connection`;
            } else if (arrs[i] === "3") {
              arrs[i] = t`sortItem.Price`;
            } else if (arrs[i] === "4") {
              arrs[i] = t`sortItem.DepartureTime`;
            } else if (arrs[i] === "5") {
              arrs[i] = t`sortItem.ArrivalTime`;
            } else if (arrs[i] === "6") {
              arrs[i] = t`sortItem.Online`;
            } else if (arrs[i] === "7") {
              arrs[i] = t`sortItem.Nocodeshare`;
            } else if (arrs[i] === "8") {
              arrs[i] = t`sortItem.Sortscore`;
            }
          }
          return arrs.join("->");
        },
      },
      {
        title: commonT`blog.action`,
        key: "action",
        align: "center",
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
                  title: t`sortItem.DelTile`,
                  content: t`sortItem.modalDeleteContent`,
                  onOk: async () => {
                    await deleteAct({ ids: record.id });
                    queryListAct();
                  },
                  okText: commonT`blog.Yes`,
                  cancelText: commonT`blog.No`,
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
