import { Col, Form, FormInstance, Input, Row, Select } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { cloneDeep } from "lodash-es";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { FieldType } from "src/common/utils";
import { useFlat } from "src/reduxService";
import { Market } from "src/reduxService/stores/marketStore/model";
import { Pos } from "src/reduxService/stores/posStore/model";
const { Option } = Select;
export type TopPartForm = Pick<Pos, "posName" | "comment">;
const TopForm = ({ formRef }: { formRef?: FormInstance<TopPartForm> }) => {
  const { currentData, setCurrentMarketData } = useFlat("marketStore");
  let [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { t } = useTranslation(["pos"]);
  let inputAttrConfig = {
    disabled: id ? true : false,
    size: "large" as SizeType,
  };
  let optionArr = [
    [0, t`marketPage.NORMAL`],
    [1, t`marketPage.CONNECITON`],
  ];
  return (
    <div>
      <Form<TopPartForm>
        onValuesChange={(_, values) => {
          let newData = currentData
            ? { ...currentData, ...values }
            : { ...values };
          setCurrentMarketData(newData as Market);
        }}
        form={formRef}
        layout="vertical"
        name="basic"
        wrapperCol={{ span: 16 }}
        style={{ width: "100%" }}
        initialValues={currentData || {}}
        autoComplete="off">
        <Row
          style={{
            width: "100%",
          }}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={t`marketPage.marketName`}
              name="marketName"
              rules={[
                {
                  required: true,
                  message:
                    t`marketPage.placeholder_input"` + t`marketPage.marketName`,
                },
                {
                  max: 30,
                  message: t`marketPage.rule_max_30`,
                },
                {
                  pattern: /^[0-9a-zA-z_-]+$/,
                  message: t`marketPage.rule_common1`,
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={t`marketPage.marketType`}
              name="marketType"
              rules={[
                {
                  required: true,
                  message: t`marketPage.placeholder_input`,
                },
              ]}>
              <Select
                {...inputAttrConfig}
                onChange={(value) => {
                  if (value === 1) {
                    if (currentData) {
                      //marketType === 1 类型为中专点
                      const newData = cloneDeep(currentData);
                      newData!?.cpdMarketItems!?.forEach((item) => {
                        item.exclude = false;
                      });
                      setCurrentMarketData(newData);
                    }
                  }
                }}>
                {optionArr &&
                  optionArr.length > 0 &&
                  optionArr.map((item) => {
                    return (
                      <Option value={item[0]} key={item[0]}>
                        {item[1]}
                      </Option>
                    );
                  })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType> label={t`marketPage.comment`} name="comment">
              <Input.TextArea style={{ height: 120 }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default TopForm;
