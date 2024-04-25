import TreeSelectBase from "src/components/treeSelectBase/treeSelectBase";
import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  // 引入natur的articleStore
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="新建api"
      okText="确定"
      cancelText="取消"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}>
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}>
        <Form.Item
          name="name"
          label="api名称"
          rules={[
            {
              required: true,
              message: "请输入!",
            },
          ]}>
          <Input />
        </Form.Item>
        {/* // 备注 */}
        <Form.Item
          name={"remark"}
          rules={[
            {
              required: true,
              message: "请输入!",
            },
          ]}
          label="备注">
          <Input type="textarea" />
        </Form.Item>
        <TreeSelectBase
          rules={[
            {
              required: true,
              message: "请输入!",
            },
          ]}
          name={"path"}
          label={"路径"}
        />
      </Form>
    </Modal>
  );
};

const ModalForm = ({
  btnLabel,
  handleUpload,
}: {
  btnLabel: string;
  handleUpload: (values: any) => void;
}) => {
  const [open, setOpen] = useState(false);

  const onCreate = (values: any) => {
    handleUpload(values);
    setOpen(false);
  };

  return (
    <span
      style={{
        marginRight: "12px",
      }}>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}>
        + {btnLabel}
      </Button>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </span>
  );
};

export default ModalForm;
