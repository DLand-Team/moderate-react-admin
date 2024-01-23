import { initAllStores, useFlatInject, useGreatAsync } from "@/common/hooks";
import { ROUTE_STRUCT_CONFIG } from "@/config/routerConfig";
import { routerHelper } from "@/services";
import { Button, Form, Modal, Table, Tree, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalForm from "./components/modalForm/modalForm";

interface DataType {
  key: string;
  name: string;
  id: string;
}

const data = [
  {
    key: "1",
    id: "1",
    name: "admin",
  },
  {
    key: "2",
    id: "2",
    name: "usr",
  },
];

const RolePage = () => {
  const [modalForm] = Form.useForm();
  const [permissionStore] = useFlatInject("permissionStore");
  const [userInfoStore] = useFlatInject("userInfoStore");
  const { createPermissionTree, permissionTreeData } = permissionStore;
  const { permissions, updatePermissions } = userInfoStore;
  const { loading, run: updatePermissionsG } = useGreatAsync(
    updatePermissions,
    {
      auto: false,
      single: true,
    }
  );
  const [checked, setChecked] = useState<any>();
  const navigate = useNavigate();
  const handleSubmit = () => {
    Modal.confirm({
      title: "确定么？",
      content: "更新权限之后，需要重新登陆",
      onOk: () => {
        if (Array.isArray(checked)) {
          if (checked.includes("helloPage")) {
            updatePermissionsG(checked).then(() => {
              initAllStores();
              routerHelper.init();
              navigate("/");
            });
          } else {
            notification.info({
              message: "helloPage 首页得有啊！",
            });
          }
        }
      },
    });
  };
  useEffect(() => {
    createPermissionTree(ROUTE_STRUCT_CONFIG);
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: "角色编号",
      dataIndex: "id",
      key: "id",
      render: (text) => <Button>{text}</Button>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (_) => (
        <ModalForm handleCancel={()=>{
          modalForm.resetFields()
        }} handleSubmit={handleSubmit}>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            onValuesChange={() => {}}
            size={"middle"}
            form={modalForm}
          >
            <Form.Item label="权限" name="permission">
              {permissions.length && permissionTreeData.length && (
                <Tree
                  checkStrictly={true}
                  defaultCheckedKeys={permissions}
                  checkable
                  treeData={permissionTreeData}
                  onCheck={(data: any) => {
                    setChecked(data.checked);
                  }}
                />
              )}
            </Form.Item>
          </Form>
        </ModalForm>
      ),
    },
  ];
  return (
    <div>
      <Table loading={loading} columns={columns} dataSource={data} />
    </div>
  );
};

export default RolePage;
