import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance, Input } from "antd";
import { FieldConfig } from "src/common/utils";

const MultipleFieldOne = (props: {
  fieldConfig: FieldConfig;
  formIns: FormInstance;
}) => {
  const { fieldConfig } = props;
  const { formOptions, inputAttrConfig } = fieldConfig;
  const { childRule = [] } = formOptions || {};
  return (
    <Form.List {...(formOptions as any)}>
      {(fields, { add, remove }, { errors }) => {
        return (
          <>
            {fields.map(({ key, ...field }) => (
              <Form.Item label={formOptions!?.label} required={false} key={key}>
                <Form.Item
                  {...field}
                  validateTrigger={["onChange", "onBlur"]}
                  rules={childRule}
                  noStyle
                >
                  <Input
                    {...inputAttrConfig}
                    placeholder="passenger name"
                    style={{ width: "60%" }}
                  />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: "60%" }}
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        );
      }}
    </Form.List>
  );
};

export default MultipleFieldOne;
