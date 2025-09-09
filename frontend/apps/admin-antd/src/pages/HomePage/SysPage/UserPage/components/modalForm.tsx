import { Form, Input, Modal, notification, Select } from "antd";
import { useEffect } from "react";
import { useFlat } from "src/service";
import { ModalType, User } from "src/service/stores/sysStore/model";
import UserTreeSelect from "./userTreeSelect";

const ModalForm = () => {
  const {
    userModalType,
    setUserModalType,
    setCurrentUser,
    currentUser,
    postList,
    updateUserAct,
    createUserAct,
    queryPostListAct,
  } = useFlat("sysStore");
  const [form] = Form.useForm<User>();
  useEffect(() => {
    queryPostListAct();
  }, []);
  useEffect(() => {
    form.setFieldsValue(currentUser || {});
  }, [currentUser]);
  const handleClose = () => {
    setUserModalType(ModalType.NONE);
    form.resetFields();
    if (userModalType == ModalType.EDIT) {
      setCurrentUser(null);
    }
  };
  return (
    <Modal
      open={[ModalType.EDIT, ModalType.ADD].includes(userModalType)}
      title={currentUser ? "修改用户" : "新建用户"}
      okText="确定"
      cancelText="取消"
      onCancel={() => {
        handleClose();
      }}
      onClose={() => {}}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            const api =
              userModalType == ModalType.EDIT ? updateUserAct : createUserAct;
            api({
              ...currentUser,
              ...values,
            });
            notification.success({
              message: "成功",
              description: "",
              showProgress: true,
              duration: 2,
              pauseOnHover: true,
            });
            handleClose();
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form<User>
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: "请输入用户昵称",
            },
          ]}
          name={"nickname"}
          label={"用户昵称"}
        >
          <Input />
        </Form.Item>
        <UserTreeSelect />
        {/* 电话 */}
        <Form.Item
          rules={[
            {
              pattern: /^1[3-9]\d{9}$/,
              message: "请输入正确的11位手机号码",
            },
          ]}
          name={"mobile"}
          label={"用户电话"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[
            {
              type: "email",
              message: "请输入正确的邮箱",
            },
          ]}
          name={"email"}
          label={"邮箱"}
        >
          <Input />
        </Form.Item>
        <Form.Item name={"sex"} label={"用户性别"}>
          <Select>
            <Select.Option value={1}>男</Select.Option>
            <Select.Option value={0}>女</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name={"postIds"} label={"岗位"}>
          <Select mode="multiple" allowClear>
            {postList.map((post) => (
              <Select.Option key={post.id} value={post.id}>
                {post.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name={"remark"} label={"用户备注"}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;
