import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Popconfirm,
  Select,
  Switch,
  Typography,
  message,
} from "antd";
import { useTranslation } from "react-i18next";
import { UUID } from "src/common/utils";
import { useFlat } from "src/reduxService";
import { PosItem } from "src/reduxService/stores/posStore/model";
import FieldRenderOffice from "../customFIelds/office-field";
import FieldRenderPosInfo from "../customFIelds/posInfo-field";
import {
  ColumnsCreater,
  Wrapper,
  useEditTable,
} from "src/common/hooks/useEditTable";

const calcWeight = (data: {
  posType: string;
  agentOrAirline: string;
  officeOwner: string;
  exclude: boolean;
}) => {
  const { posType, agentOrAirline, officeOwner, exclude } = data;
  let weight = 0;
  weight += 5 * (!agentOrAirline ? 8 : 1);
  weight += 6 * (!officeOwner || officeOwner == "ALL" ? 6 : 1);
  weight +=
    {
      I: 1,
      T: 2,
      C: 3,
      N: 4,
      W: 48,
    }[posType] || 0;
  weight = weight * (exclude ? 1 : 10);
  console.log(exclude);
  return weight;
};

const colCreater: ColumnsCreater<PosItem> = ({
  editingKey,
  form,
  save,
  isEditing,
  cancel,
  edit,
}) => {
  const { t } = useTranslation(["pos"]);
  return [
    {
      title: t("posPage.posType"),
      dataIndex: "posType",
      key: "posType",
      editable: true,
      fieldConfig: {
        options: [
          {
            key: "I",
            value: "I",
            label: t("posPage.IATANUM"),
          },
          {
            key: "T",
            value: "T",
            label: t("posPage.PCC"),
          },
          {
            key: "C",
            value: "C",
            label: t("posPage.CITY"),
          },
          {
            key: "N",
            value: "N",
            label: t("posPage.COUNTRY"),
          },
          {
            key: "W",
            value: "W",
            label: t("posPage.WORLD"),
          },
        ],
        inputAttrConfig: {
          placeholder: `${t("posPage.placeholder_select")} ${t(
            "posPage.posType"
          )}`,
          maxLength: 60,
          style: {
            width: "140px",
          },
        },
        type: "Select",
        render: ({ inputAttrConfig, options }, form) => {
          console.log("form.getFieldValue()");
          console.log(form.getFieldValue("posType"));
          const optionArr = typeof options == "function" ? options() : options;
          return (
            <Form.Item
              name="posType"
              style={{
                margin: 0,
              }}
              rules={[
                {
                  required: true,
                  message: `${t("posPage.placeholder_input")} ${t(
                    "posPage.posType"
                  )}`,
                },
              ]}>
              <Select
                onChange={() => {
                  form.setFieldsValue({
                    posInfo: undefined,
                  });
                }}
                {...inputAttrConfig}>
                {optionArr &&
                  optionArr.length > 0 &&
                  optionArr.map((item) => {
                    let temp =
                      typeof item == "object"
                        ? item
                        : {
                            key: item,
                            value: item,
                            label: item,
                          };
                    return (
                      <Select.Option value={temp.value} key={temp.key}>
                        {temp.label}
                      </Select.Option>
                    );
                  })}
              </Select>
            </Form.Item>
          );
        },
      },
      render: (value) => {
        let data = {
          I: t("posPage.IATANUM"),
          T: t("posPage.PCC"),
          C: t("posPage.CITY"),
          N: t("posPage.COUNTRY"),
          W: t("posPage.WORLD"),
        };
        return value in data ? data[value as keyof typeof data] : "";
      },
    },
    {
      title: t("posPage.officeO"),
      dataIndex: "officeOwner",
      key: "officeOwner",
      editable: true,
      fieldConfig: {
        formOptions: {
          name: "officeOwner",
        },
        render() {
          return <FieldRenderOffice />;
        },
      },
    },
    {
      title: t("posPage.aoa"),
      dataIndex: "agentOrAirline",
      key: "agentOrAirline",
      editable: true,
      fieldConfig: {
        formOptions: {
          name: "agentOrAirline",
          style: {
            margin: 0,
          },
        },
        options: [
          {
            key: "A",
            label: t("posPage.Airline"),
            value: "A",
          },
          {
            key: "T",
            label: t("posPage.Agent"),
            value: "T",
          },
        ],
        inputAttrConfig: {
          placeholder: t("posPage.placeholder_aoa"),
          allowClear: true,
          onChange: () => {
            setTimeout(() => {
              form.setFieldValue("posInfo", "");
            }, 100);
          },
        },
        type: "Select",
      },
      render: (value) => {
        let map = {
          A: t("posPage.Airline"),
          T: t("posPage.Agent"),
        };
        return value in map ? map[value as keyof typeof map] : "";
      },
    },
    {
      title: t("posPage.posInfo"),
      dataIndex: "posInfo",
      key: "posInfo",
      editable: true,
      fieldConfig: {
        render: () => {
          return <FieldRenderPosInfo formIns={form} />;
        },
      },
    },
    {
      title: t("posPage.exclude"),
      dataIndex: "exclude",
      key: "exclude",
      editable: true,
      render: (value) => {
        return <Switch checked={value}></Switch>;
      },
      fieldConfig: {
        type: "Switch",
        formOptions: {
          name: "exclude",
          style: {
            margin: 0,
          },
          valuePropName: "checked",
          initialValue: false,
        },
      },
    },
    {
      title: t("posPage.weight"),
      dataIndex: "weight",
      key: "weight",
      editable: true,
      fieldConfig: {
        render: () => {
          const { posType, agentOrAirline, officeOwner, exclude } =
            form.getFieldsValue();
          return (
            <div>
              {calcWeight({
                posType,
                agentOrAirline,
                officeOwner,
                exclude,
              })}
            </div>
          );
        },
      },
      render: (value) => {
        return <div>{value}</div>;
      },
    },
    {
      title: t("posPage.operation"),
      dataIndex: "operation",
      render: (_: any, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key!)}
              style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];
};

const Wrapper: Wrapper<PosItem> = ({
  children,
  editingKey,
  setDataList,
  dataList,
}) => {
  const { t } = useTranslation(["pos"]);
  const { currentData, setCurrentPosData } = useFlat("posStore");
  return (
    <>
      {children}
      <Button
        style={{
          marginTop: "30px",
        }}
        onClick={() => {
          if (editingKey) {
            message.warning({
              content: "inEditing",
            });
            return;
          }
          const newData = [
            ...dataList,
            {
              key: UUID(),
            } as PosItem,
          ];
          setDataList(newData);
          setCurrentPosData({
            ...currentData!,
            cpdPosItems: newData,
          });
        }}
        icon={<PlusOutlined />}
        type="dashed">
        {t`posPage.addLine`}
      </Button>{" "}
    </>
  );
};

const PosItemsTable = () => {
  const { currentData, setCurrentPosData } = useFlat("posStore");
  const { t } = useTranslation(["pos"]);
  const tableNode = useEditTable<PosItem>({
    colCreater: colCreater,
    defaultValue: currentData?.cpdPosItems || [],
    Wrapper,
    handleValuesChange: (_, values) => {
      setCurrentPosData({
        ...currentData!,
        cpdPosItems: values,
      });
    },
  });
  return (
    <>
      <Typography
        style={{
          fontSize: "16px",
          marginBottom: "30px",
        }}>
        {t("posPage.itemListTitle")}
      </Typography>
      {tableNode}
    </>
  );
};

export default PosItemsTable;
