import { useState } from "react";
import { Button, Form, Input, Modal, Radio } from "antd";
import DropUpload from "../dropUpload/dropUpload";

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
  const [form] = Form.useForm();
  const [isUploadMd, setIsUpload] = useState(false);
  return (
    <Modal
      open={open}
      title="新建文章"
      okText="确定"
      cancelText="取消"
      onCancel={onCancel}
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
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="title"
          label="文章标题"
          rules={[
            {
              required: true,
              message: "请输入!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="subTitle"
          rules={[
            {
              required: true,
              message: "请输入!",
            },
          ]}
          label="副标题"
        >
          <Input type="textarea" />
        </Form.Item>

        <Form.Item
          required={true}
          label={
            <div>
              正文
              <Radio.Group
                defaultValue={isUploadMd ? "1" : "2"}
                value={isUploadMd ? "1" : "2"}
                onChange={(e) => {
                  setIsUpload(e.target.value === "1");
                }}
                style={{ marginLeft: "12px" }}
              >
                <Radio value="1">上传md文件</Radio>
                <Radio value="2">粘贴文本</Radio>
              </Radio.Group>
            </div>
          }
        >
          {!isUploadMd && (
            <Form.Item
              name="content"
              rules={[
                {
                  required: true,
                  message: "请输入正文!",
                },
              ]}
            >
              <Input.TextArea
                style={{
                  minHeight: "200px",
                }}
              ></Input.TextArea>
            </Form.Item>
          )}
          {isUploadMd && (
            <Form.Item>
              <DropUpload
                handleUploadMd={(str: string) => {
                  form.setFieldValue("content", str);
                  setIsUpload(false);
                }}
              ></DropUpload>
            </Form.Item>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ModalForm: React.FC = () => {
  const [open, setOpen] = useState(false);

  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    setOpen(false);

  };

  return (
    <span
      style={{
        marginRight: "12px",
      }}
    >
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        + 新增文章
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
