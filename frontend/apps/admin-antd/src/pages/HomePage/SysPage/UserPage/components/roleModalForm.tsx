import { Form, Input, Modal, notification, Select } from "antd";
import { useEffect } from "react";
import { useFlat } from "src/service";
import { ModalType, User } from "src/service/stores/sysStore/model";

const RoleModalForm = () => {
  const {
    userModalType,
    setUserModalType,
    currentUser,
    userRoleList,
    currentUserRoles,
    listRoleAct,
    assignUserRoleAct,
    listUserRolesAct,
    setCurrentUserRoles,
    setCurrentUser,
  } = useFlat("sysStore");
  const [form] = Form.useForm<User>();
  useEffect(() => {
    listRoleAct();
  }, []);
  useEffect(() => {
    if (currentUser) {
      listUserRolesAct({ userId: currentUser?.id! });
      form.setFieldsValue(currentUser || {});
    }
  }, [currentUser]);
  useEffect(() => {
    if (currentUserRoles) {
      form.setFieldsValue({
        postIds: currentUserRoles,
      });
    }
  }, [currentUserRoles]);
  const handleClose = () => {
    setUserModalType(ModalType.NONE);
    form.resetFields();
    setCurrentUserRoles([]);
    setCurrentUser(null);
  };
  return (
    <Modal
      open={userModalType == ModalType.ROLE}
      title={"分配角色"}
      okText="确定"
      cancelText="取消"
      onCancel={() => {
        handleClose();
      }}
      onClose={() => {}}
      onOk={async () => {
        const { postIds } = form.getFieldsValue();
        await assignUserRoleAct({
          userId: currentUser!?.id,
          roleIds: postIds || [],
        });
        notification.success({
          message: "成功",
          description: "",
          showProgress: true,
          duration: 2,
          pauseOnHover: true,
        });
        handleClose();
      }}
    >
      <Form<User>
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item name={"username"} label={"用户名称"}>
          <Input disabled />
        </Form.Item>
        <Form.Item name={"nickname"} label={"用户昵称"}>
          <Input disabled />
        </Form.Item>
        <Form.Item name={"postIds"} label={"角色"}>
          <Select mode="multiple" allowClear>
            {userRoleList.map((role) => (
              <Select.Option key={role.id} value={role.id}>
                {role.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RoleModalForm;
