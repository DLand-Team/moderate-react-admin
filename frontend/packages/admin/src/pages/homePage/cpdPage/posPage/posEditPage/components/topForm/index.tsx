import { Col, Form, FormInstance, Input, Row } from "antd";
import { useTranslation } from "react-i18next";
import { FieldType } from "src/common/utils";
import { useFlat } from "src/reduxService";
import { Pos } from "src/reduxService/stores/posStore/model";

export type TopPartForm = Pick<Pos, "posName" | "comment">;
const TopForm = ({ formRef }: { formRef?: FormInstance<TopPartForm> }) => {
  const { currentData, setCurrentData } = useFlat("posStore");
  const { t } = useTranslation(["pos"]);
  return (
    <div>
      <Form<TopPartForm>
        onValuesChange={(_, values) => {
          let newData = currentData
            ? { ...currentData, ...values }
            : { ...values };
          setCurrentData(newData as Pos);
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
              label="销售地名称"
              name="posName"
              rules={[
                {
                  required: true,
                  message: `${t("posPage.placeholder_input")} ${t(
                    "posPage.POSName"
                  )}`,
                },
                {
                  max: 30,
                  message: t("posPage.rule_posName_1"),
                },
                {
                  pattern: /^[0-9a-zA-z_-]+$/,
                  message: t("posPage.placeholder_posName"),
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item<FieldType> label="描述" name="comment">
              <Input.TextArea style={{ height: 120 }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default TopForm;
